using Collabora_Backend.Models;

namespace Collabora_Backend.Services.UserRepositories
{
    public class InMemoryUserRepository : IUserRepository
    {
        private readonly List<User> _users = new List<User>();
        

        public Task<User> Create(User user)
        {
            user.ID = Guid.NewGuid();
            _users.Add(user);
            return Task.FromResult(user);
        }

        public Task<User> GetByEmail(string email)
        {
            return Task.FromResult(_users.FirstOrDefault(u => u.Email == email));
        }

        public Task<User> GetByUsername(string username)
        {
            return Task.FromResult(_users.FirstOrDefault(u => u.Username == username));
        }
    }
}
