using Microsoft.EntityFrameworkCore;
using TotsStoreApi.Models;

namespace TotsStoreApi
{
    public class TotsDbContext : DbContext
    {
        public TotsDbContext(DbContextOptions<TotsDbContext> options) : base(options) { }

        public DbSet<Product> Products { get; set; }
        public DbSet<ProductImage> ProductImages { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Product>(entity =>
            {
                entity.ToTable("products");
                entity.Property(p => p.Id).HasColumnName("id");
                entity.Property(p => p.Name).HasColumnName("name");
                entity.Property(p => p.Description).HasColumnName("description");
                entity.Property(p => p.Price).HasColumnName("price");
                entity.Property(p => p.ImageUrl).HasColumnName("image_url");
                entity.Property(p => p.InStock).HasColumnName("in_stock");
                entity.Property(p => p.Category).HasColumnName("category");
                entity.Property(p => p.Color).HasColumnName("color"); 
            });

            modelBuilder.Entity<ProductImage>(entity =>
            {
                entity.ToTable("product_images");
                entity.HasKey(p => p.Id);
                entity.Property(p => p.ImageUrl).HasColumnName("image_url");
                entity.Property(p => p.ProductId).HasColumnName("product_id");
                entity.Property(p => p.Id).HasColumnName("id");

                entity.HasOne(p => p.Product)
                      .WithMany(p => p.Images)
                      .HasForeignKey(p => p.ProductId)
                      .OnDelete(DeleteBehavior.Cascade);
            });
        }
    }
}
