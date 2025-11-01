import React from 'react';
import {
  View,
  StyleSheet,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Logo, Text } from '@/components/ui';
import { theme } from '@/theme';

/**
 * Splash Screen Component
 * 
 * Zeigt Swipi Logo mit smooth Entrance Animation
 * - Fade + Scale: 800ms
 * - Gesamtdauer: 1.8s (professionelles Timing)
 * - Pulse Dots: Subtile Lade-Animation
 * 
 * Props:
 * - onFinish: Callback nach Animation
 * 
 * Usage:
 * <SplashScreen onFinish={() => setShowSplash(false)} />
 */

interface SplashScreenProps {
  onFinish?: () => void;
}

export default function SplashScreen({ onFinish }: SplashScreenProps) {
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const scaleAnim = React.useRef(new Animated.Value(0.8)).current;
  const pulseAnim = React.useRef(new Animated.Value(1)).current;

  React.useEffect(() => {
    // Logo entrance animation
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

    // Pulse animation for loading dots
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 0.5,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Auto-dismiss after 1.8 seconds
    const timer = setTimeout(() => {
      onFinish?.();
    }, 1800);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar style="light" />
      
      <LinearGradient
        colors={['#0A66C2', '#004182']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFillObject}
      />

      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        {/* ✅ Wiederverwendbare Logo-Komponente */}
        <Logo size="large" animated={false} />

        {/* App Name */}
        <Text style={styles.appName}>
          Swipi
        </Text>
        <Text style={styles.tagline}>
          Find Your Dream Job
        </Text>
      </Animated.View>

      {/* Bottom Loading Indicator mit Pulse */}
      <View style={styles.bottomContainer}>
        <View style={styles.loadingDots}>
          <Animated.View style={[styles.dot, { opacity: pulseAnim }]} />
          <Animated.View 
            style={[
              styles.dot, 
              styles.dotActive,
              { opacity: pulseAnim }
            ]} 
          />
          <Animated.View style={[styles.dot, { opacity: pulseAnim }]} />
        </View>
      </View>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  appName: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 48,
    lineHeight: 58, // ← FIX: Größerer lineHeight (48 * 1.2 = 58)
    marginTop: theme.spacing.lg,
    marginBottom: theme.spacing.xs,
    letterSpacing: -1,
    paddingTop: 4, // ← FIX: Extra Padding für iOS Text Clipping
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
    bottom: theme.spacing.xxxl,
    alignSelf: 'center',
  },
  loadingDots: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
  dotActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    width: 24,
  },
});
