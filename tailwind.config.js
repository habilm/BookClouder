/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './public/**/*.html', // Adjust this path to include your HTML files
    './src/**/*.{ts,tsx,js,jsx}', // Inc
  ],
  theme: {
    extend: {},
  },
  plugins: [require("rippleui")],
};
