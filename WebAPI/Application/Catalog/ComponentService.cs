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

        public async Task<bool> Add(ComponentRequest request)
        {
            var comp = await _context.Components.Where(x => x.Name == request.Name).FirstOrDefaultAsync();

            if (comp != null)
            {
                if (comp.Status == true)
                {
                    return false;
                }
                else
                {
                    comp.Status = true;
                }
            }
            else
            {
                Component component = _mapper.Map<Component>(request);
                _context.Components.Add(component);
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
