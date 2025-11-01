import React from 'react';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';
import { theme } from '@/theme';
import { useTheme } from '@/hooks/useTheme';

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
  const { isDark, activeColors } = useTheme();

  return (
    <View style={[
      styles.container,
      { backgroundColor: isDark ? activeColors.background.primary : activeColors.background.secondary }
    ]}>
      <ActivityIndicator 
        size="large" 
        color={activeColors.primary[500]} 
      />
      {message && (
        <Text style={[
          styles.message,
          { color: isDark ? activeColors.neutral[300] : activeColors.neutral[700] }
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
