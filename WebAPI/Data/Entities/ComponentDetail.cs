using System;

namespace Data.Entities
{
    public class ComponentDetail
    {
        public Guid DetailId { get; set; }
        public Guid ComponentId { get; set; }

        public ProductDetail ProductDetail { get; set; }
        public Component Component { get; set; }
    }
}
