using Application.ViewModels.Catalog;
using AutoMapper;
using Data.EF;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
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
            var data = await _context.Products.Where(x=>x.Status==true).Include(x => x.User).Include(x => x.ProductImages).ToListAsync();

            return _mapper.Map<List<ProductVm>>(data);
        }
    }
}
