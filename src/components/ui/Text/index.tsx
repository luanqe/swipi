import React from 'react';
import { Text as RNText } from 'react-native';
import { TextProps } from './Text.types';
import { createTextStyles } from './Text.styles';
import { useTheme } from '@/hooks/useTheme';

/**
 * Text Component
 * 
 * Wiederverwendbare Typography-Komponente mit:
 * - Predefined Typography Variants (title1, body, etc.)
 * - Semantic Color Options
 * - Automatic Dark Mode Support
 * - Consistent Styling aus Theme
 * 
 * @example
 * <Text variant="title1" color="primary">
 *   Willkommen bei Swipi
 * </Text>
 * 
 * <Text variant="body" color="secondary" numberOfLines={2}>
 *   Beschreibungstext der auf 2 Zeilen begrenzt ist
 * </Text>
 */
export const Text: React.FC<TextProps> = ({
  variant = 'body',
  color = 'primary',
  children,
  numberOfLines,
  textAlign,
  style,
}) => {
  const { isDark } = useTheme();
  
  const styles = createTextStyles(variant, color, isDark);

  return (
    <RNText
      style={[
        styles.text,
        textAlign && { textAlign },
        style,
      ]}
      numberOfLines={numberOfLines}
    >
      {children}
    </RNText>
  );
};
