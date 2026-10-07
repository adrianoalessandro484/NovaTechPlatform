using NovaTechPlatform.Application.DTOs;
using NovaTechPlatform.Application.Interfaces;

namespace NovaTechPlatform.Application.Services;

/// <summary>
/// Caso de uso de inicio de sesion.
/// La validacion se realiza aqui y el metodo devuelve un mensaje (string).
/// </summary>
public class AuthService : IAuthService
{
    private readonly IUsuarioRepository _usuarioRepository;
    private readonly IPasswordHasher _passwordHasher;

    public AuthService(IUsuarioRepository usuarioRepository, IPasswordHasher passwordHasher)
    {
        _usuarioRepository = usuarioRepository;
        _passwordHasher = passwordHasher;
    }

    public string IniciarSesion(LoginDto solicitud)
    {
        if (string.IsNullOrWhiteSpace(solicitud.Correo))
        {
            return "El correo electrónico es obligatorio.";
        }

        if (string.IsNullOrWhiteSpace(solicitud.Clave))
        {
            return "La contraseña es obligatoria.";
        }

        var usuario = _usuarioRepository.ObtenerPorCorreo(solicitud.Correo.Trim());

        // RV-10: mismo mensaje si el usuario no existe, esta inactivo o la clave es incorrecta.
        if (usuario is null || !usuario.Est_Usuario)
        {
            return "El correo electrónico o la contraseña ingresada no son válidos.";
        }

        if (!_passwordHasher.Verify(solicitud.Clave, usuario.Clv_Usuario))
        {
            return "El correo electrónico o la contraseña ingresada no son válidos.";
        }

        return "Inicio de sesión exitoso. Bienvenido a NovaPortal.";
    }
}
