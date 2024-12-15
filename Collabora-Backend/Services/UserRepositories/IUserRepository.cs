using Collabora_Backend.Models;

namespace Collabora_Backend.Services.UserRepositories
{
    public interface IUserRepository
    {
        Task <User> GetByEmail(string email);

        Task <User> GetByUsername(string username);

        Task<User> Create(User user);

    }
}
