/**
 * Swipe Service Public API
 * Zentrale Export-Stelle (Barrel Export)
 */

// Service
export { swipeService } from './SwipeService';

// Types
export type {
  JobCard,
  BewerberCard,
  SwipeDirection,
  SwipeResult,
  ReportReason,
  ReportData,
} from './swipe.types';

// Mocks (für Tests/Development)
export { MOCK_JOB_CARDS, MOCK_BEWERBER_CARDS } from './swipe.mocks';
