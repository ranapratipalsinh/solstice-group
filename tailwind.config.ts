import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './app/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['var(--font-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
                display: ['var(--font-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
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
                },
                gold: {
                    50: '#fbf3dc',
                    100: '#f5e4b0',
                    200: '#edd183',
                    300: '#e4bd5c',
                    400: '#d9ab42',
                    500: '#c89730',
                    600: '#a87a22',
                    700: '#8a621b',
                    800: '#6e4e16',
                    900: '#5a3f12'
                },
                border: 'hsl(var(--border))',
                input: 'hsl(var(--input))',
                ring: 'hsl(var(--ring))',
                background: 'hsl(var(--background))',
                foreground: 'hsl(var(--foreground))',
                primary: {
                    DEFAULT: 'hsl(var(--primary))',
                    foreground: 'hsl(var(--primary-foreground))'
                },
                secondary: {
                    DEFAULT: 'hsl(var(--secondary))',
                    foreground: 'hsl(var(--secondary-foreground))'
                },
                destructive: {
                    DEFAULT: 'hsl(var(--destructive))',
                    foreground: 'hsl(var(--destructive-foreground))'
                },
                muted: {
                    DEFAULT: 'hsl(var(--muted))',
                    foreground: 'hsl(var(--muted-foreground))'
                },
                accent: {
                    DEFAULT: 'hsl(var(--accent))',
                    foreground: 'hsl(var(--accent-foreground))'
                },
                popover: {
                    DEFAULT: 'hsl(var(--popover))',
                    foreground: 'hsl(var(--popover-foreground))'
                },
                card: {
                    DEFAULT: 'hsl(var(--card))',
                    foreground: 'hsl(var(--card-foreground))'
                }
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)'
            }
        }
    },
    plugins: [],
};

export default config;
