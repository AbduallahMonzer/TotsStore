using System.Text.Json.Serialization;

namespace TotsStoreApi.Models
{
    public class ProductImage
    {
        public int Id { get; set; }
        public string ImageUrl { get; set; } = null!;
        public int ProductId { get; set; }

        [JsonIgnore] // Prevent self-reference loops in JSON output
        public Product? Product { get; set; }
    }
}
