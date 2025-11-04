import { useColorScheme } from 'react-native';
import { colors, darkColors } from '@/theme';

/**
 * useTheme Hook
 * 
 * Zentralisierte Dark Mode Logic - verhindert Code-Duplikation.
 * Ersetzt repetitiven Code in allen Components/Screens
 *
 * @returns {Object} isDark (boolean), activeColors (colors | darkColors)
 */
export function useTheme() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const activeColors = isDark ? darkColors : colors;
  
  return { 
    isDark, 
    activeColors,
    colorScheme,
  };
}
