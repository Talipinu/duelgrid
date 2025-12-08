/**
 * Hilfsfunktionen
 */

/**
 * Prüft ob eine Position innerhalb des Bretts liegt
 * @param {number} row - Zeile
 * @param {number} col - Spalte
 * @param {number} boardSize - Größe des Bretts
 * @returns {boolean}
 */
export function isValidPosition(row, col, boardSize = 6) {
  return row >= 0 && row < boardSize && col >= 0 && col < boardSize;
}

/**
 * Formatiert Spielernamen für die Anzeige
 * @param {string} player - PLAYERS.PLAYER_1 oder PLAYERS.PLAYER_2
 * @returns {string}
 */
export function formatPlayerName(player) {
  return player === 'player1' ? 'Spieler 1' : 'Spieler 2';
}











