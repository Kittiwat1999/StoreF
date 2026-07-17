// src/StoreF.Api/Controllers/ProductsController.cs
using Microsoft.AspNetCore.Mvc;
using StoreF.Application.Products;
using StoreF.Application.Products.DTOs;
using StoreF.Application.Common.Exceptions;

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

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<ProductDto>> GetById(Guid id, CancellationToken ct)
    {
        var product = await _service.GetByIdAsync(id, ct);
        return product is null ? NotFound() : Ok(product);
    }

    [HttpPost]
    [Consumes("multipart/form-data")]
    public async Task<ActionResult<ProductDto>> Create(
        [FromForm] CreateProductDto dto, IFormFile? image, CancellationToken ct)
    {
        // var sellerId = Guid.Parse(User.FindFirst("sub")!.Value);
        var sellerId = Guid.NewGuid();
        Stream? stream = image?.OpenReadStream();

        try
        {
            var created = await _service.CreateAsync(sellerId, dto, stream, image?.FileName, image?.Length, ct);
            return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
        }
        catch (ImageValidationException ex)
        {
            return BadRequest(new { error = ex.Message });
        }
    }

    [HttpPut("{id:guid}")]
    public async Task<ActionResult<ProductDto>> Update(Guid id, UpdateProductDto dto, CancellationToken ct)
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

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id, CancellationToken ct)
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