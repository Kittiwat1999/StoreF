// src/StoreF.Infrastructure/Persistence/Repositories/ProductRepository.cs
using Microsoft.EntityFrameworkCore;
using StoreF.Application.Common.Interfaces;
using StoreF.Domain.Entities;

namespace StoreF.Infrastructure.Persistence.Repositories;

public class ProductRepository : IProductRepository
{
    private readonly ApplicationDbContext _context;

    public ProductRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<List<Product>> GetAllAsync(CancellationToken ct = default) =>
        await _context.Products.AsNoTracking().ToListAsync(ct);

    public async Task<Product?> GetByIdAsync(int id, CancellationToken ct = default) =>
        await _context.Products.FirstOrDefaultAsync(p => p.Id == id, ct);

    public async Task AddAsync(Product product, CancellationToken ct = default) =>
        await _context.Products.AddAsync(product, ct);

    public void Update(Product product) => _context.Products.Update(product);

    public void Remove(Product product) => _context.Products.Remove(product);

    public async Task<int> SaveChangesAsync(CancellationToken ct = default) =>
        await _context.SaveChangesAsync(ct);
}