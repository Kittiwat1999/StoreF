// src/StoreF.Api/Program.cs
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http.Features;
using StoreF.Application.Common.Interfaces;
using StoreF.Application.Products;
using StoreF.Infrastructure.Persistence;
using StoreF.Infrastructure.Persistence.Repositories;
using StoreF.Infrastructure.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// DbContext
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddHealthChecks()
    .AddNpgSql(builder.Configuration.GetConnectionString("DefaultConnection")!, name: "postgres");
// DI wiring
builder.Services.AddScoped<IProductRepository, ProductRepository>();
builder.Services.Configure<MinioOptions>(builder.Configuration.GetSection("Minio"));
builder.Services.AddScoped<IImageStorageService, ImageStorageService>();
builder.Services.AddScoped<ProductService>();

// Program.cs
builder.Services.Configure<FormOptions>(options =>
{
    options.MultipartBodyLengthLimit = 5 * 1024 * 1024; // 5 MB
});

builder.WebHost.ConfigureKestrel(options =>
{
    options.Limits.MaxRequestBodySize = 5 * 1024 * 1024;
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.MapHealthChecks("/health");  
app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();