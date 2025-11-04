/**
 * ProfileScreen
 * Zeigt Profil, Settings, Logout
 * MVP: Placeholder - später: Profil bearbeiten, Einstellungen
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '../components/ui';
import { Button } from '../components/ui';
import { useRole } from '../context/RoleContext';
import { colors, spacing } from '../theme';

export const ProfileScreen: React.FC = () => {
  const { userData, logout } = useRole();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text variant="title1" style={styles.title}>
          👤 Profil
        </Text>
        
        {/* User Info */}
        <View style={styles.infoBox}>
          <Text variant="body" style={styles.infoText}>
            {userData.name || userData.companyName || 'Nutzer'}
          </Text>
          <Text variant="caption1" color="tertiary">
            {userData.email}
          </Text>
        </View>

        <Text variant="caption1" color="tertiary" style={styles.placeholder}>
          [Profil bearbeiten - kommt bald...]
        </Text>

        {/* Logout Button */}
        <Button
          variant="secondary"
          size="md"
          onPress={logout}
          style={styles.logoutButton}
        >
          Logout
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  title: {
    marginBottom: spacing.xl,
  },
  infoBox: {
    backgroundColor: colors.background.secondary,
    padding: spacing.lg,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: spacing.lg,
    minWidth: 250,
  },
  infoText: {
    marginBottom: spacing.xs,
  },
  placeholder: {
    fontStyle: 'italic',
    marginBottom: spacing.xl,
  },
  logoutButton: {
    marginTop: spacing.lg,
    minWidth: 200,
  },
});
