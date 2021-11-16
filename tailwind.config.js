module.exports = {
  purge: ['./src/**/*.html','./src/**/*.{js,jsx,ts,tsx}',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "sgga-primary-a": "#002347",
        "sgga-secundary-a": "#003366",
        "sgga-terciary-a": "#003F7D",
        "sgga-primary-b": "#FF5003",
        "sgga-secundary-b": "#FD7702",
        "sgga-terciary-b": "#FF8E00",
      },
    },
    fontFamily: {
      roboto: ["Roboto, sans-serif"]
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
