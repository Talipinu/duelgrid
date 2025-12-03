/**
 * Spiel-Typen und Konstanten
 */

// Figurentypen
export const PIECE_TYPES = {
  KNIGHT: 'knight',
  GUARDIAN: 'guardian',
  ARCHER: 'archer',
  MAGE: 'mage',
  ROGUE: 'rogue',
  HEALER: 'healer',
};

// Spieler
export const PLAYERS = {
  PLAYER_1: 'player1',
  PLAYER_2: 'player2',
};

// Brettgröße
export const BOARD_SIZE = 6;

// Kampf-Ergebnisse (Rock-Paper-Scissors)
export const COMBAT_RESULT = {
  WIN: 'win',
  LOSE: 'lose',
  DRAW: 'draw',
};

/**
 * Figuren-Konfiguration
 * Jeder Typ hat Stärken/Schwächen gegen andere Typen
 */
export const PIECE_TYPE_CONFIG = {
  [PIECE_TYPES.KNIGHT]: {
    name: 'Ritter',
    beats: [PIECE_TYPES.ARCHER, PIECE_TYPES.ROGUE],
    losesTo: [PIECE_TYPES.MAGE, PIECE_TYPES.GUARDIAN],
  },
  [PIECE_TYPES.GUARDIAN]: {
    name: 'Wächter',
    beats: [PIECE_TYPES.KNIGHT, PIECE_TYPES.ROGUE],
    losesTo: [PIECE_TYPES.MAGE, PIECE_TYPES.ARCHER],
  },
  [PIECE_TYPES.ARCHER]: {
    name: 'Bogenschütze',
    beats: [PIECE_TYPES.GUARDIAN, PIECE_TYPES.HEALER],
    losesTo: [PIECE_TYPES.KNIGHT, PIECE_TYPES.ROGUE],
  },
  [PIECE_TYPES.MAGE]: {
    name: 'Magier',
    beats: [PIECE_TYPES.KNIGHT, PIECE_TYPES.GUARDIAN],
    losesTo: [PIECE_TYPES.ROGUE, PIECE_TYPES.HEALER],
  },
  [PIECE_TYPES.ROGUE]: {
    name: 'Schurke',
    beats: [PIECE_TYPES.MAGE, PIECE_TYPES.HEALER],
    losesTo: [PIECE_TYPES.KNIGHT, PIECE_TYPES.GUARDIAN],
  },
  [PIECE_TYPES.HEALER]: {
    name: 'Heiler',
    beats: [PIECE_TYPES.MAGE, PIECE_TYPES.ROGUE],
    losesTo: [PIECE_TYPES.ARCHER, PIECE_TYPES.KNIGHT],
  },
};

