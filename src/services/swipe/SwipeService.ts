/**
 * Swipe Service
 * Business Logic für die Swipe-Mechanik
 * KEINE UI-Code - nur Daten und Logik
 */

import {
  JobCard,
  BewerberCard,
  SwipeDirection,
  SwipeResult,
  ReportData,
} from './swipe.types';
import { MOCK_JOB_CARDS, MOCK_BEWERBER_CARDS } from './swipe.mocks';

/**
 * Swipe Service Klasse
 * Single Responsibility: Verwaltet Cards und Swipe-Aktionen
 */
class SwipeService {
  /**
   * Gibt Mock Job Cards für Bewerber zurück
   * Später: API-Call zu Backend
   */
  async getJobCards(): Promise<JobCard[]> {
    // Simuliere API-Call mit Delay
    await this.delay(300);
    
    // Shuffle für Variety
    return this.shuffleArray([...MOCK_JOB_CARDS]);
  }

  /**
   * Gibt Mock Bewerber Cards für Firmen zurück
   * Später: API-Call zu Backend
   */
  async getBewerberCards(): Promise<BewerberCard[]> {
    // Simuliere API-Call mit Delay
    await this.delay(300);
    
    // Shuffle für Variety
    return this.shuffleArray([...MOCK_BEWERBER_CARDS]);
  }

  /**
   * Verarbeitet eine Swipe-Aktion
   * @param cardId - ID der geswiped Card
   * @param direction - Swipe-Richtung (left = dislike, right = like, top = super like)
   * @returns SwipeResult mit Match-Info
   */
  async handleSwipe(
    cardId: string,
    direction: SwipeDirection
  ): Promise<SwipeResult> {
    // Simuliere API-Call
    await this.delay(200);

    // MVP: Nur Console-Log
    console.log(`[SwipeService] Card ${cardId} swiped ${direction}`);

    // Simuliere Match (20% Chance bei "right" swipe)
    const isMatch = direction === 'right' && Math.random() > 0.8;

    if (isMatch) {
      console.log(`[SwipeService] 🎉 It's a Match! Card ${cardId}`);
    }

    return {
      cardId,
      direction,
      isMatch,
    };
  }

  /**
   * Meldet eine Card (Report)
   * @param reportData - Report-Daten mit Reason
   */
  async reportCard(reportData: ReportData): Promise<void> {
    // Simuliere API-Call
    await this.delay(300);

    // MVP: Nur Console-Log
    console.log('[SwipeService] Card reported:', reportData);

    // Später: Backend-Call
    // await api.post('/cards/report', reportData);
  }

  /**
   * Undo der letzten Swipe-Aktion
   * Premium Feature für später
   */
  async undoLastSwipe(): Promise<void> {
    console.log('[SwipeService] Undo not implemented yet (Premium Feature)');
    throw new Error('Undo ist ein Premium Feature');
  }

  /**
   * Helper: Simuliert API-Delay
   */
  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * Helper: Shuffled Array für Variety
   * Fisher-Yates Shuffle Algorithm
   */
  private shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }
}

// Singleton Export
export const swipeService = new SwipeService();
