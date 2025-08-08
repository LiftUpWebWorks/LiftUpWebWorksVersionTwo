var klaroConfig = {
    version: 1,
    elementID: 'klaro',
    noAutoLoad: false,
    htmlTexts: true,
    embedded: false,
    groupByPurpose: true,
    storageMethod: 'cookie',
    cookieName: 'klaro',
    cookieExpiresAfterDays: 365,
    default: false,
    mustConsent: true,
    acceptAll: true,
    hideDeclineAll: false,
    hideLearnMore: false,
    noticeAsModal: false,
    disablePoweredBy: true,
    // Position des Banners festlegen (top oder bottom)
    position: 'top',
    additionalClass: 'cookie-notice-visible',
    translations: {
        de: {
            privacyPolicyUrl: '/datenschutz',
            consentModal: {
                title: 'Cookie-Einstellungen',
                description: 'Hier können Sie Ihre Cookie-Einstellungen verwalten.'
            },
            consentNotice: {
                description: 'Wir verwenden Cookies, um Inhalte und Anzeigen zu personalisieren, Funktionen für soziale Medien bereitzustellen und unseren Verkehr zu analysieren. Wir teilen auch Informationen über Ihre Nutzung unserer Website mit unseren Partnern für soziale Medien, Werbung und Analysen.',
                learnMore: 'Mehr erfahren'
            },
            decline: 'Nur essenzielle akzeptieren',
            ok: 'Alle akzeptieren',
            save: 'Auswahl speichern',
            close: 'Schließen',
            purposes: {
                essential: {
                    title: 'Essentiell',
                    description: 'Diese Dienste sind für die korrekte Funktion dieser Website unerlässlich.'
                },
                analytics: {
                    title: 'Analytics',
                    description: 'Dienste zur Sammlung statistischer Daten über die Nutzung der Website.'
                },
                marketing: {
                    title: 'Marketing',
                    description: 'Dienste zur Anzeige relevanter Werbung.'
                },
                external_media: {
                    title: 'Externe Medien',
                    description: 'Inhalte von Videoplattformen und Social-Media-Plattformen.'
                }
            }
        }
    },
    services: [
        {
            name: 'essential',
            title: 'Essentielle Cookies',
            purposes: ['essential'],
            required: true,
            description: 'Diese Cookies sind für die grundlegenden Funktionen der Website erforderlich.'
        },
        {
            name: 'font-awesome',
            title: 'Font Awesome',
            purposes: ['essential'],
            required: true
        },
        {
            name: 'aos',
            title: 'AOS Animation Library',
            purposes: ['essential'],
            required: true
        },
        {
            name: 'google-analytics',
            title: 'Google Analytics',
            purposes: ['analytics'],
            cookies: [/^_ga/, /^_gid/, /^_gat/],
            default: false,
            description: 'Google Analytics hilft uns zu verstehen, wie Besucher mit unserer Website interagieren.'
        },
        {
            name: 'google-ads',
            title: 'Google Ads',
            purposes: ['marketing'],
            default: false,
            description: 'Google Ads hilft uns, relevante Werbung für unsere Dienste anzuzeigen.'
        },
        {
            name: 'google-maps',
            title: 'Google Maps',
            purposes: ['external_media'],
            default: false,
            description: 'Externe Medien wie Google Maps werden erst nach Ihrer Zustimmung geladen.'
        }
    ]
};