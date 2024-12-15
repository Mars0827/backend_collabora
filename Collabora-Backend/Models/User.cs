namespace Collabora_Backend.Models
{
    public class User
    {
        public Guid ID { get; set; }
        public string Email { get; set; }
        public string Username { get; set; }
        public string PasswordHash { get; set; }
    }
}
