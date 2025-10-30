import { Platform, Dimensions } from 'react-native';
import { spacing } from './spacing';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

/**
 * Standardisierte Layout-Positionen für konsistente UI
 * Basierend auf Apple HIG & Ergonomie
 */
export const layout = {
  /**
   * THUMB ZONE (Daumenhöhe)
   * Optimale Position für primäre CTAs auf Smartphones
   * iOS: ~100-120px vom unteren Bildschirmrand
   * Android: ~120-140px (höherer Home Button)
   */
  thumbZone: {
    paddingBottom: Platform.select({
      ios: spacing.xxxl,      // 64px
      android: spacing.xxxl + spacing.md, // 80px
      default: spacing.xxxl,
    }),
  },

  /**
   * HEADER ZONE (Titel-Position)
   * Konsistente Position für Screen-Titel
   */
  headerZone: {
    paddingTop: spacing.xxxl, // 64px - Einheitlich für alle Screens
    marginBottom: spacing.xl, // 32px - Abstand zu Content
  },

  /**
   * FORM ZONE (Input-Felder Position)
   * Zwischen Header und Button
   * Inputs bleiben fix, bewegen sich NICHT mit Tastatur
   */
  formZone: {
    paddingTop: spacing.md,     // 16px nach Header
    gap: spacing.md,            // 16px zwischen Inputs
    // KEIN paddingBottom - wächst nur so viel wie Inputs brauchen
  },

  /**
   * SCREEN SECTIONS (Layout-Patterns)
   */
  sections: {
    // Für Screens MIT Form (Header + Inputs + Button)
    // z.B. Login, Register, Onboarding
    threeSection: {
      flex: 1,
      justifyContent: 'space-between' as const,
    },
    
    // Für Screens OHNE Form (nur Content + Button)
    // z.B. Welcome, Role Selection
    twoSection: {
      flex: 1,
      justifyContent: 'space-between' as const,
    },
    
    // Legacy: Top/Middle/Bottom Thirds
    topThird: {
      flex: 0.33,
      justifyContent: 'flex-start' as const,
    },
    middleThird: {
      flex: 0.34,
      justifyContent: 'center' as const,
    },
    bottomThird: {
      flex: 0.33,
      justifyContent: 'flex-end' as const,
    },
  },

  /**
   * KEYBOARD AWARE LAYOUTS
   * Verhindert Überlappung mit Tastatur
   */
  keyboardAware: {
    /**
     * Für Screens MIT Tastatur-Inputs
     * Content bewegt sich mit Tastatur
     */
    withKeyboard: {
      behavior: Platform.OS === 'ios' ? 'padding' as const : undefined,
      keyboardVerticalOffset: Platform.OS === 'ios' ? 0 : 20,
    },
    
    /**
     * Für Screens OHNE Tastatur-Inputs
     * Buttons bleiben fix auf Daumenhöhe
     */
    withoutKeyboard: {
      // Nutzt nur thumbZone.paddingBottom
      // Kein KeyboardAvoidingView nötig
    },
  },

  /**
   * STANDARD CONTAINER
   * Konsistente Screen-Padding
   */
  screenPadding: {
    horizontal: spacing.lg, // 24px
  },

  /**
   * CONTENT DISTRIBUTION
   * Für space-between Layouts (Top Content + Bottom Buttons)
   * @deprecated Use layout.sections.threeSection or twoSection instead
   */
  spaceBetween: {
    flex: 1,
    justifyContent: 'space-between' as const,
  },
};

/**
 * Convenience Helper für direkten Import
 * Gleicher Wert wie layout.thumbZone.paddingBottom
 * Häufig genutzt für Bottom Sections mit Buttons auf Daumenhöhe
 */
export const bottomPadding = Platform.select({
  ios: spacing.lg,      // 24px
  android: spacing.xl,  // 32px
  default: spacing.lg,
});

export default layout;
