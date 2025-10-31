import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  Animated,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '@/theme';
import { layout } from '@/theme/layout';
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

  const handleRoleSelect = (role: 'BEWERBER' | 'FIRMA') => {
    console.log('[RoleSelectionScreen] Selected role:', role);
    
    // Set role in Context
    setRole(role);
    
    // Navigate to Register
    navigation.navigate('Register');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      
      {/* Background Gradient */}
      <LinearGradient
        colors={
          isDark 
            ? ['#18191A', '#242526'] 
            : ['#F7F8FA', '#FFFFFF']
        }
        style={StyleSheet.absoluteFillObject}
      />

      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        
        <View style={styles.header}>
          <Text style={[styles.headline, isDark && styles.textDark]}>
            Welche Rolle hast du?
          </Text>
        </View>

        <View style={styles.spacer} />

        <View style={styles.footer}>
          <View style={styles.rolesContainer}>
            
            {/* Bewerber Card */}
            <RoleCard
              title="Bewerber"
              icon="👤"
              onPress={() => handleRoleSelect('BEWERBER')}
              isDark={isDark}
              accessibilityLabel="Bewerber Rolle auswählen"
              accessibilityHint="Doppeltippen um als Bewerber fortzufahren"
            />

            {/* Firma Card */}
            <RoleCard
              title="Firma"
              icon="🏢"
              onPress={() => handleRoleSelect('FIRMA')}
              isDark={isDark}
              accessibilityLabel="Firma Rolle auswählen"
              accessibilityHint="Doppeltippen um als Firma fortzufahren"
            />
          </View>
        </View>

      </Animated.View>
    </SafeAreaView>
  );
}

/**
 * Role Card Component
 */
function RoleCard({ 
  title,
  icon,
  onPress,
  isDark,
  ...props 
}: {
  title: string;
  icon: string;
  onPress: () => void;
  isDark: boolean;
  accessibilityLabel?: string;
  accessibilityHint?: string;
}) {
  const scale = React.useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
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
      activeOpacity={0.9}
      style={styles.roleCardTouchable}
      {...props}
    >
      <Animated.View 
        style={[
          styles.roleCard,
          isDark && styles.roleCardDark,
          { transform: [{ scale }] },
        ]}
      >
        <Text style={styles.roleIcon}>{icon}</Text>
        <Text style={[styles.roleTitle, isDark && styles.textDark]}>
          {title}
        </Text>
      </Animated.View>
    </TouchableOpacity>
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
  headline: {
    ...theme.typography.largeTitle,
    color: theme.colors.neutral[900],
    fontWeight: '600',
    textAlign: 'center',
  },

  // Roles Container
  rolesContainer: {
    flexDirection: 'row',
    gap: theme.spacing.md,
  },

  // Role Card
  roleCardTouchable: {
    flex: 1,
    height: 200,
  },
  roleCard: {
    flex: 1,
    backgroundColor: theme.colors.background.primary,
    borderRadius: theme.borderRadius.xl,
    borderWidth: 2,
    borderColor: theme.colors.neutral[300],
    justifyContent: 'center',
    alignItems: 'center',
    gap: theme.spacing.md,
    ...theme.shadows.md,
  },
  roleCardDark: {
    backgroundColor: theme.darkColors.background.secondary,
    borderColor: theme.darkColors.neutral[400],
  },
  roleIcon: {
    fontSize: 64,
  },
  roleTitle: {
    ...theme.typography.title2,
    color: theme.colors.neutral[900],
    fontWeight: '600',
  },

  // Dark Mode
  textDark: {
    color: theme.darkColors.neutral[900],
  },
});
