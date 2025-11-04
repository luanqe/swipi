import { UserRole } from '@/context/RoleContext';

/**
 * Onboarding Configuration
 * 
 * MVP: 2 Steps für BEWERBER, 3 Steps für FIRMA
 * PRODUCTION: Erweitert auf 6+ Steps, dynamisch vom Backend laden
 */

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

/**
 * Field Types
 */
export type FieldType = 
  | 'text'          
  | 'email'          
  | 'password'      
  | 'textarea'      
  | 'select'        // Dropdown
  | 'multiselect'   // Multiple Choice
  | 'checkbox'       
  | 'radio';         

/**
 * Field Definition
 */
export interface OnboardingField {
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  required?: boolean;
  options?: string[];        // Für select/multiselect/radio
  validation?: {
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
  };
}

/**
 * Onboarding Step
 * Eine "Page" im Onboarding-Flow
 */
export interface OnboardingStep {
  id: number;                // Eindeutige ID (für Tracking)
  title: string;            
  subtitle?: string;        
  fields: OnboardingField[]; // Input-Felder für diesen Step
  buttonText?: string;       // Custom Button-Text (default: "Weiter")
}

/**
 * Onboarding Config Structure
 */
export interface OnboardingConfig {
  [key: string]: OnboardingStep[];
}

// ============================================================================
// ONBOARDING STEPS CONFIGURATION
// ============================================================================

export const ONBOARDING_STEPS: OnboardingConfig = {
  
  /**
   * BEWERBER Onboarding (Job-Suchende)
   */
  BEWERBER: [
    {
      id: 1,
      title: 'Wie heißt du?',
      subtitle: 'Dein Name erscheint auf deinem Profil',
      fields: [
        {
          name: 'name',
          label: 'Name',
          type: 'text',
          placeholder: 'z.B. Lisa Müller',
          required: true,
        },
      ],
      buttonText: 'Weiter',
    },
    
    // Step 2: Skills
    {
      id: 2,
      title: 'Was kannst du?',
      subtitle: 'Wähle deine wichtigsten Skills',
      fields: [
        {
          name: 'skills',
          label: 'Skills',
          type: 'multiselect',
          placeholder: 'Wähle deine Skills',
          required: true,
          options: [
            'React',
            'React Native',
            'TypeScript',
            'JavaScript',
            'Node.js',
            'Python',
            'Java',
            'C#',
            'Swift',
            'Kotlin',
            'UI/UX Design',
            'Product Management',
            'Marketing',
            'Sales',
            'Buchhaltung',
          ],
        },
      ],
      buttonText: 'Fertig',
    },
    
    // SPÄTER erweitern:
    /*
    {
      id: 3,
      title: 'Wie viel Erfahrung hast du?',
      fields: [
        {
          name: 'experience',
          label: 'Berufserfahrung',
          type: 'select',
          options: ['< 1 Jahr', '1-3 Jahre', '3-5 Jahre', '5+ Jahre'],
          required: true,
        },
      ],
    },
    {
      id: 4,
      title: 'Wo möchtest du arbeiten?',
      fields: [
        {
          name: 'location',
          label: 'Standort',
          type: 'text',
          placeholder: 'z.B. Wien, Österreich',
          required: true,
        },
        {
          name: 'remote',
          label: 'Remote-Arbeit möglich?',
          type: 'checkbox',
        },
      ],
    },
    */
  ],
  
  /**
   * FIRMA Onboarding (Unternehmen)
   */
  FIRMA: [
    // Step 1
    {
      id: 1,
      title: 'Wie heißt ihr?',
      subtitle: 'Der Name deines Unternehmens',
      fields: [
        {
          name: 'companyName',
          label: 'Firmenname',
          type: 'text',
          placeholder: 'z.B. Tech Startup GmbH',
          required: true,
        },
      ],
      buttonText: 'Weiter',
    },
    
    // Step 2
    {
      id: 2,
      title: 'Welche Branche?',
      subtitle: 'In welchem Bereich seid ihr tätig?',
      fields: [
        {
          name: 'branche',
          label: 'Branche',
          type: 'select',
          placeholder: 'Wähle deine Branche',
          required: true,
          options: [
            'IT & Software',
            'Marketing & Werbung',
            'Finanzen & Versicherung',
            'Gesundheit & Medizin',
            'Einzelhandel',
            'Gastronomie',
            'Handwerk',
            'Bildung',
            'Logistik & Transport',
            'Produktion & Fertigung',
            'Sonstiges',
          ],
        },
      ],
      buttonText: 'Weiter',
    },
    
    // Step 3
    {
      id: 3,
      title: 'Kurzbeschreibung',
      subtitle: 'Stelle dein Unternehmen kurz vor',
      fields: [
        {
          name: 'description',
          label: 'Über uns',
          type: 'textarea',
          placeholder: 'Wir sind ein innovatives Startup, das...',
          required: true,
        },
      ],
      buttonText: 'Fertig',
    },
    
    // SPÄTER erweitern:
    /*
    {
      id: 4,
      title: 'Wie viele Mitarbeiter habt ihr?',
      fields: [
        {
          name: 'companySize',
          label: 'Unternehmensgröße',
          type: 'select',
          options: ['1-10', '11-50', '51-200', '200+'],
          required: true,
        },
      ],
    },
    {
      id: 5,
      title: 'Wo seid ihr?',
      fields: [
        {
          name: 'location',
          label: 'Standort',
          type: 'text',
          placeholder: 'z.B. Wien, Österreich',
          required: true,
        },
      ],
    },
    {
      id: 6,
      title: 'Logo hochladen',
      fields: [
        {
          name: 'logo',
          label: 'Firmenlogo',
          type: 'image',
        },
      ],
    },
    */
  ],
  
  /**
   * ADMIN Onboarding (später)
   * Admins brauchen kein Onboarding
   */
  // ADMIN: [],
  
  /**
   * GUEST Onboarding (später)
   * Guests sehen nur Tutorial
   */
  // GUEST: [
  //   {
  //     id: 1,
  //     title: 'Willkommen bei Swipi!',
  //     subtitle: 'Entdecke Jobs mit einem Swipe',
  //     fields: [],
  //     buttonText: 'Los geht\'s',
  //   },
  // ],
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Get Onboarding Steps für eine Rolle
 * 
 * @param role - User Role
 * @returns Onboarding Steps Array
 */
export function getOnboardingSteps(role: UserRole): OnboardingStep[] {
  if (!role) {
    console.warn('[Onboarding Config] No role provided, returning empty array');
    return [];
  }
  
  const steps = ONBOARDING_STEPS[role];
  
  if (!steps) {
    console.warn(`[Onboarding Config] No steps found for role: ${role}`);
    return [];
  }
  
  return steps;
}

/**
 * Get total number of steps for a role
 * 
 * @param role - User Role
 * @returns Number of steps
 */
export function getTotalSteps(role: UserRole): number {
  return getOnboardingSteps(role).length;
}

/**
 * Get step by index
 * 
 * @param role - User Role
 * @param stepIndex - Step index (0-based)
 * @returns Onboarding Step or undefined
 */
export function getStepByIndex(role: UserRole, stepIndex: number): OnboardingStep | undefined {
  const steps = getOnboardingSteps(role);
  return steps[stepIndex];
}

/**
 * Validate if role has onboarding steps
 * 
 * @param role - User Role
 * @returns true if role has steps
 */
export function hasOnboardingSteps(role: UserRole): boolean {
  return getOnboardingSteps(role).length > 0;
}
