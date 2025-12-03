import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { COLORS } from '../constants';
import { PLAYERS } from '../game/types';
import { createInitialGameState, switchPlayer } from '../game/logic/gameState';
import { calculateCombatResult, areAdjacent } from '../game/logic/combat';
import GameBoard from '../components/board/GameBoard';

/**
 * Haupt-Spielbildschirm
 */
export default function GameScreen() {
  const [gameState, setGameState] = useState(createInitialGameState());

  const handleCellPress = useCallback((row, col) => {
    const { selectedPiece, currentPlayer, pieces } = gameState;
    const currentPlayerPieces = pieces[currentPlayer];
    const pieceAtCell = currentPlayerPieces.find(p => p.row === row && p.col === col);

    // Wenn eine eigene Figur angeklickt wird, selektiere sie
    if (pieceAtCell && pieceAtCell.player === currentPlayer) {
      setGameState(prev => ({
        ...prev,
        selectedPiece: pieceAtCell,
      }));
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
      
      if (result === 'win') {
        // Angreifer gewinnt - entferne gegnerische Figur
        setGameState(prev => ({
          ...prev,
          pieces: {
            ...prev.pieces,
            [opponent]: prev.pieces[opponent].filter(p => p.id !== enemyPiece.id),
            [currentPlayer]: prev.pieces[currentPlayer].map(p =>
              p.id === selectedPiece.id ? { ...p, row, col } : p
            ),
          },
          selectedPiece: null,
          currentPlayer: switchPlayer(currentPlayer),
        }));
        Alert.alert('Kampf gewonnen!', `${selectedPiece.type} hat ${enemyPiece.type} besiegt!`);
      } else if (result === 'lose') {
        // Verteidiger gewinnt - entferne angreifende Figur
        setGameState(prev => ({
          ...prev,
          pieces: {
            ...prev.pieces,
            [currentPlayer]: prev.pieces[currentPlayer].filter(p => p.id !== selectedPiece.id),
          },
          selectedPiece: null,
          currentPlayer: switchPlayer(currentPlayer),
        }));
        Alert.alert('Kampf verloren!', `${enemyPiece.type} hat ${selectedPiece.type} besiegt!`);
      } else {
        // Unentschieden - beide bleiben stehen
        setGameState(prev => ({
          ...prev,
          selectedPiece: null,
          currentPlayer: switchPlayer(currentPlayer),
        }));
        Alert.alert('Unentschieden', 'Beide Figuren bleiben stehen.');
      }
    } else {
      // Normale Bewegung
      setGameState(prev => ({
        ...prev,
        pieces: {
          ...prev.pieces,
          [currentPlayer]: prev.pieces[currentPlayer].map(p =>
            p.id === selectedPiece.id ? { ...p, row, col } : p
          ),
        },
        selectedPiece: null,
        currentPlayer: switchPlayer(currentPlayer),
      }));
    }
  }, [gameState]);

  const currentPlayerName = gameState.currentPlayer === PLAYERS.PLAYER_1 ? 'Spieler 1' : 'Spieler 2';

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      
      <View style={styles.header}>
        <Text style={styles.title}>DuelGrid</Text>
        <Text style={styles.currentPlayer}>
          Aktueller Spieler: {currentPlayerName}
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
  currentPlayer: {
    fontSize: 18,
    color: COLORS.TEXT_SECONDARY,
  },
  boardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});

