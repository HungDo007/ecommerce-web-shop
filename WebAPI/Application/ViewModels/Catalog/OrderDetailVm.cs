namespace Application.ViewModels.Catalog
{
    public class OrderDetailVm
    {
        public int ProductDetailId { get; set; }
        public string Name { get; set; }
        public string Details { get; set; }
        public string ProductImg { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }
    }
}
