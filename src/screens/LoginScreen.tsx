import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  useColorScheme,
  Platform,
  Animated,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '@/theme';

/**
 * Login Screen Component
 * "Schön dass du wieder hier bist"
 * Username/Password Login
 */
export default function LoginScreen({ navigation }: any) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleLogin = () => {
    console.log('Login:', username, password);
    // TODO: Navigate to role selection or home
  };

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
                <Text style={[styles.headline, isDark && styles.textDark]}>
                  Schön dass du wieder{'\n'}hier bist
                </Text>
              </View>

              {/* Form Section - Inputs */}
              <View style={styles.formSection}>
                
                {/* Username Input */}
                <View style={styles.inputContainer}>
                  <TextInput
                    style={[
                      styles.input,
                      isDark && styles.inputDark
                    ]}
                    placeholder="Benutzername"
                    placeholderTextColor={
                      isDark ? theme.darkColors.neutral[600] : theme.colors.neutral[600]
                    }
                    value={username}
                    onChangeText={setUsername}
                    autoCapitalize="none"
                    autoCorrect={false}
                    accessible={true}
                    accessibilityLabel="Benutzername"
                    accessibilityHint="Geben Sie Ihren Benutzernamen ein"
                  />
                </View>

                {/* Password Input */}
                <View style={styles.inputContainer}>
                  <TextInput
                    style={[
                      styles.input,
                      isDark && styles.inputDark
                    ]}
                    placeholder="Passwort"
                    placeholderTextColor={
                      isDark ? theme.darkColors.neutral[600] : theme.colors.neutral[600]
                    }
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    autoCapitalize="none"
                    autoCorrect={false}
                    accessible={true}
                    accessibilityLabel="Passwort"
                    accessibilityHint="Geben Sie Ihr Passwort ein"
                  />
                </View>
              </View>
            </View>

            {/* Bottom Section - Login Button at Thumb Height */}
            <View style={styles.bottomSection}>
              <AnimatedButton
                onPress={handleLogin}
                accessibilityLabel="Login"
                accessibilityHint="Doppeltippen um sich anzumelden"
              >
                <Text style={styles.buttonText}>Login</Text>
              </AnimatedButton>
            </View>

          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

/**
 * Animated Button Component
 */
function AnimatedButton({ 
  children, 
  onPress,
  ...props 
}: {
  children: React.ReactNode;
  onPress: () => void;
  accessibilityLabel?: string;
  accessibilityHint?: string;
}) {
  const scale = React.useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.97,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      accessible={true}
      accessibilityRole="button"
      activeOpacity={0.8}
      {...props}
    >
      <Animated.View 
        style={[
          styles.button,
          { transform: [{ scale }] },
        ]}
      >
        {children}
      </Animated.View>
    </TouchableOpacity>
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
    paddingHorizontal: theme.spacing.lg,
    justifyContent: 'space-between',
    paddingBottom: theme.spacing.xl,
  },
  
  // Top Section
  topSection: {
    paddingTop: theme.spacing.xxxl,
  },
  
  // Header
  header: {
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  headline: {
    ...theme.typography.largeTitle,
    color: theme.colors.neutral[900],
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 40,
  },

  // Form Section (Inputs only)
  formSection: {
    gap: theme.spacing.md,
  },
  inputContainer: {
    marginBottom: theme.spacing.sm,
  },
  input: {
    height: 56,
    backgroundColor: theme.colors.background.primary,
    borderWidth: 1.5,
    borderColor: theme.colors.neutral[300],
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: theme.spacing.md,
    fontSize: 17,
    color: theme.colors.neutral[900],
    ...theme.shadows.sm,
  },
  inputDark: {
    backgroundColor: theme.darkColors.background.secondary,
    borderColor: theme.darkColors.neutral[400],
    color: theme.darkColors.neutral[900],
  },

  // Bottom Section - Button at Thumb Height
  bottomSection: {
    paddingBottom: Platform.OS === 'ios' ? theme.spacing.lg : theme.spacing.xl,
  },

  // Button
  button: {
    height: 56,
    backgroundColor: theme.colors.primary[500],
    borderRadius: theme.borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    ...theme.shadows.sm,
  },
  buttonText: {
    ...theme.typography.body,
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 17,
  },

  // Dark Mode
  textDark: {
    color: theme.darkColors.neutral[900],
  },
});
