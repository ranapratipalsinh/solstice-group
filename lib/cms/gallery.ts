import { strapiFind, strapiMediaUrl } from '@/lib/strapi';
import { StrapiMedia } from '@/lib/cms/types';

export type GalleryItem = {
    caption: string;
    category: string;
    mediaUrl: string | null;
};

type RawGalleryItem = {
    caption: string;
    category: string;
    media: StrapiMedia | null;
};

export async function getGalleryItems(): Promise<GalleryItem[]> {
    const items = await strapiFind<RawGalleryItem>('/gallery-items?populate=media&sort=createdAt:desc');
    return items.map((raw) => ({
        caption: raw.caption,
        category: raw.category,
        mediaUrl: strapiMediaUrl(raw.media?.url),
    }));
}
