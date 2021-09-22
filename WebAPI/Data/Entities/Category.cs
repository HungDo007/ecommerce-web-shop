using System.Collections.Generic;

namespace Data.Entities
{
    public class Category
    {
        public int Id { set; get; }
        public string Name { set; get; }
        public bool Status { set; get; }        
        public bool IsShowAtHome { set; get; }

        public List<ProductCategory> ProductCategories { get; set; } = new List<ProductCategory>();
        public List<Category> CatParent { set; get; } = new List<Category>();
        public List<Category> CatChildren { set; get; } = new List<Category>();
        public List<Component> Components { get; set; }

        public override string ToString()
        {
            return Id.ToString();
        }
    }
}
