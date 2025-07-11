# Lokale Schriftarten für ShiftUp WebWorks

## Roboto-Schriftart lokal einbinden

Diese Anleitung beschreibt, wie die Roboto-Schriftart lokal eingebunden werden kann, um die Abhängigkeit von Google Fonts zu vermeiden.

### Methode 1: Manuelles Herunterladen der Schriftarten

#### Schritt 1: Schriftarten herunterladen

Da google-webfonts-helper möglicherweise nicht verfügbar ist, können Sie die Schriftarten alternativ wie folgt herunterladen:

1. Besuchen Sie [Fontsource Roboto auf GitHub](https://github.com/fontsource/fontsource/tree/main/fonts/google/roboto)
2. Navigieren Sie zum Ordner `files` und laden Sie die benötigten WOFF2- und WOFF-Dateien herunter:
   - roboto-latin-300-normal.woff
   - roboto-latin-300-normal.woff2
   - roboto-latin-400-normal.woff
   - roboto-latin-400-normal.woff2
   - roboto-latin-500-normal.woff
   - roboto-latin-500-normal.woff2
   - roboto-latin-700-normal.woff
   - roboto-latin-700-normal.woff2

3. Alternativ können Sie die Schriftarten auch von [OnlineWebFonts](https://www.onlinewebfonts.com/download/0033a2fbc0329740fb86c1cfd134cb94) herunterladen.

#### Schritt 2: Dateien im Projekt platzieren

Kopieren Sie die heruntergeladenen Schriftartdateien in den Ordner `/wwwroot/fonts/`.

#### Schritt 3: CSS einbinden

Die CSS-Datei mit den @font-face-Deklarationen wurde bereits erstellt und in das Layout eingebunden:

- `/wwwroot/css/fonts.css` enthält die @font-face-Deklarationen
- In `_Layout.cshtml` wurde der Google Fonts-Link durch einen Link zur lokalen CSS-Datei ersetzt

### Methode 2: Verwendung von Fontsource (für NPM-Projekte)

Für Projekte, die NPM verwenden, ist [Fontsource](https://github.com/fontsource/fontsource) eine gute Alternative:

```bash
npm install @fontsource/roboto
```

Dann in der JavaScript-Datei importieren:

```javascript
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
```

Oder in SCSS/CSS:

```css
@import "~@fontsource/roboto/300.css";
@import "~@fontsource/roboto/400.css";
@import "~@fontsource/roboto/500.css";
@import "~@fontsource/roboto/700.css";
```

## Vorteile der lokalen Einbindung von Schriftarten

1. **Datenschutz**: Keine Datenübertragung an Google-Server, was DSGVO-konform ist.
2. **Performance**: Schnellere Ladezeiten durch Vermeidung zusätzlicher DNS-Auflösungen und TCP-Verbindungen.
3. **Versionskontrolle**: Die Schriftarten bleiben in der gewünschten Version und werden nicht automatisch von Google aktualisiert.
4. **Offline-Verfügbarkeit**: Die Schriftarten sind auch verfügbar, wenn keine Internetverbindung besteht.