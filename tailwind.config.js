/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        honey: {
          50:  '#FFF8EC',
          100: '#FDEFD3',
          200: '#FBE0A8',
          300: '#F7C873',
          400: '#F5AD3D',
          500: '#F59E0B',
          600: '#D97706',
          700: '#B45309',
          800: '#92400E',
          900: '#78350F',
        },
        honeybrown: {
          DEFAULT: '#6b2a06',
          dark: '#4a1c03',
          light: '#8c3e10',
        },
        charcoal: {
          50:  '#FDFBF7',
          100: '#F7EFE6',
          200: '#EAD7C5',
          300: '#D5B79F',
          400: '#B08564',
          500: '#8C5E3C',
          600: '#6b2a06',
          700: '#552104',
          800: '#3d1702',
          900: '#260e01',
        },
        success: '#16A34A',
        warning: '#F59E0B',
        danger:  '#DC2626',
      },
      fontFamily: {
        heading: ['Sora', 'Poppins', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
        brand: ['Fredoka', 'Sora', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 1px 3px rgba(28,25,23,0.08)',
        'card-hover': '0 4px 12px rgba(28,25,23,0.12)',
      },
      borderRadius: {
        'card': '12px',
        'btn': '10px',
      },
      maxWidth: {
        'content': '1200px',
      },
    },
  },
  plugins: [],
}
