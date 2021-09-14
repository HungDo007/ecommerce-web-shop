using Application.ViewModels.Common;

namespace Application.ViewModels.System
{
    public class UserPagingRequest : PagingRequestBase
    {
        public string Keyword { set; get; }
    }
}
