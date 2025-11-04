/**
 * FormMultiSelect Component
 * Multi-Choice Selection mit Checkboxes
 * Nutzt Theme-Tokens (Component-First, DRY)
 */

import React from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Text } from '@/components/ui';
import { colors, spacing, borderRadius, shadows } from '@/theme';
import { fieldStyles } from '../sharedStyles';

export interface FormMultiSelectProps {
  label: string;
  value: string[];
  options: string[];
  placeholder?: string;
  required?: boolean;
  error?: string;
  isDark?: boolean;
  onValueChange: (value: string[]) => void;
}

export const FormMultiSelect: React.FC<FormMultiSelectProps> = ({
  label,
  value,
  options,
  placeholder = 'Wähle mindestens eine Option',
  required = false,
  error,
  isDark = false,
  onValueChange,
}) => {
  const handleToggle = (option: string) => {
    if (value.includes(option)) {
      // Remove option
      onValueChange(value.filter((v) => v !== option));
    } else {
      // Add option
      onValueChange([...value, option]);
    }
  };

  return (
    <View style={fieldStyles.fieldContainer}>
      {/* Label */}
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
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
        
        {/* Selection Counter */}
        {value.length > 0 && (
          <Text variant="caption1" style={styles.count}>
            {value.length} ausgewählt
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
          const isSelected = value.includes(option);
          
          return (
            <TouchableOpacity
              key={option}
              style={[
                styles.option,
                isSelected && styles.optionSelected,
              ]}
              onPress={() => handleToggle(option)}
              activeOpacity={0.7}
            >
              {/* Checkbox */}
              <View style={[
                styles.checkbox,
                isSelected && styles.checkboxSelected,
              ]}>
                {isSelected && (
                  <Text style={styles.checkmark}>✓</Text>
                )}
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
  count: {
    color: colors.primary[500],
    fontWeight: '600',
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
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: borderRadius.sm,
    borderWidth: 2,
    borderColor: colors.neutral[400],
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxSelected: {
    backgroundColor: colors.primary[500],
    borderColor: colors.primary[500],
  },
  checkmark: {
    color: colors.background.primary,
    fontSize: 16,
    fontWeight: 'bold',
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
