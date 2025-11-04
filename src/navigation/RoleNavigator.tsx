import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useRole } from '@/context/RoleContext';

import WelcomeScreen from '@/screens/WelcomeScreen';
import LoginScreen from '@/screens/auth/LoginScreen';
import RoleSelectionScreen from '@/screens/auth/RoleSelectionScreen';
import RegisterScreen from '@/screens/auth/RegisterScreen';
import OnboardingDataScreen from '@/screens/auth/OnboardingDataScreen';
import { BewerberSwipeScreen } from '@/screens/BewerberSwipeScreen';
import { FirmaSwipeScreen } from '@/screens/FirmaSwipeScreen';
import { MatchesScreen } from '@/screens/MatchesScreen';
import { ChatsScreen } from '@/screens/ChatsScreen';
import { ProfileScreen } from '@/screens/ProfileScreen';
import { JobsScreen } from '@/screens/JobsScreen';
import { TabBar } from '@/components/navigation/TabBar';
import { BEWERBER_TABS, FIRMA_TABS } from '@/config/tabConfig';

const Stack = createStackNavigator();
const BewerberTab = createBottomTabNavigator();
const FirmaTab = createBottomTabNavigator();

export default function RoleNavigator() {
  const { isAuthenticated, isOnboardingComplete, role } = useRole();

  // Not authenticated or onboarding incomplete → Auth flow
  if (!isAuthenticated || !isOnboardingComplete) {
    return <AuthStack />;
  }

  // Authenticated + onboarding complete → Role-based stack
  if (role === 'BEWERBER') return <BewerberNavigator />;
  if (role === 'FIRMA') return <FirmaNavigator />;

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

// BEWERBER NAVIGATOR (Tab Navigator mit 4 Tabs)

function BewerberNavigator() {
  return (
    <BewerberTab.Navigator
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      {BEWERBER_TABS.map((tab) => (
        <BewerberTab.Screen
          key={tab.name}
          name={tab.name}
          component={getBewerberScreenComponent(tab.name)}
          options={{
            tabBarIcon: () => tab.icon,
            tabBarLabel: tab.label,
          }}
        />
      ))}
    </BewerberTab.Navigator>
  );
}

// FIRMA NAVIGATOR (Tab Navigator mit 5 Tabs)

function FirmaNavigator() {
  return (
    <FirmaTab.Navigator
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      {FIRMA_TABS.map((tab) => (
        <FirmaTab.Screen
          key={tab.name}
          name={tab.name}
          component={getFirmaScreenComponent(tab.name)}
          options={{
            tabBarIcon: () => tab.icon,
            tabBarLabel: tab.label,
          }}
        />
      ))}
    </FirmaTab.Navigator>
  );
}

// HELPER: Get Screen Component for Bewerber
function getBewerberScreenComponent(tabName: string) {
  switch (tabName) {
    case 'Swipe':
      return BewerberSwipeScreen;
    case 'Matches':
      return MatchesScreen;
    case 'Chats':
      return ChatsScreen;
    case 'Profile':
      return ProfileScreen;
    default:
      return MatchesScreen; // Fallback
  }
}

// HELPER: Get Screen Component for Firma
function getFirmaScreenComponent(tabName: string) {
  switch (tabName) {
    case 'Swipe':
      return FirmaSwipeScreen;
    case 'Matches':
      return MatchesScreen;
    case 'Chats':
      return ChatsScreen;
    case 'Jobs':
      return JobsScreen;
    case 'Profile':
      return ProfileScreen;
    default:
      return MatchesScreen; // Fallback
  }
}