import { StyleSheet } from 'react-native';
import { theme } from '@/theme';

/**
 * Shared Field Styles
 * 
 * Wiederverwendbare Styles für alle Field-Components.
 * DRY: Einmal definiert, überall verwendet.
 * 
 * Vermeidet Code-Duplikation zwischen:
 * - FormInput Component
 * - fieldRegistry Placeholder Component
 * - Zukünftige Field-Types (Select, Checkbox, etc.)
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
