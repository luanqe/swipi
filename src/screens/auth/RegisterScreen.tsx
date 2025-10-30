import React, { useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  useColorScheme,
  Animated,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '@/theme';
import { useRole } from '@/context/RoleContext';
import DynamicForm from '@/components/forms/DynamicForm';
import type { OnboardingField } from '@/config/onboarding';

/**
 * Register Screen
 * 
 * Email + Password Registration
 * Role wurde VORHER in RoleSelectionScreen gewählt
 * 
 * MVP: Mock-Registration (keine Validierung)
 * PRODUCTION: Backend-Integration mit Validation
 */

export default function RegisterScreen({ navigation }: any) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  const { role, register } = useRole();
  
  const fadeAnim = useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  /**
   * Handle Registration
   * MVP: Mock (accepts all)
   * SPÄTER: await authService.register({ email, password, role });
   */
  const handleRegister = async (formData: Record<string, any>) => {
    const { email, password } = formData;
    
    console.log('[RegisterScreen] Registering:', { email, role });
    
    // Call Context register (mock)
    await register(email, password);
    
    // Navigate to Onboarding
    navigation.navigate('OnboardingData');
  };

  // Form Fields Configuration
  const registerFields: OnboardingField[] = [
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      placeholder: 'deine@email.de',
      required: true,
    },
    {
      name: 'password',
      label: 'Passwort',
      type: 'password',
      placeholder: 'Mindestens 8 Zeichen',
      required: true,
    },
    {
      name: 'passwordRepeat',
      label: 'Passwort wiederholen',
      type: 'password',
      placeholder: 'Passwort erneut eingeben',
      required: true,
    },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      
      {/* Background Gradient */}
      <LinearGradient
        colors={
          isDark 
            ? ['#18191A', '#242526'] 
            : ['#F7F8FA', '#FFFFFF']
        }
        style={StyleSheet.absoluteFillObject}
      />

      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
            
            {/* Top Section - Header */}
            <View style={styles.topSection}>
              {/* Back Button Placeholder (optional) */}
              
              {/* Header */}
              <View style={styles.header}>
                <Text style={[styles.headline, isDark && styles.textDark]}>
                  Melde dich an
                </Text>
                <Text style={[styles.subtitle, isDark && styles.subtitleDark]}>
                  Als {role === 'BEWERBER' ? 'Bewerber' : 'Firma'}
                </Text>
              </View>

              {/* Form */}
              <DynamicForm
                fields={registerFields}
                onSubmit={handleRegister}
                submitButtonText="Konto erstellen"
              />
            </View>

            {/* Bottom Section - Login Link */}
            <View style={styles.bottomSection}>
              <Text style={[styles.loginText, isDark && styles.textDark]}>
                Hast du schon ein Konto?{' '}
                <Text 
                  style={styles.loginLink}
                  onPress={() => navigation.navigate('Login')}
                >
                  Anmelden
                </Text>
              </Text>
            </View>

          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// ============================================================================
// STYLES
// ============================================================================

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
    paddingHorizontal: theme.spacing.lg,
    justifyContent: 'space-between',
  },
  
  // Top Section (Header + Form)
  topSection: {
    paddingTop: theme.spacing.xxxl,
  },
  header: {
    marginBottom: theme.spacing.xxl,
  },
  headline: {
    ...theme.typography.largeTitle,
    color: theme.colors.neutral[900],
    fontWeight: '700',
    marginBottom: theme.spacing.xs,
  },
  subtitle: {
    ...theme.typography.body,
    color: theme.colors.neutral[700],
  },
  subtitleDark: {
    color: theme.darkColors.neutral[700],
  },

  // Bottom Section (Login Link)
  bottomSection: {
    paddingBottom: Platform.OS === 'ios' ? theme.spacing.lg : theme.spacing.xl,
    alignItems: 'center',
  },
  loginText: {
    ...theme.typography.body,
    color: theme.colors.neutral[700],
    textAlign: 'center',
  },
  loginLink: {
    color: theme.colors.primary[500],
    fontWeight: '600',
  },

  // Dark Mode
  textDark: {
    color: theme.darkColors.neutral[900],
  },
});
