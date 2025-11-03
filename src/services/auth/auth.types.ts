import { UserData, UserRole } from '@/context/RoleContext';

/**
 * Auth Types
 * 
 * Type-Definitionen für AuthService.
 * 
 * Prinzip: DRY
 * → Nutzt EXISTING Types (UserData, UserRole) statt neue zu erfinden
 * → Keine Duplikation von Type-Definitionen
 */

// ============================================================================
// RESPONSE TYPES
// ============================================================================

/**
 * Auth Response
 * 
 * Wird von login() und register() zurückgegeben.
 * 
 * Context nutzt diese Response um:
 * - State zu setzen (user, role, onboardingComplete)
 * - Storage zu persistieren (token, user, etc.)
 * 
 * WICHTIG:
 * - role ist SEPARAT (nicht Teil von UserData)
 * - onboardingComplete ist SEPARAT (nicht Teil von UserData)
 * → Context hat diese als separate State-Variablen
 */
export interface AuthResponse {
  /**
   * JWT Token (MVP: Mock, PROD: Echter Token vom Backend)
   */
  token: string;
  
  /**
   * User Role (BEWERBER | FIRMA)
   * Wird separat im Context gespeichert (nicht Teil von userData)
   */
  role: UserRole;
  
  /**
   * User-Daten (nutzt EXISTING UserData Interface)
   * Kann Bewerber- oder Firma-spezifische Felder enthalten
   * OHNE role (role ist oben separat)
   */
  user: UserData;
  
  /**
   * Onboarding Status
   * - true: Existing User (Login) → Direkt zu Main App
   * - false: New User (Register) → Erst Onboarding-Flow
   */
  onboardingComplete: boolean;
}
