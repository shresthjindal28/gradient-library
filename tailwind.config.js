/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        black: '#000000',
        purple: {
          400: '#8b5cf6',
          500: '#7b2cbf',
          600: '#6d28d9',
          700: '#5a189a',
          800: '#4c1d95',
          900: '#3c096c',
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'button-gradient': 'linear-gradient(90deg, #6d28d9, #8b5cf6)',
      },
      animation: {
        'gradient-shift': 'gradientShift 15s ease infinite',
        'spin': 'spin 1s linear infinite',
      },
      keyframes: {
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        }
      },
      boxShadow: {
        'glow': '0 0 15px rgba(139, 92, 246, 0.5)',
      },
    },
  },
  plugins: [],
}
