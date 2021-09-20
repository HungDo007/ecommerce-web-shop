using System;
using System.Collections.Generic;

namespace Data.Entities
{   
    public class Component
    {
        public int ID { set; get; }
        public string Name { get; set; }
        public string Value { get; set; }

        public List<ProductDetail> ProductDetails { get; set; }
    }
}
