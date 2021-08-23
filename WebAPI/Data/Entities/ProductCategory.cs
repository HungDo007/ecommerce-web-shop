using System;

namespace Data.Entities
{
    public class ProductCategory
    {
        public Guid ProductId { get; set; }
        public Guid CategoryId { set; get; }

        public Product Product { get; set; }
        public Category Category { get; set; }
    }
}
