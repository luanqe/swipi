/**
 * Swipi Design System - Theme Configuration
 * Based on Apple Human Interface Guidelines
 * 
 * Barrel Export: Importiert alle Theme-Tokens aus separaten Dateien
 */

export { colors, darkColors, getGradientColors } from './colors';
export { typography } from './typography';
export { spacing } from './spacing';
export { borderRadius } from './borderRadius';
export { shadows } from './shadows';
export { animations } from './animations';
export { layout } from './layout';

import { colors, darkColors } from './colors';
import { typography } from './typography';
import { spacing } from './spacing';
import { borderRadius } from './borderRadius';
import { shadows } from './shadows';
import { animations } from './animations';

export const theme = {
  colors,
  darkColors,
  typography,
  spacing,
  borderRadius,
  shadows,
  animations,
};

export default theme;
