import { strapiFind, strapiMediaUrl } from '@/lib/strapi';
import { StrapiMedia } from '@/lib/cms/types';

export type Certification = {
    title: string;
    issuer: string;
    year: number;
    imageUrl: string | null;
};

type RawCertification = {
    title: string;
    issuer: string;
    year: number;
    image: StrapiMedia | null;
};

export async function getCertifications(): Promise<Certification[]> {
    const items = await strapiFind<RawCertification>('/certifications?populate=image&sort=year:desc');
    return items.map((raw) => ({
        title: raw.title,
        issuer: raw.issuer,
        year: raw.year,
        imageUrl: strapiMediaUrl(raw.image?.url),
    }));
}
