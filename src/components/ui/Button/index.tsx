import React, { useRef } from 'react';
import {
  TouchableOpacity,
  Text,
  Animated,
  ActivityIndicator,
  View,
  Platform,
} from 'react-native';
import * as Haptics from 'expo-haptics';
import { ButtonProps } from './Button.types';
import { createButtonStyles } from './Button.styles';
import { theme } from '@/theme';
import { useTheme } from '@/hooks/useTheme';

/**
 * Button Component
 * 
 * Wiederverwendbare Button-Komponente mit:
 * - Primary/Secondary/Tertiary Variants
 * - Size Options (sm, md, lg)
 * - Dark Mode Support
 * - Haptic Feedback (iOS)
 * - Loading State
 * - Accessibility Support
 * - Scale Animation on Press
 * 
 * @example
 * <Button variant="primary" size="lg" onPress={handlePress}>
 *   Weiter
 * </Button>
 * 
 * <Button variant="secondary" size="md" fullWidth onPress={handlePress}>
 *   Abbrechen
 * </Button>
 * 
 * <Button variant="tertiary" size="sm" onPress={handlePress}>
 *   Überspringen
 * </Button>
 */
export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'lg',
  disabled = false,
  loading = false,
  fullWidth = false,
  children,
  onPress,
  leftIcon,
  rightIcon,
  accessibilityLabel,
  accessibilityHint,
  style,
  textStyle,
}) => {
  const { isDark, activeColors } = useTheme();
  
  const scale = useRef(new Animated.Value(1)).current;
  const styles = createButtonStyles(variant, size, disabled || loading, isDark, fullWidth);

  const handlePressIn = () => {
    // Haptic Feedback (iOS only)
    if (Platform.OS === 'ios' && !disabled && !loading) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }

    // Scale down animation
    Animated.spring(scale, {
      toValue: 0.97,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    // Scale back to normal
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const handlePress = () => {
    if (!disabled && !loading) {
      onPress();
    }
  };

  // Spinner Color basierend auf Variant
  const getSpinnerColor = () => {
    if (variant === 'primary') return '#FFFFFF';
    return activeColors.primary[500];
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled || loading}
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel || children}
      accessibilityHint={accessibilityHint}
      accessibilityState={{ disabled: disabled || loading }}
      activeOpacity={0.8}
    >
      <Animated.View 
        style={[
          styles.button,
          { transform: [{ scale }] },
          style,
        ]}
      >
        {loading ? (
          <ActivityIndicator 
            color={getSpinnerColor()} 
            size="small"
          />
        ) : (
          <>
            {leftIcon && <View>{leftIcon}</View>}
            <Text style={[styles.text, textStyle]}>{children}</Text>
            {rightIcon && <View>{rightIcon}</View>}
          </>
        )}
      </Animated.View>
    </TouchableOpacity>
  );
};
