import { UserData, UserRole } from '@/context/RoleContext';

// ============================================================================
// USER FACTORY
// ============================================================================

export function createMockUser(email: string, role: UserRole): UserData {
  if (!role) {
    throw new Error('Role required for mock user');
  }
  
  const baseData: UserData = { email };
  
  if (role === 'BEWERBER') {
    return {
      ...baseData,
      name: 'Max Mustermann',
      skills: ['React Native', 'TypeScript', 'Node.js', 'REST APIs', 'Git'],
    };
  }
  
  if (role === 'FIRMA') {
    return {
      ...baseData,
      companyName: 'TechStartup GmbH',
      branche: 'IT & Software',
      description: 'Wir entwickeln innovative Mobile Apps.',
    };
  }
  
  throw new Error(`Invalid role: ${role}`);
}

// ============================================================================
// HELPERS
// ============================================================================

export function generateMockToken(): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8);
  return `mock_token_${timestamp}_${random}`;
}

export function simulateNetworkDelay(ms: number = 500): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// ============================================================================
// TEST DATA
// ============================================================================

export const MOCK_USERS = {
  BEWERBER_COMPLETE: {
    email: 'bewerber@test.de',
    name: 'Anna Schmidt',
    skills: ['React Native', 'TypeScript', 'UI/UX Design'],
  } as UserData,
  
  FIRMA_COMPLETE: {
    email: 'firma@test.de',
    companyName: 'Digital Solutions AG',
    branche: 'E-Commerce',
    description: 'Führendes E-Commerce Unternehmen mit 500+ Mitarbeitern.',
  } as UserData,
  
  BEWERBER_MINIMAL: {
    email: 'minimal@test.de',
    name: 'Tom Klein',
    skills: [],
  } as UserData,
};