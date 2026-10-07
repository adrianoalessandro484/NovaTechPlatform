using Microsoft.AspNetCore.Mvc;
using NovaTechPlatform.Application.DTOs;
using NovaTechPlatform.Application.Interfaces;

namespace NovaTechPlatform.API.Controllers;

/// <summary>Endpoints de autenticacion de NovaPortal.</summary>
[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    /// <summary>Valida las credenciales del colaborador.</summary>
    [HttpPost("login")]
    public IActionResult Login([FromBody] LoginDto solicitud)
    {
        var mensaje = _authService.IniciarSesion(solicitud);

        if (mensaje == "Inicio de sesión exitoso. Bienvenido a NovaPortal.")
        {
            return Ok(new { codigo = 200, mensaje = mensaje });
        }

        return Unauthorized(new { codigo = 401, mensaje = mensaje });
    }
}
