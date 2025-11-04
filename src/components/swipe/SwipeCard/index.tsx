/**
 * SwipeCard Component
 * Wiederverwendbare Card für Job/Bewerber Anzeige
 * Nutzt Theme-Tokens (DRY-Prinzip)
 */

import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Text } from '../../ui';
import { colors, spacing, borderRadius, shadows } from '../../../theme';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Card nimmt 85% der Screen-Höhe und 90% der Breite
const CARD_WIDTH = SCREEN_WIDTH * 0.9;
const CARD_HEIGHT = SCREEN_HEIGHT * 0.7;

export interface SwipeCardProps {
  children: React.ReactNode;
  style?: object;
}

/**
 * Basis SwipeCard Component
 * Generic wrapper - Content wird via children übergeben
 */
export const SwipeCard: React.FC<SwipeCardProps> = ({ children, style }) => {
  return (
    <View style={[styles.card, style]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    backgroundColor: colors.background.primary,
    borderRadius: borderRadius.xl,
    ...shadows.lg,
    overflow: 'hidden',
  },
});
