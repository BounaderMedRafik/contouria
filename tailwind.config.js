/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary': {
          50: '#f0f7ec',
          100: '#d9edce',
          200: '#b8dfa0',
          300: '#7ec641',
          400: '#5eb030',
          500: '#2E7D32',
          600: '#276b2c',
          700: '#205924',
          800: '#1a481d',
          900: '#0f2810',
        },
        'accent': {
          50: '#fef8f5',
          100: '#fce8dd',
          200: '#f9d1bb',
          300: '#f4a87a',
          400: '#ef8547',
          500: '#e85d1f',
          600: '#d94a12',
          700: '#b8390d',
          800: '#8a2808',
          900: '#5c1a05',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        '7xl': ['4.5rem', { lineHeight: '1.1' }],
        '6xl': ['3.75rem', { lineHeight: '1.1' }],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'fade-in-up': 'fadeInUp 0.7s ease-out',
        'fade-in-down': 'fadeInDown 0.7s ease-out',
        'slide-in-right': 'slideInRight 0.8s ease-out',
        'slide-in-left': 'slideInLeft 0.8s ease-out',
        'scale-in': 'scaleIn 0.5s ease-out',
        'bounce-subtle': 'bounceSubtle 3s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'float': 'float 4s ease-in-out infinite',
        'shimmer': 'shimmer 2s infinite',
        'glow': 'glow 3s ease-in-out infinite',
        'count-up': 'countUp 2s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(100px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-100px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '1', boxShadow: '0 0 20px rgba(46, 125, 50, 0.3)' },
          '50%': { opacity: '0.7', boxShadow: '0 0 40px rgba(46, 125, 50, 0.6)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        glow: {
          '0%, 100%': { textShadow: '0 0 10px rgba(46, 125, 50, 0.3)' },
          '50%': { textShadow: '0 0 20px rgba(46, 125, 50, 0.7)' },
        },
        countUp: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};
