import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { spacing, bottomPadding } from '@/theme';

interface ScreenProps {
  /**
   * Content für die Top Section (Logo, Titel, Inputs, etc.)
   */
  topSection?: React.ReactNode;
  
  /**
   * Content für die Bottom Section (CTA Buttons auf Daumenhöhe)
   */
  bottomSection: React.ReactNode;
  
  /**
   * Optional: Gradient Background Colors
   * Falls nicht angegeben, wird solider Background verwendet
   */
  gradientColors?: readonly [string, string, ...string[]];
  
  /**
   * Custom style overrides für content container
   */
  contentStyle?: ViewStyle;
  
  /**
   * Custom style overrides für top section
   */
  topSectionStyle?: ViewStyle;
  
  /**
   * Custom style overrides für bottom section
   */
  bottomSectionStyle?: ViewStyle;
}

/**
 * Screen Layout Component
 * 
 * Konsistentes Layout-Pattern für alle Screens:
 * - Top Section: Wächst nur so viel wie Content braucht
 * - Bottom Section: Buttons auf Daumenhöhe (durch space-between)
 * - Safe Area Support
 * - Optional Gradient Background
 * 
 * @example
 * <Screen
 *   topSection={
 *     <>
 *       <Logo size="large" />
 *       <Text variant="title2">Slogan</Text>
 *     </>
 *   }
 *   bottomSection={
 *     <>
 *       <Button variant="primary">Konto erstellen</Button>
 *       <Button variant="secondary">Anmelden</Button>
 *     </>
 *   }
 *   gradientColors={['#F7F8FA', '#FFFFFF']}
 * />
 */
export const Screen: React.FC<ScreenProps> = ({
  topSection,
  bottomSection,
  gradientColors,
  contentStyle,
  topSectionStyle,
  bottomSectionStyle,
}) => {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Optional Gradient Background */}
      {gradientColors && (
        <LinearGradient
          colors={gradientColors}
          style={StyleSheet.absoluteFillObject}
        />
      )}

      {/* Content Container */}
      <View style={[styles.content, contentStyle]}>
        {/* Top Section */}
        {topSection && (
          <View style={[styles.topSection, topSectionStyle]}>
            {topSection}
          </View>
        )}

        {/* Bottom Section - Buttons auf Daumenhöhe */}
        <View style={[styles.bottomSection, bottomSectionStyle]}>
          {bottomSection}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.lg, // 24px
    justifyContent: 'space-between', // Verteilt Top/Bottom Content
  },
  topSection: {
    paddingTop: spacing.xxxl, // 64px - Nach oben schieben
    alignItems: 'center',
  },
  bottomSection: {
    paddingBottom: bottomPadding, // 24px iOS / 32px Android
    gap: spacing.md, // 16px zwischen Buttons
  },
});
