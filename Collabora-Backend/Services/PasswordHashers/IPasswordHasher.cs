namespace Collabora_Backend.Services.PasswordHashers
{
    public interface IPasswordHasher
    {
        string HashPassword(string password);

        bool VerifyPassword(string password, string passwordHash);
    }
}
