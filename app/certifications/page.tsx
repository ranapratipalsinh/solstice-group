import { getCertifications } from '@/lib/cms/certifications';

export const dynamic = 'force-dynamic';

export default async function CertificationsPage() {
    const certifications = await getCertifications();

    return (
        <div className="container py-16">
            <div className="rounded-[2rem] bg-white p-6 shadow-sm sm:p-10">
                <p className="text-sm uppercase tracking-[0.3em] text-solstice-700">Certifications & Awards</p>
                <h1 className="mt-4 font-display text-3xl font-semibold text-slate-950 sm:text-4xl">Recognized for quality and trust</h1>
                {certifications.length === 0 ? (
                    <p className="mt-10 text-slate-600">Certifications and awards will appear here once added in the CMS.</p>
                ) : (
                    <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {certifications.map((item) => (
                            <div key={`${item.title}-${item.year}`} className="rounded-3xl border border-slate-200 bg-slate-50 p-7 text-center">
                                {item.imageUrl && (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img src={item.imageUrl} alt={item.title} className="mx-auto h-20 w-20 object-contain" />
                                )}
                                <h2 className="mt-4 text-lg font-semibold text-slate-950">{item.title}</h2>
                                <p className="mt-1 text-sm text-slate-600">{item.issuer}</p>
                                <p className="mt-1 text-xs uppercase tracking-[0.2em] text-solstice-700">{item.year}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
