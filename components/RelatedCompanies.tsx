import Link from 'next/link';
import { Company } from '@/lib/cms/companies';

export function RelatedCompanies({ companies, currentSlug }: { companies: Company[]; currentSlug: string }) {
    const related = companies.filter((company) => company.slug !== currentSlug);
    if (related.length === 0) return null;

    return (
        <section className="bg-solstice-50 py-16 dark:bg-solstice-900 sm:py-20">
            <div className="container">
                <p className="text-sm font-bold uppercase tracking-wider text-solstice-600 dark:text-solstice-400">Related</p>
                <h2 className="mt-2 font-display text-2xl font-bold text-solstice-800 dark:text-white sm:text-3xl">Other Solstice Group Companies</h2>
                <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {related.map((company) => (
                        <Link
                            key={company.slug}
                            href={`/companies/${company.slug}`}
                            className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-solstice-400 hover:shadow-md dark:border-slate-700/60 dark:bg-solstice-800"
                        >
                            <h3 className="text-lg font-semibold text-slate-950 group-hover:text-solstice-700 dark:text-white dark:group-hover:text-solstice-400">
                                {company.name}
                            </h3>
                            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">{company.tagline}</p>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
