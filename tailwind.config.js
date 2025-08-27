/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Brand Colors
        'slt-blue': {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          DEFAULT: '#0072CE',
          hover: '#005bb5'
        },
        'slt-green': {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          DEFAULT: '#4CAF50'
        },
        // Legacy color mappings for backward compatibility
        'mobitel-green': '#4CAF50',
        'gradient-blue-start': '#0072CE',
        'gradient-blue-end': '#4CAF50',
        'soft-blue': '#60a5fa',
        'dark-blue': '#1e3a8a',
        'light-gray': '#f3f4f6',
      },
      backgroundImage: {
        'slt-gradient': 'linear-gradient(to bottom right, #0072CE, #4CAF50)',
        'slt-gradient-extended': 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 50%, #22c55e 100%)',
        'gradient-blue': 'linear-gradient(135deg, #0072CE 0%, #4CAF50 100%)',
      },
    },
  },
  plugins: [],
} 