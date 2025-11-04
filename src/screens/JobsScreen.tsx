/**
 * JobsScreen (nur Firma)
 * Jobinserate erstellen, bearbeiten, löschen
 * MVP: Placeholder - später: Job-Management CRUD
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '../components/ui';
import { colors, spacing } from '../theme';

export const JobsScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text variant="title1" style={styles.title}>
          💼 Jobs
        </Text>
        <Text variant="body" color="secondary" style={styles.subtitle}>
          Verwalte deine Jobinserate
        </Text>
        <Text variant="caption1" color="tertiary" style={styles.placeholder}>
          [Job-Management - kommt bald...]
        </Text>
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
    marginBottom: spacing.md,
  },
  subtitle: {
    marginBottom: spacing.lg,
    textAlign: 'center',
  },
  placeholder: {
    fontStyle: 'italic',
    marginTop: spacing.xl,
  },
});
