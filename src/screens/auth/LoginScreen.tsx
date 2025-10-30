import React, { useRef } from 'react';
import {
  View,
  StyleSheet,
  useColorScheme,
  Animated,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, Button, Input } from '@/components/ui';
import { colors, darkColors, spacing, layout } from '@/theme';
import { useRole } from '@/context/RoleContext';

/**
 * Login Screen Component
 * "Willkommen zurück"
 * 3-Section Layout: Header → Form Inputs → Button
 */

export default function LoginScreen({ navigation }: any) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  const { login } = useRole();
  
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  
  const fadeAnim = useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleLogin = async () => {
    try {
      setLoading(true);
      await login(username, password);
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const gradientColors = isDark 
    ? [darkColors.background.primary, darkColors.background.secondary] as const
    : [colors.background.secondary, colors.background.primary] as const;

  const isFormValid = username.trim() !== '' && password.trim() !== '';

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      
      <LinearGradient
        colors={gradientColors}
        style={StyleSheet.absoluteFillObject}
      />

      {/* ✅ KeyboardAvoidingView - Nur Button bewegt sich */}
      <KeyboardAvoidingView
        style={styles.keyboardView}
        {...layout.keyboardAware.withKeyboard}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
            
            {/* ✅ SECTION 1: Header (Top) */}
            <View style={styles.topSection}>
              <Text 
                variant="largeTitle" 
                color="primary" 
                textAlign="center"
                style={layout.headerZone}
              >
                Willkommen zurück
              </Text>
            </View>

            {/* ✅ SECTION 2: Form Inputs (Middle - bewegen sich NICHT) */}
            <View style={styles.middleSection}>
              <Input
                placeholder="Benutzername"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
                autoCorrect={false}
              />
              
              <Input
                placeholder="Passwort"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoCapitalize="none"
              />
            </View>

            {/* ✅ SECTION 3: Button (Bottom - bewegt sich MIT Tastatur) */}
            <View style={[styles.bottomSection, layout.thumbZone]}>
              <Button
                variant="primary"
                size="lg"
                onPress={handleLogin}
                disabled={!isFormValid || loading}
                accessibilityLabel="Login"
                accessibilityHint="Doppeltippen um sich anzumelden"
              >
                {loading ? 'Wird geladen...' : 'Login'}
              </Button>
            </View>

          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    ...layout.sections.threeSection, // ← 3-Section Pattern
    paddingHorizontal: layout.screenPadding.horizontal,
  },
  topSection: {
    // Header bleibt oben, wächst nur für Content
  },
  middleSection: {
    ...layout.formZone, // ← Form-Inputs in der Mitte (bewegen sich NICHT)
  },
  bottomSection: {
    // Button auf Daumenhöhe (bewegt sich MIT Tastatur)
    // paddingBottom kommt von layout.thumbZone
  },
});
