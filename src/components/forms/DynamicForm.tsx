import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  useColorScheme,
  Platform,
} from 'react-native';
import { theme } from '@/theme';
import { Button } from '@/components/ui';
import type { OnboardingField } from '@/config/onboarding';

/**
 * DynamicForm
 * 
 * Rendert Formular-Felder basierend auf Config-Array.
 * Wiederverwendbar für Register, Onboarding, Profile-Edit.
 * 
 * Aktuell: text, email, password, textarea
 * Später: select, multiselect, checkbox, radio, image
 */

// ============================================================================
// TYPES
// ============================================================================

export interface DynamicFormProps {
  fields: OnboardingField[];
  onSubmit: (formData: Record<string, any>) => void;
  submitButtonText?: string;
  initialValues?: Record<string, any>;
}

// ============================================================================
// COMPONENT
// ============================================================================

export default function DynamicForm({
  fields,
  onSubmit,
  submitButtonText = 'Weiter',
  initialValues = {},
}: DynamicFormProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  const [formData, setFormData] = useState<Record<string, any>>(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Aktualisiert ein einzelnes Feld und löscht ggf. den Fehler
  const updateField = (fieldName: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: value,
    }));
    
    if (errors[fieldName]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[fieldName];
        return newErrors;
      });
    }
  };

  // Validiert Formular (aktuell: required-Check; später: pattern, minLength, etc.)
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    fields.forEach(field => {
      if (field.required) {
        const value = formData[field.name];
        
        if (!value || (typeof value === 'string' && value.trim() === '')) {
          newErrors[field.name] = 'Dieses Feld ist erforderlich';
        }
        
        if (Array.isArray(value) && value.length === 0) {
          newErrors[field.name] = 'Bitte wähle mindestens eine Option';
        }
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit(formData);
    } else {
      console.log('[DynamicForm] Validation failed:', errors);
    }
  };
  // Rendert Feld basierend auf Type
  const renderField = (field: OnboardingField) => {
    const value = formData[field.name] || '';
    const error = errors[field.name];
    
    switch (field.type) {
      case 'text':
      case 'email':
        return (
          <FormInput
            key={field.name}
            label={field.label}
            value={value}
            onChangeText={(text) => updateField(field.name, text)}
            placeholder={field.placeholder}
            keyboardType={field.type === 'email' ? 'email-address' : 'default'}
            autoCapitalize={field.type === 'email' ? 'none' : 'sentences'}
            error={error}
            isDark={isDark}
          />
        );
      
      case 'password':
        return (
          <FormInput
            key={field.name}
            label={field.label}
            value={value}
            onChangeText={(text) => updateField(field.name, text)}
            placeholder={field.placeholder}
            secureTextEntry
            autoCapitalize="none"
            error={error}
            isDark={isDark}
          />
        );
      
      case 'textarea':
        return (
          <FormInput
            key={field.name}
            label={field.label}
            value={value}
            onChangeText={(text) => updateField(field.name, text)}
            placeholder={field.placeholder}
            multiline
            numberOfLines={4}
            error={error}
            isDark={isDark}
          />
        );
      
      case 'select':
      case 'multiselect':
      case 'checkbox':
      case 'radio':
        // Placeholder für zukünftige Field-Types
        return (
          <View key={field.name} style={styles.fieldContainer}>
            <Text style={[styles.label, isDark && styles.labelDark]}>
              {field.label}
            </Text>
            <Text style={[styles.placeholder, isDark && styles.placeholderDark]}>
              {field.type} - Kommt später
            </Text>
          </View>
        );
      
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView 
        style={styles.fieldsContainer}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {fields.map(field => renderField(field))}
      </ScrollView>

      <Button
        variant="primary"
        size="lg"
        fullWidth
        onPress={handleSubmit}
        accessibilityLabel={submitButtonText}
      >
        {submitButtonText}
      </Button>
    </View>
  );
}

// ============================================================================
// FORM INPUT
// ============================================================================

interface FormInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  multiline?: boolean;
  numberOfLines?: number;
  error?: string;
  isDark: boolean;
}

function FormInput({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  keyboardType = 'default',
  autoCapitalize = 'sentences',
  multiline = false,
  numberOfLines = 1,
  error,
  isDark,
}: FormInputProps) {
  return (
    <View style={styles.fieldContainer}>
      <Text style={[styles.label, isDark && styles.labelDark]}>
        {label}
      </Text>

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

      {error && (
        <Text style={styles.errorText}>
          {error}
        </Text>
      )}
    </View>
  );
}

// ============================================================================
// STYLES
// ============================================================================

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  
  fieldsContainer: {
    flex: 1,
  },
  
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
  
  placeholder: {
    ...theme.typography.body,
    color: theme.colors.neutral[600],
    fontStyle: 'italic',
  },
  placeholderDark: {
    color: theme.darkColors.neutral[600],
  },
});
