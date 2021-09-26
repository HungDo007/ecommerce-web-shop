using Microsoft.AspNetCore.Http;
using System.Collections.Generic;

namespace Application.ViewModels.Catalog
{
    public class AddCategoryRequest
    {
        public int Id { set; get; }
        public string Name { set; get; }
        public bool Status { set; get; }
        public IFormFile Image { get; set; }
        public List<string> Parent { set; get; } = new List<string>();
        public bool IsShowAtHome { set; get; }
    }
}
