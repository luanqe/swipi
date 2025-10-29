/**
 * Swipi Design System - Theme Configuration
 * Based on Apple Human Interface Guidelines
 */

export const colors = {
  // Primary Brand
  primary: {
    500: '#0A66C2',  // LinkedIn Blue (Main CTA)
    600: '#004182',  // Darker for pressed state
    400: '#378FE9',  // Lighter for hover
  },
  
  // Secondary/Accent
  secondary: {
    500: '#057642',  // Success Green (Match, Approved)
    600: '#045230',  // Darker green
  },
  
  // Neutral/Professional
  neutral: {
    900: '#1C1E21',  // Text Primary
    800: '#2D2F33',  // Text Secondary
    700: '#3E4045',  // Text Tertiary
    600: '#65676B',  // Text Disabled
    500: '#8A8D91',  // Icons
    400: '#B0B3B8',  // Borders
    300: '#CED0D4',  // Dividers
    200: '#E4E6EB',  // Background Secondary
    100: '#F0F2F5',  // Background Tertiary
    50:  '#F7F8FA',  // Background Primary
  },
  
  // Semantic Colors
  success: '#10A37F',    // Match confirmed
  warning: '#F59E0B',    // Pending review
  error:   '#DC2626',    // Reject/Error
  info:    '#3B82F6',    // Information
  
  // System (iOS/Android)
  systemBlue:   '#007AFF',
  systemGreen:  '#34C759',
  systemRed:    '#FF3B30',
  systemYellow: '#FFCC00',
  
  // Backgrounds
  background: {
    primary:   '#FFFFFF',
    secondary: '#F7F8FA',
    tertiary:  '#E4E6EB',
    overlay:   'rgba(0, 0, 0, 0.4)',
  },
  
  // Card Overlay (Swipe Feedback)
  overlay: {
    like:    'rgba(16, 163, 127, 0.15)',
    dislike: 'rgba(220, 38, 38, 0.15)',
  }
};

export const darkColors = {
  ...colors,
  neutral: {
    900: '#E4E6EB',  // Inverted for dark mode
    800: '#B0B3B8',
    700: '#8A8D91',
    600: '#65676B',
    500: '#65676B',
    400: '#3E4045',
    300: '#2D2F33',
    200: '#242526',
    100: '#1C1E21',
    50:  '#18191A',
  },
  background: {
    primary:   '#18191A',
    secondary: '#242526',
    tertiary:  '#3A3B3C',
    overlay:   'rgba(0, 0, 0, 0.6)',
  }
};

export const typography = {
  // Headings
  largeTitle: {
    fontSize: 34,
    lineHeight: 41,
    fontWeight: '700' as const,
    letterSpacing: 0.37,
  },
  title1: {
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '700' as const,
    letterSpacing: 0.36,
  },
  title2: {
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '600' as const,
    letterSpacing: 0.35,
  },
  title3: {
    fontSize: 20,
    lineHeight: 25,
    fontWeight: '600' as const,
    letterSpacing: 0.38,
  },
  
  // Body Text
  body: {
    fontSize: 17,
    lineHeight: 22,
    fontWeight: '400' as const,
    letterSpacing: -0.41,
  },
  bodyEmphasized: {
    fontSize: 17,
    lineHeight: 22,
    fontWeight: '600' as const,
    letterSpacing: -0.41,
  },
  
  // Supporting Text
  callout: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: '400' as const,
    letterSpacing: -0.32,
  },
  subhead: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '400' as const,
    letterSpacing: -0.24,
  },
  footnote: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '400' as const,
    letterSpacing: -0.08,
  },
  caption1: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '400' as const,
    letterSpacing: 0,
  },
  caption2: {
    fontSize: 11,
    lineHeight: 13,
    fontWeight: '400' as const,
    letterSpacing: 0.07,
  },
};

export const spacing = {
  xs:   4,   // Tight spacing
  sm:   8,   // Small spacing
  md:   16,  // Standard spacing
  lg:   24,  // Large spacing
  xl:   32,  // Extra large spacing
  xxl:  48,  // Section spacing
  xxxl: 64,  // Major section spacing
};

export const borderRadius = {
  sm:  4,   // Small elements
  md:  8,   // Buttons, inputs
  lg:  12,  // Cards
  xl:  16,  // Modals, sheets
  xxl: 24,  // Main swipe cards
  full: 9999, // Pills, circular buttons
};

export const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
};

export const animations = {
  // Durations
  fast:     200,  // Micro-interactions
  normal:   300,  // Standard transitions
  slow:     500,  // Complex animations
  
  // Spring configs
  spring: {
    damping: 15,
    stiffness: 150,
    mass: 1,
  },
};

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
