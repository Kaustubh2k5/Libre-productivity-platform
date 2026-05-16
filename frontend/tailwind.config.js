export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        primary: "#e60000",
        background: "#0f172a",

        glass: {
          light: "rgba(255, 255, 255, 0.1)",
          border: "rgba(255, 255, 255, 0.2)",
        },
      },

      backdropBlur: {
        xs: "2px",
      },

      boxShadow: {
        glass: "0 10px 30px rgba(0,0,0,0.2)",
        glow: "0 0 20px rgba(255,255,255,0.15)",
      },

      letterSpacing: {
        widePlus: "0.2em",
      },

      transitionTimingFunction: {
        smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
    },
  },

  plugins: [],
};
