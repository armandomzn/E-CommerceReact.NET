namespace Core.Entities
{
    public class Product
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public long Price { get; set; }
        public string PictureUrl { get; set; }
        public string Brand { get; set; }
        public string Type { get; set; }
        public int QuantityInStock { get; set; }
    }

    // public class Product
    // {
    //     public Guid Id { get; set; }
    //     public string Name { get; set; }
    //     public string Description { get; set; }
    //     public decimal Price { get; set; }
    //     public string PictureUrl { get; set; }
    //     public ProductBrand ProduBrand { get; set; }
    //     public Guid ProductBrandId { get; set; }
    //     public ProductType ProductType { get; set; }
    //     public Guid ProductTypeId { get; set; }
    //     public int QuantityInStock { get; set; }
    // }
}