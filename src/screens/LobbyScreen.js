import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { COLORS } from '../constants';
import multiplayerService from '../services/multiplayer';

/**
 * Lobby-Screen: Spieler gibt seinen Namen ein
 */
export default function LobbyScreen({ onGameStart }) {
  const [playerName, setPlayerName] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);
  const [gameRoomId, setGameRoomId] = useState(null);
  const [gameState, setGameState] = useState(null);
  const [opponent, setOpponent] = useState(null);

  const handleJoinGame = async () => {
    if (isConnecting) return;
    
    // Validierung
    const trimmedName = playerName.trim();
    if (!trimmedName || trimmedName.length < 2) {
      Alert.alert('Ungültiger Name', 'Bitte gib einen Namen mit mindestens 2 Zeichen ein.');
      return;
    }
    
    if (trimmedName.length > 20) {
      Alert.alert('Name zu lang', 'Bitte gib einen Namen mit maximal 20 Zeichen ein.');
      return;
    }
    
    setIsConnecting(true);

    try {
      const roomId = await multiplayerService.joinOrCreateGame(
        trimmedName,
        (newGameState) => {
          setGameState(newGameState);
        },
        (players) => {
          const opponentName = players.player1 === trimmedName ? players.player2 : players.player1;
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
      setPlayerName('');
    }
  };

  // Wenn das Spiel gestartet wurde, benachrichtige die App
  useEffect(() => {
    if (gameState && onGameStart && gameRoomId && playerName.trim()) {
      onGameStart({
        gameRoomId,
        playerName: playerName.trim(),
        gameState,
      });
    }
  }, [gameState, gameRoomId, playerName, onGameStart]);

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar style="auto" />
      
      <View style={styles.content}>
        <Text style={styles.title}>DuelGrid</Text>
        <Text style={styles.subtitle}>Gib deinen Namen ein</Text>

        {isConnecting ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={COLORS.PLAYER_1} />
            <Text style={styles.loadingText}>
              {opponent ? `Spieler gefunden: ${opponent}` : 'Suche nach Gegner...'}
            </Text>
          </View>
        ) : (
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Dein Name (z.B. Stefan, Finn, Lewin...)"
              placeholderTextColor={COLORS.TEXT_SECONDARY}
              value={playerName}
              onChangeText={setPlayerName}
              maxLength={20}
              autoCapitalize="words"
              autoCorrect={false}
              editable={!isConnecting}
            />
            <TouchableOpacity
              style={[
                styles.joinButton,
                (!playerName.trim() || playerName.trim().length < 2) && styles.joinButtonDisabled
              ]}
              onPress={handleJoinGame}
              disabled={!playerName.trim() || playerName.trim().length < 2 || isConnecting}
            >
              <Text style={styles.joinButtonText}>Spiel beitreten</Text>
            </TouchableOpacity>
          </View>
        )}

        {playerName.trim() && !isConnecting && (
          <Text style={styles.info}>
            Bereit als: {playerName.trim()}
          </Text>
        )}
      </View>
    </KeyboardAvoidingView>
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
  inputContainer: {
    width: '100%',
    gap: 20,
  },
  input: {
    backgroundColor: COLORS.BOARD_LIGHT,
    borderWidth: 2,
    borderColor: COLORS.BOARD_DARK,
    borderRadius: 12,
    padding: 16,
    fontSize: 18,
    color: COLORS.TEXT_PRIMARY,
    textAlign: 'center',
  },
  joinButton: {
    backgroundColor: COLORS.PLAYER_1,
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.PLAYER_1,
  },
  joinButtonDisabled: {
    backgroundColor: COLORS.BOARD_DARK,
    borderColor: COLORS.BOARD_DARK,
    opacity: 0.5,
  },
  joinButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
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

