/**
 * FormInputProps
 * Definiert die Eingabe-Parameter (Props) für die FormInput-Komponente.
 * Ursprünglich aus DynamicForm.tsx extrahiert, um wiederverwendbar zu sein.
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
