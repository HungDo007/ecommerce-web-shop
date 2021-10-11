using System;
using System.Collections.Generic;

namespace Data.Entities
{
    public class Product
    {
        public int Id { get; set; }
        public Guid UserId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public bool Status { get; set; }
        public int ViewCount { get; set; }
        public float Rate { get; set; }
        public DateTime DateCreated { set; get; }

        public AppUser User { get; set; }
        public List<ProductCategory> ProductCategories { get; set; } = new List<ProductCategory>();
        public List<ProductDetail> ProductDetails { get; set; } = new List<ProductDetail>();
        public List<ProductImage> ProductImages { get; set; } = new List<ProductImage>();
        public List<Cart> Carts { get; set; } = new List<Cart>();
        public List<OrderDetail> OrderDetails { get; set; } = new List<OrderDetail>();
    }
}
