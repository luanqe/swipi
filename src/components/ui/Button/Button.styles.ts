import { StyleSheet } from 'react-native';
import { colors, typography, borderRadius, shadows, spacing } from '@/theme';
import { ButtonVariant, ButtonSize } from './Button.types';

/**
 * Creates dynamic button styles based on variant and size
 */
export const createButtonStyles = (variant: ButtonVariant, size: ButtonSize, disabled: boolean) => {
  // Base button styles (consistent across variants)
  const baseButton = {
    height: size === 'lg' ? 56 : 48,
    borderRadius: borderRadius.md,
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    paddingHorizontal: spacing.lg,
    gap: spacing.sm,
    ...shadows.sm,
  };

  // Variant-specific styles
  const variantStyles = {
    primary: {
      backgroundColor: disabled ? colors.neutral[300] : colors.primary[500],
    },
    secondary: {
      backgroundColor: 'transparent',
      borderWidth: 1.5,
      borderColor: disabled ? colors.neutral[300] : colors.neutral[400],
    },
  };

  // Text styles per variant
  const textStyles = {
    primary: {
      ...typography.bodyEmphasized,
      color: disabled ? colors.neutral[600] : '#FFFFFF',
    },
    secondary: {
      ...typography.bodyEmphasized,
      color: disabled ? colors.neutral[600] : colors.neutral[900],
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
