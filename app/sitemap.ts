import type { MetadataRoute } from 'next';
import { getCompanies } from '@/lib/cms/companies';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://solstice-group.onrender.com';

const STATIC_ROUTES = [
    '',
    '/about',
    '/companies',
    '/industries',
    '/projects',
    '/global-presence',
    '/leadership',
    '/founder-message',
    '/gallery',
    '/certifications',
    '/partners',
    '/contact',
    '/privacy-policy',
    '/terms-and-conditions',
    '/cookie-policy',
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const companies = await getCompanies().catch(() => []);
    const companySlugs = companies.map((c) => c.slug);

    const routes = [...STATIC_ROUTES, ...companySlugs.map((slug) => `/companies/${slug}`)];

    return routes.map((route) => ({
        url: `${SITE_URL}${route}`,
        lastModified: new Date(),
    }));
}
