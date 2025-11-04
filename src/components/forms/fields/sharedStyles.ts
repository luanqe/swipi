import { StyleSheet } from 'react-native';
import { theme } from '@/theme';

/**
 * Gemeinsame Field-Styles
 *
 * Basis-Styles für alle Form-Felder.
 * Einmal definiert, überall nutzbar (verhindert doppelte Styles).
 *
 * Aktuell genutzt von:
 * - FormInput
 * - Placeholder-Feldern im Field-Registry
 * - später Select, Checkbox usw.
 */


export const fieldStyles = StyleSheet.create({
  // Container für jedes Field (spacing zwischen Fields)
  fieldContainer: {
    marginBottom: theme.spacing.lg,
  },
  
  // Label Styles (Standard)
  label: {
    ...theme.typography.subhead,
    color: theme.colors.neutral[900],
    fontWeight: '600',
    marginBottom: theme.spacing.sm,
  },
  
  // Label Styles (Dark Mode)
  labelDark: {
    color: theme.darkColors.neutral[900],
  },
});
