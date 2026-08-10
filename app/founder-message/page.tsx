import { getAboutPage } from '@/lib/cms/pages';
import { getFounder } from '@/lib/cms/team';

export const dynamic = 'force-dynamic';

export default async function FounderMessagePage() {
    const [about, founder] = await Promise.all([getAboutPage(), getFounder()]);

    const founderStory =
        founder?.bio ??
        about?.founderStory ??
        'A strategic entrepreneur with experience in trade, hospitality, and event management launched Solstice Group to scale complementary ventures under one trusted parent identity, focused on quality, governance, and long-term growth for every subsidiary.';

    const founderName = founder?.name ?? 'Founder';
    const founderRole = founder?.role ?? 'Founder & Chairman';
    const photoUrl = founder?.photoUrl ?? about?.founderPhotoUrl ?? null;
    const initials = founderName
        .split(' ')
        .map((word) => word[0])
        .slice(0, 2)
        .join('');

    return (
        <div className="container py-16">
            <div className="rounded-[2rem] bg-white p-6 shadow-sm sm:p-10">
                <p className="text-sm uppercase tracking-[0.3em] text-solstice-700">Chairman / Founder Message</p>
                <h1 className="mt-4 font-display text-3xl font-semibold text-slate-950 sm:text-4xl">A message from our founder</h1>
                <div className="mt-10 grid gap-10 lg:grid-cols-[0.4fr_0.6fr] items-start">
                    <div className="group relative aspect-[4/5] w-full overflow-hidden rounded-3xl shadow-sm">
                        {photoUrl ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                                src={photoUrl}
                                alt={founderName}
                                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                            />
                        ) : (
                            <div className="flex h-full w-full items-center justify-center bg-solstice-100 text-5xl font-bold text-solstice-700">
                                {initials}
                            </div>
                        )}
                        <div className="absolute inset-0 flex flex-col items-start justify-end bg-gradient-to-t from-solstice-950/95 via-solstice-950/40 to-transparent p-6 opacity-100 transition duration-300 sm:opacity-0 sm:group-hover:opacity-100">
                            <p className="text-lg font-semibold text-white">{founderName}</p>
                            <p className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-solstice-300">{founderRole}</p>
                        </div>
                    </div>
                    <p className="text-lg leading-8 text-slate-600">{founderStory}</p>
                </div>
            </div>
        </div>
    );
}
