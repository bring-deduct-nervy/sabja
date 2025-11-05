import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        luxury: {
          gold: {
            50: '#fefbec',
            100: '#fdf5d3',
            200: '#fceaa6',
            300: '#f9d96e',
            400: '#f5c03b',
            500: '#d4a017',
            600: '#b8860b',
            700: '#8b6914',
            800: '#725318',
            900: '#5f4419',
          },
          navy: {
            50: '#f0f4f8',
            100: '#d9e2ec',
            200: '#bcccdc',
            300: '#9fb3c8',
            400: '#829ab1',
            500: '#627d98',
            600: '#486581',
            700: '#334e68',
            800: '#243b53',
            900: '#102a43',
          },
          cream: {
            50: '#fdfcfb',
            100: '#faf8f5',
            200: '#f5f1ea',
            300: '#ebe5d9',
            400: '#ddd4c2',
            500: '#cbbfa9',
            600: '#b5a68d',
            700: '#998a72',
            800: '#7d715f',
            900: '#665e4f',
          },
        },
        brand: {
          primary: '#102a43',
          secondary: '#d4a017',
          accent: '#b8860b',
          background: '#fdfcfb',
          foreground: '#102a43',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)'],
        serif: ['var(--font-serif)'],
        display: ['var(--font-display)'],
      },
      fontSize: {
        'display-xl': [
          '4.5rem',
          { lineHeight: '1.1', letterSpacing: '-0.02em' },
        ],
        'display-lg': [
          '3.75rem',
          { lineHeight: '1.15', letterSpacing: '-0.02em' },
        ],
        'display-md': ['3rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'display-sm': [
          '2.25rem',
          { lineHeight: '1.3', letterSpacing: '-0.01em' },
        ],
      },
      spacing: {
        '18': '4.5rem',
        '112': '28rem',
        '128': '32rem',
      },
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
