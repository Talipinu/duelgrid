import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../constants';
import { PIECE_TYPE_CONFIG } from '../../game/types';

/**
 * Figuren-Komponente
 * Zeigt eine Spielfigur an
 */
export default function Piece({ type, player }) {
  const config = PIECE_TYPE_CONFIG[type];
  const playerColor = player === 'player1' ? COLORS.PLAYER_1 : COLORS.PLAYER_2;
  
  // Erste Buchstabe des Namens als Symbol
  const symbol = config?.name?.[0] || '?';
  
  return (
    <View style={[styles.piece, { backgroundColor: playerColor }]}>
      <Text style={styles.symbol}>{symbol}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  piece: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  symbol: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});











