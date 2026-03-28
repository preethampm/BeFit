import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList, StyleSheet } from 'react-native';
import { colors, spacing, typography, borderRadius } from '../constants/theme';
import { EXERCISE_LIBRARY, CATEGORIES } from '../data/exercises';

export default function ExercisePicker({ selectedExercise, onSelect }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = CATEGORIES.filter(c => c !== 'All');
  const filteredExercises = EXERCISE_LIBRARY.filter(
    e => selectedCategory === 'All' || e.category === selectedCategory
  );

  function handleSelect(exercise) {
    onSelect(exercise);
    setModalVisible(false);
  }

  return (
    <View>
      <TouchableOpacity
        style={styles.selector}
        onPress={() => setModalVisible(true)}
      >
        <Text style={[styles.selectorText, !selectedExercise && styles.placeholder]}>
          {selectedExercise ? selectedExercise.name : 'Select an exercise...'}
        </Text>
        <Text style={styles.arrow}>v</Text>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Exercise</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={styles.closeBtn}>x</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.categoryRow}>
              <TouchableOpacity
                style={[styles.categoryPill, selectedCategory === 'All' && styles.categoryPillActive]}
                onPress={() => setSelectedCategory('All')}
              >
                <Text style={[styles.categoryText, selectedCategory === 'All' && styles.categoryTextActive]}>
                  All
                </Text>
              </TouchableOpacity>
              {categories.map(cat => (
                <TouchableOpacity
                  key={cat}
                  style={[styles.categoryPill, selectedCategory === cat && styles.categoryPillActive]}
                  onPress={() => setSelectedCategory(cat)}
                >
                  <Text style={[styles.categoryText, selectedCategory === cat && styles.categoryTextActive]}>
                    {cat}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <FlatList
              data={filteredExercises}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.exerciseItem}
                  onPress={() => handleSelect(item)}
                >
                  <Text style={styles.exerciseName}>{item.name}</Text>
                  <Text style={styles.exerciseUnit}>{item.category} - {item.unit}</Text>
                </TouchableOpacity>
              )}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  selector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.background,
    borderWidth: 0.5,
    borderColor: colors.border,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.lg,
  },
  selectorText: {
    fontSize: typography.fontSizeMd,
    color: colors.textPrimary,
  },
  placeholder: {
    color: colors.textTertiary,
  },
  arrow: {
    fontSize: typography.fontSizeSm,
    color: colors.textSecondary,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.background,
    borderTopLeftRadius: borderRadius.lg,
    borderTopRightRadius: borderRadius.lg,
    maxHeight: '80%',
    padding: spacing.xl,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  modalTitle: {
    fontSize: typography.fontSizeLg,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  closeBtn: {
    fontSize: typography.fontSizeLg,
    color: colors.textSecondary,
    padding: spacing.xs,
  },
  categoryRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  categoryPill: {
    paddingVertical: spacing.xs + 2,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.backgroundSecondary,
    borderRadius: borderRadius.full,
    borderWidth: 0.5,
    borderColor: colors.border,
  },
  categoryPillActive: {
    backgroundColor: colors.textPrimary,
    borderColor: colors.textPrimary,
  },
  categoryText: {
    fontSize: typography.fontSizeSm,
    color: colors.textSecondary,
  },
  categoryTextActive: {
    color: colors.background,
  },
  exerciseItem: {
    paddingVertical: spacing.md,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.border,
  },
  exerciseName: {
    fontSize: typography.fontSizeMd,
    color: colors.textPrimary,
    fontWeight: '500',
  },
  exerciseUnit: {
    fontSize: typography.fontSizeSm,
    color: colors.textSecondary,
    marginTop: 2,
  },
});
