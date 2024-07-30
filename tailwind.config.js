/** @type {import('tailwindcss').Config} */
const flowbite = require("flowbite-react/tailwind");
module.exports = {
  content: ["./src/**/*.{html,js,jsx}", flowbite.content()],
  theme: {
    extend: {
      backgroundImage: {
        "burger-pattern": "url('./assets/burger.png')",
        "chicken-pattern": "url('./assets/chicken.png')",
        "doner-pattern": "url('./assets/doner.png')",
        "drinks-pattern": "url('./assets/drinks.png')",
        "lunchbox-pattern": "url('./assets/lunchbox.png')",
        "pizza-pattern": "url('./assets/pizza.png')",
        "salats-pattern": "url('./assets/salats.png')",
        "sweets-pattern": "url('./assets/sweets.png')",
        "product-pattern": "url('./assets/product-rectangle.png')",
      },
    },
    screens: {
      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }

      mysm: { max: "540px" },

      esm: { max: "379px" },
      // => @media (max-width: 379px) { ... }
    },
  },
  plugins: [
    // ...
    flowbite.plugin(),
  ],
};
