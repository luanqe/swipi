import { TextInputProps } from 'react-native';

export interface InputProps extends Omit<TextInputProps, 'style'> {
  /**
   * Input label (optional)
   */
  label?: string;
  
  /**
   * Error message (displays below input)
   */
  error?: string;
  
  /**
   * Custom placeholder
   */
  placeholder?: string;
  
  /**
   * Input value
   */
  value: string;
  
  /**
   * Change handler
   */
  onChangeText: (text: string) => void;
  
  /**
   * Secure text entry (password)
   */
  secureTextEntry?: boolean;
  
  /**
   * Keyboard type
   */
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  
  /**
   * Auto capitalize
   */
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  
  /**
   * Auto correct
   */
  autoCorrect?: boolean;
  
  /**
   * Multiline support (Textarea)
   */
  multiline?: boolean;
  
  /**
   * Number of lines (for multiline)
   */
  numberOfLines?: number;
}
