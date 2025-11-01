import type { OnboardingField } from '@/config/onboarding';

/**
 * Shared Types für DynamicForm System
 * 
 * Zentrale Type-Definitionen für alle Form-Komponenten.
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
