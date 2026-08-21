import { notFound } from 'next/navigation';
import { getCompanyBySlug } from '@/lib/cms/companies';

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
        <div className="container py-16">
            <div className="rounded-[2rem] bg-white p-6 shadow-sm sm:p-10 dark:bg-slate-900">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                    <div>
                        <p className="text-sm uppercase tracking-[0.3em] text-solstice-700 dark:text-solstice-400">{company.name}</p>
                        <h1 className="mt-4 font-display text-3xl font-semibold text-slate-950 sm:text-4xl dark:text-white">{company.tagline}</h1>
                        <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-400">{company.description}</p>
                    </div>
                    <div className="rounded-3xl bg-solstice-50 p-8 shadow-sm dark:bg-slate-900">
                        <p className="text-sm uppercase tracking-[0.2em] text-solstice-700 dark:text-solstice-400">Contact</p>
                        <p className="mt-4 text-slate-700 dark:text-slate-400">Email: {company.contactEmail}</p>
                        <p className="mt-2 text-slate-700 dark:text-slate-400">Phone: {company.contactPhone}</p>
                        <p className="mt-2 text-slate-700 dark:text-slate-400">Headquarters: {company.headquarters}</p>
                        <a href={company.website} target="_blank" rel="noreferrer" className="mt-5 inline-block text-sm font-semibold text-solstice-700 hover:text-solstice-900 dark:text-solstice-400 dark:hover:text-solstice-300">
                            Visit website
                        </a>
                    </div>
                </div>

                <div className="mt-12 grid gap-8 lg:grid-cols-2">
                    <section className="rounded-3xl bg-slate-50 p-8 dark:bg-slate-900">
                        <h2 className="font-display text-2xl font-semibold text-slate-950 dark:text-white">Services / Products</h2>
                        <ul className="mt-5 space-y-3 text-slate-600 dark:text-slate-400">
                            {company.services.map((service) => (
                                <li key={service} className="rounded-3xl bg-white p-4 shadow-sm dark:bg-slate-900">{service}</li>
                            ))}
                        </ul>
                    </section>
                    <section className="rounded-3xl bg-white p-8 shadow-sm dark:bg-slate-900">
                        <h2 className="font-display text-2xl font-semibold text-slate-950 dark:text-white">About the subsidiary</h2>
                        <p className="mt-5 text-slate-600 leading-7 dark:text-slate-400">
                            This company is part of Solstice Group and helps deliver specialized solutions within its industry vertical. It supports the group’s overall growth by focusing on excellence and market-specific expertise.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
