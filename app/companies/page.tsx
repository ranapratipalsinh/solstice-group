import type { Metadata } from 'next';
import { getCompanies } from '@/lib/cms/companies';
import { CompanyLinearCards } from '@/components/CompanyLinearCards';
import { ScrollReveal } from '@/components/ScrollReveal';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: 'Our Companies | Solstice Group',
    description: 'Meet the specialized companies operating under Solstice Group: Solstice Import Export, Solbath, GTS Events, and Solstice Spices.',
};

export default async function CompaniesPage() {
    const companies = await getCompanies();

    return (
        <div>
            <section
                className="relative flex min-h-[60vh] items-center overflow-hidden bg-cover bg-center py-20 text-center text-white"
                style={{ backgroundImage: "url('/hero/city-skyline-night.jpg')" }}
            >
                <div className="absolute inset-0 bg-gradient-to-b from-solstice-800/60 via-solstice-800/45 to-solstice-800/70" />
                <ScrollReveal className="container relative z-10">
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-solstice-300">Our Companies</p>
                    <h1 className="mt-4 font-display text-3xl font-semibold sm:text-4xl md:text-5xl">
                        Subsidiaries under Solstice Group
                    </h1>
                    <p className="mx-auto mt-6 max-w-2xl text-sm text-solstice-100 sm:text-lg">
                        Explore the businesses that operate under the Solstice Group umbrella, each serving a unique market and customer need.
                    </p>
                </ScrollReveal>
            </section>

            <section className="bg-white py-16 dark:bg-solstice-950 sm:py-20">
                <div className="container">
                    <CompanyLinearCards companies={companies} />
                </div>
            </section>
        </div>
    );
}
