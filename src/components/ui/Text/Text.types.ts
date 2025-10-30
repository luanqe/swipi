import { ReactNode } from 'react';
import { TextStyle } from 'react-native';

export type TextVariant = 
  | 'largeTitle'
  | 'title1'
  | 'title2'
  | 'title3'
  | 'body'
  | 'bodyEmphasized'
  | 'callout'
  | 'subhead'
  | 'footnote'
  | 'caption1'
  | 'caption2';

export type TextColor = 
  | 'primary'      // neutral[900] / darkColors.neutral[900]
  | 'secondary'    // neutral[700]
  | 'tertiary'     // neutral[600]
  | 'disabled'     // neutral[400]
  | 'accent'       // colors.primary[500]
  | 'error'        // colors.error
  | 'success'      // colors.success
  | 'white';       // #FFFFFF

export interface TextProps {
  /**
   * Typography variant from theme
   */
  variant?: TextVariant;
  
  /**
   * Text color from predefined palette
   */
  color?: TextColor;
  
  /**
   * Text content
   */
  children: ReactNode;
  
  /**
   * Number of lines before truncating
   */
  numberOfLines?: number;
  
  /**
   * Text alignment
   */
  textAlign?: 'left' | 'center' | 'right';
  
  /**
   * Custom style overrides (use sparingly)
   */
  style?: TextStyle;
}
