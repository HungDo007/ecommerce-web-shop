namespace Application.ViewModels.Catalog
{
    public class ComponentDetailVm
    {
        public int Id { get; set; }
        public int CompId { get; set; }
        public string Name { get; set; }
        public string Value { set; get; }

        public override string ToString()
        {
            return $"{Name}: {Value}";
        }
    }
}
