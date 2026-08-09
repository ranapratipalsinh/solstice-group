import { getAboutPage } from '@/lib/cms/pages';

export const dynamic = 'force-dynamic';

export default async function FounderMessagePage() {
    const about = await getAboutPage();

    const founderStory =
        about?.founderStory ??
        'A strategic entrepreneur with experience in trade, hospitality, and event management launched Solstice Group to scale complementary ventures under one trusted parent identity, focused on quality, governance, and long-term growth for every subsidiary.';

    return (
        <div className="container py-16">
            <div className="rounded-[2rem] bg-white p-6 shadow-sm sm:p-10">
                <p className="text-sm uppercase tracking-[0.3em] text-solstice-700">Chairman / Founder Message</p>
                <h1 className="mt-4 font-display text-3xl font-semibold text-slate-950 sm:text-4xl">A message from our founder</h1>
                <div className="mt-10 grid gap-10 lg:grid-cols-[0.35fr_0.65fr] items-start">
                    {about?.founderPhotoUrl && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                            src={about.founderPhotoUrl}
                            alt="Founder of Solstice Group"
                            className="w-full rounded-3xl object-cover shadow-sm"
                        />
                    )}
                    <p className="text-lg leading-8 text-slate-600">{founderStory}</p>
                </div>
            </div>
        </div>
    );
}
