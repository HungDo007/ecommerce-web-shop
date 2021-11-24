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
                    ProductImg = x.pi.Path,
                    Quantity = x.c.Quantity,
                    Price = x.c.Price,
                    StockOfDetail = x.pd.Stock
                }).ToListAsync();

                var result = PagingService.Paging<CartVm>(data, request.PageIndex, request.PageSize);
                return result;
            }
            catch
            {
                return null;
            }
        }

        public async Task<bool> Order()
        {
            throw new NotImplementedException();
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
    }
}
