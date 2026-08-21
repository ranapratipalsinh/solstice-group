import menuLogo from './extensions/menu-logo.png';
import authLogo from './extensions/auth-logo.png';

// Solstice Group brand green in place of Strapi's default purple. Only the
// primary color tokens are overridden - everything else (neutrals,
// danger/success/warning colors, spacing, typography) stays as Strapi's own
// defaults, since the app merges this into the full theme rather than
// replacing it. Dark values mirror Strapi's own light-vs-dark pattern
// (dark theme uses a lighter shade for primary600 than light theme does,
// for contrast against the dark background) rather than just inverting
// blindly.
const lightThemeOverride = {
  colors: {
    primary100: '#eafbf2',
    primary200: '#c8f3de',
    primary500: '#0f9c63',
    primary600: '#00884d',
    primary700: '#00703f',
    buttonPrimary500: '#0f9c63',
    buttonPrimary600: '#00884d',
  },
};

const darkThemeOverride = {
  colors: {
    primary100: '#032a19',
    primary200: '#06482b',
    primary500: '#2cb87c',
    primary600: '#5dd29c',
    primary700: '#97e6c0',
    buttonPrimary500: '#2cb87c',
    buttonPrimary600: '#5dd29c',
  },
};

export default {
  config: {
    theme: {
      light: lightThemeOverride as any,
      dark: darkThemeOverride as any,
    },
    menu: {
      logo: menuLogo,
    },
    auth: {
      logo: authLogo,
    },
    tutorials: false,
    notifications: {
      releases: false,
    },
    locales: [],
  },
  bootstrap() {},
};
