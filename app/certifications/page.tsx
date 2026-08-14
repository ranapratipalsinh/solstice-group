import { getCertifications } from '@/lib/cms/certifications';
import { InfiniteSlider } from '@/components/ui/infinite-slider';

export const dynamic = 'force-dynamic';

export default async function CertificationsPage() {
    const certifications = await getCertifications();

    return (
        <div className="py-16">
            <div className="container">
                <p className="text-sm uppercase tracking-[0.3em] text-solstice-700">Certifications & Awards</p>
                <h1 className="mt-4 font-display text-3xl font-semibold text-slate-950 sm:text-4xl">Recognized for quality and trust</h1>
                {certifications.length === 0 && (
                    <p className="mt-10 text-slate-600">Certifications and awards will appear here once added in the CMS.</p>
                )}
            </div>

            {certifications.length > 0 && (
                <div className="mt-12">
                    <InfiniteSlider gap={32} speed={35} speedOnHover={10} className="py-4">
                        {certifications.map((item) => (
                            <div
                                key={`${item.title}-${item.year}`}
                                className="flex w-52 shrink-0 flex-col items-center rounded-3xl border border-slate-200 bg-slate-50 p-6 text-center"
                            >
                                {item.imageUrl ? (
                                    <div className="flex h-32 w-32 items-center justify-center rounded-2xl bg-white p-4 shadow-sm">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={item.imageUrl} alt={item.title} className="h-full w-full object-contain" />
                                    </div>
                                ) : (
                                    <div className="flex h-32 w-32 items-center justify-center rounded-2xl bg-white text-2xl font-bold text-solstice-700 shadow-sm">
                                        {item.title.slice(0, 2).toUpperCase()}
                                    </div>
                                )}
                                <h2 className="mt-5 text-base font-semibold text-slate-950">{item.title}</h2>
                                <p className="mt-1 text-sm text-slate-600">{item.issuer}</p>
                                <p className="mt-1 text-xs uppercase tracking-[0.2em] text-solstice-700">{item.year}</p>
                            </div>
                        ))}
                    </InfiniteSlider>
                </div>
            )}
        </div>
    );
}
