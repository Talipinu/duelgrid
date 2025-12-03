# Contributing Guide

## Git Workflow für Stefan und Finn

### 1. Vor dem Arbeiten

```bash
# Stelle sicher, dass du auf dem neuesten Stand bist
git pull origin main

# Erstelle einen neuen Branch für dein Feature
git checkout -b feature/mein-feature-name
```

### 2. Während der Entwicklung

```bash
# Committe regelmäßig deine Änderungen
git add .
git commit -m "Beschreibung was du gemacht hast"

# Beispiel:
git commit -m "Add piece movement validation"
git commit -m "Fix combat calculation bug"
```

**Commit-Nachrichten sollten:**
- Auf Deutsch oder Englisch sein
- Kurz und präzise beschreiben, was geändert wurde
- Im Imperativ stehen (z.B. "Add" statt "Added")

### 3. Feature fertig?

```bash
# Stelle sicher, dass alles committed ist
git status

# Pushe deinen Branch
git push origin feature/mein-feature-name
```

Dann auf GitHub:
1. Gehe zum Repository
2. Erstelle einen Pull Request
3. Beschreibe was du gemacht hast
4. Warte auf Review vom anderen

### 4. Nach dem Merge

```bash
# Wechsle zurück zu main
git checkout main

# Hole die neuesten Änderungen
git pull origin main

# Lösche deinen alten Branch (optional)
git branch -d feature/mein-feature-name
```

## Code-Stil

- **Komponenten**: PascalCase (z.B. `GameBoard.js`)
- **Funktionen**: camelCase (z.B. `calculateCombatResult`)
- **Konstanten**: UPPER_SNAKE_CASE (z.B. `BOARD_SIZE`)
- **Kommentare**: Auf Deutsch oder Englisch, je nachdem was passt

## Branch-Namen

- `feature/` - Neue Features (z.B. `feature/combat-system`)
- `fix/` - Bugfixes (z.B. `fix/piece-movement`)
- `refactor/` - Code-Verbesserungen (z.B. `refactor/game-state`)

## Fragen?

Wenn du unsicher bist, frag einfach! Es ist besser zu fragen als etwas Falsches zu machen.

