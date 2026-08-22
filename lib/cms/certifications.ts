import { strapiFind, strapiMediaUrl } from '@/lib/strapi';
import { StrapiMedia } from '@/lib/cms/types';

export type Certification = {
    title: string;
    issuer: string;
    year: number;
    imageUrl: string | null;
    companySlug: string | null;
};

type RawCertification = {
    title: string;
    issuer: string;
    year: number;
    image: StrapiMedia | null;
    company: { slug: string } | null;
};

export async function getCertifications(): Promise<Certification[]> {
    const items = await strapiFind<RawCertification>('/certifications?populate=image,company&sort=year:desc');
    return items.map((raw) => ({
        title: raw.title,
        issuer: raw.issuer,
        year: raw.year,
        imageUrl: strapiMediaUrl(raw.image?.url),
        companySlug: raw.company?.slug ?? null,
    }));
}

export async function getCertificationsByCompanySlug(companySlug: string): Promise<Certification[]> {
    const certifications = await getCertifications();
    return certifications.filter((cert) => cert.companySlug === companySlug);
}
