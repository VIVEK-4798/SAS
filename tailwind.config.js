/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        // Custom grid template columns
        'custom': '0.4fr 0.6fr',
      },
      colors:{
        primary: '#1B3B50',
        secondry: '#FBDDB9',
        borclr: '#FDCE96',
        cocoa: '#3a2d1f',
        taupe: '#5f5040',
        bronze: '#744c3a',
        sand: '#9a8879',
        clay: '#7c6656',

      }
    },
  },
  plugins: [],
}