import { strapiFind, strapiMediaUrl } from '@/lib/strapi';
import { StrapiMedia } from '@/lib/cms/types';

export type Event = {
    slug: string;
    title: string;
    date: string;
    location: string;
    description: string;
    coverImageUrl: string | null;
    companySlug: string | null;
    companyName: string | null;
};

type RawEvent = {
    slug: string;
    title: string;
    date: string;
    location: string;
    description: string;
    coverImage: StrapiMedia | null;
    company: { slug: string; name: string } | null;
};

function mapEvent(raw: RawEvent): Event {
    return {
        slug: raw.slug,
        title: raw.title,
        date: raw.date,
        location: raw.location,
        description: raw.description,
        coverImageUrl: strapiMediaUrl(raw.coverImage?.url),
        companySlug: raw.company?.slug ?? null,
        companyName: raw.company?.name ?? null,
    };
}

export async function getEvents(): Promise<Event[]> {
    const items = await strapiFind<RawEvent>('/events?populate=coverImage,company&sort=date:asc');
    return items.map(mapEvent);
}

export async function getEventsByCompanySlug(companySlug: string): Promise<Event[]> {
    const events = await getEvents();
    return events.filter((event) => event.companySlug === companySlug);
}
