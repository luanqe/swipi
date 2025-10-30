import { ReactNode } from 'react';
import { ViewStyle, TextStyle } from 'react-native';

export type ButtonVariant = 'primary' | 'secondary';
export type ButtonSize = 'md' | 'lg';

export interface ButtonProps {
  /**
   * Button variant styling
   * - primary: Filled background, white text
   * - secondary: Transparent background, bordered, primary text
   */
  variant?: ButtonVariant;
  
  /**
   * Button size
   * - md: Standard height (48px)
   * - lg: Large height (56px) - Default for CTA buttons
   */
  size?: ButtonSize;
  
  /**
   * Disabled state
   */
  disabled?: boolean;
  
  /**
   * Loading state (shows spinner, disables interaction)
   */
  loading?: boolean;
  
  /**
   * Button text content
   */
  children: string;
  
  /**
   * Press handler
   */
  onPress: () => void;
  
  /**
   * Optional left icon
   */
  leftIcon?: ReactNode;
  
  /**
   * Optional right icon
   */
  rightIcon?: ReactNode;
  
  /**
   * Accessibility label (defaults to children)
   */
  accessibilityLabel?: string;
  
  /**
   * Accessibility hint
   */
  accessibilityHint?: string;
  
  /**
   * Custom style overrides (use sparingly)
   */
  style?: ViewStyle;
  
  /**
   * Custom text style overrides (use sparingly)
   */
  textStyle?: TextStyle;
}
