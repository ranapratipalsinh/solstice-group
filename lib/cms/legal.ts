import { strapiFindOne } from '@/lib/strapi';

export type LegalSection = { title: string; description: string };

export type LegalPage = {
    lastUpdated: string;
    sections: LegalSection[];
};

type RawLegalPage = {
    lastUpdated: string | null;
    sections: LegalSection[] | null;
};

function mapLegalPage(raw: RawLegalPage | null): LegalPage | null {
    if (!raw) return null;
    return {
        lastUpdated: raw.lastUpdated ?? '',
        sections: raw.sections ?? [],
    };
}

export async function getPrivacyPolicy(): Promise<LegalPage | null> {
    const raw = await strapiFindOne<RawLegalPage>('/privacy-policy?populate=sections');
    return mapLegalPage(raw);
}

export async function getTermsAndConditions(): Promise<LegalPage | null> {
    const raw = await strapiFindOne<RawLegalPage>('/terms-and-conditions?populate=sections');
    return mapLegalPage(raw);
}

export async function getCookiePolicy(): Promise<LegalPage | null> {
    const raw = await strapiFindOne<RawLegalPage>('/cookie-policy?populate=sections');
    return mapLegalPage(raw);
}
