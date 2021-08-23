using System;
using System.Collections.Generic;

namespace Data.Entities
{
    public class ProductDetail
    {
        public Guid Id { get; set; }
        public Guid ProductId { set; get; }
        public int Stock { get; set; }
        public decimal Price { get; set; }
        public string Description { get; set; }

        public Product Product { get; set; }
        public List<ComponentDetail> ComponentDetails { get; set; }
    }
}
