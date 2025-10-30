import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  useColorScheme,
  Platform,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '@/theme';

const { width, height } = Dimensions.get('window');

/**
 * Welcome Screen Component
 * First screen with Login/Register options
 * Buttons positioned at thumb-reachable height
 */
export default function WelcomeScreen({ navigation }: any) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      
      {/* Background Gradient - Subtle */}
      <LinearGradient
        colors={
          isDark 
            ? ['#18191A', '#242526'] 
            : ['#F7F8FA', '#FFFFFF']
        }
        style={StyleSheet.absoluteFillObject}
      />

      {/* Content Container */}
      <View style={styles.content}>
        
        {/* Top Section - Logo & Slogan */}
        <Animated.View 
          style={[styles.topSection, { opacity: fadeAnim }]}
        >
          {/* Logo Circle */}
          <View style={styles.logoCircle}>
            <View style={styles.logoIcon}>
              <View style={[styles.card, isDark && styles.cardDark]}>
                <View style={styles.cardHighlight} />
              </View>
              <View style={[styles.card, styles.cardSecond, isDark && styles.cardDark]}>
                <View style={styles.cardHighlight} />
              </View>
            </View>
          </View>

          {/* Slogan */}
          <Text style={[styles.slogan, isDark && styles.textDark]}>
            SLOGAN
          </Text>
        </Animated.View>

        {/* Bottom Section - CTA Buttons (Thumb Height) */}
        <Animated.View 
          style={[styles.bottomSection, { opacity: fadeAnim }]}
        >
          {/* Primary Button - Konto erstellen */}
          <AnimatedButton
            onPress={() => navigation.navigate('RoleSelection')}
            variant="primary"
            accessibilityLabel="Konto erstellen"
            accessibilityHint="Doppeltippen um ein Konto zu erstellen"
          >
            <Text style={styles.primaryButtonText}>Konto erstellen</Text>
          </AnimatedButton>

          {/* Secondary Button - Anmelden */}
          <AnimatedButton
            onPress={() => navigation.navigate('Login')}
            variant="secondary"
            accessibilityLabel="Anmelden"
            accessibilityHint="Doppeltippen um sich anzumelden"
          >
            <Text style={[styles.secondaryButtonText, isDark && styles.textDark]}>
              Anmelden
            </Text>
          </AnimatedButton>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}

/**
 * Animated Button Component with Press Effect
 */
function AnimatedButton({ 
  children, 
  onPress, 
  variant = 'primary',
  ...props 
}: {
  children: React.ReactNode;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
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
          variant === 'primary' ? styles.primaryButton : styles.secondaryButton,
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
  content: {
    flex: 1,
    paddingHorizontal: theme.spacing.lg,
    justifyContent: 'space-between',
  },
  
  // Top Section
  topSection: {
    paddingTop: theme.spacing.xxxl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoCircle: {
    width: 180,
    height: 180,
    borderRadius: 90,
    borderWidth: 2,
    borderColor: theme.colors.neutral[300],
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.xxl,
  },
  logoIcon: {
    width: 80,
    height: 80,
    position: 'relative',
  },
  card: {
    position: 'absolute',
    width: 65,
    height: 90,
    backgroundColor: '#FFFFFF',
    borderRadius: theme.borderRadius.lg,
    ...theme.shadows.md,
    left: 8,
    top: -5,
  },
  cardDark: {
    backgroundColor: '#242526',
  },
  cardSecond: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    transform: [{ rotate: '8deg' }, { translateX: -3 }, { translateY: 3 }],
    zIndex: -1,
  },
  cardHighlight: {
    position: 'absolute',
    top: theme.spacing.sm,
    left: theme.spacing.sm,
    right: theme.spacing.sm,
    height: 5,
    backgroundColor: theme.colors.primary[500],
    borderRadius: theme.borderRadius.sm,
  },
  slogan: {
    ...theme.typography.title2,
    color: theme.colors.neutral[900],
    fontWeight: '600',
    textAlign: 'center',
    fontStyle: 'italic',
    letterSpacing: 2,
  },

  // Bottom Section - Buttons at Thumb Height
  bottomSection: {
    paddingBottom: Platform.OS === 'ios' ? theme.spacing.lg : theme.spacing.xl,
    gap: theme.spacing.md,
  },
  button: {
    height: 56,
    borderRadius: theme.borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    ...theme.shadows.sm,
  },
  primaryButton: {
    backgroundColor: theme.colors.primary[500],
  },
  primaryButtonText: {
    ...theme.typography.body,
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 17,
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: theme.colors.neutral[400],
  },
  secondaryButtonText: {
    ...theme.typography.body,
    color: theme.colors.neutral[900],
    fontWeight: '600',
    fontSize: 17,
  },

  // Dark Mode Styles
  textDark: {
    color: theme.darkColors.neutral[900],
  },
  textSecondaryDark: {
    color: theme.darkColors.neutral[700],
  },
});
