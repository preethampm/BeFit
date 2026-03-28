import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, spacing, typography, borderRadius } from '../constants/theme';

const TABS = [
  { id: 'log', label: 'Log', icon: '+' },
  { id: 'history', label: 'History', icon: '=' },
  { id: 'progress', label: 'Progress', icon: '#' },
  { id: 'library', label: 'Library', icon: '::' },
];

export default function BottomTabBar({ activeTab, onTabChange }) {
  return (
    <View style={styles.container}>
      {TABS.map(tab => (
        <TouchableOpacity
          key={tab.id}
          style={styles.tab}
          onPress={() => onTabChange(tab.id)}
          activeOpacity={0.6}
        >
          <Text style={[styles.icon, activeTab === tab.id && styles.iconActive]}>
            {tab.icon}
          </Text>
          <Text style={[styles.label, activeTab === tab.id && styles.labelActive]}>
            {tab.label}
          </Text>
          {activeTab === tab.id && <View style={styles.indicator} />}
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.background,
    borderTopWidth: 0.5,
    borderTopColor: colors.border,
    paddingBottom: spacing.xs,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
    position: 'relative',
  },
  icon: {
    fontSize: typography.fontSizeLg,
    color: colors.textTertiary,
    marginBottom: 2,
  },
  iconActive: {
    color: colors.textPrimary,
  },
  label: {
    fontSize: typography.fontSizeXs,
    color: colors.textTertiary,
  },
  labelActive: {
    color: colors.textPrimary,
    fontWeight: '500',
  },
  indicator: {
    position: 'absolute',
    top: 0,
    width: 24,
    height: 2,
    backgroundColor: colors.textPrimary,
    borderRadius: borderRadius.full,
  },
});
