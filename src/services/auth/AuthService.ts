import { UserRole } from '@/context/RoleContext';
import { AuthResponse } from './auth.types';
import { createMockUser, generateMockToken, simulateNetworkDelay } from './auth.mocks';

/**
 * Auth Service
 * 
 * Zentrale Business-Logik für Authentication.
 * 
 * Prinzipien:
 * ✅ Single Responsibility: Nur Auth-Logik (keine Storage, keine State)
 * ✅ DRY: Mock-Logik in auth.mocks.ts ausgelagert (nicht dupliziert)
 * ✅ Dependency Inversion: Context nutzt Service-Interface (nicht umgekehrt)
 * ✅ Stateless: Keine Hidden Dependencies (kein useRole() etc.)
 * 
 * Architektur:
 * - RoleContext (State) → nutzt AuthService (Business) → nutzt auth.mocks (Data)
 * 
 * MVP: Mock-Implementierung (akzeptiert jede Credentials)
 * PRODUCTION: Ersetzt Mock-Calls durch echte API-Calls (auth.mocks.ts löschen)
 */

// ============================================================================
// LOGIN (Existing User)
// ============================================================================

/**
 * Login (Existing User)
 * 
 * Authentifiziert einen bestehenden User.
 * 
 * Flow:
 * 1. Validierung (MVP: akzeptiert alles, PROD: echte Validierung)
 * 2. Mock-User erstellen (MVP) / API-Call (PROD)
 * 3. Token generieren (MVP) / Token vom Backend (PROD)
 * 4. Response zurückgeben → Context setzt State + Storage
 * 
 * @param email - User Email
 * @param password - User Password
 * @returns AuthResponse mit Token + User + onboardingComplete=true
 * @throws Error wenn Login fehlschlägt
 * 
 * WICHTIG:
 * - Existing User → onboardingComplete = true
 * - Context speichert dann in Storage parallel
 */
export async function login(email: string, password: string): Promise<AuthResponse> {
  console.log('[AuthService] Login started:', { email });
  
  // MVP: Simulate network delay (realistisches UX)
  await simulateNetworkDelay(500);
  
  // MVP: Input-Validierung (akzeptiert alles)
  // PRODUCTION: Echte Validierung
  // if (!email || !password) {
  //   throw new Error('Email and password are required');
  // }
  
  // MVP: Mock-User erstellen
  // Für Login: Wir simulieren dass User BEWERBER ist
  // PRODUCTION: Backend gibt echten User zurück mit seiner Role
  const mockRole: UserRole = 'BEWERBER';
  const mockUser = createMockUser(email, mockRole);
  const mockToken = generateMockToken();
  
  console.log('[AuthService] Login successful (mock)');
  
  return {
    token: mockToken,
    role: mockRole,
    user: mockUser,
    onboardingComplete: true, // Existing user = Onboarding bereits gemacht
  };
  
  // PRODUCTION:
  /*
  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    
    if (!response.ok) {
      throw new Error('Login failed');
    }
    
    const data = await response.json();
    return {
      token: data.token,
      user: data.user,
      onboardingComplete: data.user.onboardingComplete,
    };
  } catch (error) {
    console.error('[AuthService] Login failed:', error);
    throw new Error('Login failed. Please check your credentials.');
  }
  */
}

// ============================================================================
// REGISTER (New User)
// ============================================================================

/**
 * Register (New User)
 * 
 * Registriert einen neuen User.
 * 
 * Flow (WICHTIG - spezifisch für UNSER System):
 * 1. RoleSelectionScreen: User wählt Rolle → setRole(role) in Context
 * 2. RegisterScreen: User gibt Email/Password ein → register(email, password, role)
 * 3. OnboardingDataScreen: User gibt restliche Daten ein → saveUserData()
 * 
 * Warum role als Parameter?
 * → Service ist STATELESS (kein useRole()!)
 * → Context übergibt explizit die bereits gewählte Role
 * 
 * @param email - User Email
 * @param password - User Password
 * @param role - BEWERBER | FIRMA (wurde vorher in RoleSelectionScreen gewählt)
 * @returns AuthResponse mit Token + User + onboardingComplete=false
 * @throws Error wenn Registration fehlschlägt oder role null ist
 * 
 * WICHTIG:
 * - New User → onboardingComplete = false
 * - Context navigiert dann zu OnboardingDataScreen
 */
export async function register(
  email: string,
  password: string,
  role: UserRole
): Promise<AuthResponse> {
  console.log('[AuthService] Register started:', { email, role });
  
  // Validierung: role ist REQUIRED
  if (!role) {
    throw new Error('[AuthService] Role is required for registration. User must select role first in RoleSelectionScreen.');
  }
  
  // MVP: Simulate network delay
  await simulateNetworkDelay(500);
  
  // MVP: Input-Validierung (akzeptiert alles)
  // PRODUCTION: Echte Validierung
  // if (!email || !password) {
  //   throw new Error('Email and password are required');
  // }
  
  // MVP: Mock-User erstellen (mit der vom User gewählten Rolle)
  const mockUser = createMockUser(email, role);
  const mockToken = generateMockToken();
  
  console.log('[AuthService] Registration successful (mock)');
  
  return {
    token: mockToken,
    role: role, // ← Explizit die gewählte Role zurückgeben
    user: mockUser,
    onboardingComplete: false, // New user = muss noch Onboarding machen
  };
  
  // PRODUCTION:
  /*
  try {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, role }),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Registration failed');
    }
    
    const data = await response.json();
    return {
      token: data.token,
      user: data.user,
      onboardingComplete: false, // New user immer false
    };
  } catch (error) {
    console.error('[AuthService] Registration failed:', error);
    throw new Error('Registration failed. Email might already be in use.');
  }
  */
}

// ============================================================================
// LOGOUT
// ============================================================================

/**
 * Logout
 * 
 * Beendet User-Session.
 * 
 * MVP: Nur lokales Clear (Context löscht State + Storage)
 * PRODUCTION: Zusätzlich Server-side Token-Invalidierung
 * 
 * @param token - Auth-Token (optional, für PRODUCTION Server-Invalidierung)
 * 
 * WICHTIG:
 * - Service macht nur Server-Call (wenn nötig)
 * - Context übernimmt State-Reset + Storage-Clear
 */
export async function logout(token?: string): Promise<void> {
  console.log('[AuthService] Logout started');
  
  // MVP: Nichts zu tun (Token wird einfach lokal gelöscht)
  
  // PRODUCTION: Server-side Token invalidieren
  /*
  try {
    if (token) {
      await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
    }
  } catch (error) {
    // Logout sollte IMMER funktionieren (auch bei API-Fehler)
    console.error('[AuthService] Logout API call failed (continuing anyway):', error);
  }
  */
  
  console.log('[AuthService] Logout successful');
}

// ============================================================================
// EXPORTS
// ============================================================================

/**
 * Auth Service
 * 
 * Public API für Authentication.
 * 
 * Usage im RoleContext:
 * ```ts
 * import { AuthService } from '@/services/auth';
 * 
 * // Login
 * const response = await AuthService.login(email, password);
 * setUserData(response.user);
 * await StorageService.AuthToken.save(response.token);
 * 
 * // Register
 * const response = await AuthService.register(email, password, role);
 * setUserData(response.user);
 * await StorageService.AuthToken.save(response.token);
 * 
 * // Logout
 * await AuthService.logout(token);
 * await StorageService.clearAll();
 * ```
 */
export const AuthService = {
  login,
  register,
  logout,
};
