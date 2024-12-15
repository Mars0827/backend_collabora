using Collabora_Backend.Models;
using Collabora_Backend.Services.PasswordHashers;
using Collabora_Backend.Services.TokenGenerators;
using Collabora_Backend.Services;

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


            // Register FirebaseService
            builder.Services.AddSingleton<FirebaseService>();

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
