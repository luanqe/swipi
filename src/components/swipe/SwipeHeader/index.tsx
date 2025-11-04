/**
 * SwipeHeader Component
 * Header für SwipeScreens mit Logo + Burger Menu
 */

import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Logo } from '../../ui/Logo';
import { Text } from '../../ui';
import { colors, spacing } from '../../../theme';

interface SwipeHeaderProps {
  onMenuPress: () => void;
}

export const SwipeHeader: React.FC<SwipeHeaderProps> = ({ onMenuPress }) => {
  return (
    <View style={styles.header}>
      {/* Logo (links) */}
      <View style={styles.logoContainer}>
        <Logo size="small" />
      </View>

      {/* Burger Menu (rechts) */}
      <TouchableOpacity 
        style={styles.menuButton}
        onPress={onMenuPress}
        activeOpacity={0.7}
      >
        <View style={styles.burgerLine} />
        <View style={styles.burgerLine} />
        <View style={styles.burgerLine} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.background.primary,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral[200],
  },
  logoContainer: {
    // Logo ist bereits zentriert
  },
  menuButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  burgerLine: {
    width: 24,
    height: 2,
    backgroundColor: colors.neutral[800],
    marginVertical: 3,
    borderRadius: 2,
  },
});
