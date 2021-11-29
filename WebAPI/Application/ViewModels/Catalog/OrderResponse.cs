using System.Collections.Generic;

namespace Application.ViewModels.Catalog
{
    public class OrderResponse
    {
        public int OrderId { get; set; }
        public List<CartVm> CartVms { get; set; }
    }
}
