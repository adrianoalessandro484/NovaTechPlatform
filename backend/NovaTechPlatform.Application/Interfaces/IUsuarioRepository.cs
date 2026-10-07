using NovaTechPlatform.Domain.Entities;

namespace NovaTechPlatform.Application.Interfaces;

/// <summary>Contrato de acceso a datos para la entidad Usuario.</summary>
public interface IUsuarioRepository
{
    Usuario? ObtenerPorCorreo(string correo);
}
