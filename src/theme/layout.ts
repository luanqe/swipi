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
   * @param dense - Reduzierter Abstand für kompaktere Layouts
   */
  headerZone: (dense = false) => ({
    paddingTop: dense ? spacing.xl : spacing.xxxl, // 32px oder 64px
    marginBottom: spacing.xl, // 32px - Abstand zu Content
  }),

  /**
   * VERTICAL DISTRIBUTION (Semantische Layout-Zonen)
   * Dynamische Aufteilung für Login/Register/Auth Screens
   */
  verticalDistribution: {
    /**
     * Header Zone - Titel & Beschreibung
     * Wächst nur so viel wie Content braucht
     */
    header: {
      paddingTop: spacing.xxxl,     // 64px - Titel nach unten (konsistent mit RoleSelection)
      marginBottom: spacing.lg,     // 24px - Abstand zu Form
    },

    /**
     * Form Zone - Input Fields & Content
     * Wächst dynamisch, scrollbar wenn nötig
     */
    form: {
      flexGrow: 1,                  // Nimmt verfügbaren Platz
      justifyContent: 'flex-start' as const,
      gap: spacing.sm,              // 8px zwischen Inputs (kompakt)
    },

    /**
     * Spacer Zone - Flexibler Abstand
     * Verhindert, dass Inputs zu nah an Buttons kommen
     */
    spacer: {
      flexShrink: 0.2,              // Komprimiert leicht bei Platzmangel
      minHeight: spacing.xl,        // 32px Minimum-Abstand
    },

    /**
     * Footer Zone - CTA Buttons auf Daumenhöhe
     * Bleibt fix am unteren Rand
     */
    footer: {
      paddingBottom: Platform.select({
        ios: spacing.lg,            // 24px
        android: spacing.xl,        // 32px
        default: spacing.lg,
      }),
      gap: spacing.md,              // 16px zwischen Buttons
    },
  },

  /**
   * SCREEN SECTIONS (Vertikale Aufteilung)
   * Für zentrierte/verteilte Layouts (z.B. Onboarding, Role Selection)
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
   * Für verschiedene Layout-Patterns
   */
  spaceBetween: {
    flex: 1,
    justifyContent: 'space-between' as const,
  },
};

/**
 * Convenience Helper für direkten Import
 * Gleicher Wert wie verticalDistribution.footer.paddingBottom
 * Häufig genutzt für Bottom Sections mit Buttons auf Daumenhöhe
 */
export const bottomPadding = Platform.select({
  ios: spacing.lg,      // 24px
  android: spacing.xl,  // 32px
  default: spacing.lg,
});

export default layout;
