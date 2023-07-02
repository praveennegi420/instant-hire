/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.{html,js,jsx}"],
    theme: {
      fontFamily: {
        hurme: ['Hurme', 'sans-serif']
      },
      extend: {
        colors:{
          bgWhite: "#f6f7fb",
          learnWhite: "#586380",
          termWhite: "#939bb4"
        }
      },
    },
    plugins: [],
  }
  