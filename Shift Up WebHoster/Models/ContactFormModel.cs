using System.ComponentModel.DataAnnotations;

namespace Shift_Up_WebHoster.Models
{
    public class ContactFormModel
    {
        [Required(ErrorMessage = "Bitte geben Sie Ihren Namen ein.")]
        public string Name { get; set; } = string.Empty;

        [Required(ErrorMessage = "Bitte geben Sie Ihre E-Mail-Adresse ein.")]
        [EmailAddress(ErrorMessage = "Bitte geben Sie eine gültige E-Mail-Adresse ein.")]
        public string Email { get; set; } = string.Empty;

        [Phone(ErrorMessage = "")]
        public string Phone { get; set; } = string.Empty;

        [Required(ErrorMessage = "Bitte geben Sie einen Betreff ein.")]
        public string Subject { get; set; } = string.Empty;

        [Required(ErrorMessage = "Bitte geben Sie eine Nachricht ein.")]
        public string Message { get; set; } = string.Empty;

        [Required(ErrorMessage = "Bitte stimmen Sie der Datenschutzerklärung zu.")]
        [Display(Name = "Datenschutzerklärung")]
        public bool AcceptPrivacyPolicy { get; set; }
    }
}