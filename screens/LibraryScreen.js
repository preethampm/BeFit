import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, spacing, typography, borderRadius } from '../constants/theme';
import { EXERCISE_LIBRARY, CATEGORIES } from '../data/exercises';
import ExerciseCard from '../components/ExerciseCard';

export default function LibraryScreen({ onSelectExercise }) {
  const [libCategory, setLibCategory] = useState('All');
  const [libSearch, setLibSearch] = useState('');

  const filteredLib = EXERCISE_LIBRARY.filter(e =>
    (libCategory === 'All' || e.category === libCategory) &&
    e.name.toLowerCase().includes(libSearch.toLowerCase())
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Library</Text>

      <TextInput
        style={styles.searchInput}
        placeholder="Search exercises..."
        placeholderTextColor={colors.textTertiary}
        value={libSearch}
        onChangeText={setLibSearch}
      />

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesScroll}
        contentContainerStyle={styles.categoriesContainer}
      >
        {CATEGORIES.map(c => (
          <TouchableOpacity
            key={c}
            style={[styles.pill, libCategory === c && styles.pillActive]}
            onPress={() => setLibCategory(c)}
          >
            <Text style={[styles.pillText, libCategory === c && styles.pillTextActive]}>
              {c}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {filteredLib.map(e => (
        <ExerciseCard
          key={e.id}
          exercise={e}
          onLog={() => onSelectExercise(e)}
        />
      ))}
      {filteredLib.length === 0 && (
        <Text style={styles.empty}>No exercises found.</Text>
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
  searchInput: {
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
  categoriesScroll: {
    marginBottom: spacing.lg,
  },
  categoriesContainer: {
    gap: spacing.sm,
    paddingRight: spacing.lg,
  },
  pill: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    backgroundColor: colors.backgroundSecondary,
    borderWidth: 0.5,
    borderColor: colors.border,
    borderRadius: borderRadius.full,
  },
  pillActive: {
    backgroundColor: colors.textPrimary,
    borderColor: colors.textPrimary,
  },
  pillText: {
    fontSize: typography.fontSizeSm,
    color: colors.textSecondary,
  },
  pillTextActive: {
    color: colors.background,
    fontWeight: '500',
  },
  empty: {
    textAlign: 'center',
    color: colors.textTertiary,
    fontSize: typography.fontSizeMd,
    paddingVertical: spacing.xl,
  },
});
