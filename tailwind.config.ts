import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './app/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            fontFamily: {
                display: ['var(--font-playfair)', 'serif'],
            },
            colors: {
                solstice: {
                    50: '#eafbf2',
                    100: '#c8f3de',
                    200: '#97e6c0',
                    300: '#5dd29c',
                    400: '#2cb87c',
                    500: '#0f9c63',
                    600: '#00884d',
                    700: '#00703f',
                    800: '#045a34',
                    900: '#06482b',
                    950: '#032a19'
                }
            }
        }
    },
    plugins: [],
};

export default config;
