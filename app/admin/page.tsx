const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL ?? 'http://localhost:1337';

export default function AdminPage() {
    return (
        <div className="container py-16">
            <div className="rounded-[2rem] bg-white p-6 shadow-sm sm:p-10">
                <p className="text-sm uppercase tracking-[0.3em] text-solstice-700">Admin</p>
                <h1 className="mt-4 font-display text-4xl font-semibold text-slate-950">Manage this site in Strapi</h1>
                <p className="mt-6 text-lg leading-8 text-slate-600">
                    Companies, team members, jobs, blog posts, gallery items, testimonials, and contact/application submissions are all managed in the Strapi admin panel.
                </p>
                <a
                    href={`${STRAPI_URL}/admin`}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-8 inline-block rounded-full bg-solstice-700 px-6 py-3 text-sm font-semibold text-white hover:bg-solstice-800"
                >
                    Open Strapi admin →
                </a>
            </div>
        </div>
    );
}
