using System.Collections.Generic;

namespace Application.ViewModels.Catalog
{
    public class ProductDetailRequest
    {
        public int Id { get; set; }
        public int Stock { get; set; }
        public decimal Price { get; set; }
        public List<ComponentDetailRequest> ComponentDetails { get; set; } = new List<ComponentDetailRequest>();
    }
}
