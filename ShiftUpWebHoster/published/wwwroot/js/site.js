// Please see documentation at https://learn.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

// Header-Fixierung mit reinem JavaScript (ohne jQuery-Abhängigkeit)
document.addEventListener('DOMContentLoaded', function() {
    // Variablen für Header-Funktionalität
    var header = document.querySelector('header');
    var navbar = document.querySelector('.navbar');
    var lastScrollTop = 0;
    var scrollThreshold = 10;
    
    // Stelle sicher, dass der Header fixiert ist
    function fixHeader() {
        if (header) {
            header.style.position = 'fixed';
            header.style.top = '0';
            header.style.left = '0';
            header.style.right = '0';
            header.style.width = '100%';
            header.style.zIndex = '1050';
        }
        
        if (navbar) {
            navbar.style.position = 'fixed';
            navbar.style.top = '0';
            navbar.style.left = '0';
            navbar.style.right = '0';
            navbar.style.width = '100%';
            navbar.style.zIndex = '1050';
        }
    }
    
    // Initialisiere den Header
    fixHeader();
    
    // Scroll-Event für Header-Verhalten
    window.addEventListener('scroll', function() {
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Stelle sicher, dass der Header immer fixiert bleibt
        fixHeader();
        
        // Header immer sichtbar halten, unabhängig von der Scroll-Richtung
        if (header) header.style.transform = 'translateY(0)';
        if (navbar) navbar.style.transform = 'translateY(0)';
        
        lastScrollTop = scrollTop;
    });

    
    // Validierung für das Bewertungsformular mit reinem JavaScript (ohne jQuery-Abhängigkeit)
    // Überprüfe, ob das Bewertungsformular auf der Seite vorhanden ist
    var reviewForm = document.getElementById('reviewForm');
    if (reviewForm) {
        // Event-Handler für das Öffnen des Modals hinzufügen
        var reviewModal = document.getElementById('reviewModal');
        if (reviewModal) {
            // Bootstrap-Modal-Events abfangen
            reviewModal.addEventListener('show.bs.modal', function () {
                // Scrolle die Seite nach oben, damit das Modal vollständig sichtbar ist
                window.scrollTo({ top: 0, behavior: 'smooth' });
                
                // Setze die Scroll-Position des Modals zurück zum Anfang und stelle sicher, dass das Modal vollständig sichtbar ist
                setTimeout(function() {
                    var modalBody = document.querySelector('.modal-body');
                    if (modalBody) modalBody.scrollTop = 0;
                    
                    // Stelle sicher, dass das Modal richtig angezeigt wird
                    var modalDialog = document.querySelector('.modal-dialog');
                    if (modalDialog) {
                        modalDialog.style.overflow = 'visible';
                        modalDialog.style.marginTop = '2rem';
                    }
                    
                    var modalContent = document.querySelector('.modal-content');
                    if (modalContent) {
                        modalContent.style.overflow = 'hidden';
                        modalContent.style.maxHeight = '90vh';
                    }
                    
                    if (modalBody) {
                        modalBody.style.overflowY = 'auto';
                        modalBody.style.maxHeight = 'calc(90vh - 120px)';
                        modalBody.style.display = 'block';
                        modalBody.style.paddingTop = '1.5rem';
                    }
                    
                    // Scrolle zum Anfang des Formulars, um sicherzustellen, dass das erste Feld sichtbar ist
                    var companyNameField = document.getElementById('CompanyName');
                    if (companyNameField) companyNameField.focus();
                }, 500);
            });
            
            // Zusätzlicher Event-Handler für das vollständig geöffnete Modal
            reviewModal.addEventListener('shown.bs.modal', function () {
                // Stelle sicher, dass die Formularfelder sichtbar sind
                var modalDialog = document.querySelector('.modal-dialog');
                if (modalDialog) {
                    modalDialog.style.overflow = 'visible';
                    modalDialog.style.marginTop = '2rem';
                }
                
                var modalContent = document.querySelector('.modal-content');
                if (modalContent) {
                    modalContent.style.overflow = 'hidden';
                    modalContent.style.maxHeight = '90vh';
                }
                
                var modalBody = document.querySelector('.modal-body');
                if (modalBody) {
                    modalBody.style.overflowY = 'auto';
                    modalBody.style.maxHeight = 'calc(90vh - 120px)';
                    modalBody.style.display = 'block';
                    modalBody.style.paddingTop = '1.5rem';
                }
                
                // Scrolle zum Anfang des Formulars, um sicherzustellen, dass das erste Feld sichtbar ist
                var companyNameField = document.getElementById('CompanyName');
                if (companyNameField) companyNameField.focus();
            });
        }
        
        // Füge einen Submit-Handler zum Formular hinzu
        reviewForm.addEventListener('submit', function (e) {
            // Überprüfe, ob eine Sternebewertung ausgewählt wurde
            var checkedRating = document.querySelector('input[name="Rating"]:checked');
            if (!checkedRating) {
                // Wenn keine Bewertung ausgewählt wurde, verhindere das Absenden des Formulars
                e.preventDefault();
                
                // Zeige die Fehlermeldung an
                var errorMessage = "Bitte geben Sie Ihre Bewertung ab.";
                var errorElement = document.querySelector('span[data-valmsg-for="Rating"]');
                
                if (errorElement) {
                    errorElement.textContent = errorMessage;
                    errorElement.style.display = 'block';
                } else {
                    // Falls das Fehlerelement nicht existiert, versuche es mit dem asp-validation-for Element
                    var aspValidationElement = document.querySelector('span[data-valmsg-for="Rating"], span.field-validation-valid[data-valmsg-for="Rating"]');
                    
                    if (aspValidationElement) {
                        aspValidationElement.textContent = errorMessage;
                        aspValidationElement.style.display = 'block';
                    } else {
                        // Als letzten Ausweg füge ein neues Element hinzu
                        var starRating = document.querySelector('.star-rating');
                        if (starRating) {
                            var errorSpan = document.createElement('span');
                            errorSpan.className = 'text-danger d-block';
                            errorSpan.textContent = errorMessage;
                            starRating.insertAdjacentElement('afterend', errorSpan);
                        }
                    }
                }
                
                // Scrolle zum Fehler, damit der Benutzer ihn sieht
                var starRating = document.querySelector('.star-rating');
                if (starRating) {
                    starRating.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
        });
    }
});
