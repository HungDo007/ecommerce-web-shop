using System.Collections.Generic;

namespace Data.Entities
{
    public class ComponentDetail
    {
        public int Id { get; set; }
        public int ComponentId { get; set; }
        public string Value { get; set; }


        public Component Component { get; set; }
        public List<ProductDetail> ProductDetails { get; set; }
    }
}
