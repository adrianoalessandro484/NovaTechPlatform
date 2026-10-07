using NovaTechPlatform.Application.DTOs;

namespace NovaTechPlatform.Application.Interfaces;

/// <summary>Caso de uso de autenticacion de colaboradores.</summary>
public interface IAuthService
{
    /// <summary>
    /// Valida las credenciales y devuelve un mensaje con el resultado.
    /// </summary>
    string IniciarSesion(LoginDto solicitud);
}
