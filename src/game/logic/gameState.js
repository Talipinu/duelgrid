import { BOARD_SIZE, PLAYERS, PIECE_TYPES } from '../types';

/**
 * Initialisiert einen neuen Spielzustand
 */
export function createInitialGameState() {
  return {
    board: createEmptyBoard(),
    currentPlayer: PLAYERS.PLAYER_1,
    pieces: {
      [PLAYERS.PLAYER_1]: createInitialPieces(PLAYERS.PLAYER_1),
      [PLAYERS.PLAYER_2]: createInitialPieces(PLAYERS.PLAYER_2),
    },
    selectedPiece: null,
    gameOver: false,
    winner: null,
  };
}

/**
 * Erstellt ein leeres 6x6 Brett
 */
function createEmptyBoard() {
  const board = [];
  for (let row = 0; row < BOARD_SIZE; row++) {
    board[row] = [];
    for (let col = 0; col < BOARD_SIZE; col++) {
      board[row][col] = null;
    }
  }
  return board;
}

/**
 * Erstellt die initialen Figuren für einen Spieler
 * @param {string} player - PLAYERS.PLAYER_1 oder PLAYERS.PLAYER_2
 */
function createInitialPieces(player) {
  const pieces = [];
  const pieceTypes = [
    PIECE_TYPES.KNIGHT,
    PIECE_TYPES.GUARDIAN,
    PIECE_TYPES.ARCHER,
    PIECE_TYPES.MAGE,
    PIECE_TYPES.ROGUE,
    PIECE_TYPES.HEALER,
  ];

  // Spieler 1 startet oben, Spieler 2 unten
  const startRow = player === PLAYERS.PLAYER_1 ? 0 : BOARD_SIZE - 1;
  const endRow = player === PLAYERS.PLAYER_1 ? 2 : BOARD_SIZE - 3;

  let pieceIndex = 0;
  for (let row = startRow; row <= endRow; row++) {
    for (let col = 0; col < BOARD_SIZE; col++) {
      if (pieceIndex < pieceTypes.length) {
        pieces.push({
          id: `${player}-${pieceIndex}`,
          type: pieceTypes[pieceIndex],
          player: player,
          row: row,
          col: col,
        });
        pieceIndex++;
      }
    }
  }

  return pieces;
}

/**
 * Wechselt zum nächsten Spieler
 */
export function switchPlayer(currentPlayer) {
  return currentPlayer === PLAYERS.PLAYER_1 
    ? PLAYERS.PLAYER_2 
    : PLAYERS.PLAYER_1;
}











