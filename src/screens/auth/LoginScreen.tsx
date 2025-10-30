import React, { useRef } from 'react';
import {
  View,
  StyleSheet,
  useColorScheme,
  Platform,
  Animated,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Text, Input } from '@/components/ui';
import { colors, darkColors, spacing, bottomPadding } from '@/theme';
import { useRole } from '@/context/RoleContext';

/**
 * Login Screen Component
 * "Schön dass du wieder hier bist"
 * Username/Password Login
 */
export default function LoginScreen({ navigation }: any) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  const { login } = useRole();
  
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  
  const fadeAnim = useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleLogin = async () => {
    console.log('[LoginScreen] Login pressed:', { username });
    // Call Context login (mock)
    // RoleNavigator will automatically navigate to correct stack
    await login(username, password);
  };

  const gradientColors = isDark 
    ? [darkColors.background.primary, darkColors.background.secondary] as const
    : [colors.background.secondary, colors.background.primary] as const;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      
      {/* Background Gradient */}
      <LinearGradient
        colors={gradientColors}
        style={StyleSheet.absoluteFillObject}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
            
            {/* Top Section - Header + Inputs */}
            <View style={styles.topSection}>
              {/* Header Text */}
              <View style={styles.header}>
                <Text variant="largeTitle" color="primary" textAlign="center" style={styles.headline}>
                  Schön dass du wieder{'\n'}hier bist
                </Text>
              </View>

              {/* Form Section - Inputs */}
              <View style={styles.formSection}>
                
                {/* Username Input */}
                <Input
                  placeholder="Benutzername"
                  value={username}
                  onChangeText={setUsername}
                  autoCapitalize="none"
                  autoCorrect={false}
                  accessibilityLabel="Benutzername"
                  accessibilityHint="Geben Sie Ihren Benutzernamen ein"
                />

                {/* Password Input */}
                <Input
                  placeholder="Passwort"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  autoCapitalize="none"
                  autoCorrect={false}
                  accessibilityLabel="Passwort"
                  accessibilityHint="Geben Sie Ihr Passwort ein"
                />
              </View>
            </View>

            {/* Bottom Section - Login Button at Thumb Height */}
            <View style={styles.bottomSection}>
              <Button
                variant="primary"
                size="lg"
                onPress={handleLogin}
                accessibilityLabel="Login"
                accessibilityHint="Doppeltippen um sich anzumelden"
              >
                Login
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
    flex: 1,
    paddingHorizontal: spacing.lg,
    justifyContent: 'space-between',
  },
  
  // Top Section
  topSection: {
    paddingTop: spacing.xxxl,
  },
  
  // Header
  header: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  headline: {
    lineHeight: 40,
  },

  // Form Section (Inputs only)
  formSection: {
    gap: spacing.md,
  },

  // Bottom Section - Button at Thumb Height
  bottomSection: {
    paddingBottom: bottomPadding,
  },
});
