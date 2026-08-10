import { getIndustries } from '@/lib/cms/industries';
import { ScrollReveal } from '@/components/ScrollReveal';

export const dynamic = 'force-dynamic';

export default async function IndustriesPage() {
    const industries = await getIndustries();

    return (
        <div className="container py-16">
            <div className="rounded-[2rem] bg-white p-6 shadow-sm sm:p-10">
                <p className="text-sm uppercase tracking-[0.3em] text-solstice-700">Industries We Serve</p>
                <h1 className="mt-4 font-display text-3xl font-semibold text-slate-950 sm:text-4xl">Specialized services for modern business needs.</h1>
                <p className="mt-6 text-lg leading-8 text-slate-600">
                    Solstice Group connects trading, wellness, spices, and events with strong operational support and strategic leadership.
                </p>
                <div className="mt-10 grid gap-6 md:grid-cols-2">
                    {industries.map((industry, index) => (
                        <ScrollReveal key={industry.title} delayMs={((index % 3) + 1) * 200}>
                            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-7">
                                <h2 className="text-xl font-semibold text-slate-950">{industry.title}</h2>
                                <p className="mt-3 text-slate-600 leading-7">{industry.description}</p>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </div>
    );
}
