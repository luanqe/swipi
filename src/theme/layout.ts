import { Platform } from 'react-native';
import { spacing } from './spacing';

/**
 * Layout-System für ergonomische Screens
 * Fokus: Platform-Unterschiede & Thumb-Zone-Ergonomie
 */
export const layout = {
  /**
   * Standard Screen-Struktur
   * Header (oben) → Content (Mitte) → Actions (unten, Thumb Zone)
   */
  screen: {
    header: {
      paddingTop: spacing.xxxl,
      marginBottom: spacing.xl,
    },
    actions: {
      paddingBottom: Platform.select({
        ios: spacing.lg,
        android: spacing.xl,
        default: spacing.lg,
      }),
      gap: spacing.md,
    },
  },

  /**
   * Keyboard-Handling für Input-Screens
   */
  keyboard: {
    behavior: Platform.OS === 'ios' ? 'padding' as const : undefined,
    offset: Platform.OS === 'ios' ? 0 : 20,
  },
};

export default layout;
