import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '@/theme';

/**
 * Role Selection Screen
 * "Welche Rolle hast du?"
 * Bewerber oder Firma
 */
export default function RoleSelectionScreen({ navigation }: any) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleRoleSelect = (role: 'bewerber' | 'firma') => {
    console.log('Selected role:', role);
    // TODO: Navigate to appropriate home screen
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
        
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.headline, isDark && styles.textDark]}>
            Welche Rolle hast du?
          </Text>
        </View>

        {/* Role Cards */}
        <View style={styles.rolesContainer}>
          
          {/* Bewerber Card */}
          <RoleCard
            title="Bewerber"
            icon="👤"
            onPress={() => handleRoleSelect('bewerber')}
            isDark={isDark}
            accessibilityLabel="Bewerber Rolle auswählen"
            accessibilityHint="Doppeltippen um als Bewerber fortzufahren"
          />

          {/* Firma Card */}
          <RoleCard
            title="Firma"
            icon="🏢"
            onPress={() => handleRoleSelect('firma')}
            isDark={isDark}
            accessibilityLabel="Firma Rolle auswählen"
            accessibilityHint="Doppeltippen um als Firma fortzufahren"
          />
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
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.xxxl,
    justifyContent: 'space-between',
    paddingBottom: theme.spacing.xxl,
  },
  
  // Header
  header: {
    alignItems: 'center',
    marginBottom: theme.spacing.xxxl,
  },
  headline: {
    ...theme.typography.largeTitle,
    color: theme.colors.neutral[900],
    fontWeight: '600',
    textAlign: 'center',
  },

  // Roles Container
  rolesContainer: {
    flex: 1,
    flexDirection: 'row',
    gap: theme.spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
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
