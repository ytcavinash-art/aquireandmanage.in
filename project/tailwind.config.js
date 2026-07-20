/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0f1f5c',
          light: '#1b2f7a',
          dark: '#0a1540',
        },
        mediumBlue: {
          DEFAULT: '#274690'
        },
        crimson: {
          DEFAULT: '#c8102e',
          light: '#e8193e',
          dark: '#9e0d23',
        },
      },
      fontFamily: {
        sans: ['Montserrat', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
      },
      animation: {
        scroll: 'scroll 20s linear infinite',
      },
      keyframes: {
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-25%)' },
        },
      },
    },
  },
  plugins: [],
};
