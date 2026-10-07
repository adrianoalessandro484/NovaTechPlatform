namespace NovaTechPlatform.Application.DTOs;

/// <summary>
/// Datos de entrada del endpoint POST /api/auth/login.
/// Sin atributos de validacion: la validacion se realiza en el servicio.
/// </summary>
public class LoginDto
{
    public string? Correo { get; set; }

    public string? Clave { get; set; }
}
