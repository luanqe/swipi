/**
 * FormSelect Component
 * Single-Choice Selection mit Radio Buttons
 * Nutzt Theme-Tokens (Component-First, DRY)
 */

import React from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Text } from '@/components/ui';
import { colors, spacing, borderRadius, shadows } from '@/theme';
import { fieldStyles } from '../sharedStyles';

export interface FormSelectProps {
  label: string;
  value: string;
  options: string[];
  placeholder?: string;
  required?: boolean;
  error?: string;
  isDark?: boolean;
  onValueChange: (value: string) => void;
}

export const FormSelect: React.FC<FormSelectProps> = ({
  label,
  value,
  options,
  placeholder = 'Wähle eine Option',
  required = false,
  error,
  isDark = false,
  onValueChange,
}) => {
  return (
    <View style={fieldStyles.fieldContainer}>
      {/* Label */}
      <View style={{ flexDirection: 'row' }}>
        <Text variant="subhead" style={fieldStyles.label}>
          {label}
        </Text>
        {required && (
          <Text variant="subhead" style={styles.required}>
            {' *'}
          </Text>
        )}
      </View>

      {/* Options */}
      <ScrollView 
        style={styles.optionsContainer}
        contentContainerStyle={styles.optionsContent}
        showsVerticalScrollIndicator={false}
      >
        {options.map((option) => {
          const isSelected = value === option;
          
          return (
            <TouchableOpacity
              key={option}
              style={[
                styles.option,
                isSelected && styles.optionSelected,
              ]}
              onPress={() => onValueChange(option)}
              activeOpacity={0.7}
            >
              {/* Radio Button */}
              <View style={[
                styles.radio,
                isSelected && styles.radioSelected,
              ]}>
                {isSelected && <View style={styles.radioInner} />}
              </View>
              
              {/* Option Text */}
              <Text 
                variant="body" 
                style={isSelected ? styles.optionTextSelected : styles.optionText}
              >
                {option}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Error Message */}
      {error && (
        <Text variant="caption1" style={styles.error}>
          {error}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  required: {
    color: colors.error,
  },
  optionsContainer: {
    maxHeight: 300,
  },
  optionsContent: {
    gap: spacing.sm,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    backgroundColor: colors.background.primary,
    borderRadius: borderRadius.md,
    borderWidth: 2,
    borderColor: colors.neutral[300],
    gap: spacing.md,
    ...shadows.sm,
  },
  optionSelected: {
    backgroundColor: colors.primary[500] + '15', // 15% opacity
    borderColor: colors.primary[500],
  },
  radio: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.neutral[400],
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioSelected: {
    borderColor: colors.primary[500],
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.primary[500],
  },
  optionText: {
    flex: 1,
    color: colors.neutral[800],
  },
  optionTextSelected: {
    color: colors.primary[500],
    fontWeight: '600',
  },
  error: {
    color: colors.error,
    marginTop: spacing.xs,
  },
});
