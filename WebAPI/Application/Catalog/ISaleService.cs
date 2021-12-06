using Application.ViewModels.Catalog;
using Application.ViewModels.Common;
using Data.Entities;
using Data.Enum;
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

        Task<List<OrderResponse>> OrderProduct(string username, List<OrderRequest> requests);

        Task<bool> CancelOrder(int OrderId);
        Task SaveToken(string token, int orderId);

        Task<PagedResult<OrderVm>> GetOrder(string username, PagingRequestBase request);

        Task<List<OrderDetailVm>> GetOrderDetail(int orderId);

        Task Checkout(CheckoutStatusRequest request);

        Task<PagedResult<OrderVm>> GetOrderOfSeller(string username, PagingRequestBase request, OrderStatus orderStatus);

        Task ConfirmedOrder(List<int> orderIds);
    }
}
