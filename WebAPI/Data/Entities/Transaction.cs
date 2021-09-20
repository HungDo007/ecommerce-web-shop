using System;
using System.Collections.Generic;

namespace Data.Entities
{
    public class Transaction
    {
        public int Id { get; set; }
        public string Provider { get; set; }
        public decimal Fee { set; get; }

        public List<TransactionOrder> TransactionOrders { get; set; }
    }
}
