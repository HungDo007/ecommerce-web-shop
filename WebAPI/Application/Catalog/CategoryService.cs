using Application.Common;
using Application.ViewModels.Catalog;
using AutoMapper;
using Data.EF;
using Data.Entities;
using Microsoft.EntityFrameworkCore;
using System;
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

        public async Task<bool> AddCat(CategoryRequest request)
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
                try
                {
                    category.Image = await _storageService.SaveFile(SystemConstants.FolderCategory, request.Image);
                }
                catch
                {
                    category.Image = null;
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

        public async Task<List<CompVm>> AllCompInCat(int catId)
        {
            var cat = await _context.Categories.Include(x => x.CatParent).Where(x => x.Id == catId).FirstOrDefaultAsync();
            if (cat == null)
                return null;

            List<Component> components = await _context.Components
                .Include(x => x.Categories)
                .Where(x => x.Categories.Contains(cat))
                .ToListAsync();

            if (components.Count == 0 || components == null)
            {
                foreach (var item in cat.CatParent)
                {
                    components.AddRange(await _context.Components
                        .Include(x => x.Categories)
                        .Where(x => x.Categories.Contains(item))
                        .ToListAsync());
                }
            }

            return _mapper.Map<List<CompVm>>(components.Distinct());
        }

        public async Task<List<CompAdminVm>> AllCompInCatAdmin(int catId)
        {
            var coms = await AllCompInCat(catId);

            var cats = await _context.Components.Where(x => x.Status == true).ToListAsync();
            var response = _mapper.Map<List<CompAdminVm>>(cats);
            foreach (var item in response)
            {
                item.IsExists = coms.Any(x => x.ID == item.ID);
            }
            return response;
        }

        public async Task<bool> AssignCompToCat(AssignCompToCatRequest request)
        {
            var cat = await _context.Categories
                .Include(x => x.Components)
                .Where(x => x.Id == request.CatId)
                .FirstOrDefaultAsync();

            if (cat == null)
                return false;

            cat.Components.Clear();
            foreach (var item in request.Comps)
            {
                var comp = await _context.Components.FindAsync(item);
                cat.Components.Add(comp);
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
            var cat = await _context.Categories.Where(x => x.Status == true).Include(x => x.CatParent).ToListAsync();
            return _mapper.Map<List<CategoryVm>>(cat);
        }

        public async Task<bool> UpdateCat(CategoryRequest request)
        {
            if (await _context.Categories.AnyAsync(x => x.Id != request.Id && x.Name == request.Name))
                return false;

            var cat = await _context.Categories.Where(x => x.Id == request.Id).Include(x => x.CatParent).FirstOrDefaultAsync();

            if (!string.IsNullOrEmpty(request.Name))
            {
                cat.Name = request.Name;
            }

            if (request.Parent.Count != 0)
            {
                cat.CatParent.Clear();
                foreach (var item in request.Parent)
                {
                    var parent = await _context.Categories.FindAsync(int.Parse(item));
                    cat.CatParent.Add(parent);
                }
            }
            cat.IsShowAtHome = request.IsShowAtHome;
            if (request.Image != null)
            {
                try
                {
                    await _storageService.DeleteFileAsync(cat.Image);
                    cat.Image = await _storageService.SaveFile(SystemConstants.FolderCategory, request.Image);
                }
                catch
                {
                    cat.Image = null;
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
