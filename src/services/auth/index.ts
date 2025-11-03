/**
 * Auth Service
 * 
 * Barrel Export für saubere Imports.
 * 
 * Usage:
 * ```ts
 * import { AuthService } from '@/services/auth';
 * import type { AuthResponse } from '@/services/auth';
 * ```
 */

export { AuthService } from './AuthService';
export type { AuthResponse } from './auth.types';

// Mocks werden NICHT exportiert (nur intern genutzt)
// PRODUCTION: auth.mocks.ts komplett löschen
