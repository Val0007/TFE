import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{html,js}'
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors:{
        'body-grey':'rgb(248,244,241)',
        'article-white':'#fff',
        'nav-black':'#28282B'
      },
      fontFamily:{
        Pacifico:"Pacifico",
        Marker:"Permanent Marker",
        rso:"Racing Sans One",
        zeyda:"Zeyada",
        Poppins:"Poppins",
        chomsky:"chomsky"
      },
      fontSize:{
        '8xl':'90px'
      },
      height:{
        '108':'30rem'
      }
    },
  },
  plugins: [],
}
export default config
