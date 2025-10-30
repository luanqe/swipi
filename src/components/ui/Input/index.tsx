import React from 'react';
import { View, TextInput as RNTextInput, useColorScheme } from 'react-native';
import { Text } from '@/components/ui/Text';
import { InputProps } from './Input.types';
import { createInputStyles } from './Input.styles';
import { colors, darkColors } from '@/theme';

/**
 * Input Component
 * 
 * Wiederverwendbare Text-Input Komponente mit:
 * - Optional Label
 * - Error State
 * - Dark Mode Support
 * - Accessibility
 * - Konsistente Styling
 * 
 * @example
 * <Input
 *   label="E-Mail"
 *   placeholder="deine@email.com"
 *   value={email}
 *   onChangeText={setEmail}
 *   keyboardType="email-address"
 *   error={emailError}
 * />
 */
export const Input: React.FC<InputProps> = ({
  label,
  error,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'none',
  autoCorrect = false,
  ...props
}) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  const styles = createInputStyles(!!error, isDark);
  const activeColors = isDark ? darkColors : colors;

  return (
    <View style={styles.container}>
      {/* Optional Label */}
      {label && (
        <Text variant="callout" color="secondary" style={styles.label}>
          {label}
        </Text>
      )}
      
      {/* Text Input */}
      <RNTextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={activeColors.neutral[600]}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        autoCorrect={autoCorrect}
        accessible={true}
        accessibilityLabel={label || placeholder}
        {...props}
      />
      
      {/* Error Message */}
      {error && (
        <Text variant="caption1" color="error" style={styles.error}>
          {error}
        </Text>
      )}
    </View>
  );
};
