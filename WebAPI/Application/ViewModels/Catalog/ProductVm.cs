using Data.Enum;
using System;
using System.Collections.Generic;

namespace Application.ViewModels.Catalog
{
    public class ProductVm
    {
        public int Id { get; set; }
        public string Seller { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int Category { get; set; }
        public int ViewCount { get; set; }
        public float Rate { get; set; }
        public ProductStatus Status { get; set; }
        public decimal Price { get; set; }
        public DateTime DateCreated { set; get; }
        public string Poster { get; set; }
        public List<string> Images { get; set; } = new List<string>();
        public List<ProductDetailVm> ProductDetails { set; get; } = new List<ProductDetailVm>();
    }
}
