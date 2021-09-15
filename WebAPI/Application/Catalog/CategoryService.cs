using Application.ViewModels.Catalog;
using AutoMapper;
using Data.EF;
using Data.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Catalog
{
    public class CategoryService : ICategoryService
    {
        private readonly EShopContext _context;
        private readonly IMapper _mapper;

        public CategoryService(EShopContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<bool> AddCat(CategoryVm request)
        {
            var check = await _context.Categories.AnyAsync(x => x.Name == request.Name);
            if (check)
                return false;

            Category category = _mapper.Map<Category>(request);
            
            if (request.Parent.Count != 0)
            {
                foreach (var item in request.Parent)
                {
                    var parent = await _context.Categories.FindAsync(int.Parse(item));
                    category.CatParent.Add(parent);
                }
            }
            try
            {
                _context.Categories.Add(category);
                await _context.SaveChangesAsync();
                return true;
            }
            catch
            {
                return false;
            }
        }

        public async Task<bool> DeleteCat(int id)
        {
            var cat = await _context.Categories.FindAsync(id);
            cat.Status = false;

            //var supCat = await _context.Categories.Where(x => x.ParentId == id).ToListAsync();
            //foreach (var item in supCat)
            //{
            //    item.ParentId = 0;
            //}

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

        public async Task<List<CategoryVm>> GetAll()
        {
            var cat = await _context.Categories.Include(x=>x.CatParent).ToListAsync();
            return _mapper.Map<List<CategoryVm>>(cat);
        }

        public async Task<bool> UpdateCat(CategoryVm request)
        {           
            if (await _context.Categories.AnyAsync(x => x.Id != request.Id && x.Name == request.Name))
                return false;

            var cat = await _context.Categories.Where(x => x.Id == request.Id).Include(x=>x.CatParent).FirstOrDefaultAsync();

            cat.Name = request.Name;

            //cat.ParentId = request.ParentId;
            cat.CatParent.Clear();
            if (request.Parent.Count != 0)
            {
                foreach (var item in request.Parent)
                {
                    var parent = await _context.Categories.FindAsync(int.Parse(item));
                    cat.CatParent.Add(parent);
                }
            }


            cat.IsShowAtHome = request.IsShowAtHome;

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
