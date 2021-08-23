using System;

namespace Data.Entities
{
    public class ProductImage
    {
        public Guid Id { get; set; }
        public Guid ProductId { set; get; }
        public string Path { set; get; }

        public Product Product { get; set; }
    }
}
