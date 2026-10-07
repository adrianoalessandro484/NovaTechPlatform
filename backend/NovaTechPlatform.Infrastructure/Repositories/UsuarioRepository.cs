using NovaTechPlatform.Application.Interfaces;
using NovaTechPlatform.Domain.Entities;
using NovaTechPlatform.Infrastructure.Data;

namespace NovaTechPlatform.Infrastructure.Repositories;

/// <summary>Implementacion EF Core del repositorio de usuarios.</summary>
public class UsuarioRepository : IUsuarioRepository
{
    private readonly AppDbContext context;

    public UsuarioRepository(AppDbContext context)
    {
        this.context = context;
    }

    public Usuario? ObtenerPorCorreo(string correo)
    {
        var correoNormalizado = correo.Trim().ToLower();

        return context.Usuarios
            .FirstOrDefault(u => u.Cor_Usuario.ToLower() == correoNormalizado);
    }
}
