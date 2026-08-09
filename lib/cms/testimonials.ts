import { strapiFind, strapiMediaUrl } from '@/lib/strapi';
import { StrapiMedia } from '@/lib/cms/types';

export type Testimonial = {
    clientName: string;
    clientCompany: string;
    quote: string;
    photoUrl: string | null;
};

type RawTestimonial = {
    clientName: string;
    clientCompany: string;
    quote: string;
    photo: StrapiMedia | null;
};

export async function getTestimonials(): Promise<Testimonial[]> {
    const items = await strapiFind<RawTestimonial>('/testimonials?populate=photo');
    return items.map((raw) => ({
        clientName: raw.clientName,
        clientCompany: raw.clientCompany,
        quote: raw.quote,
        photoUrl: strapiMediaUrl(raw.photo?.url),
    }));
}
