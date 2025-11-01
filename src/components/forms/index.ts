/**
 * Forms Module Exports
 * 
 * Zentrale Export-Datei für alle Form-Komponenten.
 * Vereinfacht Imports in anderen Teilen der App.
 */

// Main Component
export { default as DynamicForm } from './DynamicForm';

// Types
export type { 
  DynamicFormProps,
  FormState,
  ValidationState,
} from './types';

// Hooks
export { useFormState } from './hooks/useFormState';
export { useFormValidation } from './hooks/useFormValidation';

// Field Components
export { FormInput } from './fields/FormInput';
export type { FormInputProps } from './fields/FormInput/FormInput.types';

// Registry (für Erweiterungen)
export { fieldRegistry } from './fields/fieldRegistry';
export type { FieldComponentProps } from './fields/fieldRegistry';
