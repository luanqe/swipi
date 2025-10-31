import React from 'react';
import { View, StyleSheet, Animated, useColorScheme } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Text, RoleCard } from '@/components/ui';
import { colors, darkColors, spacing, layout } from '@/theme';
import { useRole } from '@/context/RoleContext';

/**
 * Role Selection Screen
 * "Welche Rolle hast du?"
 * Bewerber oder Firma
 */
export default function RoleSelectionScreen({ navigation }: any) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  const { setRole } = useRole();
  
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleRoleSelect = async (role: 'BEWERBER' | 'FIRMA') => {
    console.log('[RoleSelectionScreen] Selected role:', role);
    
    // Set role in Context
    await setRole(role);
    
    // Navigate to Register
    navigation.navigate('Register');
  };

  const gradientColors = isDark 
    ? [darkColors.background.primary, darkColors.background.secondary] as const
    : [colors.background.secondary, colors.background.primary] as const;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      
      <LinearGradient
        colors={gradientColors}
        style={StyleSheet.absoluteFillObject}
      />

      {/* ✅ KEIN KeyboardAvoidingView - keine Tastatur */}
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        
        {/* ✅ HEADER: Titel */}
        <View style={styles.header}>
          <Text
            variant="largeTitle"
            color="primary"
            textAlign="center"
          >
            Welche Rolle hast du?
          </Text>
        </View>

        {/* ✅ SPACER: Flexibler Abstand */}
        <View style={styles.spacer} />

        {/* ✅ FOOTER: Role Cards auf Daumenhöhe */}
        <View style={styles.footer}>
          <View style={styles.rolesContainer}>
            <RoleCard
              title="Bewerber"
              icon="👤"
              onPress={() => handleRoleSelect('BEWERBER')}
              accessibilityLabel="Bewerber Rolle auswählen"
              accessibilityHint="Doppeltippen um als Bewerber fortzufahren"
            />

            <RoleCard
              title="Firma"
              icon="🏢"
              onPress={() => handleRoleSelect('FIRMA')}
              accessibilityLabel="Firma Rolle auswählen"
              accessibilityHint="Doppeltippen um als Firma fortzufahren"
            />
          </View>
        </View>

      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: layout.screenPadding.horizontal,
  },
  
  // ✅ Zentrale Layout-Zonen
  header: layout.verticalDistribution.header,
  spacer: layout.verticalDistribution.spacer,
  footer: layout.verticalDistribution.footer,
  
  // Screen-spezifische Styles
  rolesContainer: {
    flexDirection: 'row',
    gap: spacing.md,
  },
});
