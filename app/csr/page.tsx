import { getCsrPage } from '@/lib/cms/pages';

export const dynamic = 'force-dynamic';

export default async function CsrPage() {
    const csr = await getCsrPage();

    const heading = csr?.heading ?? 'Corporate Social Responsibility';
    const body =
        csr?.body ??
        'Solstice Group is committed to giving back to the communities where we operate, supporting local livelihoods, sustainable sourcing, and responsible business practices across every subsidiary.';

    return (
        <div className="container py-16">
            <div className="rounded-[2rem] bg-white p-6 shadow-sm sm:p-10">
                <p className="text-sm uppercase tracking-[0.3em] text-solstice-700">CSR / Social Work</p>
                <h1 className="mt-4 font-display text-3xl font-semibold text-slate-950 sm:text-4xl">{heading}</h1>
                <p className="mt-6 text-lg leading-8 text-slate-600">{body}</p>
                {csr && csr.imageUrls.length > 0 && (
                    <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {csr.imageUrls.map((url) => (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img key={url} src={url} alt="CSR activity" className="h-56 w-full rounded-3xl object-cover shadow-sm" />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
