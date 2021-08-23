using Data.Enum;
using System;

namespace Data.Entities
{
    public class TransactionOrder
    {
        public Guid OrderId { get; set; }
        public Guid TransactionId { set; get; }
        public OrderStatus Status { set; get; }
        public DateTime ExpectedDate { get; set; }

        public Order Order { get; set; }
        public Transaction Transaction { get; set; }
    }
}
