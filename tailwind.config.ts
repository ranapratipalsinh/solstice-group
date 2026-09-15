import type { Config } from 'tailwindcss';

const config: Config = {
    darkMode: 'class',
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
                // Solstice brand scale. Deliberately reuses a small set of
                // named brand colours (see BRAND_COLOR_SYSTEM.md) across
                // adjacent steps rather than a unique hex per step, per the
                // "avoid colour overload" requirement of the theme spec.
                solstice: {
                    50: '#E6F7F0', // Light Green section background
                    100: '#D1F0E3', // Soft Green accent/tint
                    200: '#D1F0E3', // Soft Green (borders/rings)
                    300: '#FFFFFF', // Brightest hover state on permanent dark-green bands
                    400: '#D1F0E3', // Soft Green (dark-mode links/accents)
                    500: '#00864D', // Primary (focus rings, small accent dots)
                    600: '#00864D', // Primary (eyebrow labels)
                    700: '#00864D', // Primary (CTA background, primary links/text)
                    800: '#006F40', // Primary Hover / Dark Green (CTA hover, dark-mode cards, footer)
                    900: '#00864D', // Dark mode main background (dark:-prefixed only)
                    950: '#00864D'  // Strong-emphasis band (Hero/PageHeader bg, always-on-brand sections)
                },
                // Tinted neutrals: same numeric scale apps already use
                // (slate-50..950), but the values are brand-tinted greens
                // instead of Tailwind's default blue-grays. Each step is a
                // flat, mode-invariant value (standard Tailwind behaviour) -
                // callers pair a light-appropriate step with an explicit
                // dark:-prefixed step where the two need to differ, exactly
                // like the rest of this codebase already does. A step must
                // NEVER be a CSS variable that itself changes under .dark:
                // that silently recolors any element using the bare class
                // with no dark: variant, which is not what "no dark:
                // override" is supposed to mean.
                slate: {
                    50: '#F7FAF9',
                    100: '#F7FAF9',
                    200: '#DDE9E4', // light-mode card/section border
                    300: '#EAF7F1', // light text on a permanent dark-green band (both modes)
                    400: '#EAF7F1', // dark-mode body text (paired with text-slate-600 in light)
                    500: '#71827B', // light-mode muted text
                    600: '#4F625A', // light-mode body text
                    700: '#4F625A', // light-mode label/link text
                    800: '#4DBD8D', // dark-mode divider/card border
                    900: '#123B2B',
                    950: '#123B2B'
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
