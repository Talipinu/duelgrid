# Wie funktioniert DuelGrid Multiplayer?

## 🎮 Übersicht

DuelGrid verwendet **Firebase Realtime Database** als zentrale Verbindungsstelle. Das bedeutet:
- ✅ Funktioniert über **Internet** (nicht nur lokales WLAN)
- ✅ Spieler können von überall spielen
- ✅ Automatische Synchronisation des Spielzustands
- ✅ Echtzeit-Updates zwischen beiden Geräten

## 🔄 So funktioniert die Spieler-Suche

### Schritt 1: Spieler gibt seinen Namen ein
- Du öffnest die App und siehst ein Textfeld
- Du gibst deinen Namen ein (z.B. "Stefan", "Finn", "Lewin" oder jeder andere Name)
- Du klickst auf "Spiel beitreten"

### Schritt 2: Lobby-System
Die App macht folgendes:
1. **Prüft Firebase**: Gibt es einen offenen Spielraum, der noch einen Spieler braucht?
2. **Wenn JA**: Tritt diesem Spielraum bei
3. **Wenn NEIN**: Erstellt einen neuen Spielraum und wartet auf einen zweiten Spieler

### Schritt 3: Automatische Verbindung
- Wenn ein zweiter Spieler ebenfalls die App öffnet und seinen Namen eingibt
- Findet die App automatisch den offenen Spielraum
- Verbindet beide Spieler automatisch

### Schritt 4: Spiel startet
- Sobald beide Spieler verbunden sind, startet das Spiel automatisch
- Beide sehen das gleiche Brett
- Der Spieler, der zuerst beigetreten ist, beginnt (PLAYER_1)

## 📡 Technische Details

### Firebase-Struktur

```
Firebase Realtime Database
├── lobby/
│   └── [gameRoomId]/
│       ├── player1: "Stefan"
│       ├── player2: "Finn" (oder null)
│       └── status: "waiting" | "ready" | "playing"
└── games/
    └── [gameRoomId]/
        ├── board: [...]
        ├── pieces: {...}
        ├── currentPlayer: "player1"
        └── ...
```

### Ablauf im Code

1. **LobbyScreen.js**: Spieler wählt Namen → ruft `multiplayerService.joinOrCreateGame()` auf
2. **multiplayer.js**: 
   - Sucht nach offenem Spielraum in Firebase
   - Erstellt neuen Raum oder tritt bestehendem bei
   - Setzt Listener für Änderungen
3. **GameScreen.js**: 
   - Empfängt Spielzustand von Firebase
   - Zeigt nur Züge an, wenn Spieler am Zug ist
   - Sendet Züge an Firebase

## 🌐 WLAN vs. Internet

**Wichtig:** Das System funktioniert **nicht** über lokales WLAN, sondern über **Firebase (Internet)**.

- ✅ Beide Geräte müssen **Internet** haben
- ✅ Sie können im **gleichen WLAN** sein (funktioniert)
- ✅ Sie können in **verschiedenen Netzwerken** sein (funktioniert auch!)
- ✅ Sie können sogar in **verschiedenen Ländern** sein (funktioniert auch!)

Das WLAN ist nur für die **Expo-Verbindung** wichtig (zum Laden der App), nicht für die Multiplayer-Verbindung.

## 👥 Freie Namenseingabe

**Aktueller Stand:**
- ✅ Jeder kann seinen eigenen Namen eingeben
- ✅ Mindestens 2 Zeichen, maximal 20 Zeichen
- ✅ Keine Einschränkungen - jeder Name ist erlaubt

## 🚀 So spielt ihr zusammen (wenn Lewin im gleichen WLAN ist)

### Voraussetzungen:
1. ✅ Beide haben die App installiert (`npm install`)
2. ✅ Beide haben Firebase konfiguriert (gleiche Credentials!)
3. ✅ Beide starten die App (`npm start`)
4. ✅ Beide scannen den QR-Code mit Expo Go

### Ablauf:
1. **Du**: Öffnest die App → Gibst deinen Namen ein (z.B. "Stefan") → Klickst "Spiel beitreten" → Wartest
2. **Lewin**: Öffnet die App → Gibt seinen Namen ein (z.B. "Lewin") → Klickst "Spiel beitreten"
3. **Automatisch**: Beide werden verbunden, Spiel startet!

### Timing:
- Es ist egal, wer zuerst startet
- Der erste Spieler wartet, bis der zweite beitritt
- Sobald beide da sind, startet das Spiel sofort

## ✅ Fertig!

Das System unterstützt jetzt beliebige Spielernamen. Jeder kann seinen eigenen Namen eingeben und mitspielen!

