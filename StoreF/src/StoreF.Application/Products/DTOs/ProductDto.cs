// src/StoreF.Application/Products/DTOs/ProductDto.cs
namespace StoreF.Application.Products.DTOs;

public record ProductDto(
    int Id,
    Guid SellerId,
    string Title,
    string Description,
    decimal UnitPrice,
    int QuantityAvailable,
    string? ImageUrl
);

public record CreateProductDto(
    string Title,
    string Description,
    decimal UnitPrice,
    int QuantityAvailable,
    string? ImageUrl
);

public record UpdateProductDto(
    string Title,
    string Description,
    decimal UnitPrice,
    int QuantityAvailable,
    string? ImageUrl
);