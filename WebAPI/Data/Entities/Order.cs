using System;
using System.Collections.Generic;

namespace Data.Entities
{
    public class Order
    {
        public int Id { set; get; }
        public DateTime OrderDate { set; get; }
        public string Seller { get; set; }
        public string ShopName { get; set; }
        public Guid UserId { set; get; }
        public string ShipAddress { set; get; }
        public string ShipName { set; get; }
        public string ShipPhonenumber { set; get; }
        public bool Paid { get; set; }

        public AppUser User { get; set; }
        public TransactionOrder TransactionOrder { get; set; }
        public List<OrderDetail> OrderDetails { get; set; }

    }
}
