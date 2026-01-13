import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { COLORS } from '../constants';
import { PLAYERS } from '../game/types';
import { createInitialGameState, switchPlayer } from '../game/logic/gameState';
import { calculateCombatResult, areAdjacent } from '../game/logic/combat';
import GameBoard from '../components/board/GameBoard';
import multiplayerService from '../services/multiplayer';
import { ref, onValue, off, set } from 'firebase/database';
import { database } from '../services/firebase';

/**
 * Haupt-Spielbildschirm (Multiplayer)
 */
export default function GameScreen({ gameRoomId, playerName, initialGameState }) {
  const [gameState, setGameState] = useState(initialGameState || createInitialGameState());
  const [isMyTurn, setIsMyTurn] = useState(false);
  
  const assignedPlayer = multiplayerService.getAssignedPlayer();
  
  useEffect(() => {
    if (!gameRoomId) return;
    
    // Synchronisiere Spielzustand von Firebase
    const gameRef = ref(database, `games/${gameRoomId}`);
    const listener = onValue(gameRef, (snapshot) => {
      const remoteGameState = snapshot.val();
      if (remoteGameState) {
        setGameState(remoteGameState);
        // Prüfe ob ich am Zug bin
        setIsMyTurn(remoteGameState.currentPlayer === assignedPlayer);
      }
    });
    
    return () => {
      off(gameRef, 'value', listener);
    };
  }, [gameRoomId, assignedPlayer]);
  
  // Initialisiere isMyTurn
  useEffect(() => {
    if (gameState) {
      setIsMyTurn(gameState.currentPlayer === assignedPlayer);
    }
  }, [gameState, assignedPlayer]);

  const handleCellPress = useCallback((row, col) => {
    // Prüfe ob ich am Zug bin
    if (!isMyTurn) {
      Alert.alert('Nicht dein Zug', 'Warte bis dein Gegner gezogen hat.');
      return;
    }
    
    const { selectedPiece, currentPlayer, pieces } = gameState;
    const currentPlayerPieces = pieces[currentPlayer];
    const pieceAtCell = currentPlayerPieces.find(p => p.row === row && p.col === col);

    // Wenn eine eigene Figur angeklickt wird, selektiere sie
    if (pieceAtCell && pieceAtCell.player === currentPlayer) {
      const newState = {
        ...gameState,
        selectedPiece: pieceAtCell,
      };
      setGameState(newState);
      updateGameState(newState);
      return;
    }

    // Wenn keine Figur selektiert ist, nichts tun
    if (!selectedPiece) {
      return;
    }

    // Prüfe ob das Ziel-Feld benachbart ist
    if (!areAdjacent({ row: selectedPiece.row, col: selectedPiece.col }, { row, col })) {
      Alert.alert('Ungültiger Zug', 'Du kannst nur auf benachbarte Felder ziehen!');
      return;
    }

    // Prüfe ob auf dem Ziel-Feld eine gegnerische Figur steht
    const opponent = currentPlayer === PLAYERS.PLAYER_1 ? PLAYERS.PLAYER_2 : PLAYERS.PLAYER_1;
    const opponentPieces = pieces[opponent];
    const enemyPiece = opponentPieces.find(p => p.row === row && p.col === col);

    if (enemyPiece) {
      // Kampf!
      const result = calculateCombatResult(selectedPiece.type, enemyPiece.type);
      let newState;
      
      if (result === 'win') {
        // Angreifer gewinnt - entferne gegnerische Figur
        newState = {
          ...gameState,
          pieces: {
            ...gameState.pieces,
            [opponent]: gameState.pieces[opponent].filter(p => p.id !== enemyPiece.id),
            [currentPlayer]: gameState.pieces[currentPlayer].map(p =>
              p.id === selectedPiece.id ? { ...p, row, col } : p
            ),
          },
          selectedPiece: null,
          currentPlayer: switchPlayer(currentPlayer),
        };
        Alert.alert('Kampf gewonnen!', `${selectedPiece.type} hat ${enemyPiece.type} besiegt!`);
      } else if (result === 'lose') {
        // Verteidiger gewinnt - entferne angreifende Figur
        newState = {
          ...gameState,
          pieces: {
            ...gameState.pieces,
            [currentPlayer]: gameState.pieces[currentPlayer].filter(p => p.id !== selectedPiece.id),
          },
          selectedPiece: null,
          currentPlayer: switchPlayer(currentPlayer),
        };
        Alert.alert('Kampf verloren!', `${enemyPiece.type} hat ${selectedPiece.type} besiegt!`);
      } else {
        // Unentschieden - beide bleiben stehen
        newState = {
          ...gameState,
          selectedPiece: null,
          currentPlayer: switchPlayer(currentPlayer),
        };
        Alert.alert('Unentschieden', 'Beide Figuren bleiben stehen.');
      }
      
      setGameState(newState);
      updateGameState(newState);
    } else {
      // Normale Bewegung
      const newState = {
        ...gameState,
        pieces: {
          ...gameState.pieces,
          [currentPlayer]: gameState.pieces[currentPlayer].map(p =>
            p.id === selectedPiece.id ? { ...p, row, col } : p
          ),
        },
        selectedPiece: null,
        currentPlayer: switchPlayer(currentPlayer),
      };
      setGameState(newState);
      updateGameState(newState);
    }
  }, [gameState, isMyTurn, gameRoomId]);
  
  const updateGameState = useCallback((newState) => {
    if (!gameRoomId) return;
    const gameRef = ref(database, `games/${gameRoomId}`);
    set(gameRef, newState);
  }, [gameRoomId]);

  const currentPlayerName = gameState.currentPlayer === PLAYERS.PLAYER_1 
    ? (gameState.player1Name || 'Spieler 1') 
    : (gameState.player2Name || 'Spieler 2');
  const myName = playerName || (assignedPlayer === PLAYERS.PLAYER_1 
    ? (gameState.player1Name || 'Du') 
    : (gameState.player2Name || 'Du'));
  const opponentName = assignedPlayer === PLAYERS.PLAYER_1 
    ? (gameState.player2Name || 'Gegner') 
    : (gameState.player1Name || 'Gegner');

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      
      <View style={styles.header}>
        <Text style={styles.title}>DuelGrid</Text>
        <Text style={styles.playerInfo}>
          {myName} vs {opponentName}
        </Text>
        <Text style={[styles.currentPlayer, !isMyTurn && styles.notMyTurn]}>
          {isMyTurn ? 'Du bist am Zug' : `${currentPlayerName} ist am Zug`}
        </Text>
      </View>

      <View style={styles.boardContainer}>
        <GameBoard
          board={gameState.board}
          pieces={[...gameState.pieces[PLAYERS.PLAYER_1], ...gameState.pieces[PLAYERS.PLAYER_2]]}
          selectedPiece={gameState.selectedPiece}
          onCellPress={handleCellPress}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
  },
  header: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.TEXT_PRIMARY,
    marginBottom: 10,
  },
  playerInfo: {
    fontSize: 16,
    color: COLORS.TEXT_SECONDARY,
    marginBottom: 5,
  },
  currentPlayer: {
    fontSize: 18,
    color: COLORS.SUCCESS,
    fontWeight: 'bold',
  },
  notMyTurn: {
    color: COLORS.TEXT_SECONDARY,
  },
  boardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});











