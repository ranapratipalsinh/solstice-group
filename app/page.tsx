import Link from 'next/link';
import { Ship, Factory, CalendarDays, Compass, Layers, Handshake, BadgeCheck, Workflow, MapPin, Building2 } from 'lucide-react';
import { getCompanies } from '@/lib/cms/companies';
import { getHomePage } from '@/lib/cms/pages';
import { getRegions } from '@/lib/cms/regions';
import { getTeamMembers } from '@/lib/cms/team';
import { getPartners } from '@/lib/cms/partners';
import { CompanyLinearCards } from '@/components/CompanyLinearCards';
import { ScrollReveal } from '@/components/ScrollReveal';
import { HeroSlider } from '@/components/HeroSlider';
import { FeatureCard } from '@/components/FeatureCard';
import { CountUpStat } from '@/components/CountUpStat';
import { InfiniteSlider } from '@/components/ui/infinite-slider';
import { ImageWithFallback } from '@/components/ImageWithFallback';

export const dynamic = 'force-dynamic';

const GROUP_SERVICES = [
    {
        icon: Ship,
        title: 'Import & Export Solutions',
        description: 'End-to-end trade facilitation connecting global markets with reliable logistics and compliance.',
    },
    {
        icon: Factory,
        title: 'Product Manufacturing & Supply',
        description: 'Consistent, quality-controlled production scaled to meet growing demand across our subsidiaries.',
    },
    {
        icon: CalendarDays,
        title: 'Event Management',
        description: 'Full-service planning and execution for corporate events, exhibitions, and brand experiences.',
    },
    {
        icon: Compass,
        title: 'Business Guidance',
        description: 'Strategic support in governance, operations, and growth planning for every venture under the group.',
    },
];

const WHY_CHOOSE_US = [
    {
        icon: Layers,
        title: 'Multi-Industry Expertise',
        description: 'Deep operational knowledge spanning trade, wellness, food, and events under one trusted group.',
    },
    {
        icon: Handshake,
        title: 'Trusted Business Network',
        description: 'Long-standing relationships with partners, suppliers, and clients across multiple regions.',
    },
    {
        icon: BadgeCheck,
        title: 'Quality Products',
        description: 'Rigorous quality standards backed by certifications and consistent process discipline.',
    },
    {
        icon: Workflow,
        title: 'End-to-End Solutions',
        description: "From sourcing to delivery, we manage the full lifecycle so you don't have to.",
    },
];

const DEFAULT_STATS = [
    { value: '5+', label: 'Companies' },
    { value: '100+', label: 'Clients' },
    { value: '10+', label: 'Countries' },
];

const WHATSAPP_NUMBER = '919876543210';

const DEFAULT_VISION_STATEMENT =
    'We grow by putting the same operational discipline behind every venture we take on — so a client working with any Solstice Group company gets the reliability of the whole group behind them.';

export default async function HomePage() {
    const [companies, homePage, regions, leaders, partners] = await Promise.all([
        getCompanies(),
        getHomePage(),
        getRegions(),
        getTeamMembers(),
        getPartners(),
    ]);

    const stats = homePage?.stats?.length ? homePage.stats : DEFAULT_STATS;
    const visionStatement = homePage?.visionStatement || DEFAULT_VISION_STATEMENT;
    const leadershipPreview = leaders.slice(0, 4);

    return (
        <div>
            {/* 1. Hero */}
            <section className="relative flex min-h-screen items-center overflow-hidden py-24 text-white">
                <HeroSlider images={homePage?.heroSlideUrls ?? []} />
                <div className="absolute inset-0 bg-gradient-to-r from-solstice-800/90 via-solstice-800/50 to-transparent" />
                <div className="container relative z-10">
                    <div className="max-w-xl rounded-3xl border border-white/10 bg-black/10 p-8 text-left shadow-2xl backdrop-blur-sm sm:p-12">
                        <p
                            className="animate-fade-in-up break-words text-xs font-semibold uppercase tracking-normal text-solstice-300 sm:text-sm sm:tracking-[0.35em]"
                            style={{ animationDelay: '0ms' }}
                        >
                            We Build Businesses That Grow Globally
                        </p>
                        <div className="animate-fade-in-up mt-5 h-px w-16 bg-solstice-400" style={{ animationDelay: '150ms' }} />
                        <h1
                            className="animate-fade-in-up mt-6 font-display text-3xl font-bold leading-tight sm:text-5xl md:text-6xl"
                            style={{ animationDelay: '250ms' }}
                        >
                            <span className="block text-white">Solstice Group</span>
                            <span className="block text-solstice-400">of Companies</span>
                        </h1>
                        <p
                            className="animate-fade-in-up mt-6 text-sm text-solstice-100 sm:text-lg"
                            style={{ animationDelay: '400ms' }}
                        >
                            Import Export&nbsp;|&nbsp;Ceramic&nbsp;|&nbsp;Food&nbsp;|&nbsp;Events
                        </p>
                        <div
                            className="animate-fade-in-up mt-10 flex flex-col items-start gap-3 sm:flex-row sm:gap-4"
                            style={{ animationDelay: '550ms' }}
                        >
                            <Link
                                href="/companies"
                                className="group rounded-full border border-solstice-400 px-8 py-3 text-sm font-semibold text-solstice-300 transition hover:bg-solstice-400 hover:text-solstice-950"
                            >
                                Explore Our Companies
                                <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">→</span>
                            </Link>
                            <Link
                                href="/contact"
                                className="group rounded-full border border-white/50 px-8 py-3 text-sm font-semibold text-white transition hover:bg-white/10 backdrop-blur-sm"
                            >
                                Contact Us
                                <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">→</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Impact banner */}
            <section className="relative overflow-hidden bg-solstice-50 py-16 text-center dark:bg-slate-900 sm:py-20">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(15,156,99,0.08),transparent_60%)]" />
                <div className="container relative">
                    <ScrollReveal>
                        <div className="mx-auto h-px w-16 bg-solstice-400/60" />
                        <h2 className="mt-6 font-display text-4xl font-bold uppercase tracking-wide text-solstice-700 dark:text-solstice-400 sm:text-6xl">
                            We Build Together
                        </h2>
                        <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-400 sm:text-lg">
                            Solstice Group is a diversified business group operating across global trade, ceramic products,
                            food, and event management.
                        </p>
                    </ScrollReveal>
                </div>
            </section>

            {/* 3. Our Companies */}
            <section className="bg-solstice-50/70 py-16 dark:bg-slate-900/60 sm:py-20">
                <div className="container">
                    <ScrollReveal className="text-center">
                        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-solstice-700 dark:text-solstice-400">Our Companies</p>
                        <h2 className="mt-3 font-display text-3xl font-semibold text-slate-950 dark:text-white sm:text-4xl md:text-5xl">
                            A Group Built On Trusted Ventures
                        </h2>
                        <p className="mx-auto mt-4 max-w-2xl text-sm text-slate-600 dark:text-slate-400 sm:text-base">
                            Click a card to explore each subsidiary.
                        </p>
                    </ScrollReveal>
                    <div className="mt-10">
                        <CompanyLinearCards companies={companies} />
                    </div>
                </div>
            </section>

            {/* 4. Services (Group Level) */}
            <section className="bg-slate-50 py-16 dark:bg-slate-900 sm:py-20">
                <div className="container">
                    <ScrollReveal className="text-center">
                        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-solstice-700 dark:text-solstice-400">What We Do</p>
                        <h2 className="mt-2 font-display text-2xl font-semibold text-slate-950 dark:text-white sm:text-3xl">Group-level services</h2>
                        <p className="mx-auto mt-3 max-w-xl text-sm text-slate-500 dark:text-slate-400">Hover a card for more.</p>
                    </ScrollReveal>
                    <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                        {GROUP_SERVICES.map((service, index) => (
                            <ScrollReveal key={service.title} delayMs={(index + 1) * 150}>
                                <FeatureCard icon={service.icon} title={service.title} description={service.description} />
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* 6. Global Presence */}
            <section className="relative overflow-hidden bg-solstice-950 py-16 text-white sm:py-24">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(15,156,99,0.18),transparent_60%)]" />
                <div className="container relative">
                    <ScrollReveal className="text-center">
                        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-solstice-400">Global Presence</p>
                        <h2 className="mt-2 font-display text-3xl font-semibold sm:text-4xl">Where we operate</h2>
                    </ScrollReveal>
                    <div className="mt-12 flex flex-wrap justify-center gap-4">
                        {regions.map((region, index) => (
                            <ScrollReveal key={region.name} delayMs={(index + 1) * 150}>
                                {region.isHeadquarters ? (
                                    <div className="flex flex-col items-center gap-2 rounded-2xl bg-solstice-400 px-8 py-4 font-semibold text-solstice-950 shadow-[0_0_25px_rgba(93,210,156,0.35)] transition-transform hover:scale-105">
                                        <Building2 className="h-6 w-6" strokeWidth={1.75} />
                                        {region.name}
                                        <span className="mt-1 text-[10px] uppercase tracking-widest opacity-80">Headquarters</span>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-8 py-4 font-semibold text-white transition-colors hover:border-solstice-400/50 hover:bg-white/10">
                                        <MapPin className="h-6 w-6 text-solstice-400" strokeWidth={1.75} />
                                        {region.name}
                                    </div>
                                )}
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* 7. Why Choose Us */}
            <section className="bg-slate-50 py-16 dark:bg-slate-900 sm:py-20">
                <div className="container">
                    <ScrollReveal className="text-center">
                        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-solstice-700 dark:text-solstice-400">Why Choose Us</p>
                        <h2 className="mt-2 font-display text-2xl font-semibold text-slate-950 dark:text-white sm:text-3xl">A group built on trust and reach</h2>
                        <p className="mx-auto mt-3 max-w-xl text-sm text-slate-500 dark:text-slate-400">Hover a card for more.</p>
                    </ScrollReveal>
                    <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                        {WHY_CHOOSE_US.map((reason, index) => (
                            <ScrollReveal key={reason.title} delayMs={(index + 1) * 150}>
                                <FeatureCard icon={reason.icon} title={reason.title} description={reason.description} tone="tint" />
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* 8. Group Stats */}
            <section className="border-y border-slate-100 bg-white py-12 dark:border-slate-800 dark:bg-slate-950">
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

            {/* 9. Vision & Growth */}
            <section className="relative overflow-hidden bg-white py-16 dark:bg-slate-950 sm:py-24">
                <div className="container">
                    <div className="flex flex-col items-center gap-14 lg:flex-row">
                        <ScrollReveal className="w-full lg:w-1/2">
                            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-solstice-700 dark:text-solstice-400">Our Vision</p>
                            <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-slate-950 dark:text-white sm:text-4xl">
                                Built for <span className="italic text-solstice-600 dark:text-solstice-400">growth</span> that lasts.
                            </h2>
                            <p className="mt-6 max-w-lg text-base leading-8 text-slate-600 dark:text-slate-400 sm:text-lg">
                                {visionStatement}
                            </p>
                            <Link
                                href="/about"
                                className="group mt-8 inline-flex items-center rounded-full bg-solstice-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-solstice-600"
                            >
                                Read more
                                <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">→</span>
                            </Link>
                        </ScrollReveal>
                        <ScrollReveal className="w-full lg:w-1/2" delayMs={200}>
                            <div className="relative h-[380px] overflow-hidden rounded-3xl shadow-2xl">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src="/hero/city-skyline-night.jpg"
                                    alt="Solstice Group growth and expansion"
                                    className="h-full w-full object-cover"
                                />
                                <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-white/20 bg-white/80 p-6 shadow-lg backdrop-blur-md dark:border-white/10 dark:bg-slate-900/80">
                                    <h3 className="text-lg font-bold text-slate-950 dark:text-white">Group-Wide Standards</h3>
                                    <p className="mt-1 text-sm text-slate-700 dark:text-slate-300">
                                        The same operational discipline and governance across every subsidiary.
                                    </p>
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* Leadership */}
            <section className="bg-slate-50 py-16 dark:bg-slate-900 sm:py-24">
                <div className="container">
                    <ScrollReveal className="text-center">
                        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-solstice-700 dark:text-solstice-400">Leadership</p>
                        <h2 className="mt-2 font-display text-2xl font-semibold text-slate-950 dark:text-white sm:text-3xl">The people behind the group</h2>
                        <div className="mx-auto mt-5 h-1 w-16 rounded-full bg-solstice-400" />
                    </ScrollReveal>
                    {leadershipPreview.length === 0 ? (
                        <p className="mt-10 text-center text-slate-600 dark:text-slate-400">Leadership profiles will appear here once added in the CMS.</p>
                    ) : (
                        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                            {leadershipPreview.map((member, index) => {
                                const initials = member.name
                                    .split(' ')
                                    .map((word) => word[0])
                                    .slice(0, 2)
                                    .join('');

                                return (
                                    <ScrollReveal key={member.name} delayMs={(index + 1) * 150}>
                                        <div className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-xl dark:border-slate-800 dark:bg-slate-800">
                                            <div className="relative h-56 overflow-hidden bg-solstice-50 dark:bg-solstice-500/10">
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
                                            <div className="p-5">
                                                <h3 className="font-semibold text-slate-950 dark:text-white">{member.name}</h3>
                                                <p className="mt-1 text-xs font-medium uppercase tracking-[0.15em] text-solstice-600 dark:text-solstice-400">{member.role}</p>
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
            <section className="overflow-hidden border-t border-slate-100 bg-white py-16 dark:border-slate-800 dark:bg-slate-950">
                <div className="container mb-8">
                    <h3 className="font-display text-2xl font-semibold text-slate-950 dark:text-white">Partner Brands</h3>
                </div>
                {partners.length === 0 ? (
                    <p className="container text-slate-600 dark:text-slate-400">Partner logos will appear here once added in the CMS.</p>
                ) : (
                    <InfiniteSlider gap={64} speed={30} speedOnHover={10} className="py-2">
                        {partners.map((partner) => (
                            <div key={partner.name} className="flex h-16 w-40 shrink-0 items-center justify-center">
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

            {/* 10. CTA */}
            <section className="bg-white py-14 dark:bg-slate-950 sm:py-16">
                <div className="container">
                    <ScrollReveal>
                        <div className="relative overflow-hidden rounded-[2rem] bg-solstice-600 px-8 py-14 text-center text-white sm:px-16 sm:py-16">
                            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.12),transparent_55%)]" />
                            <h2 className="relative font-display text-2xl font-semibold sm:text-3xl">Start Your Business Journey With Us</h2>
                            <div className="relative mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
                                <Link
                                    href="/contact"
                                    className="group w-full rounded-full bg-white px-8 py-3 text-sm font-semibold text-solstice-700 transition hover:bg-solstice-50 sm:w-auto"
                                >
                                    Get Consultation
                                    <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">→</span>
                                </Link>
                                <a
                                    href={`https://wa.me/${WHATSAPP_NUMBER}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex w-full items-center justify-center gap-2 rounded-full border border-white/50 px-8 py-3 text-sm font-semibold text-white transition hover:bg-white/10 sm:w-auto"
                                >
                                    <svg viewBox="0 0 32 32" fill="currentColor" className="h-5 w-5" aria-hidden="true">
                                        <path d="M16.001 3C9.096 3 3.5 8.596 3.5 15.5c0 2.316.63 4.484 1.727 6.35L3 29l7.32-2.184A12.44 12.44 0 0 0 16.001 28C22.906 28 28.5 22.404 28.5 15.5S22.906 3 16.001 3Zm0 22.7a10.16 10.16 0 0 1-5.19-1.42l-.372-.222-4.345 1.297 1.318-4.235-.243-.387A10.14 10.14 0 0 1 5.8 15.5c0-5.633 4.568-10.2 10.201-10.2 5.632 0 10.2 4.567 10.2 10.2 0 5.633-4.568 10.2-10.2 10.2Zm5.593-7.634c-.306-.153-1.81-.893-2.09-.995-.28-.102-.484-.153-.688.154-.204.306-.789.994-.967 1.199-.178.204-.357.23-.663.077-.306-.154-1.293-.477-2.464-1.522-.911-.812-1.526-1.816-1.705-2.122-.178-.306-.019-.472.135-.624.138-.138.306-.357.459-.536.153-.178.204-.306.306-.51.102-.204.051-.383-.026-.536-.077-.153-.688-1.658-.943-2.27-.248-.596-.5-.515-.688-.524-.178-.009-.382-.011-.586-.011-.204 0-.536.077-.816.383-.28.306-1.069 1.045-1.069 2.55 0 1.505 1.094 2.959 1.246 3.163.153.204 2.152 3.287 5.214 4.607.728.314 1.296.502 1.739.642.731.232 1.395.199 1.921.121.586-.088 1.81-.74 2.065-1.454.255-.715.255-1.327.178-1.454-.076-.128-.28-.204-.586-.357Z" />
                                    </svg>
                                    WhatsApp
                                </a>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </section>
        </div>
    );
}
