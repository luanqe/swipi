/**
 * Swipe Service Types
 * Definiert alle Interfaces für die Swipe-Mechanik
 */

/**
 * Job Card - wird Bewerbern angezeigt
 */
export interface JobCard {
  id: string;
  companyName: string;
  companyLogo?: string;
  jobTitle: string;
  location: string;
  salary?: string;
  employmentType: 'Vollzeit' | 'Teilzeit' | 'Freelance' | 'Praktikum';
  requiredSkills: string[];
  description: string;
  benefits?: string[];
  createdAt: Date;
}

/**
 * Bewerber Card - wird Firmen angezeigt
 */
export interface BewerberCard {
  id: string;
  name: string;
  profileImage?: string;
  title?: string; // z.B. "Senior Frontend Developer"
  location: string;
  skills: string[];
  experience: string; // z.B. "3 Jahre Erfahrung"
  availability: 'Sofort' | '1 Monat' | '3 Monate' | 'Verhandelbar';
  bio?: string;
  desiredSalary?: string;
  createdAt: Date;
}

/**
 * Swipe Direction
 */
export type SwipeDirection = 'left' | 'right' | 'top';

/**
 * Swipe Action Result
 */
export interface SwipeResult {
  cardId: string;
  direction: SwipeDirection;
  isMatch?: boolean; // true wenn beide Seiten "right" geswiped haben
}

/**
 * Report Reason
 */
export type ReportReason = 
  | 'inappropriate' 
  | 'fake' 
  | 'spam' 
  | 'other';

/**
 * Report Data
 */
export interface ReportData {
  cardId: string;
  reason: ReportReason;
  details?: string;
}
