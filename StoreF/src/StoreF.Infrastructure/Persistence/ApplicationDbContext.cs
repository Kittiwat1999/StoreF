// src/StoreF.Infrastructure/Persistence/ApplicationDbContext.cs
using Microsoft.EntityFrameworkCore;
using StoreF.Domain.Entities;

namespace StoreF.Infrastructure.Persistence;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

    public DbSet<Product> Products => Set<Product>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(ApplicationDbContext).Assembly);
    }
}