import React, { useRef } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, Input, Button } from '@/components/ui';
import { spacing, layout, getGradientColors } from '@/theme';
import { useRole } from '@/context/RoleContext';
import { useTheme } from '@/hooks/useTheme';

/**
 * Register Screen
 * "Konto erstellen"
 */
export default function RegisterScreen({ navigation }: any) {
  const { isDark } = useTheme();
  
  const { role, register } = useRole();
  
  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
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

  const handleRegister = async () => {
    try {
      setLoading(true);
      
      // Register with email and password (role was set before in RoleSelectionScreen)
      await register(email, password);
      
      // Save additional data
      // TODO: Move to register function or onboarding
      console.log('[RegisterScreen] Additional data:', {
        username,
      });
      
      // Navigate to Onboarding
      navigation.navigate('OnboardingData');
    } catch (error) {
      console.error('[RegisterScreen] Registration failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const gradientColors = getGradientColors(isDark);

  const isFormValid = 
    username.length > 0 && 
    email.length > 0 && 
    password.length >= 8;

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      
      <LinearGradient
        colors={gradientColors}
        style={StyleSheet.absoluteFillObject}
      />

      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={layout.keyboard.behavior}
        keyboardVerticalOffset={layout.keyboard.offset}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
            
            <View style={styles.header}>
              <Text
                variant="largeTitle"
                color="primary"
                textAlign="center"
              >
                Konto erstellen
              </Text>
              <Text
                variant="body"
                color="secondary"
                textAlign="center"
                style={styles.subtitle}
              >
                {role === 'BEWERBER' ? 'Als Bewerber' : 'Als Firma'}
              </Text>
            </View>

            <View style={styles.form}>
              <Input
                placeholder="Benutzername"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
                autoCorrect={false}
              />
              
              <Input
                placeholder="E-Mail"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
              
              <Input
                placeholder="Passwort"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            <View style={styles.spacer} />

            <View style={styles.footer}>
              <Button
                variant="primary"
                size="lg"
                onPress={handleRegister}
                loading={loading}
                disabled={!isFormValid}
                accessibilityLabel="Konto erstellen"
                accessibilityHint="Doppeltippen um Konto zu erstellen"
              >
                Konto erstellen
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
  },
  
  header: {
    ...layout.screen.header,
  },
  
  subtitle: {
    marginTop: spacing.sm,
  },
  
  form: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    gap: spacing.sm,
  },
  
  spacer: {
    flexShrink: 0.2,
    minHeight: spacing.xl,
  },
  
  footer: {
    ...layout.screen.actions,
  },
});
