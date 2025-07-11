FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["ShiftUpWebHoster/Shift Up WebHoster.csproj", "ShiftUpWebHoster/"]
RUN dotnet restore "ShiftUpWebHoster/Shift Up WebHoster.csproj"
COPY . .
WORKDIR "/src/ShiftUpWebHoster"
RUN dotnet build "Shift Up WebHoster.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Shift Up WebHoster.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Shift Up WebHoster.dll"]