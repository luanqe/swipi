import { StyleSheet } from 'react-native';
import { theme } from '@/theme';
import { ButtonVariant, ButtonSize } from './Button.types';

/**
 * Creates dynamic button styles based on variant, size, and state
 * Supports Light + Dark Mode
 */
export const createButtonStyles = (
  variant: ButtonVariant, 
  size: ButtonSize, 
  disabled: boolean,
  isDark: boolean,
  fullWidth: boolean
) => {
  // Size-based heights
  const heights = {
    sm: 44, // iOS minimum touch target
    md: 48,
    lg: 56,
  };

  // Base button styles (consistent across variants)
  const baseButton: any = {
    height: heights[size],
    borderRadius: theme.borderRadius.md,
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    paddingHorizontal: theme.spacing.lg,
    gap: theme.spacing.sm,
    ...theme.shadows.sm,
    ...(fullWidth && { width: '100%' as const }),
  };

  // Color System (Light/Dark Mode)
  const colorSystem = isDark ? theme.darkColors : theme.colors;

  // Variant-specific styles
  const variantStyles = {
    primary: {
      backgroundColor: disabled 
        ? colorSystem.neutral[300] 
        : colorSystem.primary[500],
    },
    secondary: {
      backgroundColor: 'transparent',
      borderWidth: 1.5,
      borderColor: disabled 
        ? colorSystem.neutral[300] 
        : colorSystem.primary[500],
    },
    tertiary: {
      backgroundColor: 'transparent',
      borderWidth: 0,
    },
  };

  // Text styles per variant
  const textStyles = {
    primary: {
      ...theme.typography.bodyEmphasized,
      color: disabled ? colorSystem.neutral[600] : '#FFFFFF',
    },
    secondary: {
      ...theme.typography.bodyEmphasized,
      color: disabled 
        ? colorSystem.neutral[600] 
        : colorSystem.primary[500],
    },
    tertiary: {
      ...theme.typography.bodyEmphasized,
      color: disabled 
        ? colorSystem.neutral[600] 
        : colorSystem.primary[500],
    },
  };

  return StyleSheet.create({
    button: {
      ...baseButton,
      ...variantStyles[variant],
      opacity: disabled ? 0.5 : 1,
    },
    text: textStyles[variant],
  });
};
