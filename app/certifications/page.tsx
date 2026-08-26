import type { Metadata } from 'next';
import { getCertifications } from '@/lib/cms/certifications';
import { InfiniteSlider } from '@/components/ui/infinite-slider';
import { ImageWithFallback } from '@/components/ImageWithFallback';
import { PageHeader } from '@/components/PageHeader';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: 'Certifications & Awards | Solstice Group',
    description: 'The certifications and registrations held by Solstice Group and its subsidiary companies.',
};

export default async function CertificationsPage() {
    const certifications = await getCertifications();

    return (
        <div>
            <PageHeader eyebrow="Certifications & Awards" title="Recognized for quality and trust" />

            <section className="bg-white py-16 dark:bg-solstice-950 sm:py-20">
                {certifications.length === 0 ? (
                    <div className="container">
                        <p className="text-center text-slate-600 dark:text-slate-400">Certifications and awards will appear here once added in the CMS.</p>
                    </div>
                ) : (
                    <InfiniteSlider gap={64} speed={30} speedOnHover={10} className="py-2">
                        {certifications.map((item) => (
                            <div
                                key={`${item.title}-${item.year}`}
                                className="flex w-40 shrink-0 flex-col items-center gap-3 text-center"
                            >
                                <div className="flex h-20 w-full items-center justify-center rounded-xl bg-white p-3 shadow-sm ring-1 ring-slate-100 transition-shadow hover:shadow-md dark:ring-white/10">
                                    <ImageWithFallback
                                        src={item.imageUrl}
                                        alt={item.title}
                                        className="h-14 w-auto object-contain opacity-80 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
                                        fallback={
                                            <span className="text-lg font-bold text-slate-400">{item.title}</span>
                                        }
                                    />
                                </div>
                                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500 dark:text-slate-400">
                                    {item.title}
                                    {(item.issuer || item.year) && (
                                        <span className="mt-0.5 block font-normal tracking-normal text-slate-400 dark:text-slate-500">
                                            {[item.issuer, item.year].filter(Boolean).join(' · ')}
                                        </span>
                                    )}
                                </p>
                            </div>
                        ))}
                    </InfiniteSlider>
                )}
            </section>
        </div>
    );
}
