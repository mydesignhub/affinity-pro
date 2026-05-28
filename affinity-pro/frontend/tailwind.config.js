/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'shake':       'shake 0.4s cubic-bezier(.36,.07,.19,.97) both',
        'fade-in-up':  'fadeInUp 0.3s ease-out both',
        'slide-in':    'slideIn 0.28s ease-out both',
        'pop':         'pop 0.22s ease-out both',
        'fade-in':     'fadeIn 0.25s ease-out both',
      },
      keyframes: {
        shake: {
          '0%,100%': { transform: 'translateX(0)' },
          '20%':     { transform: 'translateX(-5px)' },
          '40%':     { transform: 'translateX(5px)' },
          '60%':     { transform: 'translateX(-3px)' },
          '80%':     { transform: 'translateX(3px)' },
        },
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(10px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          from: { opacity: '0', transform: 'translateX(10px)' },
          to:   { opacity: '1', transform: 'translateX(0)' },
        },
        pop: {
          '0%':   { transform: 'scale(0.94)' },
          '60%':  { transform: 'scale(1.04)' },
          '100%': { transform: 'scale(1)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
      },
      transitionTimingFunction: {
        spring: 'cubic-bezier(0.175,0.885,0.32,1.275)',
      },
    },
  },
  plugins: [],
}
