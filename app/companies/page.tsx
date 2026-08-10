import { getCompanies } from '@/lib/cms/companies';
import { CompanyCard } from '@/components/CompanyCard';
import { ScrollReveal } from '@/components/ScrollReveal';

export const dynamic = 'force-dynamic';

export default async function CompaniesPage() {
    const companies = await getCompanies();

    return (
        <div>
            <section
                className="relative flex min-h-[60vh] items-center overflow-hidden bg-cover bg-center py-20 text-center text-white"
                style={{ backgroundImage: "url('/hero/city-skyline-night.jpg')" }}
            >
                <div className="absolute inset-0 bg-gradient-to-b from-solstice-950/90 via-solstice-950/80 to-solstice-950/95" />
                <div className="container relative z-10">
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-solstice-300">Our Companies</p>
                    <h1 className="mt-4 font-display text-3xl font-semibold sm:text-4xl md:text-5xl">
                        Subsidiaries under Solstice Group
                    </h1>
                    <p className="mx-auto mt-6 max-w-2xl text-sm text-solstice-100 sm:text-lg">
                        Explore the businesses that operate under the Solstice Group umbrella, each serving a unique market and customer need.
                    </p>
                </div>
            </section>

            <section className="bg-solstice-50/70 py-14 sm:py-16">
                <div className="container">
                    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                        {companies.map((company, index) => (
                            <ScrollReveal key={company.slug} delayMs={((index % 3) + 1) * 200}>
                                <CompanyCard company={company} />
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
