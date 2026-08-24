import type { Metadata } from 'next';
import Link from 'next/link';
import { Handshake, Award, Lightbulb, Users, Leaf, Sparkles, LucideIcon } from 'lucide-react';
import { getAboutPage, ValueIcon } from '@/lib/cms/pages';
import { getCompanies } from '@/lib/cms/companies';
import { getIndustries } from '@/lib/cms/industries';
import { getRegions } from '@/lib/cms/regions';
import { PageHeader } from '@/components/PageHeader';
import { ScrollReveal } from '@/components/ScrollReveal';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: 'About Solstice Group | Our Story, Vision & Values',
    description:
        'Solstice Group is a diversified business group operating across international trade, spices manufacturing, bathware, and events through specialized companies.',
};

const VALUE_ICON: Record<ValueIcon, LucideIcon> = {
    handshake: Handshake,
    award: Award,
    lightbulb: Lightbulb,
    users: Users,
    leaf: Leaf,
    sparkles: Sparkles,
};

export default async function AboutPage() {
    const [about, companies, industries, regions] = await Promise.all([
        getAboutPage(),
        getCompanies(),
        getIndustries(),
        getRegions(),
    ]);

    const mission =
        about?.mission ??
        'To provide a trusted umbrella for specialized subsidiaries while delivering consistent quality, strategic support and new market opportunities.';
    const vision =
        about?.vision ??
        'Be the first choice for businesses seeking a reliable corporate group with modern branding, strong operational delivery, and meaningful growth.';
    const groupHistory =
        about?.groupHistory ??
        'Founded to unify specialized businesses and provide higher corporate credibility for subsidiaries.';
    const values = about?.values ?? [];
    const sustainabilityEnvironment =
        about?.sustainabilityEnvironment ||
        'We look for ways to reduce waste and operate our sourcing, manufacturing, and logistics more efficiently as the group grows.';
    const sustainabilitySocial =
        about?.sustainabilitySocial || 'Each subsidiary supports local employment and skill development in the communities where it operates.';
    const sustainabilityGovernance =
        about?.sustainabilityGovernance ||
        'Group-wide standards for quality, compliance, and ethical business practice apply across every company we operate.';
    const founderTeaser =
        about?.founderTeaser ||
        'A strategic entrepreneur with experience in trade, hospitality, and event management launched the group to scale complementary ventures.';
    const leadershipTeaser =
        about?.leadershipTeaser ||
        'A lean executive team that focuses on governance, business development, and brand growth across subsidiaries.';

    const fallbackTimeline = [
        { title: 'Founded', description: groupHistory },
        {
            title: 'Business Expansion',
            description: `The group grew to ${companies.length} specialized companies, each with its own focus and leadership.`,
        },
        {
            title: 'New Business Verticals',
            description: `Operations now span ${industries.length} distinct business verticals, from international trade to manufacturing.`,
        },
        {
            title: 'International Growth',
            description: `Solstice Group's reach now extends across ${regions.length} markets internationally.`,
        },
        { title: 'Future Vision', description: vision },
    ];
    const timeline = about?.timeline?.length ? about.timeline : fallbackTimeline;

    return (
        <div>
            <PageHeader
                eyebrow="About Solstice Group"
                title="A parent company built for diversified growth."
                description="Solstice Group brings together specialized companies operating across international trade, manufacturing, and bathware. We focus on strong leadership, responsible growth, and creating value for customers and partners."
            />

            {/* Who We Are */}
            <section className="bg-white py-16 dark:bg-solstice-950 sm:py-20">
                <div className="container max-w-3xl text-center">
                    <ScrollReveal>
                        <p className="text-sm font-bold uppercase tracking-wider text-solstice-600 dark:text-solstice-400">Who We Are</p>
                        <p className="mt-4 text-lg leading-8 text-slate-600 dark:text-slate-400">{groupHistory}</p>
                    </ScrollReveal>
                </div>
            </section>

            {/* Our Story */}
            <section id="our-story" className="scroll-mt-24 bg-solstice-50 py-16 dark:bg-solstice-900 sm:py-20">
                <div className="container max-w-3xl">
                    <ScrollReveal className="text-center">
                        <p className="text-sm font-bold uppercase tracking-wider text-solstice-600 dark:text-solstice-400">Our Story</p>
                        <h2 className="mt-3 font-display text-3xl font-bold text-solstice-800 dark:text-white">How the group came together</h2>
                    </ScrollReveal>
                    <div className="mt-14 space-y-10 border-l-2 border-solstice-200 pl-8 dark:border-solstice-700">
                        {timeline.map((stage) => (
                            <ScrollReveal key={stage.title}>
                                <div className="relative">
                                    <span className="absolute -left-[2.55rem] top-1 h-4 w-4 rounded-full border-4 border-solstice-50 bg-solstice-500 dark:border-solstice-900" />
                                    <h3 className="font-display text-lg font-semibold text-slate-950 dark:text-white">{stage.title}</h3>
                                    <p className="mt-2 leading-7 text-slate-600 dark:text-slate-400">{stage.description}</p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Vision & Mission */}
            <section id="vision-mission" className="scroll-mt-24 bg-white py-16 dark:bg-solstice-950 sm:py-20">
                <div className="container">
                    <ScrollReveal className="mb-10 text-center">
                        <p className="text-sm font-bold uppercase tracking-wider text-solstice-600 dark:text-solstice-400">Vision &amp; Mission</p>
                    </ScrollReveal>
                    <div className="grid gap-8 lg:grid-cols-2">
                        <ScrollReveal delayMs={200}>
                            <div className="h-full rounded-3xl bg-solstice-50 p-8 dark:bg-solstice-900">
                                <h3 className="font-display text-xl font-semibold text-slate-950 dark:text-white">Our Mission</h3>
                                <p className="mt-3 leading-7 text-slate-700 dark:text-slate-400">{mission}</p>
                            </div>
                        </ScrollReveal>
                        <ScrollReveal delayMs={400}>
                            <div className="h-full rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-solstice-900">
                                <h3 className="font-display text-xl font-semibold text-slate-950 dark:text-white">Our Vision</h3>
                                <p className="mt-3 leading-7 text-slate-700 dark:text-slate-400">{vision}</p>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* Our Values */}
            <section className="bg-solstice-50 py-16 dark:bg-solstice-900 sm:py-20">
                <div className="container">
                    <ScrollReveal className="mb-10 text-center">
                        <p className="text-sm font-bold uppercase tracking-wider text-solstice-600 dark:text-solstice-400">Our Values</p>
                        <h2 className="mt-3 font-display text-3xl font-bold text-solstice-800 dark:text-white">What guides every company in the group</h2>
                    </ScrollReveal>
                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {values.map((value, index) => {
                            const Icon = VALUE_ICON[value.icon] ?? Sparkles;
                            return (
                                <ScrollReveal key={value.title} delayMs={(index + 1) * 100}>
                                    <div className="h-full rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700/60 dark:bg-solstice-800">
                                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-solstice-100 text-solstice-700 dark:bg-solstice-500/15 dark:text-solstice-400">
                                            <Icon className="h-5 w-5" strokeWidth={1.75} />
                                        </div>
                                        <h3 className="mt-4 text-lg font-semibold text-slate-950 dark:text-white">{value.title}</h3>
                                        <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">{value.description}</p>
                                    </div>
                                </ScrollReveal>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Founder & Leadership teasers */}
            <section className="bg-white py-16 dark:bg-solstice-950 sm:py-20">
                <div className="container grid gap-6 md:grid-cols-2">
                    <ScrollReveal delayMs={200}>
                        <div className="h-full rounded-3xl border border-slate-200 bg-solstice-50 p-7 shadow-sm dark:border-slate-700/60 dark:bg-solstice-900">
                            <h3 className="text-lg font-semibold text-slate-950 dark:text-white">Founder Message</h3>
                            <p className="mt-3 leading-7 text-slate-600 dark:text-slate-400">{founderTeaser}</p>
                            <Link href="/founder-message" className="mt-4 inline-block text-sm font-semibold text-solstice-700 hover:text-solstice-900 dark:text-solstice-400 dark:hover:text-solstice-300">
                                Read the founder message →
                            </Link>
                        </div>
                    </ScrollReveal>
                    <ScrollReveal delayMs={400}>
                        <div className="h-full rounded-3xl border border-slate-200 bg-solstice-50 p-7 shadow-sm dark:border-slate-700/60 dark:bg-solstice-900">
                            <h3 className="text-lg font-semibold text-slate-950 dark:text-white">Leadership Team</h3>
                            <p className="mt-3 leading-7 text-slate-600 dark:text-slate-400">{leadershipTeaser}</p>
                            <Link href="/leadership" className="mt-4 inline-block text-sm font-semibold text-solstice-700 hover:text-solstice-900 dark:text-solstice-400 dark:hover:text-solstice-300">
                                Meet the team →
                            </Link>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* Sustainability */}
            <section id="sustainability" className="scroll-mt-24 bg-solstice-950 py-16 text-white sm:py-24">
                <div className="container">
                    <ScrollReveal className="text-center">
                        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-solstice-400">Sustainability</p>
                        <h2 className="mt-2 font-display text-3xl font-semibold sm:text-4xl">Our approach to responsible growth</h2>
                        <p className="mx-auto mt-4 max-w-2xl text-slate-300">{vision}</p>
                    </ScrollReveal>
                    <div className="mt-14 grid gap-6 md:grid-cols-3">
                        <ScrollReveal delayMs={150}>
                            <div className="h-full rounded-3xl border border-white/10 bg-white/5 p-7">
                                <h3 className="font-display text-lg font-semibold">Environment</h3>
                                <p className="mt-3 text-sm leading-7 text-slate-300">{sustainabilityEnvironment}</p>
                            </div>
                        </ScrollReveal>
                        <ScrollReveal delayMs={300}>
                            <div className="h-full rounded-3xl border border-white/10 bg-white/5 p-7">
                                <h3 className="font-display text-lg font-semibold">Social</h3>
                                <p className="mt-3 text-sm leading-7 text-slate-300">{sustainabilitySocial}</p>
                            </div>
                        </ScrollReveal>
                        <ScrollReveal delayMs={450}>
                            <div className="h-full rounded-3xl border border-white/10 bg-white/5 p-7">
                                <h3 className="font-display text-lg font-semibold">Governance</h3>
                                <p className="mt-3 text-sm leading-7 text-slate-300">{sustainabilityGovernance}</p>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>
        </div>
    );
}
