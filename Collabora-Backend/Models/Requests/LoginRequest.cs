using System.ComponentModel.DataAnnotations;

namespace Collabora_Backend.Models.Requests
{
    public class LoginRequest
    {
        [Required]
        public string Username { get; set; }

        [Required]
        public string Password { get; set; }

        [Required]
        public string IdToken { get; set; }  // Added the IdToken property
    }
}
