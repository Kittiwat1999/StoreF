// src/StoreF.Application/Common/Interfaces/IProductRepository.cs
using StoreF.Domain.Entities;

namespace StoreF.Application.Common.Interfaces;

public interface IProductRepository
{
    Task<List<Product>> GetAllAsync(CancellationToken ct = default);
    Task<Product?> GetByIdAsync(Guid id, CancellationToken ct = default);
    Task AddAsync(Product product, CancellationToken ct = default);
    void Update(Product product);
    void Remove(Product product);
    Task<int> SaveChangesAsync(CancellationToken ct = default);
}