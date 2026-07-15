// src/StoreF.Infrastructure/Persistence/Configurations/ProductConfiguration.cs
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using StoreF.Domain.Entities;

namespace StoreF.Infrastructure.Persistence.Configurations;

public class ProductConfiguration : IEntityTypeConfiguration<Product>
{
    public void Configure(EntityTypeBuilder<Product> builder)
    {
        builder.HasKey(p => p.Id);
        builder.Property(p => p.Title).IsRequired().HasMaxLength(200);
        builder.Property(p => p.UnitPrice).HasColumnType("decimal(10,2)");
        builder.HasIndex(p => p.SellerId);
    }
}