import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { useRole } from '@/context/RoleContext';
import { theme } from '@/theme';

import WelcomeScreen from '@/screens/WelcomeScreen';
import LoginScreen from '@/screens/auth/LoginScreen';
import RoleSelectionScreen from '@/screens/auth/RoleSelectionScreen';
import RegisterScreen from '@/screens/auth/RegisterScreen';
import OnboardingDataScreen from '@/screens/auth/OnboardingDataScreen';
import { BewerberSwipeScreen } from '@/screens/BewerberSwipeScreen';
import { FirmaSwipeScreen } from '@/screens/FirmaSwipeScreen';

const Stack = createStackNavigator();

export default function RoleNavigator() {
  const { isAuthenticated, isOnboardingComplete, role } = useRole();

  // Not authenticated or onboarding incomplete → Auth flow
  if (!isAuthenticated || !isOnboardingComplete) {
    return <AuthStack />;
  }

  // Authenticated + onboarding complete → Role-based stack
  if (role === 'BEWERBER') return <BewerberStack />;
  if (role === 'FIRMA') return <FirmaStack />;

  return <AuthStack />; // Fallback
}

// AUTH STACK

function AuthStack() {
  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        cardStyleInterpolator: ({ current }) => ({
          cardStyle: { opacity: current.progress },
        }),
      }}
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="RoleSelection" component={RoleSelectionScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="OnboardingData" component={OnboardingDataScreen} />
    </Stack.Navigator>
  );
}

// BEWERBER STACK

function BewerberStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: false, // Swipe-back disabled (used for job cards)
      }}
    >
      <Stack.Screen name="SwipeJobs" component={BewerberSwipeScreen} />
    </Stack.Navigator>
  );
}

// FIRMA STACK

function FirmaStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: false, // Swipe-back disabled (used for applicant cards)
      }}
    >
      <Stack.Screen name="SwipeBewerber" component={FirmaSwipeScreen} />
    </Stack.Navigator>
  );
}

// STYLES (not needed anymore - keeping for reference if needed later)

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