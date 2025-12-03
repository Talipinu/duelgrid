import React from 'react';
import { View, StyleSheet } from 'react-native';
import { BOARD_SIZE } from '../../game/types';
import { COLORS } from '../../constants';
import BoardCell from './BoardCell';

/**
 * Haupt-Brett-Komponente
 * Rendert das 6x6 Spielfeld
 */
export default function GameBoard({ board, pieces, selectedPiece, onCellPress }) {
  return (
    <View style={styles.board}>
      {Array.from({ length: BOARD_SIZE }).map((_, row) => (
        <View key={row} style={styles.row}>
          {Array.from({ length: BOARD_SIZE }).map((_, col) => {
            const piece = pieces.find(p => p.row === row && p.col === col);
            const isSelected = selectedPiece?.row === row && selectedPiece?.col === col;
            
            return (
              <BoardCell
                key={`${row}-${col}`}
                row={row}
                col={col}
                piece={piece}
                isSelected={isSelected}
                onPress={() => onCellPress(row, col)}
              />
            );
          })}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  board: {
    borderWidth: 2,
    borderColor: COLORS.TEXT_PRIMARY,
    backgroundColor: COLORS.BOARD_DARK,
  },
  row: {
    flexDirection: 'row',
  },
});

