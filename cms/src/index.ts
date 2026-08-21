const READ_ONLY_APIS = [
  'company',
  'team-member',
  'job-opening',
  'blog-post',
  'gallery-item',
  'testimonial',
  'certification',
  'partner',
  'industry',
  'region',
  'event',
];

const SINGLE_TYPE_APIS = ['home-page', 'about-page', 'csr-page', 'site-setting'];

const SEED_COMPANIES = [
  {
    name: 'Solbath Global Private Limited',
    slug: 'solbath-global-private-limited',
    tagline: 'Premium bath and wellness solutions for modern living.',
    description:
      'Solbath Global Private Limited delivers curated bathroom products, personal care essentials, and sustainable wellbeing collections for homes and hospitality.',
    services: ['Bath accessories', 'Wellness kits', 'Luxury toiletries', 'Retail distribution'],
    headquarters: 'Ahmedabad, Gujarat',
    contactEmail: 'hello@solsticebath.com',
    contactPhone: '+91 98765 43210',
    website: 'https://solsticebath.example.com',
    order: 1,
  },
  {
    name: 'Solstice Spices',
    slug: 'solstice-spices',
    tagline: 'Authentic spices and food ingredients sourced responsibly.',
    description:
      'Solstice Spices sources premium herbs, spices and culinary ingredients for traders, restaurants, and retail markets worldwide.',
    services: ['Spice sourcing', 'Export trading', 'Food ingredient supply', 'Custom spice blends'],
    headquarters: 'Surat, Gujarat',
    contactEmail: 'contact@solsticespices.com',
    contactPhone: '+91 91234 56789',
    website: 'https://solsticespices.example.com',
    order: 2,
  },
  {
    name: 'GTC Solstice Import Export',
    slug: 'gtc-solstice-import-export',
    tagline: 'Global trade and logistics for cross-border business growth.',
    description:
      'GTC Solstice Import Export manages international sourcing, customs support and logistics solutions for industrial and retail customers.',
    services: ['Import-export services', 'Customs clearance', 'Logistics coordination', 'Trade consulting'],
    headquarters: 'Mumbai, Maharashtra',
    contactEmail: 'trade@gtcsolstice.com',
    contactPhone: '+91 99876 54321',
    website: 'https://gtcsolstice.example.com',
    order: 3,
  },
  {
    name: 'Solstice Event',
    slug: 'solstice-event',
    tagline: 'Event planning, production and experiential brand activations.',
    description:
      'Solstice Event delivers corporate events, brand launches, exhibitions and end-to-end event management with a creative corporate edge.',
    services: ['Corporate events', 'Brand experiences', 'Exhibition services', 'Event logistics'],
    headquarters: 'Vadodara, Gujarat',
    contactEmail: 'events@solsticeevent.com',
    contactPhone: '+91 90123 45678',
    website: 'https://solsticeevent.example.com',
    order: 4,
  },
];

const SEED_INDUSTRIES = [
  {
    title: 'Import Export',
    description: 'Trade and logistics solutions spanning commodities, retail goods, and custom import-export services.',
  },
  {
    title: 'Spices & Ingredients',
    description: 'Premium food ingredients and spice sourcing for domestic and international culinary markets.',
  },
  {
    title: 'Events & Experiences',
    description: 'Corporate events, exhibitions, and live brand activations with end-to-end execution.',
  },
  {
    title: 'Bath & Wellness',
    description: 'Curated wellness products and premium bathroom collections for modern homes.',
  },
];

const SEED_REGIONS = [
  { name: 'India', isHeadquarters: true, order: 1 },
  { name: 'UAE', isHeadquarters: false, order: 2 },
  { name: 'Africa', isHeadquarters: false, order: 3 },
  { name: 'Asia', isHeadquarters: false, order: 4 },
];

const SEED_EVENTS = [
  {
    title: 'Solstice GTS Annual Trade Expo',
    slug: 'solstice-gts-annual-trade-expo',
    date: '2026-09-18',
    location: 'Ahmedabad, Gujarat',
    description: 'An exhibition showcasing Solstice Group subsidiaries and their products to trade partners and distributors.',
  },
  {
    title: 'Global Import-Export Business Summit',
    slug: 'global-import-export-business-summit',
    date: '2026-10-05',
    location: 'Mumbai, Maharashtra',
    description: 'A summit connecting GTC Solstice Import Export with international sourcing and logistics partners.',
  },
  {
    title: 'Solstice Spices Product Launch',
    slug: 'solstice-spices-product-launch',
    date: '2026-11-12',
    location: 'Surat, Gujarat',
    description: 'Launch event introducing new custom spice blends from Solstice Spices to retail and export buyers.',
  },
];

const SEED_HOME_PAGE = {
  heroHeading: 'Solstice Group of Companies',
  heroSubheading: 'We Build Businesses That Grow Globally',
  visionStatement:
    'Solstice Group unites specialized businesses under a single parent identity. Our mission is to create high-value services and trusted corporate experiences for customers, partners and communities.',
  stats: [
    { value: '5+', label: 'Companies' },
    { value: '100+', label: 'Clients' },
    { value: '10+', label: 'Countries' },
  ],
};

async function setPublicPermissions(strapi: any) {
  const publicRole = await strapi
    .query('plugin::users-permissions.role')
    .findOne({ where: { type: 'public' } });

  if (!publicRole) return;

  const actions = [
    ...READ_ONLY_APIS.flatMap((api) => [`api::${api}.${api}.find`, `api::${api}.${api}.findOne`]),
    ...SINGLE_TYPE_APIS.map((api) => `api::${api}.${api}.find`),
  ];

  for (const action of actions) {
    const existing = await strapi
      .query('plugin::users-permissions.permission')
      .findOne({ where: { action, role: publicRole.id } });

    if (!existing) {
      await strapi.query('plugin::users-permissions.permission').create({
        data: { action, role: publicRole.id },
      });
    }
  }
}

async function seedCompanies(strapi: any) {
  const existing = await strapi.documents('api::company.company').findMany({ limit: 1 });
  if (existing.length > 0) return;

  for (const company of SEED_COMPANIES) {
    await strapi.documents('api::company.company').create({ data: company, status: 'published' });
  }
}

async function seedIndustries(strapi: any) {
  const existing = await strapi.documents('api::industry.industry').findMany({ limit: 1 });
  if (existing.length > 0) return;

  for (const industry of SEED_INDUSTRIES) {
    await strapi.documents('api::industry.industry').create({ data: industry, status: 'published' });
  }
}

async function seedRegions(strapi: any) {
  const existing = await strapi.documents('api::region.region').findMany({ limit: 1 });
  if (existing.length > 0) return;

  for (const region of SEED_REGIONS) {
    await strapi.documents('api::region.region').create({ data: region, status: 'published' });
  }
}

async function seedEvents(strapi: any) {
  const existing = await strapi.documents('api::event.event').findMany({ limit: 1 });
  if (existing.length > 0) return;

  for (const event of SEED_EVENTS) {
    await strapi.documents('api::event.event').create({ data: event, status: 'published' });
  }
}

async function seedHomePage(strapi: any) {
  const existing = await strapi.documents('api::home-page.home-page').findFirst();
  if (existing) return;

  await strapi.documents('api::home-page.home-page').create({ data: SEED_HOME_PAGE, status: 'published' });
}

export default {
  register() {},

  async bootstrap({ strapi }: { strapi: any }) {
    await setPublicPermissions(strapi);
    await seedCompanies(strapi);
    await seedIndustries(strapi);
    await seedRegions(strapi);
    await seedEvents(strapi);
    await seedHomePage(strapi);
  },
};
