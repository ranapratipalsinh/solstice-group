import Link from 'next/link';
import { getAboutPage } from '@/lib/cms/pages';

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
            <div className="rounded-[2rem] bg-white p-6 shadow-sm sm:p-10">
                <p className="text-sm uppercase tracking-[0.3em] text-solstice-700">About Solstice Group</p>
                <h1 className="mt-4 font-display text-3xl font-semibold text-slate-950 sm:text-4xl">A parent company built for diversified growth.</h1>
                <p className="mt-6 text-lg leading-8 text-slate-600">
                    Solstice Group brings together companies operating in import-export, spices, events, and bath wellness. We focus on strong leadership, responsible growth, and creating value for customers and partners.
                </p>
                <div className="mt-10 grid gap-8 lg:grid-cols-2">
                    <section className="rounded-3xl bg-solstice-50 p-8">
                        <h2 className="font-display text-xl font-semibold text-slate-950">Our mission</h2>
                        <p className="mt-3 text-slate-700 leading-7">{mission}</p>
                    </section>
                    <section className="rounded-3xl bg-white p-8 shadow-sm">
                        <h2 className="font-display text-xl font-semibold text-slate-950">Vision</h2>
                        <p className="mt-3 text-slate-700 leading-7">{vision}</p>
                    </section>
                </div>
                <div className="mt-10 grid gap-6 md:grid-cols-2">
                    <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
                        <h3 className="text-lg font-semibold text-slate-950">Group history</h3>
                        <p className="mt-3 text-slate-600 leading-7">{groupHistory}</p>
                    </div>
                    <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
                        <h3 className="text-lg font-semibold text-slate-950">Founder story</h3>
                        <p className="mt-3 text-slate-600 leading-7">
                            A strategic entrepreneur with experience in trade, hospitality, and event management launched the group to scale complementary ventures.
                        </p>
                        <Link href="/founder-message" className="mt-4 inline-block text-sm font-semibold text-solstice-700 hover:text-solstice-900">
                            Read the founder message →
                        </Link>
                    </div>
                    <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
                        <h3 className="text-lg font-semibold text-slate-950">Leadership team</h3>
                        <p className="mt-3 text-slate-600 leading-7">A lean executive team that focuses on governance, business development, and brand growth across subsidiaries.</p>
                        <Link href="/leadership" className="mt-4 inline-block text-sm font-semibold text-solstice-700 hover:text-solstice-900">
                            Meet the team →
                        </Link>
                    </div>
                    <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
                        <h3 className="text-lg font-semibold text-slate-950">Future focus</h3>
                        <p className="mt-3 text-slate-600 leading-7">Expanding digital presence, building investor trust, and launching new service-led verticals.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
