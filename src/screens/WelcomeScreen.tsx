import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Text, Logo } from '@/components/ui';
import { layout, getGradientColors } from '@/theme';
import { useTheme } from '@/hooks/useTheme';

/**
 * Welcome Screen Component
 * First screen with Login/Register options
 * Buttons positioned at thumb-reachable height
 */
export default function WelcomeScreen({ navigation }: any) {
  const { isDark } = useTheme();
  
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);
  
  const gradientColors = getGradientColors(isDark);

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      
      <LinearGradient
        colors={gradientColors}
        style={StyleSheet.absoluteFillObject}
      />

      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        
        <View style={styles.topSection}>
          <Logo size="large" animated />
          <Text variant="title2" style={styles.slogan} textAlign="center">
            Wer swiped der findet.
          </Text>
        </View>

        <View style={styles.bottomSection}>
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
        </View>

      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: layout.screenPadding.horizontal,
    justifyContent: 'space-between',
  },
  
  // ✅ Standardisiertes Onboarding Layout
  topSection: layout.onboardingScreen.topSection,
  bottomSection: layout.onboardingScreen.bottomSection,
  
  // Screen-spezifische Styles
  slogan: {
    fontStyle: 'italic',
    letterSpacing: 2,
    marginTop: 16,
  },
});
