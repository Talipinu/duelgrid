import { database } from './firebase';
import { ref, set, onValue, off, push, update } from 'firebase/database';
import { createInitialGameState } from '../game/logic/gameState';
import { PLAYERS } from '../game/types';

const GAME_ROOM_PATH = 'games';
const LOBBY_PATH = 'lobby';

/**
 * Multiplayer-Service für Online-Spiele
 */
class MultiplayerService {
  constructor() {
    this.gameRoomRef = null;
    this.gameStateListener = null;
    this.currentPlayerId = null;
    this.assignedPlayer = null;
  }

  /**
   * Erstellt oder tritt einem Spiel bei
   * @param {string} playerName - Name des Spielers (beliebiger Name)
   * @param {Function} onGameStateChange - Callback für Spielzustandsänderungen
   * @param {Function} onPlayerJoined - Callback wenn ein Spieler beitritt
   * @returns {Promise<string>} - Spielraum-ID
   */
  async joinOrCreateGame(playerName, onGameStateChange, onPlayerJoined) {
    this.currentPlayerId = playerName;
    
    // Suche nach einem offenen Spielraum
    const lobbyRef = ref(database, LOBBY_PATH);
    const lobbySnapshot = await new Promise((resolve) => {
      const listener = onValue(lobbyRef, (snapshot) => {
        off(lobbyRef, 'value', listener);
        resolve(snapshot);
      });
    });

    let gameRoomId = null;
    const lobby = lobbySnapshot.val() || {};

    // Suche nach einem Spielraum, der noch einen Spieler braucht
    for (const [roomId, room] of Object.entries(lobby)) {
      if (room.player1 && !room.player2 && room.player1 !== playerName) {
        gameRoomId = roomId;
        break;
      }
    }

    if (!gameRoomId) {
      // Erstelle einen neuen Spielraum
      gameRoomId = push(ref(database, LOBBY_PATH)).key;
      await set(ref(database, `${LOBBY_PATH}/${gameRoomId}`), {
        player1: playerName,
        player2: null,
        status: 'waiting',
        createdAt: Date.now(),
      });
    } else {
      // Trete einem bestehenden Spielraum bei
      await update(ref(database, `${LOBBY_PATH}/${gameRoomId}`), {
        player2: playerName,
        status: 'ready',
      });
    }

    // Warte auf den zweiten Spieler, falls nötig
    if (!gameRoomId) {
      throw new Error('Konnte keinen Spielraum erstellen');
    }

    // Bestimme welcher Spieler (PLAYER_1 oder PLAYER_2)
    const roomRef = ref(database, `${LOBBY_PATH}/${gameRoomId}`);
    const roomSnapshot = await new Promise((resolve) => {
      const listener = onValue(roomRef, (snapshot) => {
        off(roomRef, 'value', listener);
        resolve(snapshot);
      });
    });

    const room = roomSnapshot.val();
    this.assignedPlayer = room.player1 === playerName ? PLAYERS.PLAYER_1 : PLAYERS.PLAYER_2;

    // Setze Listener für Spieler-Beitritt und Spielstart
    const lobbyRoomRef = ref(database, `${LOBBY_PATH}/${gameRoomId}`);
    const lobbyListener = onValue(lobbyRoomRef, async (snapshot) => {
      const room = snapshot.val();
      if (!room) return;
      
      // Benachrichtige wenn beide Spieler da sind
      if (room.player1 && room.player2 && onPlayerJoined) {
        onPlayerJoined({
          player1: room.player1,
          player2: room.player2,
        });
      }
      
      // Starte das Spiel wenn beide Spieler da sind und es noch nicht gestartet wurde
      if (room.player1 && room.player2 && room.status === 'ready') {
        const initialGameState = createInitialGameState();
        await set(ref(database, `${GAME_ROOM_PATH}/${gameRoomId}`), {
          ...initialGameState,
          player1Name: room.player1,
          player2Name: room.player2,
        });
        await update(ref(database, `${LOBBY_PATH}/${gameRoomId}`), {
          status: 'playing',
        });
      }
    });

    // Setze Listener für Spielzustandsänderungen
    this.gameRoomRef = ref(database, `${GAME_ROOM_PATH}/${gameRoomId}`);
    this.gameStateListener = onValue(this.gameRoomRef, (snapshot) => {
      const gameState = snapshot.val();
      if (gameState && onGameStateChange) {
        onGameStateChange(gameState);
      }
    });

    return gameRoomId;
  }

  /**
   * Aktualisiert den Spielzustand
   * @param {string} gameRoomId - Spielraum-ID
   * @param {Object} gameState - Neuer Spielzustand
   */
  async updateGameState(gameRoomId, gameState) {
    if (!this.gameRoomRef) {
      this.gameRoomRef = ref(database, `${GAME_ROOM_PATH}/${gameRoomId}`);
    }
    await set(this.gameRoomRef, gameState);
  }

  /**
   * Gibt zurück, welcher Spieler dieser Client ist
   * @returns {string} - PLAYERS.PLAYER_1 oder PLAYERS.PLAYER_2
   */
  getAssignedPlayer() {
    return this.assignedPlayer;
  }

  /**
   * Gibt die Spieler-ID zurück
   * @returns {string} - Name des Spielers
   */
  getPlayerId() {
    return this.currentPlayerId;
  }

  /**
   * Trennt die Verbindung
   */
  disconnect() {
    if (this.gameStateListener) {
      off(this.gameRoomRef, 'value', this.gameStateListener);
      this.gameStateListener = null;
    }
    this.gameRoomRef = null;
    this.currentPlayerId = null;
    this.assignedPlayer = null;
  }
}

export default new MultiplayerService();

