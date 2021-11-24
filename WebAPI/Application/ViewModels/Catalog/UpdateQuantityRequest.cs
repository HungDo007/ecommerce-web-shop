namespace Application.ViewModels.Catalog
{
    public class UpdateQuantityRequest
    {
        public int CartId { get; set; }
        public bool IsIncrease { get; set; }
    }
}
