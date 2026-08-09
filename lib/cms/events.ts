import { strapiFind, strapiMediaUrl } from '@/lib/strapi';
import { StrapiMedia } from '@/lib/cms/types';

export type Event = {
    slug: string;
    title: string;
    date: string;
    location: string;
    description: string;
    coverImageUrl: string | null;
};

type RawEvent = {
    slug: string;
    title: string;
    date: string;
    location: string;
    description: string;
    coverImage: StrapiMedia | null;
};

function mapEvent(raw: RawEvent): Event {
    return {
        slug: raw.slug,
        title: raw.title,
        date: raw.date,
        location: raw.location,
        description: raw.description,
        coverImageUrl: strapiMediaUrl(raw.coverImage?.url),
    };
}

export async function getEvents(): Promise<Event[]> {
    const items = await strapiFind<RawEvent>('/events?populate=coverImage&sort=date:asc');
    return items.map(mapEvent);
}

export async function getUpcomingEvents(limit = 3): Promise<Event[]> {
    const events = await getEvents();
    const today = new Date().toISOString().slice(0, 10);
    return events.filter((event) => event.date >= today).slice(0, limit);
}
