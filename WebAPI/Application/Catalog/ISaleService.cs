using Application.ViewModels.Catalog;
using Application.ViewModels.Common;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Application.Catalog
{
    public interface ISaleService
    {
        Task<PagedResult<CartVm>> GetCart(string username, PagingRequestBase request);
        Task<bool> AddToCart(string username, AddToCartRequest request);
        Task<bool> UpdateQuantity(UpdateQuantityRequest request);
        Task<bool> RemoveFromCart(List<int> cartIds);

        Task<bool> OrderProduct(string username, OrderRequest request);

        Task<bool> CancelOrder(int OrderId);

        Task<PagedResult<OrderVm>> GetOrder(string username, PagingRequestBase request);
    }
}
