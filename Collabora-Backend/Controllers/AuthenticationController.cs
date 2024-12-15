using Collabora_Backend.Services;
using Collabora_Backend.Models.Requests;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Collabora_Backend.Controllers
{
    public class AuthenticationController : Controller
    {
        private readonly FirebaseService _firebaseService;

        public AuthenticationController(FirebaseService firebaseService)
        {
            _firebaseService = firebaseService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest registerRequest)
        {
            if (registerRequest.Password != registerRequest.ConfirmPassword)
            {
                return BadRequest(new { ErrorMessage = "Passwords do not match." });
            }

            // Call FirebaseService to register a new user
            var firebaseUser = await _firebaseService.CreateUserAsync(registerRequest.Email, registerRequest.Password);

            return Ok(new { Message = "User created", FirebaseUser = firebaseUser });
        }


        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest loginRequest)
        {
            // Call FirebaseService to authenticate the user
            var firebaseToken = await _firebaseService.AuthenticateUserAsync(loginRequest.IdToken);
            return Ok(new { Message = "Authenticated", FirebaseToken = firebaseToken });
        }
    }
}
