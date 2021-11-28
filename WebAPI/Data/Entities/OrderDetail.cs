namespace Data.Entities
{
    public class OrderDetail
    {
        public int OrderId { get; set; }
        public int ProductDetailId { get; set; }
        public int Quantity { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public ProductDetail ProductDetail { get; set; }
        public Order Order { get; set; }
    }
}
