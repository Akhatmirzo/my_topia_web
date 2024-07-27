/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      backgroundImage: {
        'burger-pattern': "url('./assets/burger.png')",
        'chicken-pattern': "url('./assets/chicken.png')",
        'doner-pattern': "url('./assets/doner.png')",
        'drinks-pattern': "url('./assets/drinks.png')",
        'lunchbox-pattern': "url('./assets/lunchbox.png')",
        'pizza-pattern': "url('./assets/pizza.png')",
        'salats-pattern': "url('./assets/salats.png')",
        'sweets-pattern': "url('./assets/sweets.png')",
        'product-pattern': "url('./assets/product-rectangle.png')"
      }
    },
    screens: {
      '2xl': {'max': '1535px'},
      // => @media (max-width: 1535px) { ... }

      'xl': {'max': '1279px'},
      // => @media (max-width: 1279px) { ... }

      'lg': {'max': '991px'},
      // => @media (max-width: 1023px) { ... }

      'md': {'max': '767px'},
      // => @media (max-width: 767px) { ... }

      'mysm': {'max': '540px'},

      'sm': {'max': '479px'},
      // => @media (max-width: 479px) { ... }
      
      'esm': {'max': '379px'},
      // => @media (max-width: 379px) { ... }
    }
  },
  plugins: [],
}