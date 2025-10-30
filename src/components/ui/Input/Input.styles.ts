import { StyleSheet } from 'react-native';
import { colors, darkColors, typography, borderRadius, shadows, spacing } from '@/theme';

/**
 * Creates input styles based on error state and dark mode
 */
export const createInputStyles = (hasError: boolean, isDark: boolean) => {
  const activeColors = isDark ? darkColors : colors;
  
  return StyleSheet.create({
    container: {
      marginBottom: spacing.sm,
    },
    label: {
      ...typography.callout,
      color: activeColors.neutral[700],
      marginBottom: spacing.xs,
    },
    input: {
      height: 56,
      backgroundColor: activeColors.background.primary,
      borderWidth: 1.5,
      borderColor: hasError ? colors.error : activeColors.neutral[300],
      borderRadius: borderRadius.md,
      paddingHorizontal: spacing.md,
      fontSize: 17,
      color: activeColors.neutral[900],
      ...shadows.sm,
    },
    error: {
      ...typography.caption1,
      color: colors.error,
      marginTop: spacing.xs,
    },
  });
};
