import { getGalleryItems } from '@/lib/cms/gallery';
import { ScrollReveal } from '@/components/ScrollReveal';

export const dynamic = 'force-dynamic';

export default async function GalleryPage() {
    const items = await getGalleryItems();

    return (
        <div className="container py-16">
            <div className="rounded-[2rem] bg-white p-6 shadow-sm sm:p-10">
                <p className="text-sm uppercase tracking-[0.3em] text-solstice-700">Gallery</p>
                <h1 className="mt-4 font-display text-3xl font-semibold text-slate-950 sm:text-4xl">Photos & videos from Solstice Group</h1>
                {items.length === 0 ? (
                    <p className="mt-10 text-slate-600">Gallery items will appear here once added in the CMS.</p>
                ) : (
                    <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {items.map((item, index) => (
                            <ScrollReveal key={`${item.caption}-${index}`} delayMs={((index % 3) + 1) * 200}>
                                <figure className="overflow-hidden rounded-3xl bg-slate-50 shadow-sm">
                                    {item.mediaUrl && (
                                        // eslint-disable-next-line @next/next/no-img-element
                                        <img src={item.mediaUrl} alt={item.caption} className="h-56 w-full object-cover" />
                                    )}
                                    <figcaption className="p-4 text-sm text-slate-600">{item.caption}</figcaption>
                                </figure>
                            </ScrollReveal>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
