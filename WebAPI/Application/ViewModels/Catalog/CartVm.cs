namespace Application.ViewModels.Catalog
{
    public class CartVm
    {
        public int CartId { get; set; }
        public int ProductId { get; set; }
        public string Name { get; set; }
        public string ProductImg { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }
        public int StockOfDetail { get; set; }

    }
}
