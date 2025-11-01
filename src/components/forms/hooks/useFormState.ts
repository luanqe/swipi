import { useState } from 'react';
import type { FormState } from '../types';

/**
 * useFormState Hook
 * 
 * Verwaltet Form State (SRP: nur State Management).
 * Extrahiert aus DynamicForm.tsx:
 * - formData State
 * - updateField Funktion
 * - resetForm Funktion (neu hinzugefügt für Erweiterbarkeit)
 */

export function useFormState(initialValues: Record<string, any> = {}): FormState {
  const [formData, setFormData] = useState<Record<string, any>>(initialValues);

  // Aktualisiert ein einzelnes Feld
  const updateField = (fieldName: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  // Setzt Form auf Initial-Werte zurück
  const resetForm = () => {
    setFormData(initialValues);
  };

  return {
    formData,
    updateField,
    resetForm,
  };
}
