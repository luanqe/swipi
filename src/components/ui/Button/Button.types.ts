import { ReactNode } from 'react';
import { ViewStyle, TextStyle } from 'react-native';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps {
  /**
   * Button variant styling
   * - primary: Filled background, white text
   * - secondary: Transparent background, bordered, primary text
   * - tertiary: Text only, no background, no border
   */
  variant?: ButtonVariant;
  
  /**
   * Button size
   * - sm: Small height (44px) - iOS minimum touch target
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
   * Full width (takes 100% of parent width)
   */
  fullWidth?: boolean;
  
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
