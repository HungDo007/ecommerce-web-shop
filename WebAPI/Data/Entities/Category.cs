using System;
using System.Collections.Generic;

namespace Data.Entities
{
    public class Category
    {
        public Guid Id { set; get; }
        public string Name { set; get; }
        public bool Status { set; get; }
        public Guid ParentId { set; get; }
        public bool IsShowAtHome { set; get; }
                
        public List<ProductCategory> ProductCategories { get; set; }

    }
}
