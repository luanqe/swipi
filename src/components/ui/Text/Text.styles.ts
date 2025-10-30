import { StyleSheet, useColorScheme } from 'react-native';
import { colors, darkColors, typography } from '@/theme';
import { TextVariant, TextColor } from './Text.types';

/**
 * Get text color based on color prop and dark mode
 */
export const getTextColor = (color: TextColor, isDark: boolean): string => {
  const activeColors = isDark ? darkColors : colors;
  
  const colorMap: Record<TextColor, string> = {
    primary: activeColors.neutral[900],
    secondary: activeColors.neutral[700],
    tertiary: activeColors.neutral[600],
    disabled: activeColors.neutral[400],
    accent: colors.primary[500],
    error: colors.error,
    success: colors.success,
    white: '#FFFFFF',
  };
  
  return colorMap[color];
};

/**
 * Creates text styles based on variant and color
 */
export const createTextStyles = (variant: TextVariant, color: TextColor, isDark: boolean) => {
  return StyleSheet.create({
    text: {
      ...typography[variant],
      color: getTextColor(color, isDark),
    },
  });
};
