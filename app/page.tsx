import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowDown } from 'lucide-react';
import { getCompanies } from '@/lib/cms/companies';
import { getHomePage, getAboutPage } from '@/lib/cms/pages';
import { getRegions } from '@/lib/cms/regions';
import { getTeamMembers } from '@/lib/cms/team';
import { getPartners } from '@/lib/cms/partners';
import { getCertifications } from '@/lib/cms/certifications';
import { getIndustries } from '@/lib/cms/industries';
import { ScrollReveal } from '@/components/ScrollReveal';
import { HeroSlider } from '@/components/HeroSlider';
import { CountUpStat } from '@/components/CountUpStat';
import { InfiniteSlider } from '@/components/ui/infinite-slider';
import { ImageWithFallback } from '@/components/ImageWithFallback';
import { WorldMapPresence } from '@/components/WorldMapPresence';
import { RegionChips } from '@/components/RegionChips';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: 'Solstice Group | Building Businesses. Creating Global Impact.',
    description:
        'Solstice Group is a diversified business group operating across international trade, spices manufacturing, bathware, and events through specialized companies.',
};

const DEFAULT_STATS = [
    { value: '5+', label: 'Companies' },
    { value: '100+', label: 'Clients' },
    { value: '10+', label: 'Countries' },
];

const DEFAULT_HERO_HEADING = 'Building Businesses. Creating Global Impact.';
const DEFAULT_HERO_SUBHEADING =
    'Solstice Group operates across multiple business verticals and markets, including international trade, manufacturing, sourcing, and supply chain management, through a family of specialized companies.';
const DEFAULT_VISION_STATEMENT =
    'We grow by putting the same operational discipline behind every venture we take on, so a client working with any Solstice Group company gets the reliability of the whole group behind them.';
const DEFAULT_WHO_WE_ARE_HEADING = 'A diversified group, built for long-term growth.';
const DEFAULT_WHO_WE_ARE_BODY =
    "Solstice Group is a diversified business group operating through specialized companies across distinct business verticals. Each company operates with its own focus and expertise, while sharing the group's commitment to quality, innovation, trusted partnerships, and sustainable growth, with ambitions that reach international markets.";
const DEFAULT_IMPACT_CARD_HEADING = 'Responsible Growth';

