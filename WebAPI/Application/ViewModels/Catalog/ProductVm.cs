using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.ViewModels.Catalog
{
    public class ProductVm
    {
        public int Id { get; set; }
        public string Seller { get; set; }
        public string Name { get; set; }        
        public int ViewCount { get; set; }
        public float Rate { get; set; }
        public DateTime DateCreated { set; get; }
        public string Image { get; set; }
    }
}
