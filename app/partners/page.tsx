import { getPartners } from '@/lib/cms/partners';
import { PartnersStagger } from '@/components/PartnersStagger';

export const dynamic = 'force-dynamic';

export default async function PartnersPage() {
    const partners = await getPartners();

    return (
        <div className="py-16">
            <div className="container">
                <p className="text-sm uppercase tracking-[0.3em] text-solstice-700">Partners & Clients</p>
                <h1 className="mt-4 font-display text-3xl font-semibold text-slate-950 sm:text-4xl">Businesses we work with</h1>
                {partners.length === 0 && (
                    <p className="mt-10 text-slate-600">Partner and client logos will appear here once added in the CMS.</p>
                )}
                <p className="mt-4 max-w-xl text-sm text-slate-500">
                    Click through a card to cycle, or select the centered one to visit their website.
                </p>
            </div>
            <PartnersStagger partners={partners} />
        </div>
    );
}
