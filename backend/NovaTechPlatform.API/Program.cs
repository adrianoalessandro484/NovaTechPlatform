using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NovaTechPlatform.Application.Interfaces;
using NovaTechPlatform.Application.Services;
using NovaTechPlatform.Infrastructure.Data;
using NovaTechPlatform.Infrastructure.Repositories;
using NovaTechPlatform.Infrastructure.Security;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

// Respuesta uniforme 400 cuando falla la validacion del modelo.
builder.Services.Configure<ApiBehaviorOptions>(options =>
{
    options.InvalidModelStateResponseFactory = context =>
    {
        var problemDetails = new ValidationProblemDetails(context.ModelState)
        {
            Status = StatusCodes.Status400BadRequest,
            Title = "Solicitud no valida",
            Detail = "Uno o mas campos no cumplen las reglas de validacion."
        };

        return new BadRequestObjectResult(problemDetails);
    };
});

// Base de datos PostgreSQL.
var connectionString = builder.Configuration.GetConnectionString("NovaTechConnection")
    ?? "Host=localhost;Port=5432;Database=novatech_db;Username=postgres;Password=123";

builder.Services.AddDbContext<AppDbContext>(options => options.UseNpgsql(connectionString));

// Registro de servicios (interfaz -> implementacion).
builder.Services.AddScoped<IUsuarioRepository, UsuarioRepository>();
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddSingleton<IPasswordHasher, PasswordHasher>();

// CORS para el frontend de Vite.
builder.Services.AddCors(options =>
{
    options.AddPolicy("NovaPortalFrontend", policy =>
        policy.WithOrigins("http://localhost:5173")
              .AllowAnyHeader()
              .AllowAnyMethod());
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Swagger disponible siempre (UI en /swagger).
app.UseSwagger();
app.UseSwaggerUI();

app.UseCors("NovaPortalFrontend");
app.MapControllers();

// Aplica migraciones y siembra el usuario de prueba.
using (var scope = app.Services.CreateScope())
{
    try
    {
        var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();
        var hasher = scope.ServiceProvider.GetRequiredService<IPasswordHasher>();
        DbSeeder.Seed(context, hasher);
    }
    catch (Exception ex)
    {
        var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();
        logger.LogWarning(ex, "No se pudo inicializar PostgreSQL. Verifique la cadena de conexion.");
    }
}

app.Run();

public partial class Program { }
