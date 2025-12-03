# GitHub Setup

## Repository auf GitHub erstellen

1. Gehe zu [GitHub](https://github.com) und erstelle ein neues Repository:
   - Name: `duelgrid`
   - Beschreibung: "Rundenbasiertes Handyspiel für zwei Spieler"
   - Öffentlich oder privat (wie ihr es möchtet)
   - **WICHTIG**: Erstelle KEIN README, keine .gitignore, keine Lizenz (das haben wir schon)

2. Nach dem Erstellen zeigt GitHub dir Befehle an. Führe diese aus:

```bash
cd /home/stefan/duelgrid

# Füge das GitHub-Repository als Remote hinzu
git remote add origin https://github.com/DEIN-USERNAME/duelgrid.git

# Pushe den Code
git branch -M main
git push -u origin main
```

## Für Finn: Repository klonen

Wenn Stefan das Repository erstellt und gepusht hat:

```bash
# Klone das Repository
git clone https://github.com/STEFANS-USERNAME/duelgrid.git

# Gehe ins Verzeichnis
cd duelgrid

# Installiere Dependencies
npm install

# Starte die App
npm start
```

## Zusammenarbeit

### Stefan und Finn arbeiten parallel

1. **Vor dem Starten:**
   ```bash
   git pull origin main
   ```

2. **Während der Arbeit:**
   - Erstelle einen Branch: `git checkout -b feature/mein-feature`
   - Committe regelmäßig: `git commit -m "Beschreibung"`
   - Pushe deinen Branch: `git push origin feature/mein-feature`

3. **Pull Request erstellen:**
   - Gehe auf GitHub
   - Erstelle einen Pull Request von deinem Branch zu `main`
   - Beschreibe was du gemacht hast
   - Warte auf Review

4. **Nach dem Merge:**
   ```bash
   git checkout main
   git pull origin main
   ```

### Konflikte vermeiden

- Arbeite an verschiedenen Features gleichzeitig
- Committe und pushe regelmäßig
- Kommuniziere, an was du arbeitest
- Bei Konflikten: Ruhe bewahren, zusammen lösen

## Nützliche Git-Befehle

```bash
# Status anzeigen
git status

# Änderungen anzeigen
git diff

# Letzte Commits anzeigen
git log --oneline

# Branch wechseln
git checkout branch-name

# Alle Branches anzeigen
git branch -a

# Remote-Repository aktualisieren
git fetch origin

# Änderungen holen und mergen
git pull origin main
```

