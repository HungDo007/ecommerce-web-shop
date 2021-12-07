using Application.Common;
using Application.ViewModels.Catalog;
using Application.ViewModels.Common;
using AutoMapper;
using Data.EF;
using Data.Entities;
using Data.Enum;
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
            pi.Path = await _storageService.SaveFile(SystemConstants.FolderProduct, file);
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
                        comp = new ComponentDetail() { ComponentId = item.CompId, Name = item.Name, Value = item.Value };

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

        public async Task<PagedResult<ProductVm>> GetAll(string username, ProductPagingRequest request)
        {
            var products = await _context.Products
                .Where(x => x.Status == ProductStatus.Active)
                .Include(x => x.User)
                .Include(x => x.ProductImages)
                .Include(x => x.ProductCategories)
                .Include(x => x.ProductDetails)
                .ToListAsync();

            //Filter
            if (!string.IsNullOrEmpty(username))
            {
                products = products.Where(x => x.User.UserName != username).ToList();
            }
            if (!string.IsNullOrEmpty(request.Keyword))
            {
                products = products.Where(x => x.Name.Contains(request.Keyword)).ToList();
            }

            if (request.CatId != 0)
            {
                products = products.Where(x => x.ProductCategories != null && x.ProductCategories[0].CategoryId == request.CatId).ToList();
            }

            List<ProductVm> data = _mapper.Map<List<ProductVm>>(products);

            var pagedResult = PagingService.Paging<ProductVm>(data, request.PageIndex, request.PageSize);

            return pagedResult;

            ////Paging
            //int totalRow = products.Count();
            //products = products.Skip((request.PageIndex - 1) * request.PageSize)
            //    .Take(request.PageSize)
            //    .ToList();


            //var responses = _mapper.Map<List<ProductVm>>(products);

            ////Select and projection
            //var pagedResult = new PagedResult<ProductVm>()
            //{
            //    TotalRecords = totalRow,
            //    PageIndex = request.PageIndex,
            //    PageSize = request.PageSize,
            //    Items = responses
            //};
            //return pagedResult;
        }

        public async Task<PagedResult<ProductVm>> GetLocked(ProductPagingRequest request)
        {
            var products = await _context.Products
                .Where(x => x.Status == ProductStatus.AdminDeleted)
                .Include(x => x.User)
                .Include(x => x.ProductImages)
                .Include(x => x.ProductCategories)
                .Include(x => x.ProductDetails)
                .ToListAsync();

            //Filter
            if (!string.IsNullOrEmpty(request.Keyword))
            {
                products = products.Where(x => x.Name.Contains(request.Keyword)).ToList();
            }

            if (request.CatId != 0)
            {
                products = products.Where(x => x.ProductCategories != null && x.ProductCategories[0].CategoryId == request.CatId).ToList();
            }


            //Paging
            int totalRow = products.Count();
            products = products.Skip((request.PageIndex - 1) * request.PageSize)
                .Take(request.PageSize)
                .ToList();


            var responses = _mapper.Map<List<ProductVm>>(products);

            //Select and projection
            var pagedResult = new PagedResult<ProductVm>()
            {
                TotalRecords = totalRow,
                PageIndex = request.PageIndex,
                PageSize = request.PageSize,
                Items = responses
            };
            return pagedResult;
        }

        public async Task<PagedResult<ProductVm>> GetAdminAll(ProductPagingRequest request)
        {
            var products = await _context.Products
                .Where(x => x.Status == ProductStatus.Active || x.Status == ProductStatus.Hided)
                .Include(x => x.User)
                .Include(x => x.ProductImages)
                .Include(x => x.ProductCategories)
                .Include(x => x.ProductDetails)
                .ToListAsync();

            //Filter
            if (!string.IsNullOrEmpty(request.Keyword))
            {
                products = products.Where(x => x.Name.Contains(request.Keyword)).ToList();
            }

            if (request.CatId != 0)
            {
                products = products.Where(x => x.ProductCategories != null && x.ProductCategories[0].CategoryId == request.CatId).ToList();
            }


            List<ProductVm> data = _mapper.Map<List<ProductVm>>(products);

            var pagedResult = PagingService.Paging<ProductVm>(data, request.PageIndex, request.PageSize);

            return pagedResult;

            ////Paging
            //int totalRow = products.Count();
            //products = products.Skip((request.PageIndex - 1) * request.PageSize)
            //    .Take(request.PageSize)
            //    .ToList();


            //var responses = _mapper.Map<List<ProductVm>>(products);

            ////Select and projection
            //var pagedResult = new PagedResult<ProductVm>()
            //{
            //    TotalRecords = totalRow,
            //    PageIndex = request.PageIndex,
            //    PageSize = request.PageSize,
            //    Items = responses
            //};
            //return pagedResult;
        }

        public async Task<ProductVm> GetProductDetail(int id)
        {
            var product = await _context.Products
                .Where(x => x.Status == ProductStatus.Active && x.Id == id)
                .Include(x => x.User)
                .Include(x => x.ProductImages)
                .Include(x => x.ProductCategories)
                .Include(x => x.ProductDetails)
                .FirstOrDefaultAsync();

            if (product == null)
                return null;
            ProductVm response = _mapper.Map<ProductVm>(product);


            var details = await _context.ProductDetails
                .Where(x => x.ProductId == id)
                .Include(c => c.ComponentDetails)
                .ToListAsync();


            List<ProductDetailVm> productDetailVms = _mapper.Map<List<ProductDetailVm>>(details);

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

            var poster = pro.ProductImages.Where(x => x.IsPoster == true).FirstOrDefault();
            var imgs = pro.ProductImages.Where(x => x.IsPoster == false).ToList();

            pro.ProductImages.Clear();
            if (request.Poster != null)
            {
                try
                {
                    await _storageService.DeleteFileAsync(poster.Path);
                }
                catch { }

                pro.ProductImages.Add(await AddImage(pro.Id, true, request.Poster));
            }
            else
            {
                pro.ProductImages.Add(poster);
            }

            if (request.Images.Count > 0)
            {
                foreach (var item in request.Images)
                {
                    pro.ProductImages.Add(await AddImage(pro.Id, false, item));
                }
            }
            else
            {
                foreach (var item in imgs)
                {
                    pro.ProductImages.Add(item);
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

        public async Task<bool> UpdateProDetail(int productId, List<ProductDetailRequest> detailVms)
        {
            List<ProductDetailRequest> newRequest = new List<ProductDetailRequest>();
            var p = await _context.Products.Include(x => x.ProductDetails).Where(x => x.Id == productId).FirstOrDefaultAsync();
            foreach (var item in detailVms)
            {
                if (item.Id == 0)
                {
                    newRequest.Add(item);
                }
                else
                {
                    foreach (var i in p.ProductDetails)
                    {
                        if (!detailVms.Any(x => x.Id == i.Id))
                            p.ProductDetails.Remove(i);
                    }

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
                            comp = new ComponentDetail() { ComponentId = cmp.CompId, Name = cmp.Name, Value = cmp.Value };

                        pro.ComponentDetails.Add(comp);
                    }
                }
            }

            if (newRequest.Count != 0)
            {
                await AddProDetail(productId, newRequest);
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

        public async Task<PagedResult<ProductVm>> GetOfUser(string username, ProductPagingRequest request)
        {
            var products = await _context.Products
                .Where(x => x.Status == ProductStatus.Active)
                .Include(x => x.User)
                .Include(x => x.ProductImages)
                .Include(x => x.ProductCategories)
                .Include(x => x.ProductDetails)
                .Where(x => x.User.UserName == username)
                .ToListAsync();

            //Filter
            if (!string.IsNullOrEmpty(request.Keyword))
            {
                products = products.Where(x => x.Name.Contains(request.Keyword)).ToList();
            }

            if (request.CatId != 0)
            {
                products = products.Where(x => x.ProductCategories != null && x.ProductCategories[0].CategoryId == request.CatId).ToList();
            }

            List<ProductVm> data = _mapper.Map<List<ProductVm>>(products);

            var pagedResult = PagingService.Paging<ProductVm>(data, request.PageIndex, request.PageSize);

            return pagedResult;
        }

        public async Task<PagedResult<ProductVm>> GetHideOfUser(string username, ProductPagingRequest request)
        {
            var products = await _context.Products
                .Where(x => x.Status == ProductStatus.Hided)
                .Include(x => x.User)
                .Include(x => x.ProductImages)
                .Include(x => x.ProductCategories)
                .Include(x => x.ProductDetails)
                .Where(x => x.User.UserName == username)
                .ToListAsync();

            //Filter
            if (!string.IsNullOrEmpty(request.Keyword))
            {
                products = products.Where(x => x.Name.Contains(request.Keyword)).ToList();
            }

            if (request.CatId != 0)
            {
                products = products.Where(x => x.ProductCategories != null && x.ProductCategories[0].CategoryId == request.CatId).ToList();
            }
            List<ProductVm> data = _mapper.Map<List<ProductVm>>(products);

            var pagedResult = PagingService.Paging<ProductVm>(data, request.PageIndex, request.PageSize);

            return pagedResult;
        }

        public async Task<bool> HideProduct(string username, int proId)
        {
            var product = await _context.Products
                .Where(x => x.Id == proId)
                .Include(x => x.User)
                .FirstOrDefaultAsync();
            if (product == null || product.User.UserName != username)
                return false;

            product.Status = ProductStatus.Hided;
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

        public async Task<bool> UnHideProduct(string username, int proId)
        {
            var product = await _context.Products
                .Where(x => x.Id == proId)
                .Include(x => x.User)
                .FirstOrDefaultAsync();
            if (product == null || product.User.UserName != username)
                return false;

            product.Status = ProductStatus.Active;
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

        public async Task<bool> DeleteProduct(string username, int proId)
        {
            var product = await _context.Products
                .Where(x => x.Id == proId)
                .Include(x => x.User)
                .FirstOrDefaultAsync();
            if (product == null || product.User.UserName != username)
                return false;

            product.Status = ProductStatus.Deleted;
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
