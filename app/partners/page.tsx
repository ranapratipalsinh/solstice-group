import { getPartners } from '@/lib/cms/partners';

export const dynamic = 'force-dynamic';

export default async function PartnersPage() {
    const partners = await getPartners();

    return (
        <div className="container py-16">
            <div className="rounded-[2rem] bg-white p-6 shadow-sm sm:p-10">
                <p className="text-sm uppercase tracking-[0.3em] text-solstice-700">Partners & Clients</p>
                <h1 className="mt-4 font-display text-3xl font-semibold text-slate-950 sm:text-4xl">Businesses we work with</h1>
                {partners.length === 0 ? (
                    <p className="mt-10 text-slate-600">Partner and client logos will appear here once added in the CMS.</p>
                ) : (
                    <div className="mt-10 grid gap-6 sm:grid-cols-3 lg:grid-cols-4">
                        {partners.map((partner) => (
                            <a
                                key={partner.name}
                                href={partner.websiteUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="flex flex-col items-center gap-3 rounded-3xl border border-slate-200 bg-slate-50 p-6 text-center transition hover:-translate-y-1 hover:shadow-lg"
                            >
                                {partner.logoUrl && (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img src={partner.logoUrl} alt={partner.name} className="h-14 w-full object-contain" />
                                )}
                                <p className="text-sm font-semibold text-slate-800">{partner.name}</p>
                            </a>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
