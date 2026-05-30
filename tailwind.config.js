/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        syne: ['Syne', 'sans-serif'],
        dm: ['DM Sans', 'sans-serif'],
      },
      colors: {
        cream: '#F5F2EB',
        dark: '#1A1A18',
        mid: '#2E2E2A',
        accent: '#C8FF00',
        accent2: '#E8FF80',
        'gray-karsa': {
          1: '#F0EDE6',
          2: '#D6D3CB',
          3: '#8A8880',
          muted: '#6B6960',
        },
      },
      borderRadius: {
        'karsa': '32px',
        'karsa-md': '20px',
        'karsa-pill': '100px',
      },
      keyframes: {
        ticker: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        pulse_dot: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.4', transform: 'scale(0.75)' },
        },
        scrollLine: {
          '0%, 100%': { transform: 'scaleY(1)', transformOrigin: 'top' },
          '50%': { transform: 'scaleY(0.4)', transformOrigin: 'top' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        ticker: 'ticker 30s linear infinite',
        pulse_dot: 'pulse_dot 2s ease-in-out infinite',
        scrollLine: 'scrollLine 1.8s ease-in-out infinite',
        fadeUp: 'fadeUp 0.6s ease forwards',
      },
    },
  },
  plugins: [],
}
