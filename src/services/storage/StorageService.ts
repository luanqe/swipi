import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from './storage.keys';

/**
 * Storage Service
 * 
 * Zentrale Schnittstelle für ALLE AsyncStorage-Zugriffe.
 * 
 * Prinzipien:
 * ✅ DRY: JSON-Logik nur 1x geschrieben (nicht 8x)
 * ✅ Single Responsibility: Nur Storage, keine Business-Logik
 * ✅ Type-Safe: Generics für automatische Type-Inference
 * ✅ Error-Handling: Einheitlich über logError()
 * 
 * Warum besser als vorher?
 * - 8 duplizierte AsyncStorage-Calls → 2 generische Funktionen
 * - 6 duplizierte Try-Catch-Blöcke → 1 Error-Handler
 * - Magic Strings überall → 1 zentrale Key-Datei
 */

// ============================================================================
// ERROR HANDLING
// ============================================================================

/**
 * Einheitlicher Error-Logger
 * 
 * Statt in jedem Catch denselben console.error zu wiederholen,
 * haben wir 1 zentrale Stelle für Storage-Fehler.
 * 
 * Später einfach erweiterbar mit:
 * - Sentry.captureException(error)
 * - User-Toast-Benachrichtigung
 * - Analytics-Tracking
 */
function logError(action: string, error: unknown): void {
  console.error(`[Storage] ${action}:`, error);
}

// ============================================================================
// GENERIC STORAGE OPERATIONS
// ============================================================================

/**
 * Generic Save Function
 * 
 * Speichert JEDEN Wert (String, Number, Object, Array) als JSON.
 * 
 * Warum JSON für alles?
 * - Einheitlich (keine Sonderfälle für Strings vs Objects)
 * - Type-Safe (TypeScript kennt den Typ durch Generic)
 * - Zukunftssicher (einfach erweiterbar)
 * 
 * @template T - Der Typ des zu speichernden Werts
 * @param key - AsyncStorage-Schlüssel
 * @param value - Der zu speichernde Wert
 * @param rethrow - Soll Error weitergeworfen werden? (Default: false = graceful degradation)
 * @throws Error wenn AsyncStorage fehlschlägt UND rethrow=true
 * 
 * Lazy Error Capture:
 * - rethrow=false → Silent fail (z.B. Onboarding-Status nicht kritisch)
 * - rethrow=true  → Crash (z.B. Auth-Token muss gespeichert werden)
 */
async function save<T>(key: string, value: T, rethrow = false): Promise<void> {
  try {
    const serialized = JSON.stringify(value);
    await AsyncStorage.setItem(key, serialized);
  } catch (error) {
    logError(`Failed to save ${key}`, error);
    if (rethrow) throw error; // Nur werfen wenn explizit gewünscht
  }
}

/**
 * Generic Get Function
 * 
 * Lädt JEDEN Wert aus AsyncStorage und parsed automatisch von JSON.
 * 
 * Type-Inference:
 * const token = await get<string>(STORAGE_KEYS.AUTH_TOKEN)
 * → TypeScript weiß: token ist string | null
 * 
 * @template T - Der erwartete Typ des Werts
 * @param key - AsyncStorage-Schlüssel
 * @returns Geparseter Wert oder null wenn nicht vorhanden/fehlerhaft
 * 
 * Stabilität bei JSON.parse:
 * - Defensives Parsing mit try/catch
 * - Fehlerhaft gespeicherte Daten (z.B. alte App-Version) crashen nicht
 * - Graceful degradation: null zurückgeben statt App-Crash
 */
async function get<T>(key: string): Promise<T | null> {
  try {
    const serialized = await AsyncStorage.getItem(key);
    
    if (serialized === null) {
      return null; // Key existiert nicht
    }
    
    // Defensives JSON.parse: Kann bei korrupten Daten fehlschlagen
    try {
      return JSON.parse(serialized) as T;
    } catch (parseError) {
      logError(`Failed to parse JSON for ${key}`, parseError);
      // Korrupte Daten → null zurückgeben (statt App-Crash)
      return null;
    }
  } catch (error) {
    logError(`Failed to get ${key}`, error);
    return null; // Bei AsyncStorage-Fehler null zurückgeben (graceful degradation)
  }
}

/**
 * Generic Remove Function
 * 
 * Löscht einen einzelnen Key aus AsyncStorage.
 * 
 * @param key - AsyncStorage-Schlüssel
 */
async function remove(key: string): Promise<void> {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    logError(`Failed to remove ${key}`, error);
    throw error;
  }
}

/**
 * Clear All Function
 * 
 * Löscht ALLE App-Daten aus AsyncStorage.
 * Verwendet multiRemove für bessere Performance als remove() 4x aufrufen.
 * 
 * @param keys - Optional: Nur bestimmte Keys löschen (Default: alle App-Keys)
 */
