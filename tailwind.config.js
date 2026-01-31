/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'prime-orange': '#ff3d00',
        'prime-orange-light': '#ff8e53',
      },
      fontFamily: {
        'sans': ['Space Grotesk', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'scan': 'scan 3s linear infinite',
        'fade-in': 'fade-in 0.5s ease-out',
        'slide-in-from-bottom-6': 'slide-in-from-bottom-6 0.5s ease-out',
        'zoom-in-95': 'zoom-in-95 0.2s ease-out',
      },
      keyframes: {
        scan: {
          '0%': { top: '0%' },
          '100%': { top: '100%' }
        },
        'fade-in': {
          'from': { opacity: '0' },
          'to': { opacity: '1' }
        },
        'slide-in-from-bottom-6': {
          'from': { 
            opacity: '0',
            transform: 'translateY(1.5rem)'
          },
          'to': { 
            opacity: '1',
            transform: 'translateY(0)'
          }
        },
        'zoom-in-95': {
          'from': { 
            opacity: '0',
            transform: 'scale(0.95)'
          },
          'to': { 
            opacity: '1',
            transform: 'scale(1)'
          }
        }
      }
    },
  },
  plugins: [],
}