import React from 'react';
import { View, ActivityIndicator, StyleSheet, Text, useColorScheme } from 'react-native';
import { theme } from '@/theme';

/**
 * LoadingIndicator
 * 
 * Fullscreen-Spinner (Kreisförmiger Ladebalken) für Ladezeiten (AsyncStorage, API-Calls, Transitions).
 * Unterstützt Dark Mode und optionale Statusmeldung.
 * Kann einfach importiert und in verschiedenen Screens/Komponenten wiederverwendet werden.
 */

interface LoadingIndicatorProps {
  message?: string; // Optionaler Text unter dem Spinner
}

export default function LoadingIndicator({ message }: LoadingIndicatorProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <View style={[
      styles.container,
      { backgroundColor: isDark ? theme.colors.background.primary : theme.colors.background.secondary }
    ]}>
      <ActivityIndicator 
        size="large" 
        color={theme.colors.primary[500]} 
      />
      {message && (
        <Text style={[
          styles.message,
          { color: isDark ? theme.colors.neutral[300] : theme.colors.neutral[700] }
        ]}>
          {message}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    marginTop: theme.spacing.md,
    fontSize: 15,
    fontWeight: '400',
    letterSpacing: -0.24,
  },
});
