import type { Metadata } from 'next';
import { getPartners } from '@/lib/cms/partners';
import { PartnersStagger } from '@/components/PartnersStagger';
import { PageHeader } from '@/components/PageHeader';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: 'Partners & Clients | Solstice Group',
    description: 'The partners and clients Solstice Group and its subsidiary companies work with.',
};

export default async function PartnersPage() {
    const partners = await getPartners();

    return (
        <div>
            <PageHeader
                eyebrow="Partners & Clients"
                title="Businesses we work with"
                description="Click through a card to cycle, or select the centered one to visit their website."
            />

            <section className="bg-white py-16 dark:bg-solstice-950 sm:py-20">
                {partners.length === 0 ? (
                    <div className="container">
                        <p className="text-center text-slate-600 dark:text-slate-400">Partner and client logos will appear here once added in the CMS.</p>
                    </div>
                ) : (
                    <PartnersStagger partners={partners} />
                )}
            </section>
        </div>
    );
}
