using System;
using System.Collections.Generic;

namespace Data.Entities
{
    public class Component
    {
        public Guid ID { set; get; }
        public string Name { get; set; }
        public string Value { get; set; }

        public List<ComponentDetail> ComponentDetails { get; set; }
    }
}
