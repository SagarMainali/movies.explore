/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-dark': '#001C30',
        'logo-inherit': '#0FB6DF',
      },
      screens: {
        'xsm': '500px',
        'sm': '600px',
        'md': '760px',
        'lg': '1040px',
        'xl': '1300px',
        '2xl': '1500px',
      },
    },
  },
  plugins: [],
}