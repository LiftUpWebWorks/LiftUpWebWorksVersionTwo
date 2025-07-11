// Please see documentation at https://learn.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

// Validierung für das Bewertungsformular
$(document).ready(function () {
    // Überprüfe, ob das Bewertungsformular auf der Seite vorhanden ist
    if ($('#reviewForm').length > 0) {
        // Event-Handler für das Öffnen des Modals hinzufügen
        $('#reviewModal').on('show.bs.modal', function () {
            // Setze die Scroll-Position des Modals zurück zum Anfang und stelle sicher, dass das Modal vollständig sichtbar ist
            setTimeout(function() {
                $('.modal-body').scrollTop(0);
                // Stelle sicher, dass das Modal richtig angezeigt wird
                $('.modal-dialog').css({
                    'overflow': 'visible',
                    'margin-top': '2rem'
                });
                $('.modal-content').css({
                    'overflow': 'hidden',
                    'max-height': '90vh'
                });
                $('.modal-body').css({
                    'overflow-y': 'auto',
                    'max-height': 'calc(90vh - 120px)',
                    'display': 'block',
                    'padding-top': '1.5rem'
                });
                // Scrolle zum Anfang des Formulars, um sicherzustellen, dass das erste Feld sichtbar ist
                $('#CompanyName').focus();
            }, 500);
        });
        
        // Zusätzlicher Event-Handler für das vollständig geöffnete Modal
        $('#reviewModal').on('shown.bs.modal', function () {
            // Stelle sicher, dass die Formularfelder sichtbar sind
            $('.modal-dialog').css({
                'overflow': 'visible',
                'margin-top': '2rem'
            });
            $('.modal-content').css({
                'overflow': 'hidden',
                'max-height': '90vh'
            });
            $('.modal-body').css({
                'overflow-y': 'auto',
                'max-height': 'calc(90vh - 120px)',
                'display': 'block',
                'padding-top': '1.5rem'
            });
            // Scrolle zum Anfang des Formulars, um sicherzustellen, dass das erste Feld sichtbar ist
            $('#CompanyName').focus();
        });
        
        // Füge einen Submit-Handler zum Formular hinzu
        $('#reviewForm').on('submit', function (e) {
            // Überprüfe, ob eine Sternebewertung ausgewählt wurde
            if (!$('input[name="Rating"]:checked').val()) {
                // Wenn keine Bewertung ausgewählt wurde, verhindere das Absenden des Formulars
                e.preventDefault();
                
                // Zeige die Fehlermeldung an
                const errorMessage = "Bitte geben Sie Ihre Bewertung ab.";
                const errorElement = $('span[data-valmsg-for="Rating"]');
                
                if (errorElement.length > 0) {
                    errorElement.text(errorMessage).show();
                } else {
                    // Falls das Fehlerelement nicht existiert, versuche es mit dem asp-validation-for Element
                    const aspValidationElement = $('span[data-valmsg-for="Rating"], span.field-validation-valid[data-valmsg-for="Rating"]');
                    
                    if (aspValidationElement.length > 0) {
                        aspValidationElement.text(errorMessage).show();
                    } else {
                        // Als letzten Ausweg füge ein neues Element hinzu
                        $('.star-rating').after('<span class="text-danger d-block">' + errorMessage + '</span>');
                    }
                }
                
                // Scrolle zum Fehler, damit der Benutzer ihn sieht
                $('.star-rating')[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });
    }
});
