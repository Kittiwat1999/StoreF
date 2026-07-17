// src/StoreF.Domain/Entities/Product.cs
namespace StoreF.Domain.Entities;

public class Product
{
    public Guid Id { get; set; }
    public Guid SellerId { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public decimal UnitPrice { get; set; }
    public int QuantityAvailable { get; set; }
    public string? ImageUrl { get; set; }
    public string? ThumbnailUrl { get; set; }
    public bool Available { get; set; } = true;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

    public void DecreaseStock(int amount)
    {
        if (amount <= 0)
            throw new ArgumentException("Amount must be positive.");
        if (amount > QuantityAvailable)
            throw new InvalidOperationException("Not enough stock available.");

        QuantityAvailable -= amount;
        UpdatedAt = DateTime.UtcNow;
    }
}