// src/StoreF.Application/Products/ProductService.cs
using StoreF.Application.Common.Interfaces;
using StoreF.Application.Products.DTOs;
using StoreF.Domain.Entities;
using StoreF.Application.Common.Exceptions;
namespace StoreF.Application.Products;

public class ProductService
{
    private readonly IProductRepository _repository;
    private readonly IImageStorageService _imageStorage;
    private const long MaxImageSizeBytes = 5 * 1024 * 1024; // 5 MB
    private static readonly string[] AllowedExtensions = { ".jpg", ".jpeg", ".png", ".webp" };

    public ProductService(IProductRepository repository, IImageStorageService imageStorage)
    {
        _repository = repository;
        _imageStorage = imageStorage;
    }

    public async Task<List<ProductDto>> GetAllAsync(CancellationToken ct = default)
    {
        var products = await _repository.GetAllAsync(ct);
        return products.Select(ToDto).ToList();
    }

    public async Task<ProductDto?> GetByIdAsync(Guid id, CancellationToken ct = default)
    {
        var product = await _repository.GetByIdAsync(id, ct);
        return product is null ? null : ToDto(product);
    }

    public async Task<ProductDto> CreateAsync(Guid sellerId, CreateProductDto dto, Stream? imageStream, string? fileName, long? fileSize, CancellationToken ct = default)
    {
        if (imageStream is not null)
        {
            if (fileSize is > MaxImageSizeBytes)
                throw new ImageValidationException($"Image must be under {MaxImageSizeBytes / 1024 / 1024}MB.");

            var ext = Path.GetExtension(fileName ?? "").ToLowerInvariant();
            if (!AllowedExtensions.Contains(ext))
                throw new ImageValidationException("Only .jpg, .jpeg, .png, .webp files are allowed.");
        }

        var product = new Product
        {
            SellerId = sellerId,
            Title = dto.Title,
            Description = dto.Description,
            UnitPrice = dto.UnitPrice,
            QuantityAvailable = dto.QuantityAvailable,
            ImageUrl = dto.ImageUrl
        };

        if (imageStream is not null && fileName is not null)
        {
            var result = await _imageStorage.SaveAsync(imageStream, fileName, ct);
            product.ImageUrl = result.ImageUrl;
            product.ThumbnailUrl = result.ThumbnailUrl;
        }

        await _repository.AddAsync(product, ct);
        await _repository.SaveChangesAsync(ct);
        return ToDto(product);
    }


    public async Task<ProductDto?> UpdateAsync(Guid id, Guid sellerId, UpdateProductDto dto, CancellationToken ct = default)
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

    public async Task<bool> DeleteAsync(Guid id, Guid sellerId, CancellationToken ct = default)
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
        p.Id, p.SellerId, p.Title, p.Description, p.UnitPrice, p.QuantityAvailable, p.ImageUrl, p.ThumbnailUrl
    );
}