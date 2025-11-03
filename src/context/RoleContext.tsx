import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { StorageService } from '../services/storage';
import { AuthService } from '../services/auth';

/**
 * Role Context
 * 
 * Zentraler State-Manager für:
 * - User Role (BEWERBER | FIRMA)
 * - User Data (Name, Skills, Email, etc.)
 * - Authentication Status
 * - Onboarding Completion Status
 * 
 * Prinzipien:
 * ✅ Single Responsibility: Nur State-Management (keine Business-Logik, keine Storage-Logik)
 * ✅ DRY: Keine duplizierten Calls (delegiert an AuthService + StorageService)
 * ✅ Dependency Inversion: Nutzt Service-Interfaces (nicht direkt AsyncStorage/API)
 * ✅ State/Storage Sync: Garantiert dass State und Storage IMMER synchron sind
 * 
 * Architektur:
 * - RoleContext (State) → AuthService (Business) → API (Backend)
 * - RoleContext (State) → StorageService (Persistence) → AsyncStorage
 * 
 * MVP: AuthService mit Mocks
 * PRODUCTION: AuthService mit echten API-Calls
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
  isHydrated: boolean; // ← Zeigt ob Storage geladen wurde
  
  // Actions (async für Storage persistence via StorageService)
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
  const [isHydrated, setIsHydrated] = useState(false); // ← Hydration Status

  // ============================================================================
  // PERSISTENCE - HYDRATE FROM STORAGE ON APP START
  // ============================================================================

  useEffect(() => {
    hydrateFromStorage();
  }, []);

  /**
   * Hydrate State from AsyncStorage
   * Called once on app start
   * 
   * MVP: Loads all persisted data via StorageService
   * PRODUCTION: Add error recovery, migration logic
   */
  const hydrateFromStorage = async () => {
    try {
      console.log('[RoleContext] Hydrating from storage...');
      
      // Load all data in parallel via StorageService
      const data = await StorageService.hydrateAll();

      // Restore state if data exists
      if (data.authToken) {
        setIsAuthenticated(true);
        console.log('[RoleContext] Auth token found');
      }

      if (data.userRole) {
        setRoleState(data.userRole as UserRole);
        console.log('[RoleContext] Role restored:', data.userRole);
      }

      if (data.userData) {
        setUserData(data.userData as UserData);
        console.log('[RoleContext] User data restored');
      }

      if (data.onboardingComplete) {
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
   * MVP: Speichert in State + StorageService
   * PRODUCTION: await authService.setRole(role);
   */
  const setRole = async (newRole: UserRole) => {
    setRoleState(newRole);
    console.log('[RoleContext] Role set:', newRole);
    
    // Persist via StorageService
    if (newRole) {
      await StorageService.UserRole.save(newRole); // ⚠️ KRITISCH: rethrow=true
    } else {
      await StorageService.UserRole.remove();
    }
  };

  /**
   * Save User Data
   * Called by OnboardingScreen to store user information
   * 
   * MVP: Merges data into state + StorageService
   * PRODUCTION: await authService.updateUserData(data);
   */
  const saveUserData = async (data: Partial<UserData>) => {
    const mergedData = { ...userData, ...data };
    setUserData(mergedData);
    console.log('[RoleContext] User data saved:', data);
    
    // Persist via StorageService
    await StorageService.UserData.save(mergedData); // ⚠️ KRITISCH: rethrow=true
  };

  /**
   * Complete Onboarding
   * Called when user finishes all onboarding steps
   * 
   * MVP: Sets flag to true + StorageService
   * PRODUCTION: await authService.updateProfile({ onboardingComplete: true });
   */
  const completeOnboarding = async () => {
    setIsOnboardingComplete(true);
    console.log('[RoleContext] Onboarding completed');
    
    // Persist via StorageService
    await StorageService.Onboarding.save(true); // ✅ NICHT-KRITISCH: rethrow=false (silent fail)
  };

  /**
   * Login (Existing User)
   * User already has account, skip onboarding
   * 
   * Verwendet AuthService für Business-Logik.
   * Context übernimmt State-Management + Storage-Persistence.
   * 
   * State/Storage Synchronisation:
   * 1. AuthService.login() → AuthResponse
   * 2. State setzen (role, userData, isAuthenticated, isOnboardingComplete)
   * 3. Storage speichern (token, role, userData, onboarding) - PARALLEL
   * 
   * @param email - User Email
   * @param password - User Password
   * @throws Error wenn Login fehlschlägt
   */
  const login = async (email: string, password: string) => {
    console.log('[RoleContext] Login started:', { email });
    
    try {
      // Business-Logik: AuthService
      const response = await AuthService.login(email, password);
      
      // State-Management: Context
      setRoleState(response.role);
      setUserData(response.user);
      setIsAuthenticated(true);
      setIsOnboardingComplete(response.onboardingComplete);
      
      // Storage-Persistence: Parallel für Performance
      await Promise.all([
        StorageService.AuthToken.save(response.token),
        StorageService.UserRole.save(response.role!), // ← response.role ist nie null
        StorageService.UserData.save(response.user),
        StorageService.Onboarding.save(response.onboardingComplete),
      ]);
      
      console.log('[RoleContext] Login successful, state + storage synchronized');
    } catch (error) {
      console.error('[RoleContext] Login failed:', error);
      throw error; // Re-throw für UI (z.B. Toast-Benachrichtigung)
    }
  };

  /**
   * Register (New User)
   * User must complete onboarding after registration
   * 
   * Verwendet AuthService für Business-Logik.
   * Context übernimmt State-Management + Storage-Persistence.
   * 
   * Flow (WICHTIG für UNSER System):
   * 1. RoleSelectionScreen: User wählt Rolle → setRole(role)
   * 2. RegisterScreen: User gibt Email/Password ein → register(email, password)
   * 3. OnboardingDataScreen: User gibt restliche Daten ein → saveUserData()
   * 
   * State/Storage Synchronisation:
   * 1. Validierung: role muss vorher gesetzt sein (in RoleSelectionScreen)
   * 2. AuthService.register(email, password, role) → AuthResponse
   * 3. State setzen (role, userData, isAuthenticated, isOnboardingComplete)
   * 4. Storage speichern (token, role, userData, onboarding) - PARALLEL
   * 
   * @param email - User Email
   * @param password - User Password
   * @throws Error wenn Registration fehlschlägt oder role nicht gesetzt
   */
  const register = async (email: string, password: string) => {
    console.log('[RoleContext] Register started:', { email, role });
    
    // Validierung: role muss vorher gesetzt sein (in RoleSelectionScreen)
    if (!role) {
      throw new Error('[RoleContext] No role selected before registration! User must select role first in RoleSelectionScreen.');
    }
    
    try {
      // Business-Logik: AuthService (übergibt role explizit)
      const response = await AuthService.register(email, password, role);
      
      // State-Management: Context
      setRoleState(response.role);
      setUserData(response.user);
      setIsAuthenticated(true);
      setIsOnboardingComplete(response.onboardingComplete);
      
      // Storage-Persistence: Parallel für Performance
      await Promise.all([
        StorageService.AuthToken.save(response.token),
        StorageService.UserRole.save(response.role!), // ← response.role ist nie null
        StorageService.UserData.save(response.user),
        StorageService.Onboarding.save(response.onboardingComplete),
      ]);
      
      console.log('[RoleContext] Registration successful, state + storage synchronized');
    } catch (error) {
      console.error('[RoleContext] Registration failed:', error);
      throw error; // Re-throw für UI (z.B. Toast-Benachrichtigung)
    }
  };

  /**
   * Logout
   * Clears all user data and resets state
   * 
   * Verwendet AuthService für Server-Call (später).
   * Context übernimmt State-Reset + Storage-Clear.
   * 
   * State/Storage Synchronisation:
   * 1. AuthService.logout() → Server-side Token invalidieren (PRODUCTION)
   * 2. State zurücksetzen (alle States auf Defaults)
   * 3. Storage löschen (alle Keys)
   * 
   * WICHTIG:
   * - Logout muss IMMER funktionieren (auch bei API-Fehler)
   * - State/Storage werden IMMER gecleart (auch wenn Server-Call fehlschlägt)
   */
  const logout = async () => {
    console.log('[RoleContext] Logout started');
    
    try {
      // Business-Logik: AuthService (MVP: macht nichts, PROD: Server-Call)
      await AuthService.logout();
      
      // State-Management: Context (alle States zurücksetzen)
      setRoleState(null);
      setUserData({});
      setIsAuthenticated(false);
      setIsOnboardingComplete(false);
      
      // Storage-Persistence: Alle Daten löschen
      await StorageService.clearAll();
      
      console.log('[RoleContext] Logout successful, state + storage cleared');
    } catch (error) {
      // Logout sollte IMMER funktionieren
      // → Auch bei Fehler State/Storage clearen
      console.error('[RoleContext] Logout error (continuing anyway):', error);
      
      setRoleState(null);
      setUserData({});
      setIsAuthenticated(false);
      setIsOnboardingComplete(false);
      
      await StorageService.clearAll();
      
      console.log('[RoleContext] Logout completed (despite error)');
    }
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
    isHydrated, // ← Storage geladen?
    
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
