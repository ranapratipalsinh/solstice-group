import Link from 'next/link';
import { getCompanies } from '@/lib/cms/companies';
import { getHomePage } from '@/lib/cms/pages';
import { getRegions } from '@/lib/cms/regions';
import { CompanyFanShowcase } from '@/components/CompanyFanShowcase';
import { ScrollReveal } from '@/components/ScrollReveal';

export const dynamic = 'force-dynamic';

const GROUP_SERVICES = [
    'Import & Export Solutions',
    'Product Manufacturing & Supply',
    'Event Management',
    'Business Guidance',
];

const WHY_CHOOSE_US = [
    'Multi-Industry Expertise',
    'Trusted Business Network',
    'Quality Products',
    'End-to-End Solutions',
];

const DEFAULT_STATS = [
    { value: '5+', label: 'Companies' },
    { value: '100+', label: 'Clients' },
    { value: '10+', label: 'Countries' },
];

const WHATSAPP_NUMBER = '919876543210';

export default async function HomePage() {
    const [companies, homePage, regions] = await Promise.all([
        getCompanies(),
        getHomePage(),
        getRegions(),
    ]);

    const stats = homePage?.stats?.length ? homePage.stats : DEFAULT_STATS;

    return (
        <div>
            {/* 1. Hero */}
            <section
                className="relative flex min-h-screen items-center overflow-hidden bg-cover bg-center py-24 text-white"
                style={{ backgroundImage: "url('/hero/city-skyline-night.jpg')" }}
            >
                <div className="absolute inset-0 bg-gradient-to-b from-solstice-950/55 via-solstice-950/45 to-solstice-950/60" />
                <div className="absolute inset-0 bg-solstice-950/15 mix-blend-multiply" />
                <div className="container relative z-10 text-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/logos/solstice-group-logo.png" alt="Solstice Group" className="mx-auto h-16 w-auto rounded-2xl sm:h-20" />
                    <p className="mt-8 break-words px-2 text-xs font-semibold uppercase tracking-normal text-solstice-300 sm:text-sm sm:tracking-[0.35em]">
                        We Build Businesses That Grow Globally
                    </p>
                    <h1 className="mt-4 font-display text-3xl font-bold leading-tight sm:text-5xl md:text-6xl">
                        <span className="block text-white">Solstice Group</span>
                        <span className="block text-solstice-400">of Companies</span>
                    </h1>
                    <p className="mt-6 text-sm text-solstice-100 sm:text-lg">
                        Import Export&nbsp;|&nbsp;Ceramic&nbsp;|&nbsp;Food&nbsp;|&nbsp;Events
                    </p>
                    <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
                        <Link
                            href="/companies"
                            className="rounded-full border border-solstice-400 px-8 py-3 text-sm font-semibold text-solstice-300 hover:bg-solstice-400 hover:text-solstice-950"
                        >
                            Explore Our Companies
                        </Link>
                        <Link
                            href="/contact"
                            className="rounded-full border border-white/50 px-8 py-3 text-sm font-semibold text-white hover:bg-white/10"
                        >
                            Contact Us
                        </Link>
                    </div>
                </div>
            </section>

            {/* Impact banner */}
            <section className="bg-solstice-50 py-14 text-center sm:py-16">
                <div className="container">
                    <h2 className="font-display text-4xl font-bold uppercase tracking-wide text-solstice-700 sm:text-6xl">
                        We Build Together
                    </h2>
                    <p className="mx-auto mt-6 max-w-2xl text-base text-slate-600 sm:text-lg">
                        Solstice Group is a diversified business group operating across global trade, ceramic products,
                        food, and event management.
                    </p>
                </div>
            </section>

            {/* 3. Our Companies */}
            <CompanyFanShowcase companies={companies} />

            {/* 4. Services (Group Level) */}
            <section className="bg-slate-50 py-14 sm:py-16">
                <div className="container">
                    <div className="text-center">
                        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-solstice-700">What We Do</p>
                        <h2 className="mt-2 font-display text-2xl font-semibold text-slate-950 sm:text-3xl">Group-level services</h2>
                    </div>
                    <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {GROUP_SERVICES.map((service, index) => (
                            <ScrollReveal key={service} delayMs={(index + 1) * 200}>
                                <div className="flex items-start gap-3 rounded-3xl bg-white p-6 shadow-sm">
                                    <span className="mt-0.5 text-solstice-600">✔</span>
                                    <p className="font-semibold text-slate-800">{service}</p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* 6. Global Presence */}
            <section className="bg-solstice-950 py-14 text-white sm:py-16">
                <div className="container">
                    <div className="text-center">
                        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-solstice-300">Global Presence</p>
                        <h2 className="mt-2 font-display text-2xl font-semibold sm:text-3xl">Where we operate</h2>
                    </div>
                    <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
                        {regions.map((region, index) => (
                            <ScrollReveal key={region.name} delayMs={(index + 1) * 200}>
                                <div
                                    className={`rounded-3xl p-6 text-center ${
                                        region.isHeadquarters ? 'bg-solstice-600' : 'border border-solstice-800 bg-solstice-900'
                                    }`}
                                >
                                    <p className="text-lg font-semibold">{region.name}</p>
                                    {region.isHeadquarters && (
                                        <p className="mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-solstice-100">
                                            Headquarters
                                        </p>
                                    )}
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* 7. Why Choose Us */}
            <section className="container py-14 sm:py-16">
                <div className="text-center">
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-solstice-700">Why Choose Us</p>
                    <h2 className="mt-2 font-display text-2xl font-semibold text-slate-950 sm:text-3xl">A group built on trust and reach</h2>
                </div>
                <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {WHY_CHOOSE_US.map((reason, index) => (
                        <ScrollReveal key={reason} delayMs={(index + 1) * 200}>
                            <div className="flex items-start gap-3 rounded-3xl bg-solstice-50 p-6">
                                <span className="mt-0.5 text-solstice-700">✔</span>
                                <p className="font-semibold text-slate-800">{reason}</p>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </section>

            {/* 8. Group Stats */}
            <section className="container pb-14 sm:pb-16">
                <div className="grid gap-4 rounded-[2rem] bg-solstice-50 p-8 sm:grid-cols-3 sm:p-10">
                    {stats.map((stat, index) => (
                        <ScrollReveal key={stat.label} delayMs={(index + 1) * 200}>
                            <div className="rounded-3xl bg-white p-6 text-center shadow-sm">
                                <p className="font-display text-3xl font-semibold text-solstice-700">{stat.value}</p>
                                <p className="mt-2 text-sm uppercase tracking-[0.2em] text-slate-500">{stat.label}</p>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </section>

            {/* 10. CTA */}
            <section className="bg-solstice-950 py-16 text-white sm:py-20">
                <div className="container text-center">
                    <h2 className="font-display text-2xl font-semibold sm:text-3xl">Start Your Business Journey With Us</h2>
                    <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
                        <Link
                            href="/contact"
                            className="w-full rounded-full bg-solstice-600 px-8 py-3 text-sm font-semibold text-white hover:bg-solstice-500 sm:w-auto"
                        >
                            Get Consultation
                        </Link>
                        <a
                            href={`https://wa.me/${WHATSAPP_NUMBER}`}
                            target="_blank"
                            rel="noreferrer"
                            className="flex w-full items-center justify-center gap-2 rounded-full border border-white/40 px-8 py-3 text-sm font-semibold text-white hover:bg-white/10 sm:w-auto"
                        >
                            <svg viewBox="0 0 32 32" fill="currentColor" className="h-5 w-5" aria-hidden="true">
                                <path d="M16.001 3C9.096 3 3.5 8.596 3.5 15.5c0 2.316.63 4.484 1.727 6.35L3 29l7.32-2.184A12.44 12.44 0 0 0 16.001 28C22.906 28 28.5 22.404 28.5 15.5S22.906 3 16.001 3Zm0 22.7a10.16 10.16 0 0 1-5.19-1.42l-.372-.222-4.345 1.297 1.318-4.235-.243-.387A10.14 10.14 0 0 1 5.8 15.5c0-5.633 4.568-10.2 10.201-10.2 5.632 0 10.2 4.567 10.2 10.2 0 5.633-4.568 10.2-10.2 10.2Zm5.593-7.634c-.306-.153-1.81-.893-2.09-.995-.28-.102-.484-.153-.688.154-.204.306-.789.994-.967 1.199-.178.204-.357.23-.663.077-.306-.154-1.293-.477-2.464-1.522-.911-.812-1.526-1.816-1.705-2.122-.178-.306-.019-.472.135-.624.138-.138.306-.357.459-.536.153-.178.204-.306.306-.51.102-.204.051-.383-.026-.536-.077-.153-.688-1.658-.943-2.27-.248-.596-.5-.515-.688-.524-.178-.009-.382-.011-.586-.011-.204 0-.536.077-.816.383-.28.306-1.069 1.045-1.069 2.55 0 1.505 1.094 2.959 1.246 3.163.153.204 2.152 3.287 5.214 4.607.728.314 1.296.502 1.739.642.731.232 1.395.199 1.921.121.586-.088 1.81-.74 2.065-1.454.255-.715.255-1.327.178-1.454-.076-.128-.28-.204-.586-.357Z" />
                            </svg>
                            WhatsApp
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}
