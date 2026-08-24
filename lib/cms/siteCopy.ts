import { strapiFindOne } from '@/lib/strapi';

export type EnquiryType = { label: string; value: string };

export type SiteCopy = {
    companiesHeroEyebrow: string;
    companiesHeroTitle: string;
    companiesHeroDescription: string;
    companyCtaHeading: string;
    companyCtaDescription: string;
    galleryTitle: string;
    galleryDescription: string;
    contactFormHeading: string;
    contactFormDescription: string;
    enquiryTypes: EnquiryType[];
};

type RawSiteCopy = {
    companiesHeroEyebrow: string | null;
    companiesHeroTitle: string | null;
    companiesHeroDescription: string | null;
    companyCtaHeading: string | null;
    companyCtaDescription: string | null;
    galleryTitle: string | null;
    galleryDescription: string | null;
    contactFormHeading: string | null;
    contactFormDescription: string | null;
    enquiryTypes: EnquiryType[] | null;
};

const fallback: SiteCopy = {
    companiesHeroEyebrow: 'Our Companies',
    companiesHeroTitle: 'Subsidiaries under Solstice Group',
    companiesHeroDescription: 'Explore the businesses that operate under the Solstice Group umbrella, each with its own focus and expertise.',
    companyCtaHeading: "Let's Build Something Together",
    companyCtaDescription: 'Get in touch to learn more about this company or explore a partnership with Solstice Group.',
    galleryTitle: 'Photos & Videos from Solstice Group',
    galleryDescription: 'Drag to explore, click to expand.',
    contactFormHeading: 'Send us a message',
    contactFormDescription: 'Send us a message and we will reply within 2 business days.',
    enquiryTypes: [
        { label: 'Business Partnership', value: 'business-partnership' },
        { label: 'Product Enquiry', value: 'product-enquiry' },
        { label: 'Import / Export', value: 'import-export' },
        { label: 'Events', value: 'events' },
        { label: 'General Enquiry', value: 'general' },
    ],
};

export async function getSiteCopy(): Promise<SiteCopy> {
    try {
        const raw = await strapiFindOne<RawSiteCopy>('/site-copy?populate=enquiryTypes');
        if (!raw) return fallback;
        return {
            companiesHeroEyebrow: raw.companiesHeroEyebrow || fallback.companiesHeroEyebrow,
            companiesHeroTitle: raw.companiesHeroTitle || fallback.companiesHeroTitle,
            companiesHeroDescription: raw.companiesHeroDescription || fallback.companiesHeroDescription,
            companyCtaHeading: raw.companyCtaHeading || fallback.companyCtaHeading,
            companyCtaDescription: raw.companyCtaDescription || fallback.companyCtaDescription,
            galleryTitle: raw.galleryTitle || fallback.galleryTitle,
            galleryDescription: raw.galleryDescription || fallback.galleryDescription,
            contactFormHeading: raw.contactFormHeading || fallback.contactFormHeading,
            contactFormDescription: raw.contactFormDescription || fallback.contactFormDescription,
            enquiryTypes: raw.enquiryTypes?.length ? raw.enquiryTypes : fallback.enquiryTypes,
        };
    } catch {
        return fallback;
    }
}
