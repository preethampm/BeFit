import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { colors, spacing, typography, borderRadius } from '../constants/theme';
import { EXERCISE_LIBRARY } from '../data/exercises';
import SetRow from '../components/SetRow';
import ExercisePicker from '../components/ExercisePicker';

export default function LogScreen({ onLogWorkout, selectedExercise, setSelectedExercise, sets, setSets, note, setNote, logSuccess }) {
  function addSet() {
    setSets(s => [...s, { reps: '', weight: '' }]);
  }

  function removeSet(i) {
    setSets(s => s.filter((_, idx) => idx !== i));
  }

  function updateSet(i, field, val) {
    setSets(s => s.map((set, idx) => idx === i ? { ...set, [field]: val } : set));
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
      <Text style={styles.title}>Log Workout</Text>

      {logSuccess && (
        <View style={styles.successBanner}>
          <Text style={styles.successText}>Workout logged!</Text>
        </View>
      )}

      <Text style={styles.label}>Exercise</Text>
      <ExercisePicker
        selectedExercise={selectedExercise}
        onSelect={setSelectedExercise}
      />

      {selectedExercise ? (
        <>
          <Text style={styles.label}>Sets</Text>
          <View style={styles.setHeader}>
            <Text style={[styles.setHeaderText, { flex: 0.5 }]}>#</Text>
            <Text style={[styles.setHeaderText, { flex: 1 }]}>Reps</Text>
            <Text style={[styles.setHeaderText, { flex: 1 }]}>
              {selectedExercise.unit === 'reps' ? '—' : selectedExercise.unit}
            </Text>
            <View style={{ width: 28 }} />
          </View>
          {sets.map((set, i) => (
            <SetRow
              key={i}
              index={i}
              set={set}
              unit={selectedExercise.unit}
              onUpdate={updateSet}
              onRemove={removeSet}
              canRemove={sets.length > 1}
            />
          ))}
          <TouchableOpacity style={styles.addSetBtn} onPress={addSet}>
            <Text style={styles.addSetText}>+ Add set</Text>
          </TouchableOpacity>

          <View style={styles.divider} />

          <Text style={styles.label}>Note (optional)</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. felt strong today"
            placeholderTextColor={colors.textTertiary}
            value={note}
            onChangeText={setNote}
          />
        </>
      ) : null}

      <TouchableOpacity
        style={[styles.saveBtn, !selectedExercise && styles.saveBtnDisabled]}
        onPress={onLogWorkout}
        disabled={!selectedExercise}
      >
        <Text style={styles.saveBtnText}>Save workout</Text>
      </TouchableOpacity>
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
  setHeader: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.sm,
    paddingHorizontal: 2,
  },
  setHeaderText: {
    fontSize: typography.fontSizeSm,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  addSetBtn: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    borderWidth: 0.5,
    borderColor: colors.border,
    borderRadius: borderRadius.md,
    alignSelf: 'flex-start',
    marginBottom: spacing.lg,
  },
  addSetText: {
    fontSize: typography.fontSizeSm,
    color: colors.textSecondary,
  },
  divider: {
    height: 0.5,
    backgroundColor: colors.border,
    marginVertical: spacing.lg,
  },
  input: {
    backgroundColor: colors.background,
    borderWidth: 0.5,
    borderColor: colors.border,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    fontSize: typography.fontSizeMd,
    color: colors.textPrimary,
    marginBottom: spacing.lg,
  },
  saveBtn: {
    backgroundColor: colors.textPrimary,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.lg,
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  saveBtnDisabled: {
    opacity: 0.4,
  },
  saveBtnText: {
    fontSize: typography.fontSizeMd,
    fontWeight: '500',
    color: colors.background,
  },
  successBanner: {
    backgroundColor: colors.successBg,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.md + 2,
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
    alignItems: 'center',
  },
  successText: {
    fontSize: typography.fontSizeMd,
    fontWeight: '500',
    color: colors.success,
  },
});
