import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '../../constants';
import Piece from '../pieces/Piece';

/**
 * Einzelne Zelle des Bretts
 */
export default function BoardCell({ row, col, piece, isSelected, onPress }) {
  const isLight = (row + col) % 2 === 0;
  
  return (
    <TouchableOpacity
      style={[
        styles.cell,
        isLight ? styles.cellLight : styles.cellDark,
        isSelected && styles.cellSelected,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {piece && <Piece type={piece.type} player={piece.player} />}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cell: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.BOARD_DARK,
  },
  cellLight: {
    backgroundColor: COLORS.BOARD_LIGHT,
  },
  cellDark: {
    backgroundColor: COLORS.BOARD_DARK,
  },
  cellSelected: {
    backgroundColor: COLORS.BOARD_SELECTED,
    borderWidth: 2,
    borderColor: COLORS.TEXT_PRIMARY,
  },
});

