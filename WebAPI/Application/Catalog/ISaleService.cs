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

        /// <summary>
        /// Get order of user
        /// </summary>
        /// <param name="username"></param>
        /// <param name="request"></param>
        /// <returns></returns>
        Task<PagedResult<OrderVm>> GetOrder(string username, PagingRequestBase request, OrderStatus orderStatus);

        Task<List<OrderDetailVm>> GetOrderDetail(int orderId);

        Task Checkout(CheckoutStatusRequest request);


        /// <summary>
        /// Get order of seller
        /// </summary>
        /// <param name="username"></param>
        /// <param name="request"></param>
        /// <param name="orderStatus"></param>
        /// <returns></returns>
        Task<PagedResult<OrderVm>> GetOrderOfSeller(string username, PagingRequestBase request, OrderStatus orderStatus);


        Task<Response> OrderStateChange(List<int> orderIds, OrderStatus oldStatus);
    }
}
