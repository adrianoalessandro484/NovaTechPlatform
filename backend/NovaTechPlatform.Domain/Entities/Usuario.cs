namespace NovaTechPlatform.Domain.Entities;

/// <summary>
/// Entidad que representa a un colaborador/usuario de NovaTechPlatform.
/// Convencion de nomenclatura: [Abreviatura]_[Entidad].
/// </summary>
public class Usuario
{
    /// <summary>Codigo unico del usuario (PK).</summary>
    public int Cod_Usuario { get; set; }

    /// <summary>Correo electronico institucional.</summary>
    public string Cor_Usuario { get; set; } = string.Empty;

    /// <summary>Hash de la contrasena (nunca se almacena en texto plano).</summary>
    public string Clv_Usuario { get; set; } = string.Empty;

    /// <summary>Nombres del colaborador.</summary>
    public string Nom_Usuario { get; set; } = string.Empty;

    /// <summary>Apellidos del colaborador.</summary>
    public string Ape_Usuario { get; set; } = string.Empty;

    /// <summary>Estado del usuario (true = activo, false = inactivo).</summary>
    public bool Est_Usuario { get; set; }
}
