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
import { colors } from '@/theme';

/**
 * Button Component
 * 
 * Wiederverwendbare Button-Komponente mit:
 * - Primary/Secondary Variants
 * - Size Options (md, lg)
 * - Haptic Feedback (iOS)
 * - Loading State
 * - Accessibility Support
 * - Scale Animation on Press
 * 
 * @example
 * <Button variant="primary" size="lg" onPress={handlePress}>
 *   Weiter
 * </Button>
 */
export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'lg',
  disabled = false,
  loading = false,
  children,
  onPress,
  leftIcon,
  rightIcon,
  accessibilityLabel,
  accessibilityHint,
  style,
  textStyle,
}) => {
  const scale = useRef(new Animated.Value(1)).current;
  const styles = createButtonStyles(variant, size, disabled || loading);

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
            color={variant === 'primary' ? '#FFFFFF' : colors.primary[500]} 
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
