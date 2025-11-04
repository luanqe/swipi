/**
 * SwipeHeader Component
 * Header für SwipeScreens mit Logo + Burger Menu
 */

import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Logo } from '../../ui/Logo';
import { colors, spacing } from '../../../theme';
import { Button } from '@/components/ui/Button';
import { AuthService } from '@/services/auth/AuthService';

interface SwipeHeaderProps {
  onMenuPress: () => void;
}

  const handleLogout = () => {
    AuthService.logout();
    window.location.reload();
  }

export const SwipeHeader: React.FC<SwipeHeaderProps> = ({ onMenuPress }) => {
  return (
    <View style={styles.header}>
      {/* Logo (links) */}
      <View style={styles.logoContainer}>
        <Logo size="small" />
      </View>

<Button
  style={styles.menuButton}
  size='sm'
  onPress={() => handleLogout()}>
  Logout
</Button>
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
    height: 30,
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary[500],
  },
  burgerLine: {
    width: 24,
    height: 2,
    backgroundColor: colors.neutral[800],
    marginVertical: 3,
    borderRadius: 2,
  },
});
