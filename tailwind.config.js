/** @type {import('tailwindcss').Config} */
export default {
  server: {
    port: 3000, 
  },
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        audiowide: ['Audiowide' , 'san-serif'],
        opensans: ['OpenSans', 'sans-serif'],
      },
      colors: {
        primary: '#C0392B',
        secondary: '#2C3E50',
        accent: '#E74C3C', 
      },
      animation: {
        'beat': 'beat 1s infinite', 
      },
      keyframes: {
        beat: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' }, 
        },
      },
    },
  },
  plugins: [],
}