export default async function HomePage() {
    const [companies, homePage, aboutPage, regions, leaders, partners, certifications, industries] = await Promise.all([
        getCompanies(),
        getHomePage(),
        getAboutPage(),
        getRegions(),
        getTeamMembers(),
        getPartners(),
        getCertifications(),
        getIndustries(),
    ]);

    const stats = homePage?.stats?.length ? homePage.stats : DEFAULT_STATS;
    const visionStatement = homePage?.visionStatement || DEFAULT_VISION_STATEMENT;
    const heroSubheading = homePage?.heroSubheading || DEFAULT_HERO_SUBHEADING;
    const heroHeading = homePage?.heroHeading || DEFAULT_HERO_HEADING;
    const heroHeadingWords = heroHeading.trim().split(/\s+/);
    const heroHeadingLead = heroHeadingWords.slice(0, -1).join(' ');
    const heroHeadingAccent = heroHeadingWords.slice(-1)[0] ?? '';
    const leadershipPreview = leaders.slice(0, 4);
    const whoWeAreHeading = homePage?.whoWeAreHeading || DEFAULT_WHO_WE_ARE_HEADING;
    const whoWeAreBody = homePage?.whoWeAreBody || DEFAULT_WHO_WE_ARE_BODY;
    const impactCardHeading = homePage?.impactCardHeading || DEFAULT_IMPACT_CARD_HEADING;
    const impactCardBody = aboutPage?.sustainabilityEnvironment || '';

    const groupSnapshot = [
        { value: String(companies.length), label: 'Companies' },
        { value: String(industries.length), label: 'Business Verticals' },
        { value: String(regions.length), label: 'Markets Served' },
    ].filter((item) => Number(item.value) > 0);

    return (
        <div>
            {/* Hero */}
            <section className="relative flex min-h-[600px] items-center justify-center overflow-hidden md:min-h-screen">
                <HeroSlider images={homePage?.heroSlideUrls ?? []} videoUrl={homePage?.heroVideoUrl} />
                <div className="absolute inset-0 bg-gradient-to-r from-solstice-950/85 via-solstice-950/55 to-solstice-950/20" />
                <div className="container relative z-10">
                    <div className="mx-auto w-full max-w-3xl p-8 text-center sm:p-12 md:ml-0 md:w-auto md:max-w-2xl md:px-6 md:py-16 md:text-left">
                        <h1 className="animate-fade-in-up font-display text-4xl font-bold leading-tight tracking-tight text-white drop-shadow-md sm:text-5xl md:text-6xl">
                            {heroHeadingLead && <span className="block">{heroHeadingLead}</span>}
                            <span className="block text-solstice-400">{heroHeadingAccent}</span>
                        </h1>
                        <p
                            className="animate-fade-in-up mx-auto mt-4 max-w-2xl text-lg font-light text-white/90 drop-shadow sm:text-xl md:mx-0"
                            style={{ animationDelay: '150ms' }}
                        >
                            {heroSubheading}
                        </p>
                        <div
                            className="animate-fade-in-up mt-10 flex flex-col justify-center gap-4 sm:flex-row md:justify-start"
                            style={{ animationDelay: '300ms' }}
                        >
                            <Link
                                href="/companies"
                                className="inline-flex items-center justify-center rounded-full border border-transparent bg-solstice-700 px-8 py-3 text-base font-medium text-white shadow-lg transition-colors hover:bg-solstice-500"
                            >
                                Explore Our Companies
                            </Link>
                            <Link
                                href="/about"
                                className="inline-flex items-center justify-center rounded-full border border-white/50 bg-white/10 px-8 py-3 text-base font-medium text-white shadow-lg backdrop-blur-sm transition-colors hover:bg-white/20"
                            >
                                About Solstice Group
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Who We Are */}
            <section className="bg-white py-24 dark:bg-solstice-950">
                <div className="container">
                    <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
                        <ScrollReveal>
                            <p className="text-sm font-bold uppercase tracking-wider text-solstice-600 dark:text-solstice-400">Who We Are</p>
                            <h2 className="mt-3 font-display text-3xl font-bold text-solstice-800 dark:text-white md:text-4xl">
                                {whoWeAreHeading}
                            </h2>
                            <p className="mt-6 max-w-xl leading-8 text-slate-600 dark:text-slate-400">{whoWeAreBody}</p>
                            <Link
                                href="/about"
                                className="mt-8 inline-flex items-center rounded-full bg-solstice-700 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-solstice-500"
                            >
                                Learn more about the group →
                            </Link>
                        </ScrollReveal>
                        {groupSnapshot.length > 0 && (
                            <ScrollReveal delayMs={150}>
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                                    {groupSnapshot.map((item) => (
                                        <div
                                            key={item.label}
                                            className="rounded-3xl border border-solstice-100 bg-solstice-50 p-6 text-center dark:border-slate-700/60 dark:bg-solstice-900"
                                        >
                                            <p className="font-display text-4xl font-bold text-solstice-600 dark:text-solstice-400">{item.value}</p>
                                            <p className="mt-2 text-xs font-semibold uppercase tracking-[0.15em] text-slate-600 dark:text-slate-400">
                                                {item.label}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </ScrollReveal>
                        )}
                    </div>
                </div>
            </section>

            {/* Our Business Ecosystem */}
            <section className="bg-white py-24 dark:bg-solstice-950">
                <div className="container">
                    <ScrollReveal className="text-center">
                        <p className="text-sm font-bold uppercase tracking-wider text-solstice-600 dark:text-solstice-400">Group Structure</p>
                        <h2 className="mt-3 font-display text-3xl font-bold text-solstice-800 dark:text-white md:text-4xl">Our Business Ecosystem</h2>
                    </ScrollReveal>
                    <div className="mt-14 flex flex-col items-center">
                        <ScrollReveal>
                            <div className="rounded-2xl bg-solstice-700 px-8 py-4 text-center font-display text-lg font-bold text-white shadow-lg">
                                Solstice Group
                            </div>
                        </ScrollReveal>
                        <ArrowDown className="my-4 h-6 w-6 text-solstice-400" strokeWidth={1.75} aria-hidden="true" />
                        <div className="grid w-full max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4">
                            {companies.map((company, index) => (
                                <ScrollReveal key={company.slug} delayMs={(index + 1) * 120}>
                                    <Link
                                        href={`/companies/${company.slug}`}
                                        className="flex h-full items-center justify-center rounded-2xl border border-solstice-200 bg-solstice-50 px-4 py-5 text-center text-sm font-semibold text-solstice-800 shadow-sm transition-all hover:-translate-y-1 hover:border-solstice-400 hover:shadow-md dark:border-slate-700/60 dark:bg-solstice-900 dark:text-white"
                                    >
                                        {company.name}
                                    </Link>
                                </ScrollReveal>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Global Presence */}
            <section className="relative overflow-hidden bg-solstice-950 py-16 text-white sm:py-24">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(15,156,99,0.25),transparent_60%)]" />
                <div className="container relative">
                    <ScrollReveal className="text-center">
                        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-solstice-400">Global Presence</p>
                        <h2 className="mt-2 font-display text-3xl font-semibold sm:text-4xl md:text-5xl">Where we operate</h2>
                    </ScrollReveal>
                    <div className="mt-12">
                        <WorldMapPresence regions={regions} />
                    </div>
                    <div className="mt-12">
                        <RegionChips regions={regions} />
                    </div>
                    <div className="mt-10 text-center">
                        <Link href="/global-presence" className="text-sm font-semibold text-solstice-400 hover:text-solstice-300">
                            View full global presence →
                        </Link>
                    </div>
                </div>
            </section>

            {/* Impact Stats Bar */}
            <section className="border-y border-slate-100 bg-white py-12 dark:border-slate-800 dark:bg-solstice-950">
                <div className="container max-w-5xl">
                    <div className="grid grid-cols-1 gap-4 divide-y divide-slate-100 text-center sm:grid-cols-3 sm:divide-x sm:divide-y-0 dark:divide-slate-800">
                        {stats.map((stat, index) => (
                            <ScrollReveal key={stat.label} delayMs={(index + 1) * 150}>
                                <CountUpStat value={stat.value} label={stat.label} variant="bar" />
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Sustainability & Impact */}
            <section className="relative overflow-hidden bg-white py-24 dark:bg-solstice-950">
                <div className="container">
                    <div className="flex flex-col items-center gap-16 lg:flex-row">
                        <ScrollReveal className="w-full lg:w-1/2">
                            <h2 className="font-display text-4xl font-bold leading-tight text-solstice-800 dark:text-white md:text-5xl">
                                Sustainability &amp;
                                <br />
                                <span className="font-light italic text-solstice-500 dark:text-solstice-400">Impact</span>
                            </h2>
                            <p className="mt-6 max-w-lg text-lg leading-8 text-slate-600 dark:text-slate-400">{visionStatement}</p>
                            <Link
                                href="/about#sustainability"
                                className="group mt-8 inline-flex items-center rounded-full bg-solstice-700 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-solstice-500"
                            >
                                Read more
                                <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">→</span>
                            </Link>
                        </ScrollReveal>
                        <ScrollReveal className="w-full lg:w-1/2" delayMs={200}>
                            <div className="relative h-[400px] overflow-hidden rounded-3xl shadow-2xl">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src="/hero/city-skyline-night.jpg"
                                    alt="Solstice Group operations"
                                    className="h-full w-full object-cover"
                                />
                                {impactCardBody && (
                                    <div className="glass-card absolute bottom-6 left-6 right-6 rounded-2xl p-6">
                                        <h3 className="text-xl font-bold text-solstice-800 dark:text-white">{impactCardHeading}</h3>
                                        <p className="mt-1 text-sm text-slate-700 dark:text-slate-300">{impactCardBody}</p>
                                    </div>
                                )}
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* Leadership */}
            <section className="bg-solstice-50 py-24 dark:bg-solstice-900">
                <div className="container">
                    <ScrollReveal className="text-center">
                        <h2 className="font-display text-3xl font-bold text-solstice-800 dark:text-white md:text-4xl">Leadership</h2>
                        <div className="mx-auto mt-6 h-1 w-24 rounded-full bg-solstice-400" />
                    </ScrollReveal>
                    {leadershipPreview.length === 0 ? (
                        <p className="mt-10 text-center text-slate-600 dark:text-slate-400">Leadership profiles will appear here once added in the CMS.</p>
                    ) : (
                        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                            {leadershipPreview.map((member, index) => {
                                const initials = member.name
                                    .split(' ')
                                    .map((word) => word[0])
                                    .slice(0, 2)
                                    .join('');

                                return (
                                    <ScrollReveal key={member.name} delayMs={(index + 1) * 150}>
                                        <div className="group overflow-hidden rounded-2xl border border-solstice-700/10 bg-white shadow-lg transition-shadow hover:shadow-xl dark:border-slate-700 dark:bg-solstice-800">
                                            <div className="relative h-64 overflow-hidden bg-solstice-50 dark:bg-solstice-500/10">
                                                <ImageWithFallback
                                                    src={member.photoUrl}
                                                    alt={member.name}
                                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                    fallback={
                                                        <div className="flex h-full w-full items-center justify-center text-4xl font-bold text-solstice-700 dark:text-solstice-400">
                                                            {initials}
                                                        </div>
                                                    }
                                                />
                                            </div>
                                            <div className="bg-gradient-to-b from-white to-solstice-50 p-6 dark:from-slate-800 dark:to-slate-900">
                                                <h4 className="text-xl font-bold text-solstice-800 dark:text-white">{member.name}</h4>
                                                <p className="mt-1 text-sm font-medium text-solstice-600 dark:text-solstice-400">{member.role}</p>
                                            </div>
                                        </div>
                                    </ScrollReveal>
                                );
                            })}
                        </div>
                    )}
                    <div className="mt-10 text-center">
                        <Link href="/leadership" className="text-sm font-semibold text-solstice-700 hover:text-solstice-900 dark:text-solstice-400 dark:hover:text-solstice-300">
                            Meet the full team →
                        </Link>
                    </div>
                </div>
            </section>

            {/* Partner Brands */}
            <section className="overflow-hidden border-t border-slate-100 bg-white py-12 dark:border-slate-800 dark:bg-solstice-950">
                <div className="container mb-6">
                    <h3 className="font-display text-2xl font-bold text-solstice-800 dark:text-white">Partners &amp; Clients</h3>
                </div>
                {partners.length === 0 ? (
                    <p className="container text-slate-600 dark:text-slate-400">Partner logos will appear here once added in the CMS.</p>
                ) : (
                    <InfiniteSlider gap={32} speed={30} speedOnHover={10} className="py-2">
                        {partners.map((partner) => (
                            <div key={partner.name} className="flex h-16 w-28 shrink-0 items-center justify-center">
                                <ImageWithFallback
                                    src={partner.logoUrl}
                                    alt={partner.name}
                                    className="h-10 w-auto object-contain opacity-60 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0 dark:brightness-0 dark:invert dark:opacity-50 dark:hover:opacity-90"
                                    fallback={
                                        <span className="text-lg font-bold text-slate-400 dark:text-slate-600">{partner.name}</span>
                                    }
                                />
                            </div>
                        ))}
                    </InfiniteSlider>
                )}
            </section>

            {/* Certifications & Awards */}
            <section className="overflow-hidden border-t border-slate-100 bg-white py-12 dark:border-slate-800 dark:bg-solstice-950">
                <div className="container mb-6">
                    <h3 className="font-display text-2xl font-bold text-solstice-800 dark:text-white">Certifications &amp; Awards</h3>
                </div>
                {certifications.length === 0 ? (
                    <p className="container text-slate-600 dark:text-slate-400">Certifications and awards will appear here once added in the CMS.</p>
                ) : (
                    <InfiniteSlider gap={32} speed={30} speedOnHover={10} reverse className="py-2">
                        {certifications.map((item) => (
                            <div key={`${item.title}-${item.year}`} className="flex h-16 w-28 shrink-0 items-center justify-center">
                                <ImageWithFallback
                                    src={item.imageUrl}
                                    alt={item.title}
                                    className="h-10 w-auto object-contain opacity-60 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0 dark:brightness-0 dark:invert dark:opacity-50 dark:hover:opacity-90"
                                    fallback={
                                        <span className="text-lg font-bold text-slate-400 dark:text-slate-600">{item.title}</span>
                                    }
                                />
                            </div>
                        ))}
                    </InfiniteSlider>
                )}
            </section>
        </div>
    );
}
