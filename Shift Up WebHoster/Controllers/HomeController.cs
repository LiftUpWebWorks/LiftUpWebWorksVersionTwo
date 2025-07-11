using Microsoft.AspNetCore.Mvc;
using Shift_Up_WebHoster.Models;
using Shift_Up_WebHoster.Services;
using System.Diagnostics;

namespace Shift_Up_WebHoster.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly IEmailService _emailService;

        public HomeController(ILogger<HomeController> logger, IEmailService emailService)
        {
            _logger = logger;
            _emailService = emailService;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Leistungen()
        {
            return View();
        }

        public IActionResult Bewertungen()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> SubmitReview(ReviewModel model)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    // Formatiere die Bewertung als E-Mail
                    var messageBody = $"Neue Bewertung eingegangen:\n\n" +
                                     $"Firmenname: {model.CompanyName}\n" +
                                     $"Art der Dienstleistung: {model.ServiceType}\n" +
                                     $"Bewertung: {model.Rating} Sterne\n" +
                                     $"Kommentar: {model.Comment}\n\n" +
                                     $"Unterschrift:\n" +
                                     $"{model.ReviewerName}\n" +
                                     $"{model.ReviewerPosition}";

                    // Sende die E-Mail
                    await _emailService.SendEmailAsync(
                        "noreply@liftup-webworks.de",
                        "Neue Kundenbewertung",
                        messageBody
                    );

                    TempData["SuccessMessage"] = "Vielen Dank für Ihre Bewertung!";
                    return RedirectToAction(nameof(Bewertungen));
                }
                catch (Exception ex)
                {
                    _logger.LogError($"Fehler beim Senden der Bewertung: {ex.Message}");
                    ModelState.AddModelError("", "Beim Senden der Bewertung ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.");
                }
            }

            return View("Bewertungen", model);
        }

        public IActionResult Kontakt()
        {
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        public IActionResult Impressum()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Kontakt(ContactFormModel model)
        {
            // Entferne manuell Validierungsfehler für das Telefonfeld, falls vorhanden
            if (ModelState.ContainsKey("Phone"))
            {
                ModelState.Remove("Phone");
            }
            
            if (ModelState.IsValid)
            {
                try
                {
                    var messageBody = $"Name: {model.Name}\nE-Mail: {model.Email}\nTelefon: {model.Phone}\n\nNachricht:\n{model.Message}";
                    await _emailService.SendEmailAsync(model.Email, model.Subject, messageBody);

                    TempData["SuccessMessage"] = "Ihre Nachricht wurde erfolgreich gesendet.";
                    return RedirectToAction(nameof(Kontakt));
                }
                catch (Exception ex)
                {
                    ModelState.AddModelError("", "Beim Senden der Nachricht ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.");
                    _logger.LogError($"Fehler beim Senden der E-Mail: {ex.Message}");
                }
            }

            return View(model);
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
