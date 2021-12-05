using System.Collections.Generic;

namespace Application.ViewModels.Catalog
{
    public class OrderRequest
    {
        public string Seller { get; set; }
        public string ShipAddress { set; get; }
        public string ShipName { set; get; }
        public string ShipPhonenumber { set; get; }
        public List<int> OrderItemId { set; get; }
    }
}
