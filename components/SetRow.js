import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, spacing, typography, borderRadius } from '../constants/theme';

export default function SetRow({ index, set, unit, onUpdate, onRemove, canRemove }) {
  return (
    <View style={styles.row}>
      <Text style={[styles.setNum, { flex: 0.5 }]}>{index + 1}</Text>
      <TextInput
        style={[styles.input, { flex: 1 }]}
        placeholder="0"
        placeholderTextColor={colors.textTertiary}
        value={set.reps}
        onChangeText={val => onUpdate(index, 'reps', val)}
        keyboardType="numeric"
      />
      {unit !== 'reps' && (
        <TextInput
          style={[styles.input, { flex: 1 }]}
          placeholder="0"
          placeholderTextColor={colors.textTertiary}
          value={set.weight}
          onChangeText={val => onUpdate(index, 'weight', val)}
          keyboardType="decimal-pad"
        />
      )}
      {canRemove && (
        <TouchableOpacity onPress={() => onRemove(index)} style={styles.removeBtn}>
          <Text style={styles.removeText}>x</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  setNum: {
    fontSize: typography.fontSizeSm,
    color: colors.textSecondary,
    textAlign: 'center',
    minWidth: 20,
  },
  input: {
    backgroundColor: colors.background,
    borderWidth: 0.5,
    borderColor: colors.border,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.sm + 2,
    paddingHorizontal: spacing.md,
    fontSize: typography.fontSizeMd,
    color: colors.textPrimary,
    textAlign: 'center',
  },
  removeBtn: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeText: {
    fontSize: typography.fontSizeSm,
    color: colors.textTertiary,
  },
});
