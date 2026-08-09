import { getEvents } from '@/lib/cms/events';

export const dynamic = 'force-dynamic';

export default async function EventsPage() {
    const events = await getEvents();
    const today = new Date().toISOString().slice(0, 10);
    const upcoming = events.filter((event) => event.date >= today);
    const past = events.filter((event) => event.date < today);

    return (
        <div className="container py-10 sm:py-16">
            <div className="rounded-[2rem] bg-white p-6 shadow-sm sm:p-10">
                <p className="text-sm uppercase tracking-[0.3em] text-solstice-700">Events</p>
                <h1 className="mt-4 font-display text-3xl font-semibold text-slate-950 sm:text-4xl">
                    Events &amp; Exhibitions by Solstice GTS Events
                </h1>
                <p className="mt-6 text-base leading-8 text-slate-600 sm:text-lg">
                    Corporate events, brand launches, and exhibitions delivered end-to-end by our events subsidiary.
                </p>
            </div>

            <div className="mt-10">
                <h2 className="font-display text-2xl font-semibold text-slate-950">Upcoming Events</h2>
                {upcoming.length === 0 ? (
                    <p className="mt-4 text-slate-600">No upcoming events scheduled right now — check back soon.</p>
                ) : (
                    <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {upcoming.map((event) => (
                            <article key={event.slug} className="overflow-hidden rounded-3xl border border-slate-200 bg-solstice-50 shadow-sm">
                                {event.coverImageUrl && (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img src={event.coverImageUrl} alt={event.title} className="h-40 w-full object-cover" />
                                )}
                                <div className="p-6">
                                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-solstice-700">
                                        {new Date(event.date).toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric' })}
                                    </p>
                                    <h3 className="mt-2 text-lg font-semibold text-slate-950">{event.title}</h3>
                                    <p className="mt-1 text-sm text-slate-500">{event.location}</p>
                                    <p className="mt-3 text-sm leading-6 text-slate-600">{event.description}</p>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </div>

            {past.length > 0 && (
                <div className="mt-14">
                    <h2 className="font-display text-2xl font-semibold text-slate-950">Past Events</h2>
                    <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {past.map((event) => (
                            <article key={event.slug} className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 shadow-sm">
                                {event.coverImageUrl && (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img src={event.coverImageUrl} alt={event.title} className="h-40 w-full object-cover grayscale" />
                                )}
                                <div className="p-6">
                                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                                        {new Date(event.date).toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric' })}
                                    </p>
                                    <h3 className="mt-2 text-lg font-semibold text-slate-800">{event.title}</h3>
                                    <p className="mt-1 text-sm text-slate-500">{event.location}</p>
                                    <p className="mt-3 text-sm leading-6 text-slate-500">{event.description}</p>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
