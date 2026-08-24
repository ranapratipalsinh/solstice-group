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
    whoWeAreHeading: string;
    whoWeAreBody: string;
    impactCardHeading: string;
};

type RawHomePage = {
    heroHeading: string;
    heroSubheading: string;
    visionStatement: string;
    stats: Stat[];
    heroSlides: StrapiMedia[];
    heroVideo: StrapiMedia | null;
    whoWeAreHeading: string | null;
    whoWeAreBody: string | null;
    impactCardHeading: string | null;
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
        whoWeAreHeading: raw.whoWeAreHeading ?? '',
        whoWeAreBody: raw.whoWeAreBody ?? '',
        impactCardHeading: raw.impactCardHeading ?? '',
    };
}

export type ValueIcon = 'handshake' | 'award' | 'lightbulb' | 'users' | 'leaf' | 'sparkles';
export type GroupValue = { title: string; description: string; icon: ValueIcon };

export type Milestone = { title: string; description: string };

export type AboutPage = {
    mission: string;
    vision: string;
    groupHistory: string;
    founderStory: string;
    founderPhotoUrl: string | null;
    values: GroupValue[];
    sustainabilityEnvironment: string;
    sustainabilitySocial: string;
    sustainabilityGovernance: string;
    timeline: Milestone[];
    founderTeaser: string;
    leadershipTeaser: string;
};

type RawAboutPage = {
    mission: string;
    vision: string;
    groupHistory: string;
    founderStory: string;
    founderPhoto: StrapiMedia | null;
    values: GroupValue[] | null;
    sustainabilityEnvironment: string | null;
    sustainabilitySocial: string | null;
    sustainabilityGovernance: string | null;
    timeline: Milestone[] | null;
    founderTeaser: string | null;
    leadershipTeaser: string | null;
};

export async function getAboutPage(): Promise<AboutPage | null> {
    const raw = await strapiFindOne<RawAboutPage>('/about-page?populate=founderPhoto,values,timeline');
    if (!raw) return null;
    return {
        mission: raw.mission,
        vision: raw.vision,
        groupHistory: raw.groupHistory,
        founderStory: raw.founderStory,
        founderPhotoUrl: strapiMediaUrl(raw.founderPhoto?.url),
        values: raw.values ?? [],
        sustainabilityEnvironment: raw.sustainabilityEnvironment ?? '',
        sustainabilitySocial: raw.sustainabilitySocial ?? '',
        sustainabilityGovernance: raw.sustainabilityGovernance ?? '',
        timeline: raw.timeline ?? [],
        founderTeaser: raw.founderTeaser ?? '',
        leadershipTeaser: raw.leadershipTeaser ?? '',
    };
}
