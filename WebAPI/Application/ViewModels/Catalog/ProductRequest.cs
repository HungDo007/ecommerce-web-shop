using Microsoft.AspNetCore.Http;
using System.Collections.Generic;

namespace Application.ViewModels.Catalog
{
    public class ProductRequest
    {
        public string Seller { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public List<int> Categories { get; set; }
        public IFormFile Poster { get; set; }
        public List<IFormFile> Images { get; set; }
        public List<ProductDetailRequest> Details { get; set; }
    }
}
