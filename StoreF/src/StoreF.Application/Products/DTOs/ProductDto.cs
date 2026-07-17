// src/StoreF.Application/Products/DTOs/ProductDto.cs
namespace StoreF.Application.Products.DTOs;

public record ProductDto(
    Guid Id,
    Guid SellerId,
    string Title,
    string Description,
    decimal UnitPrice,
    int QuantityAvailable,
    string? ImageUrl,
    string? ThumbNailUrl
);

public record CreateProductDto(
    string Title,
    string Description,
    decimal UnitPrice,
    int QuantityAvailable,
    string? ImageUrl,
    bool Available
);

public record UpdateProductDto(
    string Title,
    string Description,
    decimal UnitPrice,
    int QuantityAvailable,
    string? ImageUrl,
    bool Available
);