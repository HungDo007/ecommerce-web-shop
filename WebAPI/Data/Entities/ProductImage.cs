namespace Data.Entities
{
    public class ProductImage
    {
        public int Id { get; set; }
        public int ProductId { set; get; }
        public string Path { set; get; }
        public bool IsPoster { get; set; }

        public Product Product { get; set; }

        public override string ToString()
        {
            return Path;
        }
    }
}
