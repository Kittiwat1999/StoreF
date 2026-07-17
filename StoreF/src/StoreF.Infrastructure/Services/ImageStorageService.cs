// src/StoreF.Infrastructure/Services/ImageStorageService.cs
using Microsoft.Extensions.Options;
using Minio;
using Minio.DataModel.Args;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Formats.Jpeg;
using SixLabors.ImageSharp.Processing;
using StoreF.Application.Common.Interfaces;

namespace StoreF.Infrastructure.Services;

public class ImageStorageService : IImageStorageService
{
    private readonly IMinioClient _minio;
    private readonly MinioOptions _options;
    private const int ThumbnailWidth = 300;

    public ImageStorageService(IOptions<MinioOptions> options)
    {
        _options = options.Value;
        _minio = new MinioClient()
            .WithEndpoint(_options.Endpoint)
            .WithCredentials(_options.AccessKey, _options.SecretKey)
            .Build();
    }

    private async Task EnsureBucketExistsAsync(CancellationToken ct)
    {
        var exists = await _minio.BucketExistsAsync(
            new BucketExistsArgs().WithBucket(_options.BucketName), ct);

        if (!exists)
        {
            await _minio.MakeBucketAsync(
                new MakeBucketArgs().WithBucket(_options.BucketName), ct);
        }
    }

    public async Task<ImageUploadResult> SaveAsync(Stream imageStream, string fileName, CancellationToken ct = default)
    {
        await EnsureBucketExistsAsync(ct);

        var id = Guid.NewGuid().ToString("N");
        var ext = Path.GetExtension(fileName);
        var originalKey = $"{id}{ext}";
        var thumbnailKey = $"{id}_thumb{ext}";

        // Decode once; use the same decoded image for both original and thumbnail
        using var image = await Image.LoadAsync(imageStream, ct);

        // --- Upload original ---
        using var originalMs = new MemoryStream();
        await image.SaveAsync(originalMs, new JpegEncoder { Quality = 90 }, ct);
        originalMs.Position = 0;

        await _minio.PutObjectAsync(new PutObjectArgs()
            .WithBucket(_options.BucketName)
            .WithObject(originalKey)
            .WithStreamData(originalMs)
            .WithObjectSize(originalMs.Length)
            .WithContentType("image/jpeg"), ct);

        // --- Resize and upload thumbnail ---
        using var thumbnail = image.Clone(x => x.Resize(ThumbnailWidth, 0)); // 0 = auto-calculate height to preserve aspect ratio

        using var thumbMs = new MemoryStream();
        await thumbnail.SaveAsync(thumbMs, new JpegEncoder { Quality = 90 }, ct);
        thumbMs.Position = 0;

        await _minio.PutObjectAsync(new PutObjectArgs()
            .WithBucket(_options.BucketName)
            .WithObject(thumbnailKey)
            .WithStreamData(thumbMs)
            .WithObjectSize(thumbMs.Length)
            .WithContentType("image/jpeg"), ct);

        return new ImageUploadResult(
            ImageUrl: $"/storage/{_options.BucketName}/{originalKey}",
            ThumbnailUrl: $"/storage/{_options.BucketName}/{thumbnailKey}"
        );
    }

    public async Task DeleteAsync(string imageUrl, CancellationToken ct = default)
    {
        var key = imageUrl.Split('/').Last();
        await _minio.RemoveObjectAsync(
            new RemoveObjectArgs().WithBucket(_options.BucketName).WithObject(key), ct);
    }
}