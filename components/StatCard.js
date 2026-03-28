import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, typography, borderRadius } from '../constants/theme';

export default function StatCard({ label, value, unit }) {
  return (
    <View style={styles.card}>
      <Text style={styles.value}>{value}{unit ? ` ${unit}` : ''}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.backgroundSecondary,
    borderRadius: borderRadius.md,
    padding: spacing.lg,
    borderWidth: 0.5,
    borderColor: colors.border,
    flex: 1,
  },
  value: {
    fontSize: typography.fontSizeXxl,
    fontWeight: '500',
    color: colors.textPrimary,
    letterSpacing: -0.5,
  },
  label: {
    fontSize: typography.fontSizeSm,
    color: colors.textSecondary,
    marginTop: 2,
  },
});
