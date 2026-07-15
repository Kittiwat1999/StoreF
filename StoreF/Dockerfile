# --- Stage 1: Build ---
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy only the .csproj files first so Docker can cache the "restore" layer
# (will rebuild only when .csproj changes, not every time you edit .cs files)
COPY StoreF.slnx ./
COPY Directory.Packages.props ./
COPY src/StoreF.Api/StoreF.Api.csproj src/StoreF.Api/
COPY src/StoreF.Application/StoreF.Application.csproj src/StoreF.Application/
COPY src/StoreF.Domain/StoreF.Domain.csproj src/StoreF.Domain/
COPY src/StoreF.Infrastructure/StoreF.Infrastructure.csproj src/StoreF.Infrastructure/

RUN dotnet restore src/StoreF.Api/StoreF.Api.csproj

# Copy the full source then publish
COPY src/ src/
RUN dotnet publish src/StoreF.Api/StoreF.Api.csproj -c Release -o /app/publish --no-restore

# --- Stage 2: Runtime ---
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app

# Run as non-root user (provided by the base image)
USER app

COPY --from=build /app/publish .

EXPOSE 8000
ENTRYPOINT ["dotnet", "StoreF.Api.dll"]