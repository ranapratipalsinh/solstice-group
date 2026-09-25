const READ_ONLY_APIS = [
  'company',
  'team-member',
  'gallery-item',
  'certification',
  'partner',
  'industry',
  'region',
  'event',
];

const SINGLE_TYPE_APIS = [
  'home-page',
  'about-page',
  'site-setting',
  'site-copy',
  'privacy-policy',
  'terms-and-conditions',
  'cookie-policy',
];

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

// The final "Contact" section on each legal page is intentionally NOT part
// of these seeds - it's rendered by the frontend using the live email/address
// from Site Settings, so it can never drift out of sync with that source of
// truth. Only the substantive policy sections live here.
const SEED_PRIVACY_POLICY = {
  lastUpdated: 'Last updated: 2026',
  sections: [
    {
      title: '1. Introduction',
      description:
        'Solstice Group ("we", "us", "our") respects your privacy. This policy explains what information we collect through this website, how we use it, and the choices you have.',
    },
    {
      title: '2. Information We Collect',
      description:
        'We collect information you voluntarily provide through our contact and enquiry forms, such as your name, company, email address, phone number, and the content of your message. We do not knowingly collect sensitive personal information through this site.',
    },
    {
      title: '3. How We Use Your Information',
      description:
        'We use the information you submit solely to respond to your enquiry, evaluate business or partnership requests, and communicate with you about the subject of your message. We do not sell your personal information to third parties.',
    },
    {
      title: '4. Data Retention',
      description:
        'We retain enquiry submissions only as long as reasonably necessary to address your request and for our legitimate business record-keeping.',
    },
    {
      title: '5. Your Rights',
      description:
        'You may request access to, correction of, or deletion of the personal information you have submitted to us by contacting us using the details below.',
    },
  ],
};

const SEED_TERMS_AND_CONDITIONS = {
  lastUpdated: 'Last updated: 2026',
  sections: [
    {
      title: '1. Acceptance of Terms',
      description: 'By accessing this website, you agree to be bound by these terms. If you do not agree, please do not use this site.',
    },
    {
      title: '2. Use of Content',
      description:
        'All text, images, logos, and other content on this website belong to Solstice Group and its subsidiary companies unless otherwise noted. You may not reproduce, distribute, or use this content commercially without our written permission.',
    },
    {
      title: '3. No Warranty',
      description:
        'This website and its content are provided "as is". While we aim to keep information accurate and current, we make no warranty as to its completeness or accuracy.',
    },
    {
      title: '4. Enquiries and Business Dealings',
      description:
        'Submitting an enquiry through this website does not create a binding business relationship. Any commercial arrangement with Solstice Group or its subsidiary companies is subject to a separate written agreement.',
    },
    {
      title: '5. Changes to These Terms',
      description:
        'We may update these terms from time to time. Continued use of the website after changes are posted constitutes acceptance of the revised terms.',
    },
  ],
};

const SEED_COOKIE_POLICY = {
  lastUpdated: 'Last updated: 2026',
  sections: [
    {
      title: '1. What Are Cookies',
      description: 'Cookies are small text files stored on your device that help websites function correctly and remember your preferences.',
    },
    {
      title: '2. How We Use Cookies and Similar Technology',
      description:
        "This website does not use advertising or third-party tracking cookies. It stores your light/dark theme preference in your browser's local storage, a similar technology to cookies, purely so the site remembers your choice between visits.",
    },
    {
      title: '3. Managing This Data',
      description:
        "You can clear your browser's local storage and cookies through your browser settings at any time. Doing so may reset your theme preference but will not affect your ability to browse the site.",
    },
  ],
};

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

async function seedPrivacyPolicy(strapi: any) {
  const existing = await strapi.documents('api::privacy-policy.privacy-policy').findFirst();
  if (existing) return;

  await strapi.documents('api::privacy-policy.privacy-policy').create({ data: SEED_PRIVACY_POLICY, status: 'published' });
}

async function seedTermsAndConditions(strapi: any) {
  const existing = await strapi.documents('api::terms-and-conditions.terms-and-conditions').findFirst();
  if (existing) return;

  await strapi
    .documents('api::terms-and-conditions.terms-and-conditions')
    .create({ data: SEED_TERMS_AND_CONDITIONS, status: 'published' });
}

async function seedCookiePolicy(strapi: any) {
  const existing = await strapi.documents('api::cookie-policy.cookie-policy').findFirst();
  if (existing) return;

  await strapi.documents('api::cookie-policy.cookie-policy').create({ data: SEED_COOKIE_POLICY, status: 'published' });
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
    await seedPrivacyPolicy(strapi);
    await seedTermsAndConditions(strapi);
    await seedCookiePolicy(strapi);
  },
};
