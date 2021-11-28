using Application.Common;
using Application.ViewModels.Catalog;
using Application.ViewModels.Common;
using AutoMapper;
using Data.EF;
using Data.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Org.BouncyCastle.Math.EC.Rfc7748;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Catalog
{
    public class SaleService : ISaleService
    {
        private readonly IMapper _mapper;
        private readonly EShopContext _context;
        private readonly UserManager<AppUser> _userManager;

        public SaleService(IMapper mapper, EShopContext context, UserManager<AppUser> userManager)
        {
            _mapper = mapper;
            _context = context;
            _userManager = userManager;
        }

        public async Task<bool> AddToCart(string username, AddToCartRequest request)
        {
            try
            {
                var user = await _userManager.FindByNameAsync(username);
                var proDetail = await _context.ProductDetails.FindAsync(request.ProductDetailId);


                Cart cart = await _context.Carts.Where(x => x.UserId == user.Id && x.ProductDetailId == proDetail.Id).FirstOrDefaultAsync();

                if (cart != null)
                {
                    cart.Quantity++;
                    await _context.SaveChangesAsync();
                    return true;
                }
                else
                {
                    cart = new Cart()
                    {
                        UserId = user.Id,
                        ProductDetailId = request.ProductDetailId,
                        Quantity = request.Quantity,
                        Price = request.Quantity * proDetail.Price
                    };
                }
                _context.Carts.Add(cart);
                await _context.SaveChangesAsync();
                return true;
            }
            catch
            {
                return false;
            }
        }

        public async Task<bool> CancelOrder(int OrderId)
        {
            var order = await _context.Orders.Include(x => x.OrderDetails).Where(x => x.Id == OrderId).FirstOrDefaultAsync();

            order.OrderDetails.Clear();

            _context.Orders.Remove(order);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<PagedResult<CartVm>> GetCart(string username, PagingRequestBase request)
        {
            try
            {
                var a = from c in _context.Carts
                        join pd in _context.ProductDetails on c.ProductDetailId equals pd.Id
                        join p in _context.Products on pd.ProductId equals p.Id
                        join pi in _context.ProductImages on p.Id equals pi.ProductId
                        join u in _context.Users on c.UserId equals u.Id
                        where u.UserName == username && pi.IsPoster == true
                        select new { c, pd, p, pi, u };


                if (!string.IsNullOrEmpty(request.Keyword))
                {
                    a = a.Where(x => x.p.Name.Contains(request.Keyword));
                }

                var data = await a.Select(x => new CartVm()
                {
                    CartId = x.c.Id,
                    ProductId = x.p.Id,
                    Name = x.p.Name,
                    ProductImg = x.pi.Path,
                    Quantity = x.c.Quantity,
                    Price = x.c.Price,
                    StockOfDetail = x.pd.Stock,
                    ProductDetailId = x.pd.Id
                    //Details = GetComponentOfDetail(x.pd.Id)
                }).ToListAsync();

                foreach (var item in data)
                {
                    item.Details = GetComponentOfDetail(item.ProductDetailId);
                }


                var result = PagingService.Paging<CartVm>(data, request.PageIndex, request.PageSize);
                return result;
            }
            catch
            {
                return null;
            }
        }

        public async Task<PagedResult<OrderVm>> GetOrder(string username, PagingRequestBase request)
        {
            var user = await _userManager.FindByNameAsync(username);
            var orders = await _context.Orders.Include(x => x.OrderDetails).Where(x => x.UserId == user.Id).ToListAsync();

            List<OrderVm> odVms = new List<OrderVm>();
            foreach (var item in orders)
            {
                string temp = item.OrderDetails.Count == 1 ? "" : $"+{item.OrderDetails.Count - 1}";
                OrderVm orderVm = new OrderVm
                {
                    Id = item.Id,
                    Name = $"{item.OrderDetails[0].Name}{temp}",
                    Paid = item.Paid,
                    Quantity = item.OrderDetails.Count,
                    SumPrice = item.OrderDetails.Sum(x => x.Price)
                };
                odVms.Add(orderVm);
            }

            if (!string.IsNullOrEmpty(request.Keyword))
            {
                odVms = odVms.Where(x => x.Name.Contains(request.Keyword)).ToList();
            }

            return PagingService.Paging<OrderVm>(odVms, request.PageIndex, request.PageSize);
        }

        public async Task<List<OrderDetailVm>> GetOrderDetail(int orderId)
        {
            var a = from od in _context.OrderDetails
                    join pd in _context.ProductDetails on od.ProductDetailId equals pd.Id
                    join p in _context.Products on pd.ProductId equals p.Id
                    join pi in _context.ProductImages on p.Id equals pi.ProductId
                    where od.OrderId == orderId && pi.IsPoster == true
                    select new { od, pd, p, pi };

            var data = await a.Select(x => new OrderDetailVm()
            {
                Name = x.p.Name,
                ProductImg = x.pi.Path,
                Quantity = x.od.Quantity,
                Price = x.od.Price,
            }).ToListAsync();

            return data;
        }

        public async Task<OrderResponse> OrderProduct(string username, OrderRequest request)
        {
            var user = await _userManager.FindByNameAsync(username);
            List<OrderDetail> ods = new List<OrderDetail>();
            List<CartVm> cartVms = new List<CartVm>();
            foreach (var item in request.OrderItemId)
            {
                var c = await _context.Carts.Include(x => x.ProductDetail).Where(x => x.Id == item).FirstOrDefaultAsync();
                if (c != null)
                {
                    c.ProductDetail.Stock -= c.Quantity;
                    OrderDetail od = new OrderDetail()
                    {
                        ProductDetailId = c.ProductDetailId,
                        Price = c.Price,
                        Quantity = c.Quantity
                    };

                    var cvm = GetCartVm(c.Id);
                    cartVms.Add(cvm);

                    od.Name = cvm.ToString();
                    ods.Add(od);
                    _context.Carts.Remove(c);
                }
            }

            Order order = new Order()
            {
                ShipAddress = request.ShipAddress,
                ShipName = request.ShipName,
                ShipPhonenumber = request.ShipPhonenumber,
                OrderDetails = ods,
                UserId = user.Id
            };

            _context.Orders.Add(order);
            await _context.SaveChangesAsync();

            OrderResponse orderResponse = new OrderResponse()
            {
                OrderId = order.Id,
                CartVms = cartVms
            };
            return orderResponse;
        }

        public async Task<bool> RemoveFromCart(List<int> cartIds)
        {
            List<Cart> c = new List<Cart>();
            foreach (var item in cartIds)
            {
                var temp = _context.Carts.Where(x => x.Id == item).FirstOrDefault();
                if (temp != null)
                    c.Add(temp);
            }

            _context.Carts.RemoveRange(c);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> UpdateQuantity(UpdateQuantityRequest request)
        {
            try
            {
                var proD = (from c in _context.Carts
                            join pd in _context.ProductDetails on c.ProductDetailId equals pd.Id
                            where c.Id == request.CartId
                            select new { c, pd }).FirstOrDefault();
                if (request.IsIncrease)
                {
                    proD.c.Quantity++;
                    proD.c.Price += proD.pd.Price;
                }
                else
                {
                    proD.c.Quantity--;
                    proD.c.Price -= proD.pd.Price;
                }

                await _context.SaveChangesAsync();
                return true;
            }
            catch
            {
                return false;
            }
        }


        private string GetComponentOfDetail(int proDetailId)
        {
            var pd = _context.ProductDetails.Include(x => x.ComponentDetails).Where(x => x.Id == proDetailId).FirstOrDefault();

            string detail = "";
            foreach (var item in pd.ComponentDetails)
            {
                detail += $" {item.ToString()}";
            }

            //return _mapper.Map<List<ComponentDetailVm>>(pd.ComponentDetails);
            return detail;
        }

        private CartVm GetCartVm(int cartId)
        {
            var a = from c in _context.Carts
                    join pd in _context.ProductDetails on c.ProductDetailId equals pd.Id
                    join p in _context.Products on pd.ProductId equals p.Id
                    where c.Id == cartId
                    select new { c, pd, p };
            return a.Select(x => new CartVm()
            {
                Name = x.p.Name,
                Quantity = x.c.Quantity,
                Price = x.c.Price,
            }).FirstOrDefault();
        }

        public async Task SaveToken(string token, int orderId)
        {
            PaymentOnline po = new PaymentOnline()
            {
                Token = token,
                OrderId = orderId
            };

            _context.PaymentOnlines.Add(po);
            await _context.SaveChangesAsync();
        }

        public async Task Checkout(CheckoutStatusRequest request)
        {
            var po = await _context.PaymentOnlines.FindAsync(request.Token);

            if (po == null)
                return;

            var order = await _context.Orders.Where(x => x.Id == po.OrderId).FirstOrDefaultAsync();
            order.Paid = true;
            await _context.SaveChangesAsync();
        }
    }
}
