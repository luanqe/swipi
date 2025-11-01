import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
} from 'react-native';
import { theme } from '@/theme';
import type { FormInputProps } from './FormInput.types';

/**
 * FormInput Component
 * 
 * Wiederverwendbares Input-Feld für Formulare.
 * Extrahiert aus DynamicForm.tsx (SRP: nur Input-Rendering).
 * 
 * Features:
 * - Label + Input + Error Message
 * - Dark Mode Support
 * - Multiline Support (Textarea)
 * - Verschiedene Keyboard-Types
 * - Secure Entry (Password)
 */

export function FormInput({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'sentences',
  multiline = false,
  numberOfLines = 1,
  error,
  isDark,
}: FormInputProps) {
  return (
    <View style={styles.fieldContainer}>
      {/* Label */}
      <Text style={[styles.label, isDark && styles.labelDark]}>
        {label}
      </Text>

      {/* Input Field */}
      <TextInput
        style={[
          styles.input,
          multiline && styles.inputMultiline,
          isDark && styles.inputDark,
          error && styles.inputError,
        ]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={isDark ? theme.darkColors.neutral[600] : theme.colors.neutral[600]}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        autoCorrect={false}
        multiline={multiline}
        numberOfLines={numberOfLines}
        textAlignVertical={multiline ? 'top' : 'center'}
      />

      {/* Error Message */}
      {error && (
        <Text style={styles.errorText}>
          {error}
        </Text>
      )}
    </View>
  );
}

// ============================================================================
// STYLES (extrahiert aus DynamicForm.tsx)
// ============================================================================

const styles = StyleSheet.create({
  fieldContainer: {
    marginBottom: theme.spacing.lg,
  },
  
  label: {
    ...theme.typography.subhead,
    color: theme.colors.neutral[900],
    fontWeight: '600',
    marginBottom: theme.spacing.sm,
  },
  labelDark: {
    color: theme.darkColors.neutral[900],
  },
  
  input: {
    ...theme.typography.body,
    backgroundColor: theme.colors.background.primary,
    borderWidth: 1.5,
    borderColor: theme.colors.neutral[400],
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
    minHeight: 56,
    color: theme.colors.neutral[900],
  },
  inputDark: {
    backgroundColor: theme.darkColors.background.secondary,
    borderColor: theme.darkColors.neutral[400],
    color: theme.darkColors.neutral[900],
  },
  inputMultiline: {
    minHeight: 120,
    paddingTop: theme.spacing.md,
  },
  inputError: {
    borderColor: theme.colors.error,
  },
  
  errorText: {
    ...theme.typography.caption1,
    color: theme.colors.error,
    marginTop: theme.spacing.xs,
  },
});
