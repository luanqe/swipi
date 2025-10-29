import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as SplashScreen from 'expo-splash-screen';

// Screens
import SplashScreenComponent from './src/screens/SplashScreen';
import WelcomeScreen from './src/screens/WelcomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import RoleSelectionScreen from './src/screens/RoleSelectionScreen';

// Prevent auto-hide of splash screen
SplashScreen.preventAutoHideAsync();

const Stack = createStackNavigator();

export default function App() {
  const [showSplash, setShowSplash] = React.useState(true);

  React.useEffect(() => {
    // Hide native splash and show custom splash
    SplashScreen.hideAsync();

    // Transition to welcome screen after 2.5s
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return <SplashScreenComponent />;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
              cardStyle: { backgroundColor: 'transparent' },
              cardStyleInterpolator: ({ current: { progress } }) => ({
                cardStyle: {
                  opacity: progress,
                },
              }),
            }}
          >
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="RoleSelection" component={RoleSelectionScreen} />
            {/* TODO: Add Home screens for Bewerber/Firma */}
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
