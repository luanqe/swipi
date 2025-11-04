import { UserRole } from '@/context/RoleContext';
import { AuthResponse } from './auth.types';

/**
 * Auth Service - Production Implementation
 * 
 * Ersetzt Mock-Calls durch echte API-Calls.
 * 
 * Migration:
 * 1. AuthService.ts löschen
 * 2. Diese Datei zu AuthService.ts umbenennen
 * 3. auth.mocks.ts löschen (nicht mehr benötigt)
 */

// ============================================================================
// LOGIN
// ============================================================================

export async function login(email: string, password: string): Promise<AuthResponse> {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Login failed. Please check your credentials.');
  }
  
  const data = await response.json();
  
  return {
    token: data.token,
    role: data.user.role,
    user: data.user,
    onboardingComplete: data.user.onboardingComplete,
  };
}

// ============================================================================
// REGISTER
// ============================================================================

export async function register(
  email: string,
  password: string,
  role: UserRole
): Promise<AuthResponse> {
  if (!role) {
    throw new Error('Role required. User must select role first.');
  }
  
  const response = await fetch('/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, role }),
  });
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Registration failed. Email might already be in use.');
  }
  
  const data = await response.json();
  
  return {
    token: data.token,
    role: data.user.role,
    user: data.user,
    onboardingComplete: false,
  };
}

// ============================================================================
// LOGOUT
// ============================================================================

export async function logout(token?: string): Promise<void> {
  if (token) {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
    } catch (error) {
      // Logout sollte IMMER funktionieren (auch bei API-Fehler)
      console.error('[AuthService] Server logout failed (continuing locally):', error);
    }
  }
  
  console.log('[AuthService] Logout successful');
}

// ============================================================================
// EXPORTS
// ============================================================================

export const AuthService = {
  login,
  register,
  logout,
};
