import { useState } from 'react';
import type { FormState } from '../types';

/**
 * useFormState
 *
 * Kümmert sich ausschließlich um das Zustandsmanagement eines Formulars.
 * Ursprünglich aus DynamicForm.tsx extrahiert, um Logik und UI zu trennen (Single Responsibility).
 *
 * Enthält:
 * - formData: aktueller Formularzustand
 * - updateField: aktualisiert ein einzelnes Feld
 * - resetForm: setzt alle Werte auf die Initialwerte zurück
 */

  // Aktueller Formularzustand
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
