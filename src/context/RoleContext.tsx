import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { StorageService } from '../services/storage';
import { AuthService } from '../services/auth';

/**
 * Role Context - Global state for authentication and role management
 * Synchronizes state with persistent storage and orchestrates auth services
 */

// ============================================================================
// TYPES
// ============================================================================

export type UserRole = 'BEWERBER' | 'FIRMA' | null;

export interface UserData {
  email?: string;
  password?: string; // Never send to backend!
  
  // Bewerber
  name?: string;
  skills?: string[];
  
  // Firma
  companyName?: string;
  branche?: string;
  description?: string;
}

export interface RoleContextType {
  // State
  role: UserRole;
  userData: UserData;
  isAuthenticated: boolean;
  isOnboardingComplete: boolean;
  isHydrated: boolean;
  
  // Actions
  setRole: (role: UserRole) => Promise<void>;
  saveUserData: (data: Partial<UserData>) => Promise<void>;
  completeOnboarding: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  clearUserData: () => void;
}

// ============================================================================
// CONTEXT
// ============================================================================

const RoleContext = createContext<RoleContextType | undefined>(undefined);

// ============================================================================
// PROVIDER
// ============================================================================

interface RoleProviderProps {
  children: ReactNode;
}

export function RoleProvider({ children }: RoleProviderProps) {
  const [role, setRoleState] = useState<UserRole>(null);
  const [userData, setUserData] = useState<UserData>({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isOnboardingComplete, setIsOnboardingComplete] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  // Hydrate state from storage on mount
  useEffect(() => {
    hydrateFromStorage();
  }, []);

  const hydrateFromStorage = async () => {
    try {
      const data = await StorageService.hydrateAll();

      if (data.authToken) setIsAuthenticated(true);
      if (data.userRole) setRoleState(data.userRole as UserRole);
      if (data.userData) setUserData(data.userData as UserData);
      if (data.onboardingComplete) setIsOnboardingComplete(true);
    } catch (error) {
      console.error('[RoleContext] Hydration failed:', error);
    } finally {
      setIsHydrated(true);
    }
  };

  // ============================================================================
  // ACTIONS
  // ============================================================================

  const setRole = async (newRole: UserRole) => {
    setRoleState(newRole);
    
    if (newRole) {
      await StorageService.UserRole.save(newRole);
    } else {
      await StorageService.UserRole.remove();
    }
  };

  const saveUserData = async (data: Partial<UserData>) => {
    const mergedData = { ...userData, ...data };
    setUserData(mergedData);
    await StorageService.UserData.save(mergedData);
  };

  const completeOnboarding = async () => {
    setIsOnboardingComplete(true);
    await StorageService.Onboarding.save(true);
  };

  /**
   * Login existing user
   * Flow: AuthService → State → Storage (parallel)
   */
  const login = async (email: string, password: string) => {
    try {
      const response = await AuthService.login(email, password);
      
      setRoleState(response.role);
      setUserData(response.user);
      setIsAuthenticated(true);
      setIsOnboardingComplete(response.onboardingComplete);
      
      await Promise.all([
        StorageService.AuthToken.save(response.token),
        StorageService.UserRole.save(response.role!),
        StorageService.UserData.save(response.user),
        StorageService.Onboarding.save(response.onboardingComplete),
      ]);
    } catch (error) {
      console.error('[RoleContext] Login failed:', error);
      throw error;
    }
  };

  /**
   * Register new user
   * IMPORTANT: Role must be set first (via setRole in RoleSelectionScreen)
   * Flow: Validate role → AuthService → State → Storage (parallel)
   */
  const register = async (email: string, password: string) => {
    if (!role) {
      throw new Error('No role selected. User must select role first.');
    }
    
    try {
      const response = await AuthService.register(email, password, role);
      
      setRoleState(response.role);
      setUserData(response.user);
      setIsAuthenticated(true);
      setIsOnboardingComplete(response.onboardingComplete);
      
      await Promise.all([
        StorageService.AuthToken.save(response.token),
        StorageService.UserRole.save(response.role!),
        StorageService.UserData.save(response.user),
        StorageService.Onboarding.save(response.onboardingComplete),
      ]);
    } catch (error) {
      console.error('[RoleContext] Registration failed:', error);
      throw error;
    }
  };

  /**
   * Logout user
   * IMPORTANT: Always clears state/storage, even if server call fails
   */
  const logout = async () => {
    try {
      await AuthService.logout();
    } catch (error) {
      console.error('[RoleContext] Logout error (continuing):', error);
    }
    
    // Always clear state + storage
    setRoleState(null);
    setUserData({});
    setIsAuthenticated(false);
    setIsOnboardingComplete(false);
    await StorageService.clearAll();
  };

  const clearUserData = () => {
    setUserData({});
  };

  // ============================================================================
  // CONTEXT VALUE
  // ============================================================================

  const value: RoleContextType = {
    role,
    userData,
    isAuthenticated,
    isOnboardingComplete,
    isHydrated,
    setRole,
    saveUserData,
    completeOnboarding,
    login,
    register,
    logout,
    clearUserData,
  };

  return <RoleContext.Provider value={value}>{children}</RoleContext.Provider>;
}

// ============================================================================
// HOOK
// ============================================================================

export function useRole(): RoleContextType {
  const context = useContext(RoleContext);
  
  if (!context) {
    throw new Error('useRole must be used within RoleProvider');
  }
  
  return context;
}