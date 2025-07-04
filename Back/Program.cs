using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to DI container
builder.Services.AddDbContext<TotsDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
    });
});

var app = builder.Build();

app.UseCors();

// GET all products
app.MapGet("/api/products", async (TotsDbContext db) =>
    await db.Products.Where(p => p.InStock).ToListAsync()
);

// GET product by id
app.MapGet("/api/products/{id}", async (int id, TotsDbContext db) =>
    await db.Products.FindAsync(id) is Product product
        ? Results.Ok(product)
        : Results.NotFound()
);

// POST create new order
app.MapPost("/api/orders", async (Order order, TotsDbContext db) =>
{
    // Optionally, you could validate product existence, quantity, etc.
    order.CreatedAt = DateTime.UtcNow;
    db.Orders.Add(order);
    await db.SaveChangesAsync();
    return Results.Created($"/api/orders/{order.Id}", order);
});

// GET all orders (admin)
app.MapGet("/api/orders", async (TotsDbContext db) =>
    await db.Orders.Include(o => o.Product).ToListAsync()
);

app.Run();
