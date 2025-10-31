import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  useColorScheme,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { theme } from '@/theme';

const { width, height } = Dimensions.get('window');

/**
 * Splash Screen Component
 * Displays the Swipi logo with animated entrance
 * 
 * Props:
 * - onFinish: Callback nach Animation (2.5s)
 * 
 * Usage:
 * <SplashScreen onFinish={() => setShowSplash(false)} />
 */

interface SplashScreenProps {
  onFinish?: () => void;
}

export default function SplashScreen({ onFinish }: SplashScreenProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const scaleAnim = React.useRef(new Animated.Value(0.8)).current;

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();

    // Call onFinish after animation (1.25s total)
    const timer = setTimeout(() => {
      onFinish?.();
    }, 1250);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      <LinearGradient
        colors={['#0A66C2', '#004182']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFillObject}
      />

      <Animated.View
        style={[
          styles.logoContainer,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        {/* Logo Icon - Simplified Swipe Gesture */}
        <View style={styles.logoIcon}>
          <View style={styles.card}>
            <View style={styles.cardHighlight} />
          </View>
          <View style={[styles.card, styles.cardSecond]}>
            <View style={styles.cardHighlight} />
          </View>
        </View>

        {/* App Name */}
        <Text style={styles.appName}>Swipi</Text>
        <Text style={styles.tagline}>Find Your Dream Job</Text>
      </Animated.View>

      {/* Bottom Indicator */}
      <View style={styles.bottomContainer}>
        <View style={styles.loadingDots}>
          <View style={styles.dot} />
          <View style={[styles.dot, styles.dotActive]} />
          <View style={styles.dot} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
  },
  logoIcon: {
    width: 120,
    height: 120,
    marginBottom: theme.spacing.lg,
    position: 'relative',
  },
  card: {
    position: 'absolute',
    width: 100,
    height: 140,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: theme.borderRadius.xl,
    ...theme.shadows.lg,
    left: 10,
    top: -10,
  },
  cardSecond: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    transform: [{ rotate: '8deg' }, { translateX: -5 }, { translateY: 5 }],
    zIndex: -1,
  },
  cardHighlight: {
    position: 'absolute',
    top: theme.spacing.md,
    left: theme.spacing.md,
    right: theme.spacing.md,
    height: 8,
    backgroundColor: theme.colors.primary[500],
    borderRadius: theme.borderRadius.sm,
  },
  appName: {
    ...theme.typography.largeTitle,
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 48,
    marginBottom: theme.spacing.xs,
    letterSpacing: -1,
  },
  tagline: {
    ...theme.typography.subhead,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '500',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 60,
    alignItems: 'center',
  },
  loadingDots: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  dotActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    width: 24,
  },
});
