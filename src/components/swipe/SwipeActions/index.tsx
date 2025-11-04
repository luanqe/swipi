/**
 * SwipeActions Component
 * Dislike/Like Buttons für Swipe Interaction
 */

import React from 'react';
import { View, StyleSheet, TouchableOpacity, Platform, Text } from 'react-native';
import * as Haptics from 'expo-haptics';
import { colors, spacing, shadows, borderRadius } from '../../../theme';

interface SwipeActionsProps {
  onDislike: () => void;
  onLike: () => void;
  disabled?: boolean;
}

export const SwipeActions: React.FC<SwipeActionsProps> = ({
  onDislike,
  onLike,
  disabled = false,
}) => {
  const handleDislike = () => {
    if (disabled) return;
    
    // Haptic Feedback
    if (Platform.OS === 'ios') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    
    onDislike();
  };

  const handleLike = () => {
    if (disabled) return;
    
    // Haptic Feedback
    if (Platform.OS === 'ios') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    
    onLike();
  };

  return (
    <View style={styles.container}>
      {/* Dislike Button */}
      <TouchableOpacity
        style={[styles.actionButton, styles.dislikeButton]}
        onPress={handleDislike}
        disabled={disabled}
        activeOpacity={0.8}
      >
        <Text style={[styles.icon, styles.dislikeIcon]}>✕</Text>
      </TouchableOpacity>

      {/* Like Button */}
      <TouchableOpacity
        style={[styles.actionButton, styles.likeButton]}
        onPress={handleLike}
        disabled={disabled}
        activeOpacity={0.8}
      >
        <Text style={[styles.icon, styles.likeIcon]}>♥</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.xl * 2,
    paddingVertical: spacing.xl,
  },
  actionButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.lg,
  },
  dislikeButton: {
    backgroundColor: colors.background.primary,
    borderWidth: 2,
    borderColor: colors.error,
  },
  likeButton: {
    backgroundColor: colors.success,
    borderWidth: 2,
    borderColor: colors.success,
  },
  icon: {
    fontSize: 32,
  },
  dislikeIcon: {
    color: colors.error,
  },
  likeIcon: {
    color: colors.background.primary,
  },
});
