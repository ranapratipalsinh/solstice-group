import { notFound } from 'next/navigation';
import { getCompanyBySlug } from '@/lib/cms/companies';
import { PageHeader } from '@/components/PageHeader';

type Props = {
    params: Promise<{
        slug: string;
    }>;
};

export const dynamic = 'force-dynamic';

export default async function CompanyDetailPage({ params }: Props) {
    const { slug } = await params;
    const company = await getCompanyBySlug(slug);

    if (!company) {
        notFound();
    }

    return (
        <div>
            <PageHeader eyebrow={company.name} title={company.tagline} description={company.description} />

            <section className="bg-white py-16 dark:bg-solstice-950 sm:py-20">
                <div className="container">
                    <div className="rounded-3xl bg-solstice-50 p-8 shadow-sm dark:bg-solstice-900">
                        <p className="text-sm uppercase tracking-[0.2em] text-solstice-700 dark:text-solstice-400">Contact</p>
                        <p className="mt-4 text-slate-700 dark:text-slate-400">Email: {company.contactEmail}</p>
                        <p className="mt-2 text-slate-700 dark:text-slate-400">Phone: {company.contactPhone}</p>
                        <p className="mt-2 text-slate-700 dark:text-slate-400">Headquarters: {company.headquarters}</p>
                        <a href={company.website} target="_blank" rel="noreferrer" className="mt-5 inline-block text-sm font-semibold text-solstice-700 hover:text-solstice-900 dark:text-solstice-400 dark:hover:text-solstice-300">
                            Visit website
                        </a>
                    </div>

                    <div className="mt-8 grid gap-8 lg:grid-cols-2">
                        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-700/60 dark:bg-solstice-900">
                            <h2 className="font-display text-2xl font-semibold text-slate-950 dark:text-white">Services / Products</h2>
                            <ul className="mt-5 space-y-3 text-slate-600 dark:text-slate-400">
                                {company.services.map((service) => (
                                    <li key={service} className="rounded-3xl bg-solstice-50 p-4 dark:bg-solstice-800">{service}</li>
                                ))}
                            </ul>
                        </section>
                        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-700/60 dark:bg-solstice-900">
                            <h2 className="font-display text-2xl font-semibold text-slate-950 dark:text-white">About the subsidiary</h2>
                            <p className="mt-5 leading-7 text-slate-600 dark:text-slate-400">
                                This company is part of Solstice Group and helps deliver specialized solutions within its industry vertical. It supports the group’s overall growth by focusing on excellence and market-specific expertise.
                            </p>
                        </section>
                    </div>
                </div>
            </section>
        </div>
    );
}
