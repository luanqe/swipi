/**
 * Swipi Animation Tokens
 * Based on Apple HIG timing curves
 */

export const animations = {
  // Durations (ms)
  fast:     200,  // Micro-interactions (button press)
  normal:   300,  // Standard transitions (modal, navigation)
  slow:     500,  // Complex animations (match modal)
  
  // Spring configs (React Native Animated)
  spring: {
    damping: 15,
    stiffness: 150,
    mass: 1,
  },
};
