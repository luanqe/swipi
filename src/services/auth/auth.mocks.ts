import { UserData, UserRole } from '@/context/RoleContext';

/**
 * Auth Mocks
 * 
 * Mock-Daten und Helper-Funktionen für MVP.
 * 
 * Prinzipien:
 * ✅ DRY: Mock-User-Logik nur 1x (nicht in login() + register())
 * ✅ Single Responsibility: Nur Mock-Daten, keine Business-Logik
 * ✅ Separation: Später einfach zu löschen (nur diese Datei)
 * 
 * WICHTIG:
 * - Nutzt EXISTING UserData Type (keine neue Interface)
 * - Kennt BEIDE Rollen (BEWERBER + FIRMA)
 * - Erstellt REALISTISCHE Mock-Daten (nicht nur "Mock User")
 * 
 * MVP: Diese Datei
 * PRODUCTION: Diese Datei komplett löschen (AuthService nutzt API)
 */

// ============================================================================
// MOCK USER FACTORY
// ============================================================================

/**
 * Create Mock User
 * 
 * Erstellt Mock-User-Daten basierend auf Rolle.
 * 
 * Warum hier statt im AuthService?
 * → Trennung von Mock-Logik und Service-Logik
 * → Später: Diese Datei löschen, AuthService bleibt unverändert
 * 
 * @param email - User Email
 * @param role - BEWERBER | FIRMA
 * @returns UserData mit rolle-spezifischen Feldern
 */
export function createMockUser(email: string, role: UserRole): UserData {
  // Validierung: role darf nicht null sein
  if (!role) {
    throw new Error('[AuthMocks] Role is required for mock user creation');
  }
  
  // Base Data (für beide Rollen)
  const baseData: UserData = {
    email,
    // KEIN password hier! (wird separat im Context gespeichert)
  };
  
  // Rolle-spezifische Mock-Daten
  if (role === 'BEWERBER') {
    return {
      ...baseData,
      name: 'Max Mustermann',
      skills: [
        'React Native',
        'TypeScript',
        'Node.js',
        'REST APIs',
        'Git',
      ],
    };
  }
  
  if (role === 'FIRMA') {
    return {
      ...baseData,
      companyName: 'TechStartup GmbH',
      branche: 'IT & Software',
      description: 'Wir entwickeln innovative Mobile Apps und suchen talentierte Entwickler für unser Team.',
    };
  }
  
  // Sollte nie passieren (TypeScript verhindert das)
  throw new Error(`[AuthMocks] Invalid role: ${role}`);
}

// ============================================================================
// MOCK TOKEN GENERATOR
// ============================================================================

/**
 * Generate Mock Token
 * 
 * Erstellt einen Mock-JWT-Token.
 * 
 * MVP: Einfacher String mit Timestamp + Random
 * PRODUCTION: Echter JWT vom Backend
 * 
 * Format: "mock_token_<timestamp>_<random>"
 * Beispiel: "mock_token_1699012345678_abc123"
 * 
 * @returns Mock-Token-String
 */
export function generateMockToken(): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8);
  return `mock_token_${timestamp}_${random}`;
}

// ============================================================================
// MOCK DELAY (Network Simulation)
// ============================================================================

/**
 * Simulate Network Delay
 * 
 * Simuliert Netzwerk-Latenz für realistisches UX-Testing.
 * 
 * Warum wichtig?
 * - Loading States testen
 * - Race Conditions aufdecken
 * - Realistisches User-Feedback
 * 
 * MVP: Feste 500ms Delay
 * PRODUCTION: Nicht mehr nötig (echte API hat eigene Latenz)
 * 
 * @param ms - Millisekunden (Default: 500ms)
 */
export function simulateNetworkDelay(ms: number = 500): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// ============================================================================
// MOCK USER VARIANTS (Für Testing)
// ============================================================================

/**
 * Mock User Variants
 * 
 * Vordefinierte Mock-User für Testing verschiedener Szenarien.
 * 
 * Nutzung:
 * - E2E Tests
 * - Manual Testing
 * - Demo-Daten
 * 
 * Später: Erweitern mit mehr Varianten (z.B. User ohne Skills, etc.)
 */
export const MOCK_USERS = {
  /**
   * Standard Bewerber mit vollständigen Daten
   */
  BEWERBER_COMPLETE: {
    email: 'bewerber@test.de',
    name: 'Anna Schmidt',
    skills: ['React Native', 'TypeScript', 'UI/UX Design'],
  } as UserData,
  
  /**
   * Standard Firma mit vollständigen Daten
   */
  FIRMA_COMPLETE: {
    email: 'firma@test.de',
    companyName: 'Digital Solutions AG',
    branche: 'E-Commerce',
    description: 'Führendes E-Commerce Unternehmen mit 500+ Mitarbeitern.',
  } as UserData,
  
  /**
   * Bewerber mit minimalen Daten (nur Name)
   */
  BEWERBER_MINIMAL: {
    email: 'minimal@test.de',
    name: 'Tom Klein',
    skills: [],
  } as UserData,
};
