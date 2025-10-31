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
   * SCREEN SECTIONS (Vertikale Aufteilung)
   * Für zentrierte/verteilte Layouts
   */
  sections: {
    // Top Third (z.B. Logo, Header)
    topThird: {
      flex: 0.33,
      justifyContent: 'flex-start' as const,
    },
    
    // Middle Third (z.B. zentrierter Content wie Role Cards)
    middleThird: {
      flex: 0.34,
      justifyContent: 'center' as const,
    },
    
    // Bottom Third (z.B. Buttons, Footer)
    bottomThird: {
      flex: 0.33,
      justifyContent: 'flex-end' as const,
    },

    // ✅ 4-Quarter Layout (Login/Register Screens)
    // Viertel 1: Titel
    // Viertel 2: Input Fields
    // Viertel 3: Leerraum (spacer)
    // Viertel 4: Button auf Daumenhöhe
    quarter1: {
      flex: 0.25,
      justifyContent: 'flex-start' as const,
    },
    quarter2: {
      flex: 0.25,
      justifyContent: 'flex-start' as const,
    },
    quarter3: {
      flex: 0.25,
      justifyContent: 'center' as const,
    },
    quarter4: {
      flex: 0.25,
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
   * FORM ZONE (Input-Felder Position)
   * Zwischen Header und Button
   */
  formZone: {
    gap: spacing.md, // 16px zwischen Inputs
  },

  /**
   * CONTENT DISTRIBUTION
   * Für verschiedene Layout-Patterns
   */
  spaceBetween: {
    flex: 1,
    justifyContent: 'space-between' as const,
  },

  /**
   * 4-Quarter Container für Login/Register Screens
   * Feste Aufteilung: 25% Titel, 25% Inputs, 25% Spacer, 25% Button
   */
  fourQuarterContainer: {
    flex: 1,
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
