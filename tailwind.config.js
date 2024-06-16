/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      tropical: "#93AD1E",
      tropical_light: "#EEF1E3",
    },
  },
  plugins: ["flowbite/plugin"],
};
