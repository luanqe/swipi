import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, useColorScheme } from 'react-native';
import { colors, darkColors, spacing, borderRadius, shadows } from '@/theme';

interface LogoProps {
  /**
   * Logo size variant
   * - large: 180x180 (WelcomeScreen, SplashScreen)
   * - small: 60x60 (Header, Loading)
   */
  size?: 'large' | 'small';
  
  /**
   * Enable fade-in animation
   */
  animated?: boolean;
}

/**
 * Logo Component
 * 
 * Swipi Logo mit Card-Design (repräsentiert Swipe-Karten)
 * - Wiederverwendbar für verschiedene Screens
 * - Responsive Size Variants
 * - Optional Fade-in Animation
 * - Dark Mode Support
 * 
 * @example
 * <Logo size="large" animated />
 */
export const Logo: React.FC<LogoProps> = ({
  size = 'large',
  animated = false,
}) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const fadeAnim = useRef(new Animated.Value(animated ? 0 : 1)).current;

  useEffect(() => {
    if (animated) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }).start();
    }
  }, [animated, fadeAnim]);

  const dimensions = size === 'large' 
    ? { circle: 180, icon: 80, card: { width: 65, height: 90 } }
    : { circle: 60, icon: 26, card: { width: 21, height: 30 } };

  const dynamicStyles = StyleSheet.create({
    logoCircle: {
      width: dimensions.circle,
      height: dimensions.circle,
      borderRadius: dimensions.circle / 2,
      borderWidth: 2,
      borderColor: isDark ? darkColors.neutral[400] : colors.neutral[300],
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: size === 'large' ? spacing.xl : 0,
    },
    logoIcon: {
      width: dimensions.icon,
      height: dimensions.icon,
      position: 'relative',
    },
    card: {
      position: 'absolute',
      width: dimensions.card.width,
      height: dimensions.card.height,
      backgroundColor: isDark ? darkColors.background.secondary : colors.background.primary,
      borderRadius: size === 'large' ? borderRadius.lg : borderRadius.md,
      ...shadows.md,
      left: size === 'large' ? 8 : 2.5,
      top: size === 'large' ? -5 : -1.5,
    },
    cardSecond: {
      backgroundColor: isDark 
        ? 'rgba(36, 37, 38, 0.5)' 
        : 'rgba(255, 255, 255, 0.5)',
      transform: [
        { rotate: '8deg' },
        { translateX: size === 'large' ? -3 : -1 },
        { translateY: size === 'large' ? 3 : 1 },
      ],
      zIndex: -1,
    },
    cardHighlight: {
      position: 'absolute',
      top: size === 'large' ? spacing.sm : spacing.xs,
      left: size === 'large' ? spacing.sm : spacing.xs,
      right: size === 'large' ? spacing.sm : spacing.xs,
      height: size === 'large' ? 5 : 2,
      backgroundColor: colors.primary[500],
      borderRadius: borderRadius.sm,
    },
  });

  return (
    <Animated.View style={{ opacity: fadeAnim }}>
      <View style={dynamicStyles.logoCircle}>
        <View style={dynamicStyles.logoIcon}>
          {/* Front Card */}
          <View style={dynamicStyles.card}>
            <View style={dynamicStyles.cardHighlight} />
          </View>
          
          {/* Back Card (Rotated) */}
          <View style={[dynamicStyles.card, dynamicStyles.cardSecond]}>
            <View style={dynamicStyles.cardHighlight} />
          </View>
        </View>
      </View>
    </Animated.View>
  );
};
