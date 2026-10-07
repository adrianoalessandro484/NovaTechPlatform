namespace NovaTechPlatform.Application.Interfaces;

/// <summary>Servicio de hashing y verificacion de contrasenas.</summary>
public interface IPasswordHasher
{
    string Hash(string password);

    bool Verify(string password, string hash);
}
