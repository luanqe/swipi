/**
 * TabBarItem Component
 * 
 * Atomic Component für einen einzelnen Tab
 * Wiederverwendbar, testbar (Single Responsibility)
 * Nutzt Theme-Tokens (Component-First, DRY)
 */

import React from 'react';
import { TouchableOpacity, StyleSheet, Platform, Text as RNText } from 'react-native';
import * as Haptics from 'expo-haptics';
import { Text } from '../../ui';
import { colors, spacing } from '../../../theme';

export interface TabBarItemProps {
  label: string;
  icon: string;
  isActive: boolean;
  onPress: () => void;
  badge?: number;
}

export const TabBarItem: React.FC<TabBarItemProps> = ({
  label,
  icon,
  isActive,
  onPress,
  badge,
}) => {
  const handlePress = () => {
    // Haptic Feedback (iOS)
    if (Platform.OS === 'ios') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    onPress();
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      {/* Icon */}
      <RNText style={isActive ? styles.iconActive : styles.icon}>
        {icon}
      </RNText>

      {/* Label */}
      <Text
        variant="caption1"
        style={isActive ? styles.labelActive : styles.label}
      >
        {label}
      </Text>

      {/* Badge (Optional) */}
      {badge !== undefined && badge > 0 && (
        <RNText style={styles.badge}>{badge > 99 ? '99+' : badge}</RNText>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.sm,
    position: 'relative',
  },
  icon: {
    fontSize: 24,
    marginBottom: spacing.xs,
    color: colors.neutral[600],
  },
  iconActive: {
    fontSize: 24,
    marginBottom: spacing.xs,
    color: colors.primary[500],
  },
  label: {
    fontSize: 11,
    color: colors.neutral[600],
  },
  labelActive: {
    color: colors.primary[500],
    fontWeight: '600',
  },
  badge: {
    position: 'absolute',
    top: spacing.xs,
    right: '25%',
    backgroundColor: colors.error,
    color: colors.background.primary,
    fontSize: 10,
    fontWeight: 'bold',
    paddingHorizontal: spacing.xs,
    paddingVertical: 2,
    borderRadius: 10,
    minWidth: 18,
    textAlign: 'center',
  },
});
