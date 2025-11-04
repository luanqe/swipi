import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Button } from '@/components/ui';
import { useFormState } from './hooks/useFormState';
import { useFormValidation } from './hooks/useFormValidation';
import { fieldRegistry } from './fields/fieldRegistry';
import { useTheme } from '@/hooks/useTheme';
import type { DynamicFormProps } from './types';
import type { OnboardingField } from '@/config/onboarding';

/**
 * DynamicForm
 *
 * Zentrale Formular-Komponente mit klarer Aufgaben­trennung nach SOLID-Prinzipien.
 *
 * Verantwortlichkeiten:
 * - State-Management → useFormState (SRP)
 * - Validierung → useFormValidation (SRP)
 * - Field-Rendering → fieldRegistry (OCP)
 *
 * Einsatzbereiche:
 * Registrierung, Onboarding, Profilbearbeitung usw.
 * Neue Feldtypen können ergänzt werden, ohne bestehenden Code anzupassen.
 */

export default function DynamicForm({
  fields,
  onSubmit,
  submitButtonText = 'Weiter',
  initialValues = {},
}: DynamicFormProps) {
  const { isDark } = useTheme();

  // Separation of Concerns (SRP)
  const { formData, updateField } = useFormState(initialValues);
  const { errors, validateForm, clearError } = useFormValidation(fields, formData);

  // Aktualisiert Feld und löscht zugehörigen Fehler
  const handleFieldChange = (fieldName: string, value: any) => {
    updateField(fieldName, value);
    clearError(fieldName);
  };

  // Submit mit Validierung
  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit(formData);
    } else {
      console.log('[DynamicForm] Validation failed:', errors);
    }
  };

  // Rendert Feld basierend auf Registry (OCP)
  const renderField = (field: OnboardingField) => {
    const FieldComponent = fieldRegistry[field.type];
    
    if (!FieldComponent) {
      console.warn(`[DynamicForm] Unknown field type: ${field.type}`);
      return null;
    }

    return (
      <FieldComponent
        key={field.name}
        field={field}
        value={formData[field.name]}
        onChange={(value: any) => handleFieldChange(field.name, value)}
        error={errors[field.name]}
        isDark={isDark}
      />
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView 
        style={styles.fieldsContainer}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {fields.map(renderField)}
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
// STYLES
// ============================================================================

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  
  fieldsContainer: {
    flex: 1,
  },
});
