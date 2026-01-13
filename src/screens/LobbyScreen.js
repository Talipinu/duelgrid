import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { COLORS } from '../constants';
import multiplayerService from '../services/multiplayer';

/**
 * Lobby-Screen: Spieler wählt seinen Namen (Stefan oder Finn)
 */
export default function LobbyScreen({ onGameStart }) {
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [gameRoomId, setGameRoomId] = useState(null);
  const [gameState, setGameState] = useState(null);
  const [opponent, setOpponent] = useState(null);

  const handlePlayerSelect = async (playerName) => {
    if (isConnecting) return;
    
    setSelectedPlayer(playerName);
    setIsConnecting(true);

    try {
      const roomId = await multiplayerService.joinOrCreateGame(
        playerName,
        (newGameState) => {
          setGameState(newGameState);
        },
        (players) => {
          const opponentName = players.player1 === playerName ? players.player2 : players.player1;
          setOpponent(opponentName);
          Alert.alert(
            'Spieler gefunden!',
            `Du spielst gegen ${opponentName}`
          );
        }
      );
      
      setGameRoomId(roomId);
      
      // Warte auf zweiten Spieler
      Alert.alert(
        'Warte auf Gegner...',
        'Suche nach einem anderen Spieler. Bitte warten...',
        [{ text: 'OK' }]
      );
    } catch (error) {
      console.error('Fehler beim Beitreten:', error);
      Alert.alert('Fehler', 'Konnte nicht zum Spiel beitreten. Bitte versuche es erneut.');
      setIsConnecting(false);
      setSelectedPlayer(null);
    }
  };

  // Wenn das Spiel gestartet wurde, benachrichtige die App
  useEffect(() => {
    if (gameState && onGameStart && gameRoomId) {
      onGameStart({
        gameRoomId,
        playerName: selectedPlayer,
        gameState,
      });
    }
  }, [gameState, gameRoomId, selectedPlayer, onGameStart]);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      
      <View style={styles.content}>
        <Text style={styles.title}>DuelGrid</Text>
        <Text style={styles.subtitle}>Wähle deinen Spieler</Text>

        {isConnecting ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={COLORS.PLAYER_1} />
            <Text style={styles.loadingText}>
              {opponent ? `Spieler gefunden: ${opponent}` : 'Suche nach Gegner...'}
            </Text>
          </View>
        ) : (
          <View style={styles.playerSelection}>
            <TouchableOpacity
              style={[
                styles.playerButton,
                selectedPlayer === 'Stefan' && styles.playerButtonSelected,
              ]}
              onPress={() => handlePlayerSelect('Stefan')}
            >
              <Text style={styles.playerButtonText}>Stefan</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.playerButton,
                selectedPlayer === 'Finn' && styles.playerButtonSelected,
              ]}
              onPress={() => handlePlayerSelect('Finn')}
            >
              <Text style={styles.playerButtonText}>Finn</Text>
            </TouchableOpacity>
          </View>
        )}

        {selectedPlayer && !isConnecting && (
          <Text style={styles.info}>
            Du bist: {selectedPlayer}
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  content: {
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: COLORS.TEXT_PRIMARY,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 20,
    color: COLORS.TEXT_SECONDARY,
    marginBottom: 40,
  },
  playerSelection: {
    width: '100%',
    gap: 20,
  },
  playerButton: {
    backgroundColor: COLORS.BOARD_LIGHT,
    padding: 20,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORS.BOARD_DARK,
    alignItems: 'center',
  },
  playerButtonSelected: {
    backgroundColor: COLORS.PLAYER_1,
    borderColor: COLORS.PLAYER_1,
  },
  playerButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.TEXT_PRIMARY,
  },
  loadingContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  loadingText: {
    marginTop: 20,
    fontSize: 16,
    color: COLORS.TEXT_SECONDARY,
  },
  info: {
    marginTop: 20,
    fontSize: 16,
    color: COLORS.TEXT_SECONDARY,
  },
});

