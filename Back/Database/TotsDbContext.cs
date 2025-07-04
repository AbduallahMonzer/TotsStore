using Microsoft.EntityFrameworkCore;

public class TotsDbContext : DbContext
{
    public TotsDbContext(DbContextOptions<TotsDbContext> options) : base(options) { }

    public DbSet<Product> Products { get; set; }
    public DbSet<Order> Orders { get; set; }
}
