import React from 'react';
import { View, ActivityIndicator, StyleSheet, Text, useColorScheme } from 'react-native';
import { theme } from '@/theme';

/**
 * LoadingIndicator Component
 * 
 * Simple fullscreen spinner used during:
 * - AsyncStorage hydration (App.tsx)
 * - API calls (später)
 * - Screen transitions (später)
 * 
 * Props:
 * - message?: Optional text below spinner
 */

interface LoadingIndicatorProps {
  message?: string;
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
