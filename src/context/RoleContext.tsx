import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Role Context
 * 
 * Zentraler State-Manager für:
 * - User Role (BEWERBER | FIRMA)
 * - User Data (Name, Skills, Email, etc.)
 * - Authentication Status
 * - Onboarding Completion Status
 * 
 * MVP: Mock-Funktionen (keine Backend-Integration)
 * PRODUCTION: Erweitert mit API-Calls und AsyncStorage
 */

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

/**
 * User Roles
 * - BEWERBER: Sucht Jobs, swiped durch Job-Angebote
 * - FIRMA: Erstellt Jobs, swiped durch Bewerber
 * - null: Noch keine Rolle gewählt
 */
export type UserRole = 'BEWERBER' | 'FIRMA' | null;

/**
 * User Data Structure
 * Kombiniert Felder für beide Rollen
 */
export interface UserData {
  // Auth Data (beide Rollen)
  email?: string;
  password?: string; // Nur lokal, nie ans Backend senden in PROD!
  
  // Bewerber-spezifisch
  name?: string;
  skills?: string[];
  
  // Firma-spezifisch
  companyName?: string;
  branche?: string;
  description?: string;
  
  // Später erweiterbar:
  // profileImage?: string;
  // phone?: string;
  // location?: string;
  // etc.
}

/**
 * Role Context Type Definition
 */
export interface RoleContextType {
  // State
  role: UserRole;
  userData: UserData;
  isAuthenticated: boolean;
  isOnboardingComplete: boolean;
  isHydrated: boolean; // ← NEU: Zeigt ob AsyncStorage geladen wurde
  
  // Actions (async für AsyncStorage persistence)
  setRole: (role: UserRole) => Promise<void>;
  saveUserData: (data: Partial<UserData>) => Promise<void>;
  completeOnboarding: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  clearUserData: () => void;
}

// ============================================================================
// CONTEXT CREATION
// ============================================================================

const RoleContext = createContext<RoleContextType | undefined>(undefined);

// ============================================================================
// PROVIDER COMPONENT
// ============================================================================

interface RoleProviderProps {
  children: ReactNode;
}

