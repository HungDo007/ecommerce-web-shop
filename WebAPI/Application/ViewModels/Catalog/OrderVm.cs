using Data.Enum;
using System;

namespace Application.ViewModels.Catalog
{
    public class OrderVm
    {
        public int Id { get; set; }
        public string ShopName { get; set; }
        public string Seller { get; set; }
        public string Name { get; set; }
        public int Quantity { get; set; }
        public decimal SumPrice { get; set; }
        public string ShipAddress { set; get; }
        public string ShipName { set; get; }
        public string ShipPhonenumber { set; get; }
        public OrderStatus OrderStatus { set; get; }
        public bool Paid { get; set; }
    }
}

