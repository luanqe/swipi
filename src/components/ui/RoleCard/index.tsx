import React, { useRef } from 'react';
import { TouchableOpacity, View, StyleSheet, Animated, Platform } from 'react-native';
import * as Haptics from 'expo-haptics';
import { Text } from '@/components/ui';
import { spacing, borderRadius, shadows } from '@/theme';
import { useTheme } from '@/hooks/useTheme';

interface RoleCardProps {
  /**
   * Card title (Bewerber, Firma, Recruiter)
   */
  title: string;
  
  /**
   * Emoji icon (z.B. 👤, 🏢)
   */
  icon: string;
  
  /**
   * Press handler
   */
  onPress: () => void;
  
  /**
   * Accessibility label
   */
  accessibilityLabel?: string;
  
  /**
   * Accessibility hint
   */
  accessibilityHint?: string;
}

/**
 * Role Card Component
 * 
 * Responsive Card für Rollenauswahl (Bewerber, Firma, Recruiter)
 * - Nutzt wiederverwendbare Text Component aus @/components/ui
 * - Alle Werte aus Theme System (keine Magic Numbers)
 * - Responsive Layout (aspectRatio statt feste Höhe)
 * - Platform-native Interactions (Haptics, Animation)
 * - Dark Mode Support automatisch
 * - Accessibility vollständig implementiert
 */
export const RoleCard: React.FC<RoleCardProps> = ({
  title,
  icon,
  onPress,
  accessibilityLabel,
  accessibilityHint,
}) => {
  const { activeColors } = useTheme();
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    // iOS Haptic Feedback (Apple HIG Compliance)
    if (Platform.OS === 'ios') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    
    Animated.spring(scale, {
      toValue: 0.95,
      damping: 15,
      stiffness: 150,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      damping: 15,
      stiffness: 150,
      useNativeDriver: true,
    }).start();
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel || `${title} auswählen`}
      accessibilityHint={accessibilityHint || 'Doppeltippen um Rolle auszuwählen'}
      activeOpacity={1}
      style={styles.touchable}
    >
      <Animated.View 
        style={[
          styles.card,
          {
            backgroundColor: activeColors.background.primary,
            borderColor: activeColors.neutral[300],
            transform: [{ scale }],
          },
        ]}
      >
        {/* Icon Container - flex: 1 nutzt verfügbaren Raum */}
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>{icon}</Text>
        </View>

        {/* Text Component aus @/components/ui - WIEDERVERWENDUNG */}
        <View style={styles.textContainer}>
          <Text variant="title2" color="primary" textAlign="center">
            {title}
          </Text>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchable: {
    flex: 1,
    // Keine feste Höhe - wächst mit Container
  },
  
  card: {
    flex: 1,
    aspectRatio: 1, // Responsive: Quadratisch, skaliert automatisch
    minHeight: 180, // Nur Fallback für sehr kleine Screens
    borderRadius: borderRadius.xl, // Aus Theme
    borderWidth: 2,
    padding: spacing.md, // Aus Theme
    ...shadows.md, // Aus Theme
  },
  
  iconContainer: {
    flex: 1, // Icon nutzt verfügbaren Platz
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  icon: {
    fontSize: spacing.xxl, // 64px aus Theme (8pt Grid)
    lineHeight: spacing.xxxl, // Verhindert Emoji-Clipping
  },
  
  textContainer: {
    alignItems: 'center',
    paddingTop: spacing.sm, // Aus Theme
  },
});
