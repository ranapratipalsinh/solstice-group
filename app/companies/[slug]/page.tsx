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
            <div className="rounded-[2rem] bg-white p-6 shadow-sm sm:p-10">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                    <div>
                        <p className="text-sm uppercase tracking-[0.3em] text-solstice-700">{company.name}</p>
                        <h1 className="mt-4 font-display text-3xl font-semibold text-slate-950 sm:text-4xl">{company.tagline}</h1>
                        <p className="mt-6 text-lg leading-8 text-slate-600">{company.description}</p>
                    </div>
                    <div className="rounded-3xl bg-solstice-50 p-8 shadow-sm">
                        <p className="text-sm uppercase tracking-[0.2em] text-solstice-700">Contact</p>
                        <p className="mt-4 text-slate-700">Email: {company.contactEmail}</p>
                        <p className="mt-2 text-slate-700">Phone: {company.contactPhone}</p>
                        <p className="mt-2 text-slate-700">Headquarters: {company.headquarters}</p>
                        <a href={company.website} target="_blank" rel="noreferrer" className="mt-5 inline-block text-sm font-semibold text-solstice-700 hover:text-solstice-900">
                            Visit website
                        </a>
                    </div>
                </div>

                <div className="mt-12 grid gap-8 lg:grid-cols-2">
                    <section className="rounded-3xl bg-slate-50 p-8">
                        <h2 className="font-display text-2xl font-semibold text-slate-950">Services / Products</h2>
                        <ul className="mt-5 space-y-3 text-slate-600">
                            {company.services.map((service) => (
                                <li key={service} className="rounded-3xl bg-white p-4 shadow-sm">{service}</li>
                            ))}
                        </ul>
                    </section>
                    <section className="rounded-3xl bg-white p-8 shadow-sm">
                        <h2 className="font-display text-2xl font-semibold text-slate-950">About the subsidiary</h2>
                        <p className="mt-5 text-slate-600 leading-7">
                            This company is part of Solstice Group and helps deliver specialized solutions within its industry vertical. It supports the group’s overall growth by focusing on excellence and market-specific expertise.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
