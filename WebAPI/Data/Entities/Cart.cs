using System;
using System.Collections.Generic;

namespace Data.Entities
{
    public class Cart
    {
        public int Id { set; get; }
        public Guid UserId { get; set; }
        public int ProductDetailId { set; get; }
        public int Quantity { set; get; }
        public decimal Price { set; get; }
        public DateTime DateCreated { get; set; }

        public AppUser AppUser { get; set; }
        public ProductDetail ProductDetail { get; set; }
    }
}
