# Firebase Setup für DuelGrid Multiplayer

Um das Multiplayer-Feature zu nutzen, musst du Firebase Realtime Database einrichten.

## Schritt 1: Firebase-Projekt erstellen

1. Gehe zu https://console.firebase.google.com
2. Klicke auf "Projekt hinzufügen" oder "Add project"
3. Gib einen Projektnamen ein (z.B. "duelgrid")
4. Folge den Anweisungen (Google Analytics ist optional)

## Schritt 2: Realtime Database aktivieren

1. Im Firebase Console, gehe zu "Realtime Database" im linken Menü
2. Klicke auf "Database erstellen" / "Create Database"
3. Wähle "Testmodus" / "Test mode" (für Entwicklung)
4. Wähle eine Region (z.B. "europe-west1" für Deutschland)
5. Klicke auf "Fertig" / "Done"

## Schritt 3: Firebase-Konfiguration kopieren

1. Im Firebase Console, klicke auf das Zahnrad-Symbol ⚙️ neben "Projektübersicht"
2. Wähle "Projekteinstellungen" / "Project settings"
3. Scrolle nach unten zu "Deine Apps" / "Your apps"
4. Klicke auf das Web-Symbol `</>` um eine Web-App hinzuzufügen
5. Gib einen App-Namen ein (z.B. "DuelGrid")
6. Kopiere die Firebase-Konfiguration (sie sieht so aus):

```javascript
const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "your-project.firebaseapp.com",
  databaseURL: "https://your-project-default-rtdb.firebaseio.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```

## Schritt 4: Konfiguration in die App einfügen

1. Öffne `src/services/firebase.js`
2. Ersetze die Platzhalter-Werte mit deinen echten Firebase-Credentials:

```javascript
const firebaseConfig = {
  apiKey: "DEINE_API_KEY",
  authDomain: "DEIN_PROJEKT.firebaseapp.com",
  databaseURL: "https://DEIN_PROJEKT-default-rtdb.firebaseio.com",
  projectId: "DEIN_PROJEKT_ID",
  storageBucket: "DEIN_PROJEKT.appspot.com",
  messagingSenderId: "DEINE_SENDER_ID",
  appId: "DEINE_APP_ID"
};
```

## Schritt 5: Datenbank-Regeln setzen

1. Im Firebase Console, gehe zu "Realtime Database"
2. Klicke auf den Tab "Regeln" / "Rules"
3. Ersetze die Regeln mit folgendem (für Entwicklung):

```json
{
  "rules": {
    "games": {
      ".read": true,
      ".write": true
    },
    "lobby": {
      ".read": true,
      ".write": true
    }
  }
}
```

4. Klicke auf "Veröffentlichen" / "Publish"

**Wichtig:** Diese Regeln sind nur für Entwicklung! Für Produktion solltest du Authentifizierung hinzufügen.

## Schritt 6: Testen

1. Starte die App auf beiden Geräten: `npm start`
2. Wähle auf einem Gerät "Stefan" und auf dem anderen "Finn"
3. Die App sollte automatisch beide Spieler verbinden und das Spiel starten

## Troubleshooting

- **Fehler "Permission denied"**: Überprüfe die Datenbank-Regeln
- **Keine Verbindung**: Stelle sicher, dass beide Geräte Internet haben
- **Spieler findet sich nicht**: Warte ein paar Sekunden oder starte beide Apps neu

## Kosten

Firebase Realtime Database hat ein kostenloses Kontingent:
- 1 GB Speicher
- 10 GB pro Monat übertragene Daten
- 100 gleichzeitige Verbindungen

Das sollte für Entwicklung und kleine Spiele völlig ausreichen!

