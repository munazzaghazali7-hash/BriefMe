import type { Config } from 'tailwindcss'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brief: {
          blue: {
            DEFAULT: '#0F4C9E',
            hover: '#0A3A7C',
            50: '#EEF4FF',
          },
          gray: {
            bg: '#F7F7F6',
            text: '#6B6B67',
            border: '#E5E4DF',
            heading: '#111110',
          }
        }
      },
      fontFamily: {
        sans: ['system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
} satisfies Config

