using Application.ViewModels.Catalog;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Application.Catalog
{
    public interface IComponentService
    {
        Task<int> Add(ComponentRequest request);
        Task<bool> Update(ComponentRequest request);
        Task<List<CompVm>> GetAllComponent();
        Task<bool> Delete(int id);
    }
}
