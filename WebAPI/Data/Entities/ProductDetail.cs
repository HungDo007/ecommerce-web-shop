using System;
using System.Collections.Generic;

namespace Data.Entities
{
    public class ProductDetail
    {
        public int Id { get; set; }
        public int ProductId { set; get; }
        public int Stock { get; set; }
        public decimal Price { get; set; }        

        public Product Product { get; set; }
        public List<ComponentDetail> ComponentDetails { get; set; }
    }
}
