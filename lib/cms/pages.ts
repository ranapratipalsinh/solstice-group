import { strapiFindOne, strapiMediaUrl } from '@/lib/strapi';
import { StrapiMedia } from '@/lib/cms/types';

export type Stat = { value: string; label: string };

export type HomePage = {
    heroHeading: string;
    heroSubheading: string;
    visionStatement: string;
    stats: Stat[];
};

type RawHomePage = {
    heroHeading: string;
    heroSubheading: string;
    visionStatement: string;
    stats: Stat[];
};

export async function getHomePage(): Promise<HomePage | null> {
    const raw = await strapiFindOne<RawHomePage>('/home-page');
    if (!raw) return null;
    return {
        heroHeading: raw.heroHeading,
        heroSubheading: raw.heroSubheading,
        visionStatement: raw.visionStatement,
        stats: raw.stats ?? [],
    };
}

export type AboutPage = {
    mission: string;
    vision: string;
    groupHistory: string;
    founderStory: string;
    founderPhotoUrl: string | null;
};

type RawAboutPage = {
    mission: string;
    vision: string;
    groupHistory: string;
    founderStory: string;
    founderPhoto: StrapiMedia | null;
};

export async function getAboutPage(): Promise<AboutPage | null> {
    const raw = await strapiFindOne<RawAboutPage>('/about-page?populate=founderPhoto');
    if (!raw) return null;
    return {
        mission: raw.mission,
        vision: raw.vision,
        groupHistory: raw.groupHistory,
        founderStory: raw.founderStory,
        founderPhotoUrl: strapiMediaUrl(raw.founderPhoto?.url),
    };
}

export type CsrPage = {
    heading: string;
    body: string;
    imageUrls: string[];
};

type RawCsrPage = {
    heading: string;
    body: string;
    images: StrapiMedia[];
};

export async function getCsrPage(): Promise<CsrPage | null> {
    const raw = await strapiFindOne<RawCsrPage>('/csr-page?populate=images');
    if (!raw) return null;
    return {
        heading: raw.heading,
        body: raw.body,
        imageUrls: (raw.images || []).map((image) => strapiMediaUrl(image.url)).filter((url): url is string => Boolean(url)),
    };
}
