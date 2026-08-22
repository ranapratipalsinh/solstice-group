import type { Metadata } from 'next';
import Link from 'next/link';
import { getIndustries } from '@/lib/cms/industries';
import { PageHeader } from '@/components/PageHeader';
import { ScrollReveal } from '@/components/ScrollReveal';
import { COMPANY_NAV_ITEMS } from '@/lib/nav';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: 'Industries We Serve | Solstice Group',
    description: 'The business verticals Solstice Group operates across, each led by a dedicated subsidiary company.',
};

export default async function IndustriesPage() {
    const industries = await getIndustries();

    return (
        <div>
            <PageHeader
                eyebrow="Industries We Serve"
                title="Specialized services for modern business needs."
                description="Solstice Group operates across distinct business verticals, each led by a dedicated subsidiary company."
            />

            <section className="bg-white py-16 dark:bg-solstice-950 sm:py-20">
                <div className="container grid gap-6 md:grid-cols-2">
                    {industries.map((industry, index) => {
                        const company = COMPANY_NAV_ITEMS.find((item) => item.href.endsWith(`/${industry.companySlug}`));
                        return (
                            <ScrollReveal key={industry.title} delayMs={((index % 3) + 1) * 200}>
                                <div className="h-full rounded-3xl border border-slate-200 bg-solstice-50 p-7 dark:border-slate-700/60 dark:bg-solstice-900">
                                    <h2 className="text-xl font-semibold text-slate-950 dark:text-white">{industry.title}</h2>
                                    <p className="mt-3 leading-7 text-slate-600 dark:text-slate-400">{industry.description}</p>
                                    {company && (
                                        <Link
                                            href={company.href}
                                            className="mt-4 inline-flex items-center text-sm font-semibold text-solstice-700 hover:text-solstice-900 dark:text-solstice-400 dark:hover:text-solstice-300"
                                        >
                                            Led by {company.label} →
                                        </Link>
                                    )}
                                </div>
                            </ScrollReveal>
                        );
                    })}
                </div>
            </section>
        </div>
    );
}
