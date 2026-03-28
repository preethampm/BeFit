import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { colors, spacing, typography } from '../constants/theme';
import WorkoutCard from '../components/WorkoutCard';

export default function HistoryScreen({ workouts, onDelete }) {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>History</Text>
      <Text style={styles.subtitle}>{workouts.length} sessions logged</Text>

      {workouts.length === 0 ? (
        <Text style={styles.empty}>No workouts yet. Log your first session.</Text>
      ) : (
        workouts.map(w => (
          <WorkoutCard key={w.id} workout={w} onDelete={onDelete} />
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.xl,
  },
  title: {
    fontSize: typography.fontSizeXxl,
    fontWeight: '600',
    color: colors.textPrimary,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: typography.fontSizeMd,
    color: colors.textSecondary,
    marginBottom: spacing.xl,
    marginTop: spacing.xs,
  },
  empty: {
    textAlign: 'center',
    color: colors.textTertiary,
    fontSize: typography.fontSizeMd,
    paddingVertical: spacing.xxl * 2,
  },
});
