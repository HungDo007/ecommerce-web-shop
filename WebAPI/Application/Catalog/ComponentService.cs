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
    public class ComponentService : IComponentService
    {
        private readonly EShopContext _context;
        private readonly IMapper _mapper;

        public ComponentService(EShopContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<int> Add(ComponentRequest request)
        {
            if (await _context.Components.AnyAsync(x => x.Name == request.Name))
                return 0;
            Component component = _mapper.Map<Component>(request);

            try
            {
                _context.Components.Add(component);
                await _context.SaveChangesAsync();
                return component.ID;
            }
            catch
            {
                return 0;
            }
        }

        public async Task<bool> Delete(int id)
        {
            var comp = await _context.Components.FindAsync(id);
            try
            {
                comp.Status = false;
                await _context.SaveChangesAsync();
                return true;
            }
            catch
            {
                return false;
            }
        }

        public async Task<List<CompVm>> GetAllComponent()
        {
            return _mapper.Map<List<CompVm>>(await _context.Components.Where(x => x.Status == true).ToListAsync());
        }

        public async Task<bool> Update(ComponentRequest request)
        {
            if (_context.Components.Any(x => x.ID != request.Id && x.Name == request.Name))
            {
                return false;
            }

            var comp = await _context.Components.FindAsync(request.Id);

            comp.Name = request.Name;

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
