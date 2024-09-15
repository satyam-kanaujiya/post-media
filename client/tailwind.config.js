/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
            fontFamily: { 
                "roboto": ['roboto', 'sans-serif'] 
            },
            fontWeight:{
              'light':300,
              'medium':500,
              'bold':700,
              'extrabold':900
            }
        }
  },
  plugins: [],
}

