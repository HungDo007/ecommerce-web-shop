using Application.ViewModels.Common;

namespace Application.ViewModels.Catalog
{
    public class ProductPagingRequest : PagingRequestBase
    {
        public int CatId { get; set; } = 0;
    }
}
