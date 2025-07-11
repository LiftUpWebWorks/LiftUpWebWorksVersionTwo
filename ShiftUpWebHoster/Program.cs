using Shift_Up_WebHoster.Services;
using DotNetEnv;

namespace Shift_Up_WebHoster
{
    public class Program
    {
        public static void Main(string[] args)
        {
            // .env-Datei laden
            Env.Load();
            
            var builder = WebApplication.CreateBuilder(args);

// Konfiguration für verschiedene Umgebungen einrichten
if (builder.Environment.IsDevelopment())
{
    // In der Entwicklungsumgebung User Secrets verwenden
    builder.Configuration.AddUserSecrets<Program>();
}
else
{
    // In der Produktionsumgebung Umgebungsvariablen mit höherer Priorität verwenden
    // Die Umgebungsvariablen sollten im Format EMAILSETTINGS__SMTPPASSWORD gesetzt werden
}

            // Add services to the container.
            builder.Services.AddControllersWithViews();
            try
            {
                builder.Services.AddScoped<IEmailService, EmailService>();
            }
            catch (Exception ex)
            {
                // Log the error but continue startup
                Console.WriteLine($"Warning: Email service configuration failed: {ex.Message}");
            }
            builder.Services.AddLogging(logging =>
            {
                logging.AddConsole();
                logging.AddDebug();
            });

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (!app.Environment.IsDevelopment())
            {
                app.UseExceptionHandler("/Home/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.UseRouting();

            app.UseAuthorization();

            app.MapControllerRoute(
                name: "default",
                pattern: "{controller=Home}/{action=Index}/{id?}");

            app.Run();
        }
    }
}
