import { strapiFindOne, strapiMediaUrl } from '@/lib/strapi';
import { StrapiMedia } from '@/lib/cms/types';

export type SocialLink = { platform: string; url: string };

export type SiteSettings = {
    officeAddress: string;
    groupEmail: string;
    groupPhone: string;
    socialLinks: SocialLink[];
    logoUrl: string | null;
    legalEntityName: string;
    whatsappNumber: string;
    whatsappDefaultMessage: string;
};

type RawSiteSettings = {
    officeAddress: string;
    groupEmail: string;
    groupPhone: string;
    socialLinks: SocialLink[];
    logo: StrapiMedia | null;
    legalEntityName: string | null;
    whatsappNumber: string | null;
    whatsappDefaultMessage: string | null;
};

const fallback: SiteSettings = {
    officeAddress: 'Ahmedabad, Gujarat, India',
    groupEmail: 'info@solsticegroup.com',
    groupPhone: '+91 98765 43210',
    socialLinks: [],
    logoUrl: null,
    legalEntityName: 'Solstice Trading International LLP',
    whatsappNumber: '',
    whatsappDefaultMessage: "Hi, I'm interested in Solstice Group's products/services.",
};

export async function getSiteSettings(): Promise<SiteSettings> {
    try {
        const raw = await strapiFindOne<RawSiteSettings>('/site-setting?populate=logo,socialLinks');
        if (!raw) return fallback;
        return {
            officeAddress: raw.officeAddress,
            groupEmail: raw.groupEmail,
            groupPhone: raw.groupPhone,
            socialLinks: raw.socialLinks ?? [],
            logoUrl: strapiMediaUrl(raw.logo?.url),
            legalEntityName: raw.legalEntityName || fallback.legalEntityName,
            whatsappNumber: raw.whatsappNumber || fallback.whatsappNumber,
            whatsappDefaultMessage: raw.whatsappDefaultMessage || fallback.whatsappDefaultMessage,
        };
    } catch {
        return fallback;
    }
}
