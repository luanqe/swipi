import React from 'react';
import { View } from 'react-native';
import { Input } from '@/components/ui';
import { fieldStyles } from '../sharedStyles';
import type { FormInputProps } from './FormInput.types';

/**
 * FormInput
 *
 * Universelles Eingabefeld für Formulare.
 * Ursprünglich aus DynamicForm.tsx ausgelagert, um nur das Input-Rendering zu übernehmen (SRP).
 *
 * Eigenschaften:
 * - nutzt zentrale UI-Input-Komponente → keine Style-Duplikate
 * - unterstützt Label, Fehlertext und sichere Eingabe (Passwort)
 * - funktioniert mit verschiedenen Tastaturtypen und Multiline
 * - Dark-Mode-kompatibel (über Theme-System, Prop bleibt aus Kompatibilitätsgründen)
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
      {/*  Wiederverwendbare UI Input Component */}
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
