import Link from 'next/link';
import { getAboutPage } from '@/lib/cms/pages';
import { ScrollReveal } from '@/components/ScrollReveal';

export const dynamic = 'force-dynamic';

export default async function AboutPage() {
    const about = await getAboutPage();

    const mission =
        about?.mission ??
        'To provide a trusted umbrella for specialized subsidiaries while delivering consistent quality, strategic support and new market opportunities.';
    const vision =
        about?.vision ??
        'Be the first choice for businesses seeking a reliable corporate group with modern branding, strong operational delivery, and meaningful growth.';
    const groupHistory =
        about?.groupHistory ??
        'Founded to unify specialized businesses and provide higher corporate credibility for subsidiaries.';

    return (
        <div className="container py-16">
            <div className="rounded-[2rem] bg-white p-6 shadow-sm dark:bg-slate-950 sm:p-10">
                <ScrollReveal>
                    <p className="text-sm uppercase tracking-[0.3em] text-solstice-700 dark:text-solstice-400">About Solstice Group</p>
                    <h1 className="mt-4 font-display text-3xl font-semibold text-slate-950 dark:text-white sm:text-4xl">A parent company built for diversified growth.</h1>
                    <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-400">
                        Solstice Group brings together companies operating in import-export, spices, events, and bath wellness. We focus on strong leadership, responsible growth, and creating value for customers and partners.
                    </p>
                </ScrollReveal>
                <div className="mt-10 grid gap-8 lg:grid-cols-2">
                    <ScrollReveal delayMs={200}>
                        <section className="h-full rounded-3xl bg-solstice-50 p-8 dark:bg-slate-900">
                            <h2 className="font-display text-xl font-semibold text-slate-950 dark:text-white">Our mission</h2>
                            <p className="mt-3 text-slate-700 leading-7 dark:text-slate-400">{mission}</p>
                        </section>
                    </ScrollReveal>
                    <ScrollReveal delayMs={400}>
                        <section className="h-full rounded-3xl bg-white p-8 shadow-sm dark:bg-slate-900">
                            <h2 className="font-display text-xl font-semibold text-slate-950 dark:text-white">Vision</h2>
                            <p className="mt-3 text-slate-700 leading-7 dark:text-slate-400">{vision}</p>
                        </section>
                    </ScrollReveal>
                </div>
                <div className="mt-10 grid gap-6 md:grid-cols-2">
                    <ScrollReveal delayMs={200}>
                        <div className="h-full rounded-3xl border border-slate-200 bg-white p-7 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                            <h3 className="text-lg font-semibold text-slate-950 dark:text-white">Group history</h3>
                            <p className="mt-3 text-slate-600 leading-7 dark:text-slate-400">{groupHistory}</p>
                        </div>
                    </ScrollReveal>
                    <ScrollReveal delayMs={400}>
                        <div className="h-full rounded-3xl border border-slate-200 bg-white p-7 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                            <h3 className="text-lg font-semibold text-slate-950 dark:text-white">Founder story</h3>
                            <p className="mt-3 text-slate-600 leading-7 dark:text-slate-400">
                                A strategic entrepreneur with experience in trade, hospitality, and event management launched the group to scale complementary ventures.
                            </p>
                            <Link href="/founder-message" className="mt-4 inline-block text-sm font-semibold text-solstice-700 hover:text-solstice-900 dark:text-solstice-400 dark:hover:text-solstice-300">
                                Read the founder message →
                            </Link>
                        </div>
                    </ScrollReveal>
                    <ScrollReveal delayMs={600}>
                        <div className="h-full rounded-3xl border border-slate-200 bg-white p-7 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                            <h3 className="text-lg font-semibold text-slate-950 dark:text-white">Leadership team</h3>
                            <p className="mt-3 text-slate-600 leading-7 dark:text-slate-400">A lean executive team that focuses on governance, business development, and brand growth across subsidiaries.</p>
                            <Link href="/leadership" className="mt-4 inline-block text-sm font-semibold text-solstice-700 hover:text-solstice-900 dark:text-solstice-400 dark:hover:text-solstice-300">
                                Meet the team →
                            </Link>
                        </div>
                    </ScrollReveal>
                    <ScrollReveal delayMs={800}>
                        <div className="h-full rounded-3xl border border-slate-200 bg-white p-7 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                            <h3 className="text-lg font-semibold text-slate-950 dark:text-white">Future focus</h3>
                            <p className="mt-3 text-slate-600 leading-7 dark:text-slate-400">Expanding digital presence, building investor trust, and launching new service-led verticals.</p>
                        </div>
                    </ScrollReveal>
                </div>
            </div>
        </div>
    );
}
