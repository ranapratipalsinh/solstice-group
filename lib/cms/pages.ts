import { strapiFindOne, strapiMediaUrl } from '@/lib/strapi';
import { StrapiMedia } from '@/lib/cms/types';

export type Stat = { value: string; label: string };

export type HomePage = {
    heroHeading: string;
    heroSubheading: string;
    visionStatement: string;
    stats: Stat[];
    heroSlideUrls: string[];
    heroVideoUrl: string | null;
};

type RawHomePage = {
    heroHeading: string;
    heroSubheading: string;
    visionStatement: string;
    stats: Stat[];
    heroSlides: StrapiMedia[];
    heroVideo: StrapiMedia | null;
};

export async function getHomePage(): Promise<HomePage | null> {
    const raw = await strapiFindOne<RawHomePage>('/home-page?populate=heroSlides,heroVideo');
    if (!raw) return null;
    return {
        heroHeading: raw.heroHeading,
        heroSubheading: raw.heroSubheading,
        visionStatement: raw.visionStatement,
        stats: raw.stats ?? [],
        heroSlideUrls: (raw.heroSlides || []).map((slide) => strapiMediaUrl(slide.url)).filter((url): url is string => Boolean(url)),
        heroVideoUrl: strapiMediaUrl(raw.heroVideo?.url),
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
