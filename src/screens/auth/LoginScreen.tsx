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
 * Login Screen Component
 * "Willkommen zurück"
 * 4-Quarter Layout: Titel (25%) → Inputs (25%) → Spacer (25%) → Button (25%)
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
      console.error('[LoginScreen] Login failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const gradientColors = isDark 
    ? [darkColors.background.primary, darkColors.background.secondary] as const
    : [colors.background.secondary, colors.background.primary] as const;

  const isFormValid = username.length > 0 && password.length > 0;

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
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
            
            {/* ✅ QUARTER 1: Titel (25%) */}
            <View style={[styles.quarter1, layout.sections.quarter1]}>
              <Text 
                variant="largeTitle" 
                color="primary" 
                textAlign="center"
              >
                Willkommen zurück
              </Text>
            </View>

            {/* ✅ QUARTER 2: Input Fields (25%) */}
            <View style={[styles.quarter2, layout.sections.quarter2]}>
              <View style={layout.formZone}>
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
                  autoCorrect={false}
                />
              </View>
            </View>

            {/* ✅ QUARTER 3: Leerraum (25%) */}
            <View style={[styles.quarter3, layout.sections.quarter3]} />

            {/* ✅ QUARTER 4: Button auf Daumenhöhe (25%) */}
            <View style={[styles.quarter4, layout.sections.quarter4]}>
              <Button
                variant="primary"
                size="lg"
                onPress={handleLogin}
                loading={loading}
                disabled={!isFormValid}
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
    ...layout.fourQuarterContainer,
    paddingHorizontal: layout.screenPadding.horizontal,
  },
  quarter1: {
    // 25% - Titel oben
  },
  quarter2: {
    // 25% - Input Fields
  },
  quarter3: {
    // 25% - Leerraum
  },
  quarter4: {
    // 25% - Button auf Daumenhöhe
    ...layout.thumbZone,
  },
});
