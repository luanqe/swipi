import { UserRole } from '@/context/RoleContext';

// ============================================================================
// TYPES
// ============================================================================

export type FieldType = 
  | 'text'
  | 'email'
  | 'password'
  | 'textarea'
  | 'select'
  | 'multiselect'
  | 'checkbox'
  | 'radio';

export interface OnboardingField {
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  required?: boolean;
  options?: string[];
  validation?: {
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
  };
}

// Represents one page/screen in the onboarding flow
export interface OnboardingStep {
  id: number;
  title: string;
  subtitle?: string;
  fields: OnboardingField[];
  buttonText?: string;
}

export interface OnboardingConfig {
  [key: string]: OnboardingStep[];
}

// ============================================================================
// CONFIGURATION
// ============================================================================

export const ONBOARDING_STEPS: OnboardingConfig = {
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
    // TODO: Add experience, location, remote preference steps
  ],
  
  FIRMA: [
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
    // TODO: Add company size, location, logo upload steps
  ],
};

// ============================================================================
// UTILITIES
// ============================================================================

// Returns empty array if role is null or not found
export function getOnboardingSteps(role: UserRole): OnboardingStep[] {
  if (!role) {
    console.warn('[Onboarding] No role provided');
    return [];
  }
  
  const steps = ONBOARDING_STEPS[role];
  
  if (!steps) {
    console.warn(`[Onboarding] No steps found for role: ${role}`);
    return [];
  }
  
  return steps;
}

export function getTotalSteps(role: UserRole): number {
  return getOnboardingSteps(role).length;
}

export function getStepByIndex(role: UserRole, stepIndex: number): OnboardingStep | undefined {
  return getOnboardingSteps(role)[stepIndex];
}

export function hasOnboardingSteps(role: UserRole): boolean {
  return getOnboardingSteps(role).length > 0;
}