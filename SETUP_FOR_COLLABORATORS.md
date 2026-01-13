# DuelGrid - Setup für neue Entwickler

Diese Anleitung erklärt, wie du DuelGrid auf deinem Computer einrichtest.

## 📥 Projekt herunterladen

### Option 1: Mit Git klonen (empfohlen)

1. Öffne ein Terminal (PowerShell auf Windows, Terminal auf Mac/Linux)
2. Navigiere zu dem Ordner, wo du das Projekt speichern möchtest:
   ```bash
   cd C:\Users\DeinName\Documents
   ```
3. Klone das Repository:
   ```bash
   git clone https://github.com/Talipinu/duelgrid.git
   ```
4. Wechsle in den Projektordner:
   ```bash
   cd duelgrid
   ```

### Option 2: Als ZIP herunterladen

1. Gehe zu https://github.com/Talipinu/duelgrid
2. Klicke auf den grünen Button "Code" → "Download ZIP"
3. Entpacke die ZIP-Datei
4. Öffne ein Terminal im entpackten Ordner

## 🔧 Voraussetzungen installieren

### 1. Node.js installieren

- Gehe zu https://nodejs.org/
- Lade die **LTS-Version** herunter (empfohlen: Version 20.x oder höher)
- Installiere Node.js mit den Standard-Einstellungen
- Überprüfe die Installation:
  ```bash
  node --version
  npm --version
  ```

### 2. Expo CLI (optional, aber empfohlen)

```bash
npm install -g expo-cli
```

## 📦 Projekt einrichten

1. Installiere alle Abhängigkeiten:
   ```bash
   npm install
   ```
   
   Das kann ein paar Minuten dauern.

2. **Wichtig:** Firebase konfigurieren (siehe `FIREBASE_SETUP.md`)
   - Öffne `src/services/firebase.js`
   - Trage deine Firebase-Credentials ein (frage Stefan oder Finn nach den Zugangsdaten)

## 🚀 Projekt starten

```bash
npm start
```

Das öffnet den Expo Dev Server. Du siehst dann:
- Einen QR-Code zum Scannen mit der Expo Go App
- Optionen zum Starten:
  - `i` für iOS Simulator (nur Mac)
  - `a` für Android Emulator
  - `w` für Web-Browser

## 📱 Auf dem Handy testen

1. Installiere die **Expo Go** App:
   - iOS: App Store → "Expo Go"
   - Android: Play Store → "Expo Go"

2. Scanne den QR-Code:
   - **iOS**: Öffne die Kamera-App und scanne den Code
   - **Android**: Öffne Expo Go und scanne den Code

3. Die App sollte jetzt auf deinem Handy laden!

## 🛠️ Entwicklung

### Wichtige Befehle

```bash
npm start          # Startet den Dev Server
npm run android    # Startet auf Android
npm run ios        # Startet auf iOS (nur Mac)
npm run web        # Startet im Browser
npm run start:tunnel  # Startet mit Tunnel-Modus (für verschiedene Netzwerke)
```

### Projektstruktur

```
duelgrid/
├── src/
│   ├── components/     # React-Komponenten
│   ├── screens/        # Bildschirm-Komponenten
│   ├── game/           # Spiel-Logik
│   ├── services/       # Firebase, Multiplayer
│   └── constants/      # Konstanten
├── App.js              # Haupt-App
└── package.json        # Dependencies
```

## 🔄 Git Workflow

Wenn du Änderungen machen möchtest:

1. Erstelle einen neuen Branch:
   ```bash
   git checkout -b feature/dein-feature-name
   ```

2. Mache deine Änderungen

3. Committe deine Änderungen:
   ```bash
   git add .
   git commit -m "Beschreibung deiner Änderungen"
   ```

4. Pushe deinen Branch:
   ```bash
   git push origin feature/dein-feature-name
   ```

5. Erstelle einen Pull Request auf GitHub

## ❓ Probleme?

### "Port 8081 is already in use"
- Ein anderer Prozess nutzt den Port
- Lösung: Beende andere Expo-Prozesse oder verwende `npm run start:tunnel`

### "Cannot find module"
- Dependencies fehlen
- Lösung: `npm install` erneut ausführen

### QR-Code funktioniert nicht
- Beide Geräte müssen im gleichen WLAN sein
- Oder verwende `npm run start:tunnel`

### Firebase-Fehler
- Überprüfe die Firebase-Konfiguration in `src/services/firebase.js`
- Stelle sicher, dass die Datenbank-Regeln korrekt gesetzt sind

## 📞 Hilfe

Bei Fragen:
- Stefan
- Finn
- GitHub Issues: https://github.com/Talipinu/duelgrid/issues

Viel Erfolg! 🚀

