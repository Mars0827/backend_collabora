using FirebaseAdmin;
using Google.Apis.Auth.OAuth2;
using FirebaseAdmin.Auth;
using Microsoft.Extensions.Configuration;
using System.Threading.Tasks;

namespace Collabora_Backend.Services
{
    public class FirebaseService
    {
        private readonly FirebaseAuth _auth;

        // Add IConfiguration to the constructor
        private readonly IConfiguration _configuration;

        public FirebaseService(IConfiguration configuration)
        {
            _configuration = configuration;

            // Get the Firebase Admin SDK path from configuration
            string firebaseAdminSdkPath = _configuration["Firebase:AdminSdkPath"];

            // Initialize Firebase with the path from configuration
            FirebaseApp.Create(new AppOptions()
            {
                Credential = GoogleCredential.FromFile(firebaseAdminSdkPath)
            });

            _auth = FirebaseAuth.DefaultInstance;
        }

        // Register new user in Firebase
        public async Task<UserRecord> CreateUserAsync(string email, string password)
        {
            var user = await _auth.CreateUserAsync(new UserRecordArgs
            {
                Email = email,
                EmailVerified = false,
                Password = password
            });

            return user;
        }

        // Authenticate user
        public async Task<FirebaseToken> AuthenticateUserAsync(string idToken)
        {
            var decodedToken = await _auth.VerifyIdTokenAsync(idToken);
            return decodedToken;
        }
    }
}
