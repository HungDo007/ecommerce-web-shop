using Application.Common;
using Application.ViewModels.Catalog;
using AutoMapper;
using Data.EF;
using Data.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.Catalog
{
    public class ProductService : IProductService
    {
        private readonly IMapper _mapper;
        private readonly EShopContext _context;
        private readonly UserManager<AppUser> _userManager;
        private readonly IStorageService _storageService;

        public ProductService(IMapper mapper,
            EShopContext context,
            UserManager<AppUser> userManager,
            IStorageService storageService)
        {
            _mapper = mapper;
            _context = context;
            _userManager = userManager;
            _storageService = storageService;
        }

        public async Task<int> Add(ProductRequest request)
        {
            Product pro = new Product();
            pro.Name = request.Name;
            pro.Description = request.Description;
            pro.UserId = (await _userManager.FindByNameAsync(request.Seller)).Id;
            pro.DateCreated = DateTime.Now;

            pro.ProductImages.Add(await AddImage(pro.Id, true, request.Poster));

            if (request.Images.Count > 0)
            {
                foreach (var item in request.Images)
                {
                    pro.ProductImages.Add(await AddImage(pro.Id, false, item));
                }
            }

            //foreach (var item in request.Details)
            //{
            //    pro.ProductDetails.Add(await AddProDetail(pro.Id, item));
            //}
            if (request.Categories.Count > 0)
            {
                foreach (var item in request.Categories)
                {
                    ProductCategory pc = new ProductCategory()
                    {
                        CategoryId = item,
                        ProductId = pro.Id
                    };
                    pro.ProductCategories.Add(pc);
                }
            }
            _context.Products.Add(pro);
            await _context.SaveChangesAsync();
            return pro.Id;
        }


        private async Task<ProductImage> AddImage(int proId, bool IsPoster, IFormFile file)
        {
            ProductImage pi = new ProductImage();
            pi.ProductId = proId;
            pi.Path = await _storageService.SaveFile(false, file);
            pi.IsPoster = IsPoster;

            return pi;
        }

        public async Task<bool> AddProDetail(int proId, List<ProductDetailRequest> detailVms)
        {
            foreach (var detailVm in detailVms)
            {
                ProductDetail pd = new ProductDetail();
                pd.Price = detailVm.Price;
                pd.Stock = detailVm.Stock;
                pd.ProductId = proId;

                List<ComponentDetail> details = new List<ComponentDetail>();
                foreach (var item in detailVm.ComponentDetails)
                {
                    ComponentDetail comp = await _context.ComponentDetails
                        .Where(x => x.ComponentId == item.CompId && x.Value == item.Value)
                        .FirstOrDefaultAsync();

                    if (comp == null)
                        comp = new ComponentDetail() { ComponentId = item.CompId, Value = item.Value };

                    details.Add(comp);
                }

                pd.ComponentDetails = details;
                _context.ProductDetails.Add(pd);
            }

            try
            {
                await _context.SaveChangesAsync();
                return true;
            }
            catch
            {
                return false;
            }
        }

        public async Task AddViewCount(int proId)
        {
            var product = await _context.Products.FindAsync(proId);
            if (product != null)
                product.ViewCount += 1;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch
            {
            }
        }

        public async Task<List<ProductVm>> GetAll()
        {
            var data = await _context.Products.Where(x => x.Status == true).Include(x => x.User).Include(x => x.ProductImages).ToListAsync();

            return _mapper.Map<List<ProductVm>>(data);
        }


        public async Task<ProductVm> GetProductDetail(int id)
        {
            var product = await _context.Products
                .Where(x => x.Status == true && x.Id == id)
                .Include(x => x.User)
                .Include(x => x.ProductImages)
                .FirstOrDefaultAsync();

            if (product == null)
                return null;
            ProductVm response = _mapper.Map<ProductVm>(product);


            var details = await _context.ProductDetails
                .Where(x => x.ProductId == id)
                .Include(c => c.ComponentDetails)
                .ToListAsync();
            List<ProductDetailVm> productDetailVms = _mapper.Map<List<ProductDetailVm>>(details);

            //for (int i = 0; i < details.Count; i++)
            //{                
            //    var c = await _context.ComponentDetails
            //        .Include(x => x.ProductDetails)
            //        .Include(x => x.Component)
            //        .Where(x => x.ProductDetails.Contains(details[i]))
            //        .ToListAsync();
            //    List<ComponentVm> componentDetalVms = _mapper.Map<List<ComponentVm>>(c);
            //    productDetailVms[i].ComponentDetails = componentDetalVms;
            //}


            response.ProductDetails = productDetailVms;
            return response;
        }

        public async Task<bool> Update(ProductRequest request)
        {
            var pro = await _context.Products
                .Include(x => x.ProductImages)
                .Include(x => x.ProductCategories)
                .Where(x => x.Id == request.Id)
                .FirstOrDefaultAsync();

            pro.Name = request.Name;
            pro.Description = request.Description;

            var img = pro.ProductImages.Where(x => x.IsPoster == true).FirstOrDefault();

            pro.ProductImages.Clear();
            if (request.Poster != null)
            {
                try
                {
                    await _storageService.DeleteFileAsync(false, img.Path);
                }
                catch { }

                pro.ProductImages.Add(await AddImage(pro.Id, true, request.Poster));
            }
            else
            {
                pro.ProductImages.Add(img);
            }

            if (request.Images.Count > 0)
            {
                foreach (var item in request.Images)
                {
                    pro.ProductImages.Add(await AddImage(pro.Id, false, item));
                }
            }


            try
            {
                await _context.SaveChangesAsync();
                return true;
            }
            catch
            {
                return false;
            }
        }

        public async Task<bool> UpdateProDetail(List<ProductDetailRequest> detailVms)
        {

            foreach (var item in detailVms)
            {
                var pro = await _context.ProductDetails
                    .Include(x => x.ComponentDetails)
                    .Where(x => x.Id == item.Id).FirstOrDefaultAsync();

                pro.Price = item.Price;
                pro.Stock = item.Stock;
                pro.ComponentDetails.Clear();
                foreach (var cmp in item.ComponentDetails)
                {
                    ComponentDetail comp = await _context.ComponentDetails
                        .Where(x => x.ComponentId == cmp.CompId && x.Value == cmp.Value)
                        .FirstOrDefaultAsync();

                    if (comp == null)
                        comp = new ComponentDetail() { ComponentId = cmp.CompId, Value = cmp.Value };

                    pro.ComponentDetails.Add(comp);
                }
            }
            try
            {
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
