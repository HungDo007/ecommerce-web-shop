using Data.Enum;
using System;

namespace Data.Entities
{
    public class TransactionOrder
    {
        public int OrderId { get; set; }
        public int TransactionId { set; get; }
        public OrderStatus Status { set; get; }
        public DateTime ExpectedDate { get; set; }

        public Order Order { get; set; }
        public Transaction Transaction { get; set; }
    }
}
