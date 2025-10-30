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
 * Register Screen
 * 3-Section Layout: Header → Form Inputs → Button
 * Role wurde VORHER in RoleSelectionScreen gewählt
 */

export default function RegisterScreen({ navigation }: any) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  const { role, register } = useRole();
  
  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [passwordRepeat, setPasswordRepeat] = React.useState('');
  const [companyName, setCompanyName] = React.useState('');
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
      console.log('[RegisterScreen] Registering:', { email, role });
      
      await register(email, password);
      navigation.navigate('OnboardingData');
    } catch (error) {
      console.error('Registration failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const gradientColors = isDark 
    ? [darkColors.background.primary, darkColors.background.secondary] as const
    : [colors.background.secondary, colors.background.primary] as const;

  const isFormValid = 
    username.trim() !== '' && 
    email.trim() !== '' && 
    password.trim() !== '' &&
    passwordRepeat.trim() !== '' &&
    password === passwordRepeat &&
    (role === 'BEWERBER' || companyName.trim() !== '');

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      
      <LinearGradient
        colors={gradientColors}
        style={StyleSheet.absoluteFillObject}
      />

      <KeyboardAvoidingView
        style={styles.keyboardView}
        {...layout.keyboardAware.withKeyboard}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
            
            {/* SECTION 1: Header */}
            <View style={styles.topSection}>
              <Text
                variant="largeTitle"
                color="primary"
                textAlign="center"
                style={layout.headerZone}
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

            {/* SECTION 2: Form Inputs (bewegen sich NICHT) */}
            <View style={styles.middleSection}>
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
                placeholder="Passwort (mind. 8 Zeichen)"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoCapitalize="none"
              />

              <Input
                placeholder="Passwort wiederholen"
                value={passwordRepeat}
                onChangeText={setPasswordRepeat}
                secureTextEntry
                autoCapitalize="none"
                error={passwordRepeat && password !== passwordRepeat ? 'Passwörter stimmen nicht überein' : undefined}
              />

              {role === 'FIRMA' && (
                <Input
                  placeholder="Firmenname"
                  value={companyName}
                  onChangeText={setCompanyName}
                  autoCorrect={false}
                />
              )}
            </View>

            {/* SECTION 3: Button (bewegt sich MIT Tastatur) */}
            <View style={[styles.bottomSection, layout.thumbZone]}>
              <Button
                variant="primary"
                size="lg"
                onPress={handleRegister}
                disabled={!isFormValid || loading}
                accessibilityLabel="Konto erstellen"
                accessibilityHint="Doppeltippen um ein Konto zu erstellen"
              >
                {loading ? 'Wird erstellt...' : 'Konto erstellen'}
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
    ...layout.sections.threeSection,
    paddingHorizontal: layout.screenPadding.horizontal,
  },
  topSection: {
    // Header oben
  },
  subtitle: {
    marginTop: spacing.sm,
  },
  middleSection: {
    ...layout.formZone, // ← Inputs bleiben in der Mitte (bewegen sich NICHT)
  },
  bottomSection: {
    // Button auf Daumenhöhe (bewegt sich MIT Tastatur)
  },
});
