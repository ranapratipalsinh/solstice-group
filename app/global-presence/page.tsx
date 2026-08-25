import type { Metadata } from 'next';
import { getRegions } from '@/lib/cms/regions';
import { PageHeader } from '@/components/PageHeader';
import { ScrollReveal } from '@/components/ScrollReveal';
import { WorldMapPresence } from '@/components/WorldMapPresence';
import { RegionChips } from '@/components/RegionChips';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: 'Global Presence | Solstice Group',
    description: 'Where Solstice Group and its subsidiary companies operate, including headquarters and international markets.',
};

export default async function GlobalPresencePage() {
    const regions = await getRegions();

    return (
        <div>
            <PageHeader
                eyebrow="Global Presence"
                title="Where we operate"
                description="Solstice Group's headquarters and the international markets our subsidiary companies serve."
            />

            <section className="relative overflow-hidden bg-solstice-950 py-16 text-white sm:py-24">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(15,156,99,0.25),transparent_60%)]" />
                <div className="container relative">
                    <ScrollReveal className="mb-14">
                        <WorldMapPresence regions={regions} />
                    </ScrollReveal>
                    <ScrollReveal>
                        <RegionChips regions={regions} />
                    </ScrollReveal>
                </div>
            </section>
        </div>
    );
}
