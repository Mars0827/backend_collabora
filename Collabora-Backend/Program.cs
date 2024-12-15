using Collabora_Backend.Models;
using Collabora_Backend.Services.PasswordHashers;
using Collabora_Backend.Services.TokenGenerators;
using Collabora_Backend.Services;
using Google.Apis.Auth.OAuth2;
using Google.Cloud.Firestore.V1;
using Google.Cloud.Firestore;

namespace Collabora_Backend
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Access IConfiguration from the builder
            IConfiguration configuration = builder.Configuration;

            // Add services to the container
            builder.Services.AddControllers();

            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowFrontend",
                    policy => policy.WithOrigins("http://localhost:3000") // Replace with your frontend's URL
                                    .AllowAnyHeader()
                                    .AllowAnyMethod());
            });

            // Bind the "Authentication" section to the AuthenticationConfiguration object
            AuthenticationConfiguration authenticationConfiguration = new AuthenticationConfiguration();
            configuration.Bind("Authentication", authenticationConfiguration);

            builder.Services.AddSingleton(provider =>
            {
                // Path to the service account credentials file
                string credentialsPath = Path.Combine(Directory.GetCurrentDirectory(), "Services", "collabora-backend-firebase-adminsdk-t576f-4d63f0b0d5.json");

                // Ensure the file exists
                if (!File.Exists(credentialsPath))
                {
                    throw new FileNotFoundException($"The credentials file was not found at: {credentialsPath}");
                }

                // Load the credentials from the service account key file
                GoogleCredential credential = GoogleCredential.FromFile(credentialsPath);

                // Configure Firestore client with the credentials
                FirestoreClient firestoreClient = new FirestoreClientBuilder
                {
                    CredentialsPath = credentialsPath
                }.Build();

                // Create FirestoreDb using the client
                FirestoreDb firestoreDb = FirestoreDb.Create("studyapp-34d4e", firestoreClient);

                return firestoreDb;
            });


            // Register FirebaseService
            builder.Services.AddSingleton<FirebaseService>();
            builder.Services.AddSingleton<FirestoreService>();

            // Swagger configuration
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();

            // Configure the HTTP request pipeline
            if (app.Environment.IsDevelopment())
            {
                // Enable Swagger only in Development
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseCors("AllowFrontend");

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}
