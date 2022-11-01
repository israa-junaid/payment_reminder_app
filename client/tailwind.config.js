module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      zIndex: {
        100: "100",
      },
      colors: {
        "custom-yellow": "#CAB81B",
        "custom-green": "#448B43",
        "custom-red": "#8B4343",
        "custom-gray": "#F3F3F3",
        "custom-dashcard": "#282F23",
        "custom-gradient-1": "#7FC243",
        "custom-gradient-2": "#6CB6D2",
      },
      dropShadow: {
        gradient: [
          "0px 0px 20px rgba(108, 182, 210, 0.4)",
          "0px 0px 20px rgba(127, 194, 67, 0.4)",
        ],
        hoverGradient: [
          "0px 0px 5px rgba(108, 182, 210, 0.4)",
          "0px 0px 5px rgba(127, 194, 67, 0.4)",
        ],
      },

      maxHeight: {
        "90%": "90%",
      },
    },
  },
  plugins: [],
};
