// Config für Klaro!
window.klaroConfig = {
    // Muss true sein, damit Cookies nur nach Zustimmung gesetzt werden
    acceptAll: true,
    
    // URL zur Datenschutzerklärung
    privacyPolicy: 'https://liftup-webworks.de/Home/Privacy',
    
    // Cookie-Banner Einstellungen
    noticeAsModal: false,
    storageMethod: 'cookie',
    cookieName: 'klaro',
    cookieExpiresAfterDays: 365,
    default: false,
    mustConsent: true,
    hideDeclineAll: false,
    hideLearnMore: false,
    noAutoLoad: false,
    additionalClass: 'cookie-notice-visible',
    // Position des Banners festlegen (top oder bottom)
    position: 'top',

    // Übersetzungen
    translations: {
        de: {
            privacyPolicyUrl: 'https://liftup-webworks.de/Home/Privacy',
            consentModal: {
                title: 'Datenschutzeinstellungen',
                description: 'Hier können Sie einsehen und anpassen, welche Informationen wir über Sie sammeln. Einträge die als "Essential" gekennzeichnet sind, werden für den grundlegenden Funktionsumfang der Website benötigt.',
            },
            purposes: {
                essential: 'Essential',
                statistics: 'Statistik',
                marketing: 'Marketing',
                external_media: 'Externe Medien'
            },
            ok: "Alle akzeptieren",
            save: "Auswahl speichern",
            decline: "Nur essenzielle akzeptieren",
            close: "Schließen",
            service: {
                purpose: 'Zweck',
                purposes: 'Zwecke',
                required: {
                    title: '(erforderlich)',
                    description: 'Diese Technologien sind für die Kernfunktionalität der Webseite erforderlich',
                }
            }
        }
    },

    // Services/Cookies die wir verwenden
    services: [{
        name: 'essential',
        title: 'Essentielle Cookies',
        purposes: ['essential'],
        required: true,
        description: 'Diese Cookies sind für die grundlegenden Funktionen der Website erforderlich.'
    },
    {
        name: 'google-analytics',
        title: 'Google Analytics',
        purposes: ['statistics'],
        cookies: [
            /^_ga/,
            /^_gid/,
            /^_gat/
        ],
        required: false,
        description: 'Google Analytics hilft uns zu verstehen, wie Besucher mit unserer Website interagieren.'
    },
    {
        name: 'google-ads',
        title: 'Google Ads',
        purposes: ['marketing'],
        required: false,
        description: 'Google Ads hilft uns, relevante Werbung für unsere Dienste anzuzeigen.'
    },
    {
        name: 'external-media',
        title: 'Externe Medien',
        purposes: ['external_media'],
        required: false,
        description: 'Externe Medien wie YouTube, Google Maps oder Instagram werden erst nach Ihrer Zustimmung geladen.'
    }]
};