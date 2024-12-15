using Collabora_Backend.Services.PasswordHashers;
using Collabora_Backend.Services.TokenGenerators;
using Collabora_Backend.Services.UserRepositories;

namespace Collabora_Backend
{
    public class Startup
    {
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();

            services.AddSingleton<AccessTokenGenerator>();
            services.AddSingleton<IPasswordHasher, BcryptPasswordHasher>();
            services.AddSingleton<IUserRepository, InMemoryUserRepository>();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseRouting();
            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
