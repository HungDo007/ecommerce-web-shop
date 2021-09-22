using Application.ViewModels.Catalog;
using AutoMapper;
using Data.EF;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.Catalog
{
    public class ProductService : IProductService
    {
        private readonly IMapper _mapper;
        private readonly EShopContext _context;

        public ProductService(IMapper mapper, EShopContext context)
        {
            _mapper = mapper;
            _context = context;
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
    }
}
