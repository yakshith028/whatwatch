/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#0B0F19',
        surface: 'rgba(255,255,255,0.04)',
        purple: { DEFAULT: '#8B5CF6', dark: '#6D28D9', light: '#A78BFA' },
        blue:   { DEFAULT: '#3B82F6', dark: '#1D4ED8' },
        pink:   { DEFAULT: '#EC4899', dark: '#BE185D' },
      },
      fontFamily: {
        display: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backdropBlur: { xs: '2px' },
      animation: {
        'drift-slow': 'drift 20s ease-in-out infinite alternate',
        'float-up': 'floatUp 20s linear infinite',
        shimmer: 'shimmer 1.8s ease-in-out infinite',
      },
      keyframes: {
        drift: {
          '0%':   { transform: 'translate(0,0) scale(1)' },
          '50%':  { transform: 'translate(40px,30px) scale(1.08)' },
          '100%': { transform: 'translate(-30px,50px) scale(0.95)' },
        },
        floatUp: {
          '0%':   { transform: 'translateY(100vh) scale(0)', opacity: 0 },
          '10%':  { opacity: 0.6 },
          '90%':  { opacity: 0.2 },
          '100%': { transform: 'translateY(-10vh) scale(1)', opacity: 0 },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
}
