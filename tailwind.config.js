/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
  content: [],
  theme: {
    extend: {
          colors: {
              primaryBlue: '#3786FB',
              lightBlue: '#E5F1FF',
              greyFontColor: '#525567',
              darkFontColor: '#101828',
              darkTheme1: '#041C32',
              darkTheme2: '#04293A',
              darkTheme3: '#064663',
              darkTheme4: '#011f38',
              darkThemeTextLight: '#6a82ad',
          },
          screens: {
              'xs': '480px',
              'sm': '640px',
              // => @media (min-width: 640px) { ... }

              'md': '768px',
              // => @media (min-width: 768px) { ... }

              'lg': '1024px',
              // => @media (min-width: 1024px) { ... }

              'xl': '1280px',
              // => @media (min-width: 1280px) { ... }

              '2xl': '1536px',
              // => @media (min-width: 1536px) { ... }
          },
          boxShadow: {
              'auth-form-shadow-1': '10px 10px 10px #d1d9e6, -10px -10px 10px #f9f9f9',
              'auth-form-shadow-2': '4px 4px 10px #d1d9e6, -4px -4px 10px #f9f9f9'
              // Add your custom shadow as a new utility class
          },
    },
  },
  plugins: [],
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './pages/**/*.{js,jsx,ts,tsx}'],
}

