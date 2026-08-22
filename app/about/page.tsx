import Link from 'next/link';
import { getAboutPage } from '@/lib/cms/pages';
import { PageHeader } from '@/components/PageHeader';
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
        <div>
            <PageHeader
                eyebrow="About Solstice Group"
                title="A parent company built for diversified growth."
                description="Solstice Group brings together companies operating in import-export, spices, events, and bath wellness. We focus on strong leadership, responsible growth, and creating value for customers and partners."
            />

            <section className="bg-white py-16 dark:bg-solstice-950 sm:py-20">
                <div className="container grid gap-8 lg:grid-cols-2">
                    <ScrollReveal delayMs={200}>
                        <div className="h-full rounded-3xl bg-solstice-50 p-8 dark:bg-solstice-900">
                            <h2 className="font-display text-xl font-semibold text-slate-950 dark:text-white">Our mission</h2>
                            <p className="mt-3 leading-7 text-slate-700 dark:text-slate-400">{mission}</p>
                        </div>
                    </ScrollReveal>
                    <ScrollReveal delayMs={400}>
                        <div className="h-full rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-solstice-900">
                            <h2 className="font-display text-xl font-semibold text-slate-950 dark:text-white">Vision</h2>
                            <p className="mt-3 leading-7 text-slate-700 dark:text-slate-400">{vision}</p>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            <section className="bg-solstice-50 py-16 dark:bg-solstice-900 sm:py-20">
                <div className="container grid gap-6 md:grid-cols-2">
                    <ScrollReveal delayMs={200}>
                        <div className="h-full rounded-3xl border border-slate-200 bg-white p-7 shadow-sm dark:border-slate-700/60 dark:bg-solstice-800">
                            <h3 className="text-lg font-semibold text-slate-950 dark:text-white">Group history</h3>
                            <p className="mt-3 leading-7 text-slate-600 dark:text-slate-400">{groupHistory}</p>
                        </div>
                    </ScrollReveal>
                    <ScrollReveal delayMs={400}>
                        <div className="h-full rounded-3xl border border-slate-200 bg-white p-7 shadow-sm dark:border-slate-700/60 dark:bg-solstice-800">
                            <h3 className="text-lg font-semibold text-slate-950 dark:text-white">Founder story</h3>
                            <p className="mt-3 leading-7 text-slate-600 dark:text-slate-400">
                                A strategic entrepreneur with experience in trade, hospitality, and event management launched the group to scale complementary ventures.
                            </p>
                            <Link href="/founder-message" className="mt-4 inline-block text-sm font-semibold text-solstice-700 hover:text-solstice-900 dark:text-solstice-400 dark:hover:text-solstice-300">
                                Read the founder message →
                            </Link>
                        </div>
                    </ScrollReveal>
                    <ScrollReveal delayMs={600}>
                        <div className="h-full rounded-3xl border border-slate-200 bg-white p-7 shadow-sm dark:border-slate-700/60 dark:bg-solstice-800">
                            <h3 className="text-lg font-semibold text-slate-950 dark:text-white">Leadership team</h3>
                            <p className="mt-3 leading-7 text-slate-600 dark:text-slate-400">A lean executive team that focuses on governance, business development, and brand growth across subsidiaries.</p>
                            <Link href="/leadership" className="mt-4 inline-block text-sm font-semibold text-solstice-700 hover:text-solstice-900 dark:text-solstice-400 dark:hover:text-solstice-300">
                                Meet the team →
                            </Link>
                        </div>
                    </ScrollReveal>
                    <ScrollReveal delayMs={800}>
                        <div className="h-full rounded-3xl border border-slate-200 bg-white p-7 shadow-sm dark:border-slate-700/60 dark:bg-solstice-800">
                            <h3 className="text-lg font-semibold text-slate-950 dark:text-white">Future focus</h3>
                            <p className="mt-3 leading-7 text-slate-600 dark:text-slate-400">Expanding digital presence, building investor trust, and launching new service-led verticals.</p>
                        </div>
                    </ScrollReveal>
                </div>
            </section>
        </div>
    );
}
