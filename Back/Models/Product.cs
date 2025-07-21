using System.Collections.Generic;
using TotsStoreApi.Models;

namespace TotsStoreApi.Models
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string Description { get; set; } = null!;
        public decimal Price { get; set; }
        public string ImageUrl { get; set; } = null!;
        public bool InStock { get; set; }
        public string? Category { get; set; }
        public string? Color { get; set; }

        public List<ProductImage> Images { get; set; } = new();
    }
}
