import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getCompanies, getCompanyBySlug } from '@/lib/cms/companies';
import { getEventsByCompanySlug } from '@/lib/cms/events';
import { getCertificationsByCompanySlug } from '@/lib/cms/certifications';
import { getRegions } from '@/lib/cms/regions';
import { getIndustries } from '@/lib/cms/industries';
import { PageHeader } from '@/components/PageHeader';
import { RelatedCompanies } from '@/components/RelatedCompanies';
import { ImageWithFallback } from '@/components/ImageWithFallback';

type Props = {
    params: Promise<{ slug: string }>;
};

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const company = await getCompanyBySlug(slug);
    if (!company) return {};

    return {
        title: `${company.name} | Solstice Group`,
        description: company.tagline || company.description,
    };
}

export default async function CompanyDetailPage({ params }: Props) {
    const { slug } = await params;
    const [company, allCompanies] = await Promise.all([getCompanyBySlug(slug), getCompanies()]);

    if (!company) {
        notFound();
    }

    const [projects, certifications, regions, industries] = await Promise.all([
        getEventsByCompanySlug(slug),
        getCertificationsByCompanySlug(slug),
        getRegions(),
        getIndustries(),
    ]);
    const industry = industries.find((item) => item.companySlug === slug)?.title ?? null;

    return (
        <div>
            <PageHeader eyebrow={company.name} title={company.tagline} description={company.description} />

            {/* About the Company */}
            <section className="bg-white py-16 dark:bg-solstice-950 sm:py-20">
                <div className="container grid gap-8 lg:grid-cols-[1fr_0.7fr]">
                    <div>
                        <h2 className="font-display text-2xl font-semibold text-slate-950 dark:text-white">About {company.name}</h2>
                        <p className="mt-5 leading-7 text-slate-600 dark:text-slate-400">{company.description}</p>
                        <p className="mt-4 leading-7 text-slate-600 dark:text-slate-400">
                            {company.name} operates as part of Solstice Group, contributing its specialized expertise
                            {industry ? ` in ${industry.toLowerCase()}` : ''} to the group&apos;s wider portfolio of businesses.
                        </p>
                    </div>
                    <div className="rounded-3xl bg-solstice-50 p-8 shadow-sm dark:bg-solstice-900">
                        <p className="text-sm uppercase tracking-[0.2em] text-solstice-700 dark:text-solstice-400">Contact</p>
                        {industry && <p className="mt-4 text-slate-700 dark:text-slate-400">Industry: {industry}</p>}
                        {company.headquarters && <p className="mt-2 text-slate-700 dark:text-slate-400">Headquarters: {company.headquarters}</p>}
                        {company.contactEmail && <p className="mt-2 text-slate-700 dark:text-slate-400">Email: {company.contactEmail}</p>}
                        {company.contactPhone && <p className="mt-2 text-slate-700 dark:text-slate-400">Phone: {company.contactPhone}</p>}
                        {company.website && (
                            <a
                                href={company.website}
                                target="_blank"
                                rel="noreferrer"
                                className="mt-5 inline-block text-sm font-semibold text-solstice-700 hover:text-solstice-900 dark:text-solstice-400 dark:hover:text-solstice-300"
                            >
                                Visit website
                            </a>
                        )}
                    </div>
                </div>
            </section>

            {/* What We Do / Capabilities */}
            {company.services.length > 0 && (
                <section className="bg-solstice-50 py-16 dark:bg-solstice-900 sm:py-20">
                    <div className="container">
                        <h2 className="font-display text-2xl font-semibold text-slate-950 dark:text-white">What We Do</h2>
                        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Products, services, and capabilities</p>
                        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                            {company.services.map((service) => (
                                <div
                                    key={service}
                                    className="h-full rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700/60 dark:bg-solstice-800"
                                >
                                    <p className="font-semibold text-slate-950 dark:text-white">{service}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Industries / Markets Served */}
            <section className="bg-white py-16 dark:bg-solstice-950 sm:py-20">
                <div className="container grid gap-8 md:grid-cols-2">
                    {industry && (
                        <div className="rounded-3xl border border-slate-200 bg-solstice-50 p-7 dark:border-slate-700/60 dark:bg-solstice-900">
                            <h3 className="text-lg font-semibold text-slate-950 dark:text-white">Industry</h3>
                            <p className="mt-3 leading-7 text-slate-600 dark:text-slate-400">{industry}</p>
                            <Link href="/industries" className="mt-4 inline-block text-sm font-semibold text-solstice-700 hover:text-solstice-900 dark:text-solstice-400 dark:hover:text-solstice-300">
                                See all industries →
                            </Link>
                        </div>
                    )}
                    {regions.length > 0 && (
                        <div className="rounded-3xl border border-slate-200 bg-solstice-50 p-7 dark:border-slate-700/60 dark:bg-solstice-900">
                            <h3 className="text-lg font-semibold text-slate-950 dark:text-white">Markets Served</h3>
                            <p className="mt-3 leading-7 text-slate-600 dark:text-slate-400">
                                As part of Solstice Group, {company.name} benefits from the group&apos;s presence across {regions.length} markets:{' '}
                                {regions.map((r) => r.name).join(', ')}.
                            </p>
                            <Link href="/global-presence" className="mt-4 inline-block text-sm font-semibold text-solstice-700 hover:text-solstice-900 dark:text-solstice-400 dark:hover:text-solstice-300">
                                View global presence →
                            </Link>
                        </div>
                    )}
                </div>
            </section>

            {/* Projects / Portfolio */}
            {projects.length > 0 && (
                <section className="bg-solstice-50 py-16 dark:bg-solstice-900 sm:py-20">
                    <div className="container">
                        <h2 className="font-display text-2xl font-semibold text-slate-950 dark:text-white">Projects &amp; Events</h2>
                        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {projects.map((project) => (
                                <article
                                    key={project.slug}
                                    className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-700/60 dark:bg-solstice-800"
                                >
                                    {project.coverImageUrl && (
                                        // eslint-disable-next-line @next/next/no-img-element
                                        <img src={project.coverImageUrl} alt={project.title} className="h-40 w-full object-cover" />
                                    )}
                                    <div className="p-6">
                                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-solstice-700 dark:text-solstice-400">
                                            {new Date(project.date).toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric' })}
                                        </p>
                                        <h3 className="mt-2 text-lg font-semibold text-slate-950 dark:text-white">{project.title}</h3>
                                        {project.location && <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{project.location}</p>}
                                        <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">{project.description}</p>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Certifications */}
            {certifications.length > 0 && (
                <section className="bg-white py-16 dark:bg-solstice-950 sm:py-20">
                    <div className="container">
                        <h2 className="font-display text-2xl font-semibold text-slate-950 dark:text-white">Certifications</h2>
                        <div className="mt-8 flex flex-wrap gap-6">
                            {certifications.map((cert) => (
                                <div key={cert.title} className="flex w-40 flex-col items-center gap-3 text-center">
                                    <ImageWithFallback
                                        src={cert.imageUrl}
                                        alt={cert.title}
                                        className="h-14 w-auto object-contain"
                                        fallback={<span className="text-lg font-bold text-slate-400 dark:text-slate-600">{cert.title}</span>}
                                    />
                                    <p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500 dark:text-slate-400">{cert.title}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            <RelatedCompanies companies={allCompanies} currentSlug={slug} />

            {/* CTA */}
            <section className="bg-solstice-950 py-16 text-center text-white sm:py-20">
                <div className="container">
                    <h2 className="font-display text-2xl font-semibold sm:text-3xl">Let&apos;s Build Something Together</h2>
                    <Link
                        href="/contact"
                        className="mt-6 inline-flex items-center justify-center rounded-full bg-solstice-500 px-8 py-3 text-sm font-semibold text-solstice-950 transition-colors hover:bg-white"
                    >
                        Contact Solstice Group
                    </Link>
                </div>
            </section>
        </div>
    );
}