export function RoleProvider({ children }: RoleProviderProps) {
  // State
  const [role, setRoleState] = useState<UserRole>(null);
  const [userData, setUserData] = useState<UserData>({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isOnboardingComplete, setIsOnboardingComplete] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false); // ← NEU: Hydration Status

  // ============================================================================
  // PERSISTENCE - HYDRATE FROM ASYNCSTORAGE ON APP START
  // ============================================================================

  useEffect(() => {
    hydrateFromStorage();
  }, []);

  /**
   * Hydrate State from AsyncStorage
   * Called once on app start
   * 
   * MVP: Loads all persisted data
   * PRODUCTION: Add error recovery, migration logic
   */
  const hydrateFromStorage = async () => {
    try {
      console.log('[RoleContext] Hydrating from AsyncStorage...');
      
      // Read all keys in parallel for performance
      const [
        storedToken,
        storedRole,
        storedUserData,
        storedOnboarding,
      ] = await Promise.all([
        AsyncStorage.getItem('authToken'),
        AsyncStorage.getItem('userRole'),
        AsyncStorage.getItem('userData'),
        AsyncStorage.getItem('onboardingComplete'),
      ]);

      // Restore state if data exists
      if (storedToken) {
        setIsAuthenticated(true);
        console.log('[RoleContext] Auth token found');
      }

      if (storedRole) {
        setRoleState(storedRole as UserRole);
        console.log('[RoleContext] Role restored:', storedRole);
      }

      if (storedUserData) {
        try {
          const parsedData = JSON.parse(storedUserData);
          setUserData(parsedData);
          console.log('[RoleContext] User data restored');
        } catch (parseError) {
          console.error('[RoleContext] Failed to parse user data:', parseError);
          // Clear corrupted data
          await AsyncStorage.removeItem('userData');
        }
      }

      if (storedOnboarding === 'true') {
        setIsOnboardingComplete(true);
        console.log('[RoleContext] Onboarding marked as complete');
      }

      console.log('[RoleContext] Hydration complete');
    } catch (error) {
      console.error('[RoleContext] Hydration failed:', error);
      // Continue with empty state on error
    } finally {
      setIsHydrated(true); // Always mark as hydrated, even on error
    }
  };

  // ============================================================================
  // ACTIONS
  // ============================================================================

  /**
   * Set User Role
   * Called by RoleSelectionScreen during registration
   * 
   * MVP: Speichert in State + AsyncStorage
   * PRODUCTION: await AsyncStorage.setItem('role', role);
   */
  const setRole = async (newRole: UserRole) => {
    setRoleState(newRole);
    console.log('[RoleContext] Role set:', newRole);
    
    // Persist to AsyncStorage
    try {
      if (newRole) {
        await AsyncStorage.setItem('userRole', newRole);
      } else {
        await AsyncStorage.removeItem('userRole');
      }
    } catch (error) {
      console.error('[RoleContext] Failed to persist role:', error);
    }
  };

  /**
   * Save User Data
   * Called by OnboardingScreen to store user information
   * 
   * MVP: Merges data into state + AsyncStorage
   * PRODUCTION: await AsyncStorage.setItem('userData', JSON.stringify(data));
   */
  const saveUserData = async (data: Partial<UserData>) => {
    const mergedData = { ...userData, ...data };
    setUserData(mergedData);
    console.log('[RoleContext] User data saved:', data);
    
    // Persist to AsyncStorage
    try {
      await AsyncStorage.setItem('userData', JSON.stringify(mergedData));
    } catch (error) {
      console.error('[RoleContext] Failed to persist user data:', error);
    }
  };

  /**
   * Complete Onboarding
   * Called when user finishes all onboarding steps
   * 
   * MVP: Sets flag to true + AsyncStorage
   * PRODUCTION: await authService.updateProfile({ onboardingComplete: true });
   */
  const completeOnboarding = async () => {
    setIsOnboardingComplete(true);
    console.log('[RoleContext] Onboarding completed');
    
    // Persist to AsyncStorage
    try {
      await AsyncStorage.setItem('onboardingComplete', 'true');
    } catch (error) {
      console.error('[RoleContext] Failed to persist onboarding status:', error);
    }
  };

  /**
   * Login (Existing User)
   * User already has account, skip onboarding
   * 
   * MVP: Mock - accepts any credentials + persists to AsyncStorage
   * PRODUCTION: 
   *   const response = await authService.login(email, password);
   *   setRole(response.user.role);
   *   saveUserData(response.user);
   *   setIsOnboardingComplete(response.user.onboardingComplete);
   *   await AsyncStorage.setItem('token', response.token);
   */
  const login = async (email: string, password: string) => {
    // MVP: Mock authentication
    console.log('[RoleContext] Login mock:', { email });
    
    // Simulate backend response
    const mockRole: 'BEWERBER' | 'FIRMA' = 'BEWERBER'; // Explicit non-null type
    const mockUser = {
      email,
      name: 'Mock User',
      role: mockRole,
      skills: ['React', 'TypeScript'],
    };
    
    const mockToken = 'mock_token_' + Date.now();
    
    // Set state
    setRoleState(mockUser.role);
    setUserData(mockUser);
    setIsAuthenticated(true);
    setIsOnboardingComplete(true); // Existing user = onboarding done
    
    // Persist to AsyncStorage
    try {
      await Promise.all([
        AsyncStorage.setItem('authToken', mockToken),
        AsyncStorage.setItem('userRole', mockUser.role),
        AsyncStorage.setItem('userData', JSON.stringify(mockUser)),
        AsyncStorage.setItem('onboardingComplete', 'true'),
      ]);
      console.log('[RoleContext] Login successful, persisted to storage');
    } catch (error) {
      console.error('[RoleContext] Failed to persist login data:', error);
    }
    
    // SPÄTER:
    /*
    try {
      const response = await authService.login(email, password);
      setRoleState(response.user.role);
      saveUserData(response.user);
      setIsAuthenticated(true);
      setIsOnboardingComplete(response.user.onboardingComplete);
      await AsyncStorage.setItem('authToken', response.token);
    } catch (error) {
      throw new Error('Login failed: ' + error.message);
    }
    */
  };

  /**
   * Register (New User)
   * User must complete onboarding after registration
   * 
   * MVP: Mock - accepts any credentials, uses pre-selected role + AsyncStorage
   * PRODUCTION:
   *   const response = await authService.register({
   *     email,
   *     password,
   *     role // role was set before in RoleSelectionScreen
   *   });
   *   setIsAuthenticated(true);
   *   await AsyncStorage.setItem('token', response.token);
   */
  const register = async (email: string, password: string) => {
    // MVP: Mock registration
    console.log('[RoleContext] Register mock:', { email, role });
    
    // role wurde VORHER in RoleSelectionScreen gesetzt!
    if (!role) {
      console.error('[RoleContext] No role selected before registration!');
      return;
    }
    
    const mockToken = 'mock_token_' + Date.now();
    
    // Update state
    await saveUserData({ email, password });
    setIsAuthenticated(true);
    setIsOnboardingComplete(false); // New user = needs onboarding
    
    // Persist to AsyncStorage
    try {
      await AsyncStorage.setItem('authToken', mockToken);
      console.log('[RoleContext] Registration successful, persisted to storage');
    } catch (error) {
      console.error('[RoleContext] Failed to persist registration:', error);
    }
    
    // SPÄTER:
    /*
    try {
      if (!role) {
        throw new Error('Role must be selected before registration');
      }
      
      const response = await authService.register({
        email,
        password,
        role
      });
      
      setIsAuthenticated(true);
      await AsyncStorage.setItem('authToken', response.token);
    } catch (error) {
      throw new Error('Registration failed: ' + error.message);
    }
    */
  };

  /**
   * Logout
   * Clears all user data and resets state
   * 
   * MVP: Resets state + clears AsyncStorage
   * PRODUCTION:
   *   await authService.logout();
   *   await AsyncStorage.multiRemove(['token', 'role', 'userData']);
   */
  const logout = async () => {
    console.log('[RoleContext] Logging out...');
    
    // Reset state
    setRoleState(null);
    setUserData({});
    setIsAuthenticated(false);
    setIsOnboardingComplete(false);
    
    // Clear AsyncStorage
    try {
      await AsyncStorage.multiRemove([
        'authToken',
        'userRole',
        'userData',
        'onboardingComplete',
      ]);
      console.log('[RoleContext] Logout successful, storage cleared');
    } catch (error) {
      console.error('[RoleContext] Failed to clear storage on logout:', error);
    }
    
    // SPÄTER:
    // await authService.logout();
  };

  /**
   * Clear User Data
   * Utility function to reset user data without logging out
   */
  const clearUserData = () => {
    setUserData({});
    console.log('[RoleContext] User data cleared');
  };

  // ============================================================================
  // CONTEXT VALUE
  // ============================================================================

  const value: RoleContextType = {
    // State
    role,
    userData,
    isAuthenticated,
    isOnboardingComplete,
    isHydrated, // ← AsyncStorage geladen?
    
    // Actions
    setRole,
    saveUserData,
    completeOnboarding,
    login,
    register,
    logout,
    clearUserData,
  };

  return (
    <RoleContext.Provider value={value}>
      {children}
    </RoleContext.Provider>
  );
}

// ============================================================================
// CUSTOM HOOK
// ============================================================================

/**
 * useRole Hook
 * 
 * Easy access to Role Context in any component
 * 
 * Usage:
 *   const { role, setRole, login } = useRole();
 * 
 * Throws error if used outside RoleProvider
 */
export function useRole(): RoleContextType {
  const context = useContext(RoleContext);
  
  if (!context) {
    throw new Error('useRole must be used within RoleProvider');
  }
  
  return context;
}
