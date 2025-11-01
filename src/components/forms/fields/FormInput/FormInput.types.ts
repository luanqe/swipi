/**
 * FormInput Types
 * 
 * Props Interface für FormInput Komponente.
 * Extrahiert aus DynamicForm.tsx FormInputProps Interface.
 */

export interface FormInputProps {
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
