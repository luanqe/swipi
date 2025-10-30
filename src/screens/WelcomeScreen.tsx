import React from 'react';
import { StyleSheet, useColorScheme } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Screen } from '@/components/layout';
import { Button, Text, Logo } from '@/components/ui';
import { colors, darkColors } from '@/theme';

/**
 * Welcome Screen Component
 * First screen with Login/Register options
 * Buttons positioned at thumb-reachable height
 */
export default function WelcomeScreen({ navigation }: any) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  const gradientColors = isDark 
    ? [darkColors.background.primary, darkColors.background.secondary] as const
    : [colors.background.secondary, colors.background.primary] as const;

  return (
    <>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      
      <Screen
        gradientColors={gradientColors}
        topSection={
          <>
            <Logo size="large" animated />
            <Text variant="title2" style={styles.slogan} textAlign="center">
              SLOGAN
            </Text>
          </>
        }
        bottomSection={
          <>
            <Button
              variant="primary"
              size="lg"
              onPress={() => navigation.navigate('RoleSelection')}
              accessibilityLabel="Konto erstellen"
              accessibilityHint="Doppeltippen um ein Konto zu erstellen"
            >
              Konto erstellen
            </Button>
            
            <Button
              variant="secondary"
              size="lg"
              onPress={() => navigation.navigate('Login')}
              accessibilityLabel="Anmelden"
              accessibilityHint="Doppeltippen um sich anzumelden"
            >
              Anmelden
            </Button>
          </>
        }
      />
    </>
  );
}

const styles = StyleSheet.create({
  slogan: {
    fontStyle: 'italic',
    letterSpacing: 2,
  },
});
