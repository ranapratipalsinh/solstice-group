import { strapiFind } from '@/lib/strapi';

export type Industry = {
    title: string;
    description: string;
    companySlug: string | null;
};

type RawIndustry = {
    title: string;
    description: string;
    company: { slug: string } | null;
};

export async function getIndustries(): Promise<Industry[]> {
    const items = await strapiFind<RawIndustry>('/industries?populate=company&sort=title:asc');
    return items.map((raw) => ({
        title: raw.title,
        description: raw.description,
        companySlug: raw.company?.slug ?? null,
    }));
}
