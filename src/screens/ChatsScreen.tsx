/**
 * ChatsScreen
 * Zeigt Chat-Liste mit Matches
 * MVP: Placeholder - später: Chat-Liste + Chat-Detail
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '../components/ui';
import { colors, spacing } from '../theme';

export const ChatsScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text variant="title1" style={styles.title}>
          💬 Chats
        </Text>
        <Text variant="body" color="secondary" style={styles.subtitle}>
          Chatte mit deinen Matches
        </Text>
        <Text variant="caption1" color="tertiary" style={styles.placeholder}>
          [Kommt bald...]
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
