namespace Collabora_Backend.Models
{
    public class AuthenticationConfiguration
    {
        public string AccessTokenSecret { get; set; }
        public int AccessTokenExpirationMinutes { get; set; }
        public string Issuer { get; set; }

        public string Audience { get; set; }

    }
}
