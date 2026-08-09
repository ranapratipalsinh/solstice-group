import { strapiFind, strapiMediaUrl } from '@/lib/strapi';
import { StrapiMedia } from '@/lib/cms/types';

export type Partner = {
    name: string;
    websiteUrl: string;
    logoUrl: string | null;
};

type RawPartner = {
    name: string;
    websiteUrl: string;
    logo: StrapiMedia | null;
};

export async function getPartners(): Promise<Partner[]> {
    const items = await strapiFind<RawPartner>('/partners?populate=logo&sort=name:asc');
    return items.map((raw) => ({
        name: raw.name,
        websiteUrl: raw.websiteUrl,
        logoUrl: strapiMediaUrl(raw.logo?.url),
    }));
}
