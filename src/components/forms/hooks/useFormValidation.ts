import { useState } from 'react';
import type { OnboardingField } from '@/config/onboarding';
import type { ValidationState } from '../types';

/**
 * useFormValidation
 *
 * Kapselt die gesamte Validierungslogik eines Formulars.
 * Fokus: nur Validation (Single Responsibility).
 *
 * Ursprung: aus DynamicForm.tsx ausgelagert, um UI und Logik zu trennen.
 *
 * Funktionen:
 * - validateForm: prüft Pflichtfelder (Strings & Arrays)
 * - clearError: entfernt den Fehler eines bestimmten Feldes
 * - setError: setzt einen manuellen Fehler (z. B. nach Server-Response)
 */

export function useFormValidation(
  fields: OnboardingField[],
  formData: Record<string, any>
): ValidationState {
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Validiert alle Felder basierend auf Config
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    fields.forEach(field => {
      if (field.required) {
        const value = formData[field.name];
        
        // String-Validation
        if (!value || (typeof value === 'string' && value.trim() === '')) {
          newErrors[field.name] = 'Dieses Feld ist erforderlich';
        }
        
        // Array-Validation (für multiselect, checkbox, etc.)
        if (Array.isArray(value) && value.length === 0) {
          newErrors[field.name] = 'Bitte wähle mindestens eine Option';
        }
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Löscht Fehler für ein spezifisches Feld
  const clearError = (fieldName: string) => {
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[fieldName];
      return newErrors;
    });
  };

  // Setzt manuell einen Fehler (z.B. für Server-Validierung)
  const setError = (fieldName: string, errorMessage: string) => {
    setErrors(prev => ({
      ...prev,
      [fieldName]: errorMessage,
    }));
  };

  return {
    errors,
    validateForm,
    clearError,
    setError,
  };
}
