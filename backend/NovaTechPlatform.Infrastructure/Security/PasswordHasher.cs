using NovaTechPlatform.Application.Interfaces;

namespace NovaTechPlatform.Infrastructure.Security;

/// <summary>Implementacion de hashing de contrasenas con BCrypt.</summary>
public class PasswordHasher : IPasswordHasher
{
    public string Hash(string password) => BCrypt.Net.BCrypt.HashPassword(password, 12);

    public bool Verify(string password, string hash)
    {
        try
        {
            return BCrypt.Net.BCrypt.Verify(password, hash);
        }
        catch (BCrypt.Net.SaltParseException)
        {
            return false;
        }
    }
}
