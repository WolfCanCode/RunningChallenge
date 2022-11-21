/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        lead: '#212121',
        coronation: '#ECEDEB',
        brick: '#DB5855',
        'deep-purple': '#393762',
        'falu-red': '#7E1B19',
        'tree-green': '#277E19',
      },
      backgroundImage: {
        landing: "url('/img/landing-background.svg')",
        'running1-texture': "url('/img/running-man.svg')",
        'running2-texture': "url('/img/running-man-2.svg')",
      },
      padding: {
        edges: '40px',
      },
    },
  },
  plugins: [],
};
