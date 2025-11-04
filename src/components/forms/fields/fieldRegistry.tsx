import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type { OnboardingField } from '@/config/onboarding';
import { FormInput } from './FormInput';
import { fieldStyles } from './sharedStyles';
import { theme } from '@/theme';

/**
 * Field Registry
 *
 * Zentrale Zuordnung von Field-Types zu ihren jeweiligen Komponenten.
 * Unterstützt das Open/Closed Principle (OCP): Neue Feldtypen können ergänzt werden, 
 * ohne bestehenden Code anzupassen.
 *
 * Ursprung: aus DynamicForm.tsx (renderField) extrahiert.
 */

// ============================================================================
// FIELD COMPONENT INTERFACE
// ============================================================================

export interface FieldComponentProps {
  field: OnboardingField;
  value: any;
  onChange: (value: any) => void;
  error?: string;
  isDark: boolean;
}

// ============================================================================
// FIELD COMPONENTS
// ============================================================================

// Text Input Component (text + email)
function TextFieldComponent({ field, value, onChange, error, isDark }: FieldComponentProps) {
  return (
    <FormInput
      label={field.label}
      value={value || ''}
      onChangeText={onChange}
      placeholder={field.placeholder}
      keyboardType={field.type === 'email' ? 'email-address' : 'default'}
      autoCapitalize={field.type === 'email' ? 'none' : 'sentences'}
      error={error}
      isDark={isDark}
    />
  );
}

// Password Input Component
function PasswordFieldComponent({ field, value, onChange, error, isDark }: FieldComponentProps) {
  return (
    <FormInput
      label={field.label}
      value={value || ''}
      onChangeText={onChange}
      placeholder={field.placeholder}
      secureTextEntry
      autoCapitalize="none"
      error={error}
      isDark={isDark}
    />
  );
}

// Textarea Component
function TextareaFieldComponent({ field, value, onChange, error, isDark }: FieldComponentProps) {
  return (
    <FormInput
      label={field.label}
      value={value || ''}
      onChangeText={onChange}
      placeholder={field.placeholder}
      multiline
      numberOfLines={4}
      error={error}
      isDark={isDark}
    />
  );
}

// Placeholder Component (für noch nicht implementierte Types)
function PlaceholderFieldComponent({ field, isDark }: FieldComponentProps) {
  return (
    <View style={fieldStyles.fieldContainer}>
      <Text style={[fieldStyles.label, isDark && fieldStyles.labelDark]}>
        {field.label}
      </Text>
      <Text style={[styles.placeholder, isDark && styles.placeholderDark]}>
        {field.type} - Kommt später
      </Text>
    </View>
  );
}

// ============================================================================
// REGISTRY (OCP: Erweiterbar ohne Änderungen)
// ============================================================================

type FieldType = OnboardingField['type'];
type FieldComponent = React.ComponentType<FieldComponentProps>;

export const fieldRegistry: Record<FieldType, FieldComponent> = {
  text: TextFieldComponent,
  email: TextFieldComponent,
  password: PasswordFieldComponent,
  textarea: TextareaFieldComponent,
  
  // Placeholder für zukünftige Types
  select: PlaceholderFieldComponent,
  multiselect: PlaceholderFieldComponent,
  checkbox: PlaceholderFieldComponent,
  radio: PlaceholderFieldComponent,
};

// ============================================================================
// STYLES (nur Placeholder-spezifische Styles, shared styles in sharedStyles.ts)
// ============================================================================

const styles = StyleSheet.create({
  placeholder: {
    ...theme.typography.body,
    color: theme.colors.neutral[600],
    fontStyle: 'italic',
  },
  placeholderDark: {
    color: theme.darkColors.neutral[600],
  },
});
