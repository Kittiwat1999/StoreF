# --- Stage 1: Build ---
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

COPY StoreF.slnx ./
COPY Directory.Packages.props ./
COPY src/StoreF.Api/StoreF.Api.csproj src/StoreF.Api/
COPY src/StoreF.Application/StoreF.Application.csproj src/StoreF.Application/
COPY src/StoreF.Domain/StoreF.Domain.csproj src/StoreF.Domain/
COPY src/StoreF.Infrastructure/StoreF.Infrastructure.csproj src/StoreF.Infrastructure/

RUN dotnet restore src/StoreF.Api/StoreF.Api.csproj

COPY src/ src/

# --- Stage 2: Dev (full SDK + dotnet watch) ---
FROM build AS dev
WORKDIR /src
EXPOSE 8000
ENTRYPOINT ["dotnet", "watch", "run", "--project", "src/StoreF.Api", "--urls", "http://+:8000", "--non-interactive"]

# --- Stage 3: Publish (for production) ---
FROM build AS publish
RUN dotnet publish src/StoreF.Api/StoreF.Api.csproj -c Release -o /app/publish --no-restore

# --- Stage 4: Runtime (production only) ---
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
RUN mkdir -p /app/wwwroot/uploads && chown -R app:app /app/wwwroot
USER app
COPY --from=publish /app/publish .
EXPOSE 8000
ENTRYPOINT ["dotnet", "StoreF.Api.dll"]