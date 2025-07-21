using Microsoft.EntityFrameworkCore;
using MimeKit;
using MailKit.Net.Smtp;
using TotsStoreApi;
using TotsStoreApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Load CORS origin from config (default: localhost)
var allowedOrigin = builder.Configuration["FRONTEND_URL"] ?? "https://localhost:5173";

// Enable CORS
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
        policy.WithOrigins(allowedOrigin)
              .AllowAnyHeader()
              .AllowAnyMethod());
});

// Configure PostgreSQL with EF Core
builder.Services.AddDbContext<TotsDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

var app = builder.Build();
app.UseStaticFiles();
app.UseCors();

// ==========================
// GET all in-stock products, with images
// ==========================
app.MapGet("/api/products", async (TotsDbContext db) =>
    await db.Products
        .Include(p => p.Images)
        .Where(p => p.InStock)
        .ToListAsync()
);

// ==========================
// GET single product by ID, with images
// ==========================
app.MapGet("/api/products/{id:int}", async (int id, TotsDbContext db, ILogger<Program> logger) =>
{
    var product = await db.Products
        .Include(p => p.Images)
        .FirstOrDefaultAsync(p => p.Id == id);

    if (product == null)
    {
        logger.LogWarning("Product with ID {ProductId} not found.", id);
        return Results.NotFound("Product not found.");
    }
    return Results.Ok(product);
});

// ==========================
// GET products by category (optional, with images)
// ==========================
app.MapGet("/api/products/category/{category}", async (string category, TotsDbContext db) =>
    await db.Products
        .Include(p => p.Images)
        .Where(p => p.Category == category && p.InStock)
        .ToListAsync()
);

// ==========================
// POST: Receive order & send email
// ==========================
app.MapPost("/api/orders", async (OrderRequest order, TotsDbContext db, ILogger<Program> logger) =>
{
    logger.LogInformation("Received order: {@Order}", order);

    var product = await db.Products.FindAsync(order.ProductId);
    if (product == null)
    {
        logger.LogWarning("Product with ID {ProductId} not found.", order.ProductId);
        return Results.BadRequest("Product not found.");
    }

    var smtpHost = builder.Configuration["Smtp:Host"];
    var smtpPort = int.Parse(builder.Configuration["Smtp:Port"] ?? "587");
    var smtpUser = builder.Configuration["Smtp:User"];
    var smtpPass = builder.Configuration["Smtp:Pass"];
    var recipient = builder.Configuration["OrderReceiveEmail"] ?? smtpUser;

    var message = new MimeMessage();
    message.From.Add(MailboxAddress.Parse(smtpUser));
    message.To.Add(MailboxAddress.Parse(recipient));
    message.Subject = $"New Order for {product.Name}";

    message.Body = new TextPart("plain")
{
    Text = $@"
New Order Received!

Customer Name: {order.CustomerName}
Customer Email: {order.CustomerEmail}
Customer Phone: {order.CustomerPhone}
Customer Address: {order.CustomerAddress}

Product: {product.Name}
Description: {product.Description}
Price: {product.Price}
Quantity: {order.Quantity}

Date: {DateTime.Now}
"
};


    using var smtp = new SmtpClient();
    try
    {
        logger.LogInformation("Connecting to SMTP server...");
        await smtp.ConnectAsync(smtpHost, smtpPort, MailKit.Security.SecureSocketOptions.StartTls);
        await smtp.AuthenticateAsync(smtpUser, smtpPass);
        await smtp.SendAsync(message);
        await smtp.DisconnectAsync(true);
        logger.LogInformation("Order email sent successfully.");
    }
    catch (Exception ex)
    {
        logger.LogError(ex, "Failed to send order email.");
        return Results.Problem("Failed to process your order. Please try again later.");
    }

    return Results.Ok(new
    {
        success = true,
        order = new
        {
            productId = product.Id,
            productName = product.Name,
            productDescription = product.Description,
            productPrice = product.Price,
            quantity = order.Quantity,
            customerName = order.CustomerName,
            customerEmail = order.CustomerEmail,
            date = DateTime.Now
        }
    });
});

app.Run();
