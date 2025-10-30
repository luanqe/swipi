import React from 'react';
import { View, StyleSheet, Animated, useColorScheme } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Text, RoleCard } from '@/components/ui';
import { colors, darkColors, spacing } from '@/theme';
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
      
      {/* Background Gradient */}
      <LinearGradient
        colors={gradientColors}
        style={StyleSheet.absoluteFillObject}
      />

      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        
        {/* Header */}
        <View style={styles.header}>
          <Text variant="largeTitle" color="primary" textAlign="center">
            Welche Rolle hast du?
          </Text>
        </View>

        {/* Spacer - creates centered layout */}
        <View style={styles.spacer} />

        {/* Role Cards - centered in lower half */}
        <View style={styles.rolesContainer}>
          
          {/* Bewerber Card */}
          <RoleCard
            title="Bewerber"
            icon="👤"
            onPress={() => handleRoleSelect('BEWERBER')}
            accessibilityLabel="Bewerber Rolle auswählen"
            accessibilityHint="Doppeltippen um als Bewerber fortzufahren"
          />

          {/* Firma Card */}
          <RoleCard
            title="Firma"
            icon="🏢"
            onPress={() => handleRoleSelect('FIRMA')}
            accessibilityLabel="Firma Rolle auswählen"
            accessibilityHint="Doppeltippen um als Firma fortzufahren"
          />
        </View>

        {/* Spacer - creates centered layout */}
        <View style={styles.spacer} />

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
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xxxl,
  },
  
  // Header (Top Section)
  header: {
    alignItems: 'center',
  },

  // Spacer - creates vertical centering
  spacer: {
    flex: 1,
  },

  // Roles Container - centered in lower half
  rolesContainer: {
    flexDirection: 'row',
    gap: spacing.md,
  },
});
