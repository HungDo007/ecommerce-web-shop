using Application.Common;
using Application.ViewModels.Catalog;
using AutoMapper;
using Data.EF;
using Data.Entities;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.Catalog
{
    public class CategoryService : ICategoryService
    {
        private readonly EShopContext _context;
        private readonly IMapper _mapper;
        private readonly IStorageService _storageService;

        public CategoryService(EShopContext context, IMapper mapper, IStorageService storageService)
        {
            _context = context;
            _mapper = mapper;
            _storageService = storageService;
        }

        public async Task<bool> AddCat(AddCategoryRequest request)
        {
            var check = await _context.Categories.AnyAsync(x => x.Name == request.Name);
            if (check)
                return false;

            Category category = _mapper.Map<Category>(request);
            
            if (request.Parent.Count != 0)
            {
                foreach (var item in request.Parent)
                {
                    if (item != null)
                    {
                        var parent = await _context.Categories.FindAsync(int.Parse(item));
                        category.CatParent.Add(parent);
                    }
                }
            }

            if (request.Image != null)
            {
                category.Image = await _storageService.SaveFile(true, request.Image);
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
