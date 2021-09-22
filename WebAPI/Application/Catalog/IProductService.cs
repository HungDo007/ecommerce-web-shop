using Application.ViewModels.Catalog;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Application.Catalog
{
    public interface IProductService
    {
        /// <summary>
        /// Get all product.
        /// </summary>
        /// <returns></returns>
        Task<List<ProductVm>> GetAll();


        /// <summary>
        /// Get product detail with specified id.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Task<ProductVm> GetProductDetail(int id);
    }
}
