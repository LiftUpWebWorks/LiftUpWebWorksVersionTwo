using System.ComponentModel.DataAnnotations;

namespace Shift_Up_WebHoster.Models
{
    public class ReviewModel
    {
        [Required(ErrorMessage = "Bitte geben Sie den Firmennamen ein.")]
        [Display(Name = "Firmenname")]
        public string CompanyName { get; set; } = string.Empty;

        [Required(ErrorMessage = "Bitte wählen Sie die Art der Dienstleistung aus.")]
        [Display(Name = "Art der Dienstleistung")]
        public string ServiceType { get; set; } = string.Empty;

        [Required(ErrorMessage = "Bitte geben Sie Ihre Bewertung ab.")]
        [Range(1, 5, ErrorMessage = "Bitte wählen Sie zwischen 1 und 5 Sternen.")]
        [Display(Name = "Sternebewertung")]
        public int Rating { get; set; }

        [Required(ErrorMessage = "Bitte geben Sie einen Kommentar ein.")]
        [Display(Name = "Ihr Kommentar")]
        [StringLength(1000, MinimumLength = 10, ErrorMessage = "Der Kommentar muss zwischen 10 und 1000 Zeichen lang sein.")]
        public string Comment { get; set; } = string.Empty;

        [Required(ErrorMessage = "Bitte geben Sie Ihren Namen ein.")]
        [Display(Name = "Ihr Name")]
        public string ReviewerName { get; set; } = string.Empty;

        [Required(ErrorMessage = "Bitte geben Sie Ihre Position ein.")]
        [Display(Name = "Ihre Position")]
        public string ReviewerPosition { get; set; } = string.Empty;
    }
}