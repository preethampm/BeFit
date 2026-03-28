import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { colors, spacing, typography, borderRadius } from '../constants/theme';
import { EXERCISE_LIBRARY } from '../data/exercises';
import { getPR, getProgressData } from '../utils/helpers';
import StatCard from '../components/StatCard';
import SimplePicker from '../components/SimplePicker';

function formatDateShort(iso) {
  const d = new Date(iso);
  return `${d.getDate()}/${d.getMonth() + 1}`;
}

function BarChart({ data }) {
  if (!data || data.length === 0) return null;

  const maxValue = Math.max(...data.map(d => d[1]));
  const recentData = data.slice(-7);

  return (
    <View style={styles.chartContainer}>
      <Text style={styles.chartTitle}>Best per session</Text>
      <View style={styles.chart}>
        {recentData.map(([date, value], i) => (
          <View key={date} style={styles.barWrapper}>
            <View style={styles.barContainer}>
              <View
                style={[
                  styles.bar,
                  { height: `${(value / maxValue) * 100}%` },
                  i === recentData.length - 1 && styles.barRecent,
                ]}
              />
            </View>
            <Text style={styles.barLabel}>{formatDateShort(date)}</Text>
            <Text style={[styles.barValue, i === recentData.length - 1 && styles.barValueRecent]}>
              {value}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

export default function ProgressScreen({ workouts }) {
  const [progressEx, setProgressEx] = useState(EXERCISE_LIBRARY[0]);

  const progressData = getProgressData(workouts, progressEx.id);
  const prValue = getPR(workouts, progressEx.id);
  const timesLogged = workouts.filter(w => w.exId === progressEx.id).length;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Progress</Text>

      <Text style={styles.label}>Track exercise</Text>
      <SimplePicker
        selectedValue={progressEx}
        options={EXERCISE_LIBRARY}
        onSelect={setProgressEx}
        label="Select exercise"
      />

      <View style={styles.statsRow}>
        <StatCard
          label={`Personal record (${progressEx.unit})`}
          value={prValue !== null ? prValue : '—'}
        />
        <View style={{ width: spacing.sm }} />
        <StatCard
          label="Times logged"
          value={timesLogged}
        />
      </View>

      {progressData.length > 0 ? (
        <BarChart data={progressData} />
      ) : (
        <Text style={styles.empty}>No data yet for this exercise.</Text>
      )}

      <View style={styles.divider} />
      <Text style={styles.sectionTitle}>All PRs</Text>
      <View style={styles.prsGrid}>
        {EXERCISE_LIBRARY.filter(e => getPR(workouts, e.id) !== null).map(e => (
          <View key={e.id} style={styles.prCard}>
            <Text style={styles.prName}>{e.name}</Text>
            <Text style={styles.prValue}>{getPR(workouts, e.id)} {e.unit}</Text>
          </View>
        ))}
      </View>
      {EXERCISE_LIBRARY.every(e => getPR(workouts, e.id) === null) && (
        <Text style={styles.empty}>Log workouts to see your PRs here.</Text>
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
    marginBottom: spacing.xl,
    letterSpacing: -0.5,
  },
  label: {
    fontSize: typography.fontSizeSm,
    fontWeight: '500',
    color: colors.textSecondary,
    letterSpacing: 0.04 * 10,
    textTransform: 'uppercase',
    marginBottom: spacing.sm,
  },
  statsRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  chartContainer: {
    backgroundColor: colors.backgroundSecondary,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    borderWidth: 0.5,
    borderColor: colors.border,
    marginBottom: spacing.xl,
  },
  chartTitle: {
    fontSize: typography.fontSizeMd,
    fontWeight: '500',
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  chart: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 140,
    paddingTop: spacing.md,
  },
  barWrapper: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 2,
  },
  barContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  bar: {
    width: '70%',
    backgroundColor: colors.textSecondary,
    borderRadius: borderRadius.sm,
    minHeight: 4,
  },
  barRecent: {
    backgroundColor: colors.textPrimary,
  },
  barLabel: {
    fontSize: typography.fontSizeXs,
    color: colors.textTertiary,
    marginTop: spacing.xs,
  },
  barValue: {
    fontSize: typography.fontSizeXs,
    color: colors.textSecondary,
    marginTop: 2,
  },
  barValueRecent: {
    color: colors.textPrimary,
    fontWeight: '500',
  },
  divider: {
    height: 0.5,
    backgroundColor: colors.border,
    marginVertical: spacing.lg,
  },
  sectionTitle: {
    fontSize: typography.fontSizeMd,
    fontWeight: '500',
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  prsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  prCard: {
    backgroundColor: colors.backgroundSecondary,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    borderWidth: 0.5,
    borderColor: colors.border,
    width: '48%',
  },
  prName: {
    fontSize: typography.fontSizeSm,
    fontWeight: '500',
    color: colors.textPrimary,
  },
  prValue: {
    fontSize: typography.fontSizeMd,
    fontWeight: '500',
    color: colors.textPrimary,
    marginTop: spacing.xs,
  },
  empty: {
    textAlign: 'center',
    color: colors.textTertiary,
    fontSize: typography.fontSizeMd,
    paddingVertical: spacing.xl,
  },
});
