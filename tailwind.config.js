/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#00D4FF',
          DEFAULT: '#0072FF',
          dark: '#004EA2',
        },
        accent: {
          gold: '#FFD700',
          silver: '#C0C0C0',
          bronze: '#CD7F32',
          crimson: '#FF4757',
        },
        dark: {
          bg: '#0a0a1a',
          card: 'rgba(255, 255, 255, 0.05)',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Oswald', 'sans-serif'],
      },
      backgroundImage: {
        'stadium-gradient': 'radial-gradient(circle at top, #1a1a3a 0%, #0a0a1a 100%)',
      },
      animation: {
        'gradient': 'gradient 8s linear infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        }
      },
      backgroundSize: {
        '300%': '300% 300%',
      }
    },
  },
  plugins: [],
}
