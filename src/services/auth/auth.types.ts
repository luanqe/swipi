import { UserData, UserRole } from '@/context/RoleContext';

/**
 * Response from login() and register()
 */
export interface AuthResponse {
  token: string;
  role: UserRole;
  user: UserData;
  onboardingComplete: boolean; // true = skip onboarding, false = show onboarding flow
}