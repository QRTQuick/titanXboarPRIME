// App Constants
export const APP_CONFIG = {
  name: 'titanXboarPRIME',
  version: '0.0.0.1-boarbetaVX',
  company: 'Quick Red Tech',
  contact: 'quicredtech@gmail.com',
  url: 'https://titan-xboar-prime.vercel.app',
} as const;

// Storage Keys
export const STORAGE_KEYS = {
  HISTORY: 'txb_history',
  CONSENT: 'qrt_cookie_consent',
  SESSION: 'qrt_user_session',
} as const;

// Limits
export const LIMITS = {
  MAX_HISTORY_ITEMS: 20,
  RATE_LIMIT: 3,
  RATE_WINDOW: 5 * 60 * 1000, // 5 minutes
} as const;

// Colors (for potential theme system)
export const COLORS = {
  primary: '#ff3d00',
  primaryRgb: '255, 61, 0',
  background: '#050505',
  surface: '#0f0f0f',
  zinc: {
    50: '#fafafa',
    100: '#f4f4f5',
    200: '#e4e4e7',
    300: '#d4d4d8',
    400: '#a1a1aa',
    500: '#71717a',
    600: '#52525b',
    700: '#3f3f46',
    800: '#27272a',
    900: '#18181b',
    950: '#09090b',
  },
} as const;

// Breakpoints
export const BREAKPOINTS = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
} as const;

// Animation Durations
export const ANIMATIONS = {
  fast: '150ms',
  normal: '300ms',
  slow: '500ms',
} as const;