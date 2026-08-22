import { getIndustries } from '@/lib/cms/industries';
import { PageHeader } from '@/components/PageHeader';
import { ScrollReveal } from '@/components/ScrollReveal';

export const dynamic = 'force-dynamic';

export default async function IndustriesPage() {
    const industries = await getIndustries();

    return (
        <div>
            <PageHeader
                eyebrow="Industries We Serve"
                title="Specialized services for modern business needs."
                description="Solstice Group connects trading, wellness, spices, and events with strong operational support and strategic leadership."
            />

            <section className="bg-white py-16 dark:bg-solstice-950 sm:py-20">
                <div className="container grid gap-6 md:grid-cols-2">
                    {industries.map((industry, index) => (
                        <ScrollReveal key={industry.title} delayMs={((index % 3) + 1) * 200}>
                            <div className="h-full rounded-3xl border border-slate-200 bg-solstice-50 p-7 dark:border-slate-700/60 dark:bg-solstice-900">
                                <h2 className="text-xl font-semibold text-slate-950 dark:text-white">{industry.title}</h2>
                                <p className="mt-3 leading-7 text-slate-600 dark:text-slate-400">{industry.description}</p>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </section>
        </div>
    );
}
