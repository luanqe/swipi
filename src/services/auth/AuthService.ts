import { UserRole } from '@/context/RoleContext';
import { AuthResponse } from './auth.types';
import { createMockUser, generateMockToken, simulateNetworkDelay } from './auth.mocks';
import { STORAGE_KEYS } from '../storage';

/**
 * Auth Service
 * 
 * Zentrale Business-Logik für Authentication.
 * 
 * Architektur-Prinzipien:
 * ✅ Single Responsibility: Nur Auth (keine Storage, keine State)
 * ✅ Stateless: Keine Hidden Dependencies (kein useRole())
 * ✅ Dependency Inversion: Context nutzt Service
 * 
 * MVP: Mock-Implementierung (auth.mocks.ts)
 * PRODUCTION: Siehe AuthService.prod.ts
 */

// ============================================================================
// LOGIN
// ============================================================================

/**
 * Authentifiziert bestehenden User
 * @returns onboardingComplete = true (existing user)
 */
export async function login(email: string, password: string): Promise<AuthResponse> {
  await simulateNetworkDelay(500);
  
  const role: UserRole = 'BEWERBER';
  const user = createMockUser(email, role);
  const token = generateMockToken();
  
  return {
    token,
    role,
    user,
    onboardingComplete: true,
  };
}

// ============================================================================
// REGISTER
// ============================================================================

/**
 * Registriert neuen User
 * 
 * @param role - WICHTIG: Service ist stateless → role explizit übergeben
 *               (wurde vorher in RoleSelectionScreen gewählt)
 * @returns onboardingComplete = false (new user → needs onboarding)
 */
export async function register(
  email: string,
  password: string,
  role: UserRole
): Promise<AuthResponse> {
  if (!role) {
    throw new Error('Role required. User must select role first.');
  }
  
  await simulateNetworkDelay(500);
  
  const user = createMockUser(email, role);
  const token = generateMockToken();
  
  return {
    token,
    role,
    user,
    onboardingComplete: false,
  };
}

// ============================================================================
// LOGOUT
// ============================================================================

/**
 * Beendet User-Session
 * @param token - Optional (für Production: Server-side Invalidierung)
 */
export async function logout(token?: string): Promise<void> {
  // MVP: Local only (Context handles State + Storage clear)
  // PRODUCTION: Siehe AuthService.prod.ts für Token-Invalidierung
  const authToken = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
  if (authToken) {
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
     console.log('[AuthService] Logout successful');
  }
}

// ============================================================================
// EXPORTS
// ============================================================================

export const AuthService = {
  login,
  register,
  logout,
};
