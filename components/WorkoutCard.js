import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, spacing, typography, borderRadius } from '../constants/theme';
import { formatDate } from '../utils/helpers';
import { EXERCISE_LIBRARY } from '../data/exercises';

export default function WorkoutCard({ workout, onDelete }) {
  const exercise = EXERCISE_LIBRARY.find(e => e.id === workout.exId) || { name: 'Unknown', unit: '' };
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View>
          <Text style={styles.exerciseName}>{exercise.name}</Text>
          <Text style={styles.date}>{formatDate(workout.date)}</Text>
        </View>
        <TouchableOpacity onPress={() => onDelete(workout.id)} style={styles.deleteBtn}>
          <Text style={styles.deleteText}>x</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.setsContainer}>
        {workout.sets.map((s, i) => (
          <View key={i} style={styles.badge}>
            <Text style={styles.badgeText}>
              Set {i + 1}: {s.reps} reps{s.weight ? ` @ ${s.weight}${exercise.unit}` : ''}
            </Text>
          </View>
        ))}
      </View>
      {workout.note ? (
        <Text style={styles.note}>{workout.note}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.backgroundSecondary,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
    borderWidth: 0.5,
    borderColor: colors.border,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
  },
  exerciseName: {
    fontSize: typography.fontSizeMd,
    fontWeight: '500',
    color: colors.textPrimary,
  },
  date: {
    fontSize: typography.fontSizeSm,
    color: colors.textSecondary,
    marginTop: 2,
  },
  deleteBtn: {
    padding: spacing.xs,
  },
  deleteText: {
    fontSize: typography.fontSizeSm,
    color: colors.textTertiary,
  },
  setsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
  badge: {
    backgroundColor: colors.background,
    borderWidth: 0.5,
    borderColor: colors.border,
    borderRadius: borderRadius.full,
    paddingVertical: spacing.xs + 1,
    paddingHorizontal: spacing.md,
  },
  badgeText: {
    fontSize: typography.fontSizeXs,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  note: {
    fontSize: typography.fontSizeSm,
    color: colors.textSecondary,
    marginTop: spacing.md,
    fontStyle: 'italic',
  },
});
