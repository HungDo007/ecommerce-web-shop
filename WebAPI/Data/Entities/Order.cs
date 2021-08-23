using System;
using System.Collections.Generic;

namespace Data.Entities
{
    public class Order
    {
        public Guid Id { set; get; }
        public DateTime OrderDate { set; get; }
        public Guid UserId { set; get; }
        public string ShipAddress { set; get; }
        public string ShipEmail { set; get; }
        public string ShipPhonenumber { set; get; }
        
        public AppUser User { get; set; }
        public TransactionOrder TransactionOrder { get; set; }
        public List<OrderDetail> OrderDetails { get; set; }

    }
}
