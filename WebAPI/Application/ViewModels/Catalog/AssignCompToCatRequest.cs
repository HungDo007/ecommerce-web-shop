using System.Collections.Generic;

namespace Application.ViewModels.Catalog
{
    public class AssignCompToCatRequest
    {
        public int CatId { get; set; }
        public List<int> Comps { get; set; }
    }
}
