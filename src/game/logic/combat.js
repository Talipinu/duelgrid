import { COMBAT_RESULT, PIECE_TYPE_CONFIG } from '../types';

/**
 * Berechnet das Ergebnis eines Kampfes zwischen zwei Figuren
 * @param {string} attackerType - Typ der angreifenden Figur
 * @param {string} defenderType - Typ der verteidigenden Figur
 * @returns {string} - COMBAT_RESULT.WIN, COMBAT_RESULT.LOSE oder COMBAT_RESULT.DRAW
 */
export function calculateCombatResult(attackerType, defenderType) {
  const attackerConfig = PIECE_TYPE_CONFIG[attackerType];
  const defenderConfig = PIECE_TYPE_CONFIG[defenderType];

  if (!attackerConfig || !defenderConfig) {
    return COMBAT_RESULT.DRAW;
  }

  // Prüfe ob Angreifer den Verteidiger schlägt
  if (attackerConfig.beats.includes(defenderType)) {
    return COMBAT_RESULT.WIN;
  }

  // Prüfe ob Verteidiger den Angreifer schlägt
  if (defenderConfig.beats.includes(attackerType)) {
    return COMBAT_RESULT.LOSE;
  }

  // Unentschieden (beide schlagen sich nicht)
  return COMBAT_RESULT.DRAW;
}

/**
 * Prüft ob zwei Positionen benachbart sind
 * @param {Object} pos1 - {row, col}
 * @param {Object} pos2 - {row, col}
 * @returns {boolean}
 */
export function areAdjacent(pos1, pos2) {
  const rowDiff = Math.abs(pos1.row - pos2.row);
  const colDiff = Math.abs(pos1.col - pos2.col);
  
  // Benachbart = maximal 1 Feld entfernt (orthogonal oder diagonal)
  return rowDiff <= 1 && colDiff <= 1 && !(rowDiff === 0 && colDiff === 0);
}

