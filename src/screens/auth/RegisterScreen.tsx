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
import { Text, Input, Button } from '@/components/ui';
import { colors, darkColors, spacing, layout } from '@/theme';
import { useRole } from '@/context/RoleContext';

/**
 * Register Screen
 * "Konto erstellen"
 * 4-Quarter Layout: Titel (25%) → Inputs (25%) → Spacer (25%) → Button (25%)
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
      
      // TODO: Password validation
      if (password !== passwordRepeat) {
        console.error('[RegisterScreen] Passwords do not match');
        return;
      }
      
      // Register with email and password (role was set before in RoleSelectionScreen)
      await register(email, password);
      
      // Save additional data
      // TODO: Move to register function or onboarding
      console.log('[RegisterScreen] Additional data:', {
        username,
        companyName: role === 'FIRMA' ? companyName : undefined,
      });
      
      // Navigate to Onboarding
      navigation.navigate('OnboardingData');
    } catch (error) {
      console.error('[RegisterScreen] Registration failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const gradientColors = isDark
    ? [darkColors.background.primary, darkColors.background.secondary] as const
    : [colors.background.secondary, colors.background.primary] as const;

  const isFormValid = 
    username.length > 0 && 
    email.length > 0 && 
    password.length >= 8 && 
    password === passwordRepeat &&
    (role === 'BEWERBER' || companyName.length > 0);

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
            
            {/* ✅ HEADER: Titel + Untertitel */}
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

            {/* ✅ FORM: Input Fields */}
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
                placeholder="Passwort (mind. 8 Zeichen)"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
              />
              
              <Input
                placeholder="Passwort wiederholen"
                value={passwordRepeat}
                onChangeText={setPasswordRepeat}
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
                error={passwordRepeat.length > 0 && password !== passwordRepeat ? 'Passwörter stimmen nicht überein' : undefined}
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

            {/* ✅ SPACER: Flexibler Abstand */}
            <View style={styles.spacer} />

            {/* ✅ FOOTER: Button auf Daumenhöhe */}
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
    paddingHorizontal: layout.screenPadding.horizontal,
  },
  header: layout.verticalDistribution.header,
  subtitle: {
    marginTop: spacing.sm,
  },
  form: layout.verticalDistribution.form,
  spacer: layout.verticalDistribution.spacer,
  footer: layout.verticalDistribution.footer,
});
