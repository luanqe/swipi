/**
 * Swipi Color Palette
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
