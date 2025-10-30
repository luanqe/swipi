import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { useRole } from '@/context/RoleContext';
import { theme } from '@/theme';

// Auth Screens (Splash removed - handled by App.tsx)
import WelcomeScreen from '@/screens/WelcomeScreen';
import LoginScreen from '@/screens/auth/LoginScreen';
import RoleSelectionScreen from '@/screens/auth/RoleSelectionScreen';
import RegisterScreen from '@/screens/auth/RegisterScreen';
import OnboardingDataScreen from '@/screens/auth/OnboardingDataScreen';

/**
 * Role Navigator
 * 
 * Zentrale Navigation basierend auf:
 * - isAuthenticated
 * - isOnboardingComplete
 * - role
 * 
 * 3-Stage Flow:
 * 1. !isAuthenticated → AuthStack (Welcome, Login, Register, RoleSelect)
 * 2. isAuthenticated && !isOnboardingComplete → OnboardingStack
 * 3. isAuthenticated && isOnboardingComplete → RoleStack (Bewerber/Firma)
 * 
 * MVP: Placeholder für Swipe Screens
 * PRODUCTION: Erweitern mit echten Main Stacks
 */

const Stack = createStackNavigator();

export default function RoleNavigator() {
  const { isAuthenticated, isOnboardingComplete, role } = useRole();

  console.log('[RoleNavigator] State:', {
    isAuthenticated,
    isOnboardingComplete,
    role,
  });

  // ============================================================================
  // STAGE 1: Not Authenticated → Auth Stack
  // ============================================================================
  
  if (!isAuthenticated) {
    return <AuthStack />;
  }

  // ============================================================================
  // STAGE 2: Authenticated but Onboarding Incomplete → Onboarding Stack
  // ============================================================================
  
  if (isAuthenticated && !isOnboardingComplete) {
    return <OnboardingStack />;
  }

  // ============================================================================
  // STAGE 3: Authenticated + Onboarding Complete → Role-based Stack
  // ============================================================================
  
  if (role === 'BEWERBER') {
    return <BewerberStack />;
  }
  
  if (role === 'FIRMA') {
    return <FirmaStack />;
  }

  // Fallback (should not happen)
  return <AuthStack />;
}

// ============================================================================
// AUTH STACK (Welcome, Login, Register, RoleSelection)
// ============================================================================

function AuthStack() {
  return (
    <Stack.Navigator
      initialRouteName="Welcome" // ← Start at Welcome (Splash handled by App.tsx)
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: ({ current }) => ({
          cardStyle: {
            opacity: current.progress,
          },
        }),
      }}
    >
      {/* Splash REMOVED - App.tsx handles it for new users only */}
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="RoleSelection" component={RoleSelectionScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
}

// ============================================================================
// ONBOARDING STACK (Only OnboardingData Screen)
// ============================================================================

function OnboardingStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="OnboardingData" component={OnboardingDataScreen} />
    </Stack.Navigator>
  );
}

// ============================================================================
// BEWERBER STACK (Job Seeker Main App)
// ============================================================================

/**
 * Bewerber Stack
 * 
 * Screens:
 * - SwipeJobs (Main) - Swipe durch Job-Angebote
 * - Profile - Edit Bewerber Profile
 * - Chat - Match Chat
 * - Settings - App Settings
 * 
 * MVP: Placeholder
 * PRODUCTION: Echte Screens
 */
function BewerberStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="SwipeJobs" component={PlaceholderSwipeJobs} />
      {/* Später erweitern:
      <Stack.Screen name="Profile" component={BewerberProfileScreen} />
      <Stack.Screen name="Chat" component={ChatScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      */}
    </Stack.Navigator>
  );
}

// ============================================================================
// FIRMA STACK (Company Main App)
// ============================================================================

/**
 * Firma Stack
 * 
 * Screens:
 * - SwipeBewerber (Main) - Swipe durch Bewerber
 * - CreateJob - Neue Job-Anzeige erstellen
 * - Profile - Edit Firma Profile
 * - Chat - Match Chat
 * - Settings - App Settings
 * 
 * MVP: Placeholder
 * PRODUCTION: Echte Screens
 */
function FirmaStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="SwipeBewerber" component={PlaceholderSwipeBewerber} />
      {/* Später erweitern:
      <Stack.Screen name="CreateJob" component={CreateJobScreen} />
      <Stack.Screen name="Profile" component={FirmaProfileScreen} />
      <Stack.Screen name="Chat" component={ChatScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      */}
    </Stack.Navigator>
  );
}

// ============================================================================
// PLACEHOLDER SCREENS (MVP)
// ============================================================================

/**
 * Placeholder: Swipe Jobs Screen (Bewerber)
 * TODO: Replace mit echtem SwipeScreen
 */
function PlaceholderSwipeJobs() {
  const { userData, logout } = useRole();
  
  return (
    <View style={styles.placeholder}>
      <Text style={styles.placeholderTitle}>
        🎉 Swipe Jobs Screen
      </Text>
      <Text style={styles.placeholderText}>
        Hallo {userData.name}!
      </Text>
      <Text style={styles.placeholderText}>
        Skills: {userData.skills?.join(', ')}
      </Text>
      <Text style={styles.placeholderHint}>
        [Swipe-Cards kommen hier hin]
      </Text>
      <Text 
        style={styles.placeholderLink}
        onPress={logout}
      >
        Logout (Test)
      </Text>
    </View>
  );
}

/**
 * Placeholder: Swipe Bewerber Screen (Firma)
 * TODO: Replace mit echtem SwipeScreen
 */
function PlaceholderSwipeBewerber() {
  const { userData, logout } = useRole();
  
  return (
    <View style={styles.placeholder}>
      <Text style={styles.placeholderTitle}>
        🏢 Swipe Bewerber Screen
      </Text>
      <Text style={styles.placeholderText}>
        Firma: {userData.companyName}
      </Text>
      <Text style={styles.placeholderText}>
        Branche: {userData.branche}
      </Text>
      <Text style={styles.placeholderHint}>
        [Swipe-Cards kommen hier hin]
      </Text>
      <Text 
        style={styles.placeholderLink}
        onPress={logout}
      >
        Logout (Test)
      </Text>
    </View>
  );
}

// ============================================================================
// STYLES
// ============================================================================

const styles = StyleSheet.create({
  placeholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.xl,
    backgroundColor: theme.colors.background.primary,
  },
  placeholderTitle: {
    ...theme.typography.largeTitle,
    color: theme.colors.neutral[900],
    fontWeight: '700',
    marginBottom: theme.spacing.lg,
    textAlign: 'center',
  },
  placeholderText: {
    ...theme.typography.body,
    color: theme.colors.neutral[700],
    marginBottom: theme.spacing.sm,
    textAlign: 'center',
  },
  placeholderHint: {
    ...theme.typography.footnote,
    color: theme.colors.neutral[600],
    fontStyle: 'italic',
    marginTop: theme.spacing.xl,
    textAlign: 'center',
  },
  placeholderLink: {
    ...theme.typography.body,
    color: theme.colors.primary[500],
    fontWeight: '600',
    marginTop: theme.spacing.xxl,
  },
});
