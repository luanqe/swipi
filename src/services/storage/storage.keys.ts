/**
 * Storage Keys
 * 
 * Zentrale Verwaltung aller AsyncStorage-Schlüssel.
 * 
 * Vorteile:
 * - Typsicher (autocomplete + compile-time checks)
 * - Keine Magic Strings im Code verstreut
 * - Einfach erweiterbar (z.B. für Migration/Versioning)
 * 
 * Separation of Concerns:
 * Keys ≠ Storage-Logik
 */

export const STORAGE_KEYS = {
  AUTH_TOKEN: 'authToken',
  USER_ROLE: 'userRole',
  USER_DATA: 'userData',
  ONBOARDING_COMPLETE: 'onboardingComplete',
} as const;

/**
 * Type-Safe Key Access
 * Verhindert Tippfehler zur Compile-Zeit
 */
export type StorageKey = typeof STORAGE_KEYS[keyof typeof STORAGE_KEYS];
