# DuelGrid

Ein rundenbasiertes Handyspiel für zwei Spieler, entwickelt mit Expo + React Native.

## 🎮 Spielidee

**DuelGrid** ist ein taktisches Brettspiel für zwei Spieler:

- **6×6 Brett** (schachähnlich)
- **Zwei Spieler** mit je ca. 6 Figuren unterschiedlicher Typen
- **Hot-Seat Modus** - abwechselnd auf einem Gerät
- **Bewegung**: Figuren ziehen auf benachbarte Felder
- **Kampf**: Wenn eine Figur auf ein Feld mit einer gegnerischen Figur zieht → Kampf
- **Kampfmechanik**: Rock-Paper-Scissors (Stein/Papier/Schere)
  - Gewinner bleibt stehen
  - Verlierer wird entfernt / verliert HP (MVP: wird entfernt)

## 👥 Entwickler

- Stefan
- Finn

## 🚀 Entwicklung starten

### Voraussetzungen

- Node.js (>= 20.19.4)
- npm oder yarn
- Expo Go App auf dem Handy (iOS/Android)

### Installation

```bash
npm install
```

### Entwicklung starten

```bash
npm start
```

Dann:
- **iOS**: Drücke `i` im Terminal oder scanne QR-Code mit Camera App
- **Android**: Drücke `a` im Terminal oder scanne QR-Code mit Expo Go App
- **Web**: Drücke `w` im Terminal

### Verfügbare Scripts

- `npm start` - Startet den Expo Dev Server
- `npm run android` - Startet auf Android
- `npm run ios` - Startet auf iOS (nur macOS)
- `npm run web` - Startet im Browser

## 📁 Projektstruktur

```
duelgrid/
├── src/
│   ├── components/        # React-Komponenten
│   │   ├── board/        # Brett-Komponenten
│   │   ├── pieces/       # Figuren-Komponenten
│   │   └── ui/           # UI-Komponenten (Buttons, etc.)
│   ├── screens/          # Bildschirm-Komponenten
│   ├── game/             # Spiel-Logik
│   │   ├── logic/        # Spielregeln, Kampfsystem
│   │   └── types/        # TypeScript-Typen
│   ├── utils/            # Hilfsfunktionen
│   └── constants/        # Konstanten (Brettgröße, etc.)
├── assets/               # Bilder, Sounds, etc.
├── App.js                # Haupt-App-Komponente
└── package.json
```

## 🎯 Figurentypen

- **Knight** (Ritter) - Nahkampf
- **Guardian** (Wächter) - Verteidigung
- **Archer** (Bogenschütze) - Fernkampf
- **Mage** (Magier) - Magie
- **Rogue** (Schurke) - Geschwindigkeit
- **Healer** (Heiler) - Unterstützung

## 🎲 Kampfsystem

Rock-Paper-Scissors Mechanik:
- Jeder Figurentyp hat eine Stärke gegen bestimmte andere Typen
- Beispiel: Knight schlägt Archer, verliert gegen Mage, etc.

## 📝 Entwicklungshinweise

- **Hot-Seat**: Spieler wechseln sich ab, daher muss der aktuelle Spieler klar angezeigt werden
- **MVP**: Verlierer wird komplett entfernt (später: HP-System)
- **Bewegung**: Nur auf benachbarte Felder (orthogonal + diagonal)

## 🔄 Git Workflow

1. Erstelle einen Branch für deine Features: `git checkout -b feature/mein-feature`
2. Committe regelmäßig: `git commit -m "Beschreibung"`
3. Pushe deinen Branch: `git push origin feature/mein-feature`
4. Erstelle einen Pull Request auf GitHub

## 📄 Lizenz

[Zu definieren]

