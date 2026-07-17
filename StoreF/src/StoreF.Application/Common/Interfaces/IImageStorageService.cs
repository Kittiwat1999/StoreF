// src/StoreF.Application/Common/Interfaces/IImageStorageService.cs
namespace StoreF.Application.Common.Interfaces;

public record ImageUploadResult(string ImageUrl, string ThumbnailUrl);

public interface IImageStorageService
{
    Task<ImageUploadResult> SaveAsync(Stream imageStream, string fileName, CancellationToken ct = default);
    Task DeleteAsync(string imageUrl, CancellationToken ct = default);
}