/**
 * Tab Bar Configuration
 * 
 * Single Source of Truth für Tab-Definitionen (DRY-Prinzip)
 * Vermeidet Duplikate zwischen Bewerber/Firma Tab Bars
 * 
 * Erweiterbar: Badge-Counts, Custom Icons, etc.
 */

export interface TabConfig {
  name: string;        // Screen Name (react-navigation)
  label: string;       // Display Label
  icon: string;        // Emoji (MVP) / Icon-Name (später)
  badge?: number;      // Optional: Notification Badge Count
}

/**
 * Bewerber Tab Bar (4 Tabs)
 * Swipe → Matches → Chats → Profil
 */
export const BEWERBER_TABS: TabConfig[] = [
  {
    name: 'Swipe',
    label: 'Swipe',
    icon: '🃏',
  },
  {
    name: 'Matches',
    label: 'Matches',
    icon: '❤️',
  },
  {
    name: 'Chats',
    label: 'Chats',
    icon: '💬',
  },
  {
    name: 'Profile',
    label: 'Profil',
    icon: '👤',
  },
];

/**
 * Firma Tab Bar (5 Tabs)
 * Swipe → Matches → Chats → Jobs → Profil
 */
export const FIRMA_TABS: TabConfig[] = [
  {
    name: 'Swipe',
    label: 'Swipe',
    icon: '🃏',
  },
  {
    name: 'Matches',
    label: 'Matches',
    icon: '❤️',
  },
  {
    name: 'Chats',
    label: 'Chats',
    icon: '💬',
  },
  {
    name: 'Jobs',
    label: 'Jobs',
    icon: '💼',
  },
  {
    name: 'Profile',
    label: 'Profil',
    icon: '👤',
  },
];

/**
 * Helper: Get Tab Config by Role
 */
export function getTabsForRole(role: 'BEWERBER' | 'FIRMA'): TabConfig[] {
  return role === 'BEWERBER' ? BEWERBER_TABS : FIRMA_TABS;
}
