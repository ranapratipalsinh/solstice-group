import { getGalleryItems, GalleryItem } from '@/lib/cms/gallery';
import InteractiveImageBentoGallery from '@/components/ui/bento-gallery';

export const dynamic = 'force-dynamic';

const SPAN_PATTERN = [
    'md:col-span-2 md:row-span-2',
    'md:row-span-1',
    'md:row-span-1',
    'md:row-span-2',
    'md:row-span-1',
    'md:col-span-2 md:row-span-1',
];

export default async function GalleryPage() {
    const items = await getGalleryItems();
    const withMedia = items.filter((item): item is GalleryItem & { mediaUrl: string } => Boolean(item.mediaUrl));

    return (
        <div className="w-full antialiased">
            {withMedia.length === 0 ? (
                <div className="bg-white py-16 dark:bg-solstice-950 sm:py-24">
                    <div className="container text-center">
                        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-solstice-700 dark:text-solstice-400">Gallery</p>
                        <p className="mt-4 text-slate-600 dark:text-slate-400">Gallery items will appear here once added in the CMS.</p>
                    </div>
                </div>
            ) : (
                <InteractiveImageBentoGallery
                    imageItems={withMedia.map((item, index) => ({
                        id: index,
                        title: item.caption,
                        desc: item.category,
                        url: item.mediaUrl,
                        span: SPAN_PATTERN[index % SPAN_PATTERN.length],
                    }))}
                    title="Photos & Videos from Solstice Group"
                    description="Drag to explore, click to expand."
                />
            )}
        </div>
    );
}
