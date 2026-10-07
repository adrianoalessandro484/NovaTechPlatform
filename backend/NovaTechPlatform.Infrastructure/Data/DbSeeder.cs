using Microsoft.EntityFrameworkCore;
using NovaTechPlatform.Application.Interfaces;
using NovaTechPlatform.Domain.Entities;

namespace NovaTechPlatform.Infrastructure.Data;

/// <summary>
/// Siembra de datos iniciales: crea el usuario de prueba con la contrasena
/// almacenada como hash BCrypt.
/// </summary>
public static class DbSeeder
{
    public const string CorreoDemo = "colaborador@novatech.com";
    public const string ClaveDemo = "Admin123*";

    public static void Seed(AppDbContext context, IPasswordHasher passwordHasher)
    {
        context.Database.Migrate();

        var existe = context.Usuarios.Any(u => u.Cor_Usuario.ToLower() == CorreoDemo);

        if (existe)
        {
            return;
        }

        context.Usuarios.Add(new Usuario
        {
            Cor_Usuario = CorreoDemo,
            Clv_Usuario = passwordHasher.Hash(ClaveDemo),
            Nom_Usuario = "Colaborador",
            Ape_Usuario = "NovaTech",
            Est_Usuario = true
        });

        context.SaveChanges();
    }
}
