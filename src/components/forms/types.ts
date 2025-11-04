import type { OnboardingField } from '@/config/onboarding';

/**
 * Gemeinsame Typdefinitionen für das DynamicForm-System.
 *
 * Enthält zentrale Interfaces für:
 * - Komponenten-Props
 * - Formularzustand
 * - Validierungslogik
 *
 * Wird von allen Form-Modulen gemeinsam verwendet.
 */


// ============================================================================
// FORM PROPS
// ============================================================================

export interface DynamicFormProps {
  fields: OnboardingField[];
  onSubmit: (formData: Record<string, any>) => void;
  submitButtonText?: string;
  initialValues?: Record<string, any>;
}

// ============================================================================
// FORM STATE
// ============================================================================

export interface FormState {
  formData: Record<string, any>;
  updateField: (fieldName: string, value: any) => void;
  resetForm: () => void;
}

// ============================================================================
// VALIDATION
// ============================================================================

export interface ValidationState {
  errors: Record<string, string>;
  validateForm: () => boolean;
  clearError: (fieldName: string) => void;
  setError: (fieldName: string, errorMessage: string) => void;
}
