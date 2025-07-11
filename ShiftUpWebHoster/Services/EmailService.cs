using System.Net.Mail;
using System.Net;
using System.Net.Sockets;
using System.Security.Cryptography.X509Certificates;
using Microsoft.Extensions.Configuration;

namespace Shift_Up_WebHoster.Services
{
    public interface IEmailService
    {
        Task SendEmailAsync(string from, string subject, string body);
    }

    public class EmailService : IEmailService
    {
        private readonly IConfiguration _configuration;
        private readonly ILogger<EmailService> _logger;

        public EmailService(IConfiguration configuration, ILogger<EmailService> logger)
        {
            _configuration = configuration;
            _logger = logger;
        }



        public async Task SendEmailAsync(string from, string subject, string body)
        {
            // Versuche zuerst, die Einstellungen aus den Umgebungsvariablen zu lesen
            var smtpServer = Environment.GetEnvironmentVariable("SMTP_HOST") ?? 
                             _configuration.GetSection("EmailSettings")["SmtpServer"];
            
            var smtpPortStr = Environment.GetEnvironmentVariable("SMTP_PORT") ?? 
                              _configuration.GetSection("EmailSettings")["SmtpPort"];
            
            var smtpUsername = Environment.GetEnvironmentVariable("SMTP_USER") ?? 
                               _configuration.GetSection("EmailSettings")["SmtpUsername"];
            
            // Priorität: .env-Datei, dann User Secrets
            var smtpPassword = Environment.GetEnvironmentVariable("SMTP_PASS") ?? 
                               _configuration.GetSection("EmailSettings")["SmtpPassword"];

            if (string.IsNullOrEmpty(smtpServer) || string.IsNullOrEmpty(smtpPortStr) || 
                string.IsNullOrEmpty(smtpUsername) || string.IsNullOrEmpty(smtpPassword))
            {
                throw new InvalidOperationException("SMTP-Einstellungen sind nicht vollständig konfiguriert.");
            }

            if (!int.TryParse(smtpPortStr, out int smtpPort))
            {
                throw new InvalidOperationException("Ungültiger SMTP-Port.");
            }

            ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;
            var smtpClient = new SmtpClient()
            {
                Host = smtpServer,
                Port = smtpPort,
                Credentials = new NetworkCredential(smtpUsername, smtpPassword),
                EnableSsl = true,
                DeliveryMethod = SmtpDeliveryMethod.Network,
                UseDefaultCredentials = false,
                Timeout = 60000 // 60 Sekunden Timeout
            };
            
            // SSL/TLS-Konfiguration für IONOS
            ServicePointManager.ServerCertificateValidationCallback = 
                ((sender, certificate, chain, sslPolicyErrors) => true);

            // Detaillierte Fehlerprotokollierung
            _logger.LogInformation($"Versuche E-Mail zu senden mit folgenden Einstellungen:\n" +
                                  $"Server: {smtpServer}\n" +
                                  $"Port: {smtpPort}\n" +
                                  $"Benutzername: {smtpUsername}\n" +
                                  $"SSL aktiviert: {true}");

            var fromEmail = Environment.GetEnvironmentVariable("FROM_EMAIL") ?? 
                           _configuration.GetSection("EmailSettings")["FromEmail"];
            
            var fromName = Environment.GetEnvironmentVariable("FROM_NAME") ?? 
                          _configuration.GetSection("EmailSettings")["FromName"];
            
            if (string.IsNullOrEmpty(fromEmail))
            {
                throw new InvalidOperationException("Die Absender-E-Mail-Adresse ist nicht konfiguriert.");
            }

            var mailMessage = new MailMessage
            {
                From = new MailAddress(fromEmail, fromName ?? "Lift Up WebWorks"),
                Subject = subject,
                Body = body,
                IsBodyHtml = false
            };
            mailMessage.ReplyToList.Add(new MailAddress(from));
            var toEmail = Environment.GetEnvironmentVariable("TO_EMAIL") ?? 
                         Environment.GetEnvironmentVariable("FROM_EMAIL") ?? 
                         _configuration.GetSection("EmailSettings")["FromEmail"];
            if (string.IsNullOrEmpty(toEmail))
            {
                throw new InvalidOperationException("Die Empfänger-E-Mail-Adresse ist nicht konfiguriert.");
            }
            mailMessage.To.Add(toEmail);

            try
            {
                _logger.LogInformation($"Versuche E-Mail zu senden von {fromEmail} an {toEmail} mit Betreff: {subject}");
                _logger.LogInformation($"SMTP-Konfiguration: Server={smtpServer}, Port={smtpPort}, SSL={smtpClient.EnableSsl}, SecurityProtocol={ServicePointManager.SecurityProtocol}");
                
                // Test der SSL/TLS-Verbindung
                using (var client = new TcpClient())
                {
                    _logger.LogInformation($"Teste Verbindung zu {smtpServer}:{smtpPort}");
                    await client.ConnectAsync(smtpServer, smtpPort);
                    _logger.LogInformation("TCP-Verbindung erfolgreich hergestellt");
                }
                
                await smtpClient.SendMailAsync(mailMessage);
                _logger.LogInformation("E-Mail wurde erfolgreich gesendet.");
            }
            catch (SmtpException ex)
            {
                _logger.LogError($"SMTP-Fehler beim E-Mail-Versand: {ex.Message}");
                _logger.LogError($"SMTP-Status-Code: {ex.StatusCode}");
                if (ex.InnerException != null)
                {
                    _logger.LogError($"Inner Exception: {ex.InnerException.Message}");
                }
                throw new Exception($"SMTP-Fehler: {ex.Message}. StatusCode: {ex.StatusCode}", ex);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Allgemeiner Fehler beim E-Mail-Versand: {ex.Message}");
                if (ex.InnerException != null)
                {
                    _logger.LogError($"Inner Exception: {ex.InnerException.Message}");
                }
                throw new Exception($"E-Mail-Versand fehlgeschlagen: {ex.Message}", ex);
            }
        }
    }
}