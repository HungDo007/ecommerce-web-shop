using System;
using System.Collections.Generic;

namespace Application.ViewModels.Catalog
{
    public class CategoryVm
    {
        public int Id { set; get; }
        public string Name { set; get; }
        public bool Status { set; get; }
        public List<string> Parent { set; get; } = new List<string>();
        public bool IsShowAtHome { set; get; }
    }
}
