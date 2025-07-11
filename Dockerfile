FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["Shift Up WebHoster/Shift Up WebHoster.csproj", "Shift Up WebHoster/"]
RUN dotnet restore "Shift Up WebHoster/Shift Up WebHoster.csproj"
COPY . .
WORKDIR "/src/Shift Up WebHoster"
RUN dotnet build "Shift Up WebHoster.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Shift Up WebHoster.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Shift Up WebHoster.dll"]