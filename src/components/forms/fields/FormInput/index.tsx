import React from 'react';
import { View } from 'react-native';
import { Input } from '@/components/ui';
import { fieldStyles } from '../sharedStyles';
import type { FormInputProps } from './FormInput.types';

/**
 * FormInput Component
 * 
 * Wiederverwendbares Input-Feld für Formulare.
 * Extrahiert aus DynamicForm.tsx (SRP: nur Input-Rendering).
 * 
 * Features:
 * - ✅ Nutzt UI Input Component (keine duplizierten Styles!)
 * - Label + Input + Error Message
 * - Dark Mode Support
 * - Multiline Support (Textarea)
 * - Verschiedene Keyboard-Types
 * - Secure Entry (Password)
 */

export function FormInput({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'sentences',
  multiline = false,
  numberOfLines = 1,
  error,
  isDark, // Wird nicht mehr gebraucht, aber behalten für Props-Kompatibilität
}: FormInputProps) {
  return (
    <View style={fieldStyles.fieldContainer}>
      {/* ✅ Wiederverwendbare UI Input Component */}
      <Input
        label={label}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        multiline={multiline}
        numberOfLines={numberOfLines}
        error={error}
      />
    </View>
  );
}
