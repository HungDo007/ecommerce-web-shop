using System;
using System.Collections.Generic;

namespace Application.ViewModels.Catalog
{
    public class CartVm
    {
        public string ShopName { get; set; }
        public string Seller { get; set; }
        public int CartId { get; set; }
        public int ProductId { get; set; }
        public int ProductDetailId { get; set; }
        public string Name { get; set; }
        public string Details { get; set; }
        public string ProductImg { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }
        public int StockOfDetail { get; set; }

        public override string ToString()
        {
            return $"{Name} {Details}";
        }
    }
}
