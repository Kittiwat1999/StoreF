// src/StoreF.Api/Controllers/ProductsController.cs
using Microsoft.AspNetCore.Mvc;
using StoreF.Application.Products;
using StoreF.Application.Products.DTOs;

namespace StoreF.Api.Controllers;

[ApiController]
[Route("api/products")]
public class ProductsController : ControllerBase
{
    private readonly ProductService _service;

    public ProductsController(ProductService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<ActionResult<List<ProductDto>>> GetAll(CancellationToken ct)
    {
        var products = await _service.GetAllAsync(ct);
        return Ok(products);
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<ProductDto>> GetById(int id, CancellationToken ct)
    {
        var product = await _service.GetByIdAsync(id, ct);
        return product is null ? NotFound() : Ok(product);
    }

    [HttpPost]
    public async Task<ActionResult<ProductDto>> Create(CreateProductDto dto, CancellationToken ct)
    {
        // TODO: Extract sellerId from JWT claims instead of this mock value after Auth is complete
        var mockSellerId = Guid.NewGuid();

        var created = await _service.CreateAsync(mockSellerId, dto, ct);
        return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
    }

    [HttpPut("{id:int}")]
    public async Task<ActionResult<ProductDto>> Update(int id, UpdateProductDto dto, CancellationToken ct)
    {
        var mockSellerId = Guid.NewGuid(); // TODO: from JWT

        try
        {
            var updated = await _service.UpdateAsync(id, mockSellerId, dto, ct);
            return updated is null ? NotFound() : Ok(updated);
        }
        catch (UnauthorizedAccessException)
        {
            return Forbid();
        }
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id, CancellationToken ct)
    {
        var mockSellerId = Guid.NewGuid(); // TODO: from JWT

        try
        {
            var deleted = await _service.DeleteAsync(id, mockSellerId, ct);
            return deleted ? NoContent() : NotFound();
        }
        catch (UnauthorizedAccessException)
        {
            return Forbid();
        }
    }
}