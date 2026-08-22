import type { Core } from '@strapi/strapi';

const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Middlewares => [
  'strapi::logger',
  'strapi::errors',
  'strapi::security',
  {
    name: 'strapi::cors',
    config: {
      // Wide-open (`*`) by default is fine for a public read-mostly API, but
      // this also fronts create-only endpoints (contact-submissions), so we
      // scope it to the known frontend origins instead. FRONTEND_URL lets a
      // future custom domain be added via env without a code change.
      origin: [
        'http://localhost:3000',
        'https://solstice-group.onrender.com',
        env('FRONTEND_URL'),
      ].filter(Boolean),
    },
  },
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];

export default config;
