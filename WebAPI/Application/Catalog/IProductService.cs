using Application.ViewModels.Catalog;
using Application.ViewModels.Common;
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
        Task<PagedResult<ProductVm>> GetAll(ProductPagingRequest request);

        Task<PagedResult<ProductVm>> GetAdminAll(ProductPagingRequest request);

        /// <summary>
        /// Get product detail with specified id.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Task<ProductVm> GetProductDetail(int id);

        Task<PagedResult<ProductVm>> GetOfUser(string username, ProductPagingRequest request);

        Task<PagedResult<ProductVm>> GetHideOfUser(string username, ProductPagingRequest request);

        Task<PagedResult<ProductVm>> GetLocked(ProductPagingRequest request);

        Task AddViewCount(int proId);

        Task<int> Add(ProductRequest request);

        Task<bool> AddProDetail(int proId, List<ProductDetailRequest> detailVms);

        Task<bool> Update(ProductRequest request);

        Task<bool> UpdateProDetail(List<ProductDetailRequest> detailVms);

        Task<bool> HideProduct(string username, int proId);
        Task<bool> DeleteProduct(string username, int proId);
        Task<bool> UnHideProduct(string username, int proId);
    }
}
