// App Constants - Modern Design System
export const APP_CONFIG = {
  name: 'titanXboarPRIME',
  version: '2.0.0-modernVX',
  company: 'Quick Red Tech',
  contact: 'quicredtech@gmail.com',
  url: 'https://titan-xboar-prime.vercel.app',
} as const;

// Storage Keys
export const STORAGE_KEYS = {
  HISTORY: 'txb_history',
  CONSENT: 'qrt_cookie_consent',
  SESSION: 'qrt_user_session',
  THEME: 'txb_theme',
} as const;

// Limits
export const LIMITS = {
  MAX_HISTORY_ITEMS: 50,
  RATE_LIMIT: 5,
  RATE_WINDOW: 5 * 60 * 1000, // 5 minutes
  MAX_FILE_SIZE: 15 * 1024 * 1024, // 15MB
} as const;

// Modern Color System
export const COLORS = {
  // Primary Brand Colors
  primary: {
    50: '#fff7ed',
    100: '#ffedd5',
    200: '#fed7aa',
    300: '#fdba74',
    400: '#fb923c',
    500: '#f97316', // Main orange
    600: '#ea580c',
    700: '#c2410c',
    800: '#9a3412',
    900: '#7c2d12',
  },
  
  // Neutral Colors
  neutral: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#e5e5e5',
    300: '#d4d4d4',
    400: '#a3a3a3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
    950: '#0a0a0a',
  },
  
  // Semantic Colors
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#3b82f6',
  
  // Background System
  background: {
    primary: '#0a0a0a',
    secondary: '#171717',
    tertiary: '#262626',
    glass: 'rgba(23, 23, 23, 0.8)',
  }
} as const;

// Typography Scale
export const TYPOGRAPHY = {
  fontFamily: {
    sans: ['Inter', 'system-ui', 'sans-serif'],
    mono: ['JetBrains Mono', 'Consolas', 'monospace'],
    display: ['Outfit', 'Inter', 'sans-serif'],
  },
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
  }
} as const;

// Spacing System
export const SPACING = {
  xs: '0.5rem',
  sm: '0.75rem',
  md: '1rem',
  lg: '1.5rem',
  xl: '2rem',
  '2xl': '3rem',
  '3xl': '4rem',
} as const;

// Animation System
export const ANIMATIONS = {
  duration: {
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
  },
  easing: {
    default: 'cubic-bezier(0.4, 0, 0.2, 1)',
    in: 'cubic-bezier(0.4, 0, 1, 1)',
    out: 'cubic-bezier(0, 0, 0.2, 1)',
    inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  }
} as const;

// Breakpoints
export const BREAKPOINTS = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;