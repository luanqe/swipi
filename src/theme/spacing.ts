/**
 * Swipi Spacing System
 * Based on 8pt Grid System (Apple HIG)
 */

import { Platform } from 'react-native';

export const spacing = {
  xs:   4,    // Tight spacing (reserved)
  sm:   8,    // Input → Hint, Title → Description in Cards
  md:   16,   // Button Gap, Card Gap, Card Internal Padding, Input Gap
  lg:   24,   // Section Spacing (Cards → Button, Bottom Padding iOS)
  xl:   32,   // Title → Content (Login), Logo → Slogan, Bottom Padding Android
  xxl:  48,   // Section spacing (reserved)
  xxxl: 64,   // Top Padding (Screens mit Titel oben)
};

/**
 * Platform-Specific Bottom Padding für Buttons auf Daumenhöhe
 * iOS: 24px (lg) - Home Indicator ist niedriger
 * Android: 32px (xl) - Mehr Platz für Software-Navigation
 */
export const bottomPadding = Platform.select({
  ios: spacing.lg,      // 24px
  android: spacing.xl,  // 32px
  default: spacing.lg,
});
