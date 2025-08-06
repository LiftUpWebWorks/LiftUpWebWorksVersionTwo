// Deutsche Übersetzung der jQuery Validate Fehlermeldungen
$(function() {
    // Überprüfen, ob jQuery und jQuery Validate verfügbar sind
    if ($ && $.validator && $.validator.messages) {
        $.extend($.validator.messages, {
            required: "Dieses Feld ist erforderlich.",
            remote: "Bitte korrigieren Sie dieses Feld.",
            email: "Bitte geben Sie eine gültige E-Mail-Adresse ein.",
            url: "Bitte geben Sie eine gültige URL ein.",
            date: "Bitte geben Sie ein gültiges Datum ein.",
            dateISO: "Bitte geben Sie ein gültiges Datum im ISO-Format ein.",
            number: "Bitte geben Sie eine gültige Nummer ein.",
            digits: "Bitte geben Sie nur Ziffern ein.",
            creditcard: "Bitte geben Sie eine gültige Kreditkartennummer ein.",
            equalTo: "Bitte geben Sie den gleichen Wert erneut ein.",
            accept: "Bitte geben Sie einen Wert mit einer gültigen Erweiterung ein.",
            maxlength: $.validator.format("Bitte geben Sie nicht mehr als {0} Zeichen ein."),
            minlength: $.validator.format("Bitte geben Sie mindestens {0} Zeichen ein."),
            rangelength: $.validator.format("Bitte geben Sie einen Wert zwischen {0} und {1} Zeichen ein."),
            range: $.validator.format("Bitte geben Sie einen Wert zwischen {0} und {1} ein."),
            max: $.validator.format("Bitte geben Sie einen Wert kleiner oder gleich {0} ein."),
            min: $.validator.format("Bitte geben Sie einen Wert größer oder gleich {0} ein.")
        });
    } else {
        console.log('jQuery Validate ist nicht verfügbar. Die Lokalisierung wurde nicht geladen.');
    }
});