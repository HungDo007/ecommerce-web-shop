using System;

namespace Data.Entities
{
    public class ProductCategory
    {
        public int ProductId { get; set; }
        public int CategoryId { set; get; }

        public Product Product { get; set; }
        public Category Category { get; set; }
    }
}
