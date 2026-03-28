import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, spacing, typography, borderRadius } from '../constants/theme';

export default function ExerciseCard({ exercise, onLog }) {
  return (
    <View style={styles.card}>
      <View style={styles.info}>
        <Text style={styles.name}>{exercise.name}</Text>
        <Text style={styles.category}>{exercise.category}</Text>
      </View>
      <View style={styles.actions}>
        <View style={styles.unitBadge}>
          <Text style={styles.unitText}>{exercise.unit}</Text>
        </View>
        <TouchableOpacity onPress={onLog} style={styles.logBtn}>
          <Text style={styles.logText}>Log</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.background,
    borderWidth: 0.5,
    borderColor: colors.border,
    borderRadius: borderRadius.md,
    padding: spacing.lg,
    marginBottom: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: typography.fontSizeMd,
    fontWeight: '500',
    color: colors.textPrimary,
  },
  category: {
    fontSize: typography.fontSizeSm,
    color: colors.textSecondary,
    marginTop: 2,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  unitBadge: {
    backgroundColor: colors.backgroundSecondary,
    borderWidth: 0.5,
    borderColor: colors.border,
    borderRadius: borderRadius.full,
    paddingVertical: spacing.xs + 1,
    paddingHorizontal: spacing.sm + 2,
  },
  unitText: {
    fontSize: typography.fontSizeXs,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  logBtn: {
    paddingVertical: spacing.xs + 2,
    paddingHorizontal: spacing.md,
    borderWidth: 0.5,
    borderColor: colors.border,
    borderRadius: borderRadius.md,
  },
  logText: {
    fontSize: typography.fontSizeSm,
    color: colors.textSecondary,
  },
});
