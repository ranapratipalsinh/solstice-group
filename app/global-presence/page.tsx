import type { Metadata } from 'next';
import { MapPin, Building2 } from 'lucide-react';
import { getRegions } from '@/lib/cms/regions';
import { PageHeader } from '@/components/PageHeader';
import { ScrollReveal } from '@/components/ScrollReveal';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: 'Global Presence | Solstice Group',
    description: 'Where Solstice Group and its subsidiary companies operate — headquarters and international markets.',
};

export default async function GlobalPresencePage() {
    const regions = await getRegions();
    const headquarters = regions.find((region) => region.isHeadquarters);
    const otherMarkets = regions.filter((region) => !region.isHeadquarters);

    return (
        <div>
            <PageHeader
                eyebrow="Global Presence"
                title="Where we operate"
                description="Solstice Group's headquarters and the international markets our subsidiary companies serve."
            />

            <section className="relative overflow-hidden bg-solstice-950 py-16 text-white sm:py-24">
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden opacity-[0.18]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/global/world-map.svg" alt="" aria-hidden="true" className="w-full max-w-none object-contain md:w-3/4" />
                </div>
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(15,156,99,0.25),transparent_60%)]" />
                <div className="container relative">
                    {headquarters && (
                        <ScrollReveal className="mb-14 text-center">
                            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-solstice-400">Headquarters</p>
                            <div className="mt-6 inline-flex flex-col items-center gap-2 rounded-2xl bg-solstice-400 px-10 py-5 font-semibold text-solstice-950 shadow-[0_0_25px_rgba(93,210,156,0.35)]">
                                <Building2 className="h-7 w-7" strokeWidth={1.75} />
                                <span className="text-lg">{headquarters.name}</span>
                            </div>
                        </ScrollReveal>
                    )}

                    {otherMarkets.length > 0 && (
                        <>
                            <ScrollReveal className="mb-8 text-center">
                                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-solstice-400">Markets Served</p>
                                <h2 className="mt-2 font-display text-2xl font-semibold sm:text-3xl">
                                    Reaching {otherMarkets.length} international markets
                                </h2>
                            </ScrollReveal>
                            <div className="flex flex-wrap justify-center gap-4">
                                {otherMarkets.map((region, index) => (
                                    <ScrollReveal key={region.name} delayMs={(index + 1) * 150}>
                                        <div className="flex flex-col items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-8 py-4 font-semibold text-white transition-colors hover:border-solstice-400/50 hover:bg-white/10">
                                            <MapPin className="h-6 w-6 text-solstice-400" strokeWidth={1.75} />
                                            {region.name}
                                        </div>
                                    </ScrollReveal>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </section>
        </div>
    );
}