async function clearAll(keys: string[] = Object.values(STORAGE_KEYS)): Promise<void> {
  try {
    await AsyncStorage.multiRemove(keys);
  } catch (error) {
    logError('Failed to clear storage', error);
    throw error;
  }
}

// ============================================================================
// DOMAIN-SPECIFIC FUNCTIONS
// ============================================================================

/**
 * Auth Token
 * 
 * JWT-Token für API-Authentifizierung.
 * 
 * ⚠️ KRITISCH: rethrow=true bei save()
 * → Auth-Token MUSS gespeichert werden, sonst ist Login kaputt
 */
export const AuthTokenStorage = {
  save: (token: string) => save(STORAGE_KEYS.AUTH_TOKEN, token, true), // rethrow=true!
  get: () => get<string>(STORAGE_KEYS.AUTH_TOKEN),
  remove: () => remove(STORAGE_KEYS.AUTH_TOKEN),
};

/**
 * User Role
 * 
 * BEWERBER | FIRMA
 * 
 * ⚠️ KRITISCH: rethrow=true bei save()
 * → User-Role MUSS gespeichert werden, sonst funktioniert App-Flow nicht
 */
export const UserRoleStorage = {
  save: (role: string) => save(STORAGE_KEYS.USER_ROLE, role, true), // rethrow=true!
  get: () => get<string>(STORAGE_KEYS.USER_ROLE),
  remove: () => remove(STORAGE_KEYS.USER_ROLE),
};

/**
 * User Data
 * 
 * Komplettes User-Objekt (Name, Email, Skills, etc.)
 * 
 * ⚠️ KRITISCH: rethrow=true bei save()
 * → User-Daten MÜSSEN gespeichert werden (z.B. nach Registration)
 */
export const UserDataStorage = {
  save: <T extends object>(data: T) => save(STORAGE_KEYS.USER_DATA, data, true), // rethrow=true!
  get: <T extends object>() => get<T>(STORAGE_KEYS.USER_DATA),
  remove: () => remove(STORAGE_KEYS.USER_DATA),
};

/**
 * Onboarding Status
 * 
 * Boolean: Hat User Onboarding abgeschlossen?
 * 
 * ✅ NICHT-KRITISCH: rethrow=false (default)
 * → Wenn Onboarding-Status nicht gespeichert werden kann, ist das nicht schlimm
 *    (User macht Onboarding halt nochmal, kein Datenverlust)
 */
export const OnboardingStorage = {
  save: (complete: boolean) => save(STORAGE_KEYS.ONBOARDING_COMPLETE, complete), // rethrow=false (default)
  get: async (): Promise<boolean> => {
    const value = await get<boolean>(STORAGE_KEYS.ONBOARDING_COMPLETE);
    return value ?? false; // Default: false wenn nicht gesetzt
  },
  remove: () => remove(STORAGE_KEYS.ONBOARDING_COMPLETE),
};

// ============================================================================
// BULK OPERATIONS
// ============================================================================

/**
 * Hydrate All
 * 
 * Lädt ALLE App-Daten in einem Rutsch (parallel für Performance).
 * Perfekt für App-Start im RoleContext.
 * 
 * @returns Object mit allen geladenen Daten
 */
export async function hydrateAll() {
  try {
    const [authToken, userRole, userData, onboardingComplete] = await Promise.all([
      AuthTokenStorage.get(),
      UserRoleStorage.get(),
      UserDataStorage.get<object>(),
      OnboardingStorage.get(),
    ]);

    return {
      authToken,
      userRole,
      userData,
      onboardingComplete,
    };
  } catch (error) {
    logError('Failed to hydrate all data', error);
    // Bei Fehler: Leeres Objekt zurückgeben (graceful degradation)
    return {
      authToken: null,
      userRole: null,
      userData: null,
      onboardingComplete: false,
    };
  }
}

/**
 * Clear All App Data
 * 
 * Löscht ALLE App-Daten (z.B. bei Logout).
 */
export async function clearAllAppData(): Promise<void> {
  await clearAll();
}

// ============================================================================
// EXPORTS
// ============================================================================

/**
 * Storage Service
 * 
 * Public API für alle Storage-Operationen.
 * 
 * Usage im RoleContext:
 * ```ts
 * import { StorageService } from '@/services/storage/StorageService';
 * 
 * // Einzelne Operationen
 * await StorageService.AuthToken.save(token);
 * const token = await StorageService.AuthToken.get();
 * 
 * // Bulk-Operationen
 * const data = await StorageService.hydrateAll();
 * await StorageService.clearAll();
 * ```
 */
export const StorageService = {
  // Domain-spezifische Operationen
  AuthToken: AuthTokenStorage,
  UserRole: UserRoleStorage,
  UserData: UserDataStorage,
  Onboarding: OnboardingStorage,
  
  // Bulk-Operationen
  hydrateAll,
  clearAll: clearAllAppData,
};
