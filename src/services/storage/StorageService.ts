import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from './storage.keys';

// ============================================================================
// HELPERS
// ============================================================================

function logError(action: string, error: unknown): void {
  console.error(`[Storage] ${action}:`, error);
}

// ============================================================================
// CORE OPERATIONS
// ============================================================================

/**
 * Speichert Wert in AsyncStorage.
 * Strings werden direkt gespeichert, Objekte als JSON.
 */
async function save<T>(key: string, value: T): Promise<void> {
  try {
    const serialized = typeof value === 'string' 
      ? value 
      : JSON.stringify(value);
    await AsyncStorage.setItem(key, serialized);
  } catch (error) {
    logError(`save ${key}`, error);
  }
}

/**
 * Lädt Wert aus AsyncStorage.
 * Versucht automatisch JSON zu parsen, gibt bei Fehler null zurück.
 */
async function get<T>(key: string): Promise<T | null> {
  try {
    const value = await AsyncStorage.getItem(key);
    if (!value) return null;
    
    // Versuche JSON zu parsen. Bei plain Strings: direkt zurückgeben
    try {
      return JSON.parse(value) as T;
    } catch {
      return value as T; // Fallback für plain Strings
    }
  } catch (error) {
    logError(`get ${key}`, error);
    return null;
  }
}

async function remove(key: string): Promise<void> {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    logError(`remove ${key}`, error);
  }
}

async function clearAll(keys: string[] = Object.values(STORAGE_KEYS)): Promise<void> {
  try {
    await AsyncStorage.multiRemove(keys);
  } catch (error) {
    logError('clearAll', error);
  }
}

// ============================================================================
// DOMAIN FUNCTIONS
// ============================================================================

export const AuthTokenStorage = {
  save: (token: string) => save(STORAGE_KEYS.AUTH_TOKEN, token),
  get: () => get<string>(STORAGE_KEYS.AUTH_TOKEN),
  remove: () => remove(STORAGE_KEYS.AUTH_TOKEN),
};

export const UserRoleStorage = {
  save: (role: string) => save(STORAGE_KEYS.USER_ROLE, role),
  get: () => get<string>(STORAGE_KEYS.USER_ROLE),
  remove: () => remove(STORAGE_KEYS.USER_ROLE),
};

export const UserDataStorage = {
  save: <T extends object>(data: T) => save(STORAGE_KEYS.USER_DATA, data),
  get: <T extends object>() => get<T>(STORAGE_KEYS.USER_DATA),
  remove: () => remove(STORAGE_KEYS.USER_DATA),
};

export const OnboardingStorage = {
  save: (complete: boolean) => save(STORAGE_KEYS.ONBOARDING_COMPLETE, complete),
  get: async (): Promise<boolean> => {
    const value = await get<boolean>(STORAGE_KEYS.ONBOARDING_COMPLETE);
    return value ?? false;
  },
  remove: () => remove(STORAGE_KEYS.ONBOARDING_COMPLETE),
};

// ============================================================================
// BULK OPERATIONS
// ============================================================================

interface HydratedData {
  authToken: string | null;
  userRole: string | null;
  userData: object | null;
  onboardingComplete: boolean;
}

export async function hydrateAll(): Promise<HydratedData> {
  try {
    const [authToken, userRole, userData, onboardingComplete] = await Promise.all([
      AuthTokenStorage.get(),
      UserRoleStorage.get(),
      UserDataStorage.get<object>(),
      OnboardingStorage.get(),
    ]);

    return { authToken, userRole, userData, onboardingComplete };
  } catch (error) {
    logError('hydrateAll', error);
    return {
      authToken: null,
      userRole: null,
      userData: null,
      onboardingComplete: false,
    };
  }
}

export async function clearAllAppData(): Promise<void> {
  await clearAll();
}

// ============================================================================
// PUBLIC API
// ============================================================================

export const StorageService = {
  AuthToken: AuthTokenStorage,
  UserRole: UserRoleStorage,
  UserData: UserDataStorage,
  Onboarding: OnboardingStorage,
  hydrateAll,
  clearAll: clearAllAppData,
};
