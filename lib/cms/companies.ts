import { strapiFind, strapiFindOne, strapiMediaUrl } from '@/lib/strapi';
import { StrapiMedia } from '@/lib/cms/types';

export type Company = {
    slug: string;
    name: string;
    tagline: string;
    description: string;
    services: string[];
    headquarters: string;
    contactEmail: string;
    contactPhone: string;
    website: string;
    logoUrl: string | null;
};

type RawCompany = {
    slug: string;
    name: string;
    tagline: string;
    description: string;
    services: string[];
    headquarters: string;
    contactEmail: string;
    contactPhone: string;
    website: string;
    logo: StrapiMedia | null;
};

function mapCompany(raw: RawCompany): Company {
    return {
        slug: raw.slug,
        name: raw.name,
        tagline: raw.tagline,
        description: raw.description,
        services: raw.services ?? [],
        headquarters: raw.headquarters,
        contactEmail: raw.contactEmail,
        contactPhone: raw.contactPhone,
        website: raw.website,
        logoUrl: strapiMediaUrl(raw.logo?.url),
    };
}

export async function getCompanies(): Promise<Company[]> {
    const items = await strapiFind<RawCompany>('/companies?populate=logo&sort=order:asc');
    return items.map(mapCompany);
}

export async function getCompanyBySlug(slug: string): Promise<Company | null> {
    const items = await strapiFind<RawCompany>(
        `/companies?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=logo`
    );
    return items[0] ? mapCompany(items[0]) : null;
}
