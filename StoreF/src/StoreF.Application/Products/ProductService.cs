// src/StoreF.Application/Products/ProductService.cs
using StoreF.Application.Common.Interfaces;
using StoreF.Application.Products.DTOs;
using StoreF.Domain.Entities;

namespace StoreF.Application.Products;

public class ProductService
{
    private readonly IProductRepository _repository;

    public ProductService(IProductRepository repository)
    {
        _repository = repository;
    }

    public async Task<List<ProductDto>> GetAllAsync(CancellationToken ct = default)
    {
        var products = await _repository.GetAllAsync(ct);
        return products.Select(ToDto).ToList();
    }

    public async Task<ProductDto?> GetByIdAsync(int id, CancellationToken ct = default)
    {
        var product = await _repository.GetByIdAsync(id, ct);
        return product is null ? null : ToDto(product);
    }

    public async Task<ProductDto> CreateAsync(Guid sellerId, CreateProductDto dto, CancellationToken ct = default)
    {
        var product = new Product
        {
            SellerId = sellerId,
            Title = dto.Title,
            Description = dto.Description,
            UnitPrice = dto.UnitPrice,
            QuantityAvailable = dto.QuantityAvailable,
            ImageUrl = dto.ImageUrl
        };

        await _repository.AddAsync(product, ct);
        await _repository.SaveChangesAsync(ct);
        return ToDto(product);
    }

    public async Task<ProductDto?> UpdateAsync(int id, Guid sellerId, UpdateProductDto dto, CancellationToken ct = default)
    {
        var product = await _repository.GetByIdAsync(id, ct);
        if (product is null) return null;
        if (product.SellerId != sellerId)
            throw new UnauthorizedAccessException("You do not own this product.");

        product.Title = dto.Title;
        product.Description = dto.Description;
        product.UnitPrice = dto.UnitPrice;
        product.QuantityAvailable = dto.QuantityAvailable;
        product.ImageUrl = dto.ImageUrl;
        product.UpdatedAt = DateTime.UtcNow;

        _repository.Update(product);
        await _repository.SaveChangesAsync(ct);
        return ToDto(product);
    }

    public async Task<bool> DeleteAsync(int id, Guid sellerId, CancellationToken ct = default)
    {
        var product = await _repository.GetByIdAsync(id, ct);
        if (product is null) return false;
        if (product.SellerId != sellerId)
            throw new UnauthorizedAccessException("You do not own this product.");

        _repository.Remove(product);
        await _repository.SaveChangesAsync(ct);
        return true;
    }

    private static ProductDto ToDto(Product p) => new(
        p.Id, p.SellerId, p.Title, p.Description, p.UnitPrice, p.QuantityAvailable, p.ImageUrl
    );
}