import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { spacing, bottomPadding } from '@/theme';

interface ScreenProps {

  topSection?: React.ReactNode;
  bottomSection: React.ReactNode;
  
  /**
 * Gradient Farben (mindestens 2 Farben nötig für LinearGradient)
 * Beispiel: ['#F7F8FA', '#FFFFFF']
 */
  gradientColors?: readonly [string, string, ...string[]];
  contentStyle?: ViewStyle;
  topSectionStyle?: ViewStyle;
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

      <View style={[styles.content, contentStyle]}>
        {topSection && (
          <View style={[styles.topSection, topSectionStyle]}>
            {topSection}
          </View>
        )}

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
    paddingHorizontal: spacing.lg, 
    justifyContent: 'space-between',
  },
  topSection: {
    paddingTop: spacing.xxxl, 
    alignItems: 'center',
  },
  bottomSection: {
    paddingBottom: bottomPadding,
    gap: spacing.md, 
  },
});
