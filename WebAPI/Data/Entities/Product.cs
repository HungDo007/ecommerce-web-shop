using System;
using System.Collections.Generic;

namespace Data.Entities
{
    public class Product
    {
        public int Id { get; set; }
        public Guid UserId { get; set; }
        public string Name { get; set; }
        public bool Status { get; set; }
        public int ViewCount { get; set; }
        public float Rate { get; set; }
        public DateTime DateCreated { set; get; }

        public AppUser User { get; set; }
        public List<ProductCategory> ProductCategories { get; set; }
        public List<ProductDetail> ProductDetails { get; set; }
        public List<ProductImage> ProductImages { get; set; }
        public List<Cart> Carts { get; set; }
        public List<OrderDetail> OrderDetails { get; set; }
    }
}
