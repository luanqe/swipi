import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as SplashScreen from 'expo-splash-screen';

// Services
import { StorageService } from './src/services/storage';

// Context
import { RoleProvider } from './src/context/RoleContext';

// Navigation
import RoleNavigator from './src/navigation/RoleNavigator';

// Components
import SplashScreenComponent from './src/screens/SplashScreen';
import LoadingIndicator from './src/components/common/LoadingIndicator';

// Prevent auto-hide of splash screen
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [showSplash, setShowSplash] = React.useState(false);

  /**
   * Check Auth Status on App Start
   * 
   * Flow:
   * 1. Check AsyncStorage for existing auth token
   * 2. If token exists (returning user) → Skip Splash, go to RoleNavigator
   * 3. If NO token (new user) → Show Splash → Welcome flow
   * 
   * UX Requirement: "Splash nur für neue User, nicht bei jedem App-Start (nervt!)"
   */
  React.useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        // Hide native splash
        await SplashScreen.hideAsync();
        
        // Check if user is logged in
        const authToken = await StorageService.AuthToken.get();
        
        if (authToken) {
          // Returning user → Skip splash, go directly to app
          console.log('[App] Auth token found, skipping splash');
          setShowSplash(false);
        } else {
          // New user → Show splash for branding
          console.log('[App] No auth token, showing splash');
          setShowSplash(true);
        }
        
        setIsLoading(false);
      } catch (error) {
        console.error('[App] Failed to check auth status:', error);
        // On error, show splash (safe default for first-time users)
        setShowSplash(true);
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  /**
   * Handle Splash Finish
   * Called after 2.5s animation completes
   */
  const handleSplashFinish = () => {
    setShowSplash(false);
  };

  // Show loading indicator while checking AsyncStorage
  if (isLoading) {
    return <LoadingIndicator />;
  }

  // Show custom splash for new users
  if (showSplash) {
    return <SplashScreenComponent onFinish={handleSplashFinish} />;
  }

  // Main app for returning users (or after splash)
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <RoleProvider>
          <NavigationContainer>
            <RoleNavigator />
          </NavigationContainer>
        </RoleProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
