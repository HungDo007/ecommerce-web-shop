using System;
using System.Collections.Generic;

namespace Data.Entities
{
    public class Component
    {
        public int ID { set; get; }
        public string Name { get; set; }
        public bool Status { set; get; }


        public List<ComponentDetail> ComponentDetails { get; set; }
        public List<Category> Categories { set; get; }

        public override string ToString()
        {
            return ID.ToString();
        }
    }
}
