namespace Application.ViewModels.Common
{
    public class PagingRequestBase
    {
        public string Keyword { set; get; }
        public int PageIndex { get; set; } = 1;
        public int PageSize { get; set; } = 1;
    }
}
