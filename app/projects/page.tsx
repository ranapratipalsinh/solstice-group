import type { Metadata } from 'next';
import { getEvents } from '@/lib/cms/events';
import { PageHeader } from '@/components/PageHeader';
import { ScrollReveal } from '@/components/ScrollReveal';
import { ProjectsGrid } from '@/components/ProjectsGrid';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: 'Projects & Portfolio | Solstice Group',
    description: 'Recent events, launches, and projects delivered by companies across Solstice Group.',
};

export default async function ProjectsPage() {
    const events = await getEvents();

    return (
        <div>
            <PageHeader
                eyebrow="Projects & Portfolio"
                title="Recent work across the group"
                description="Events, launches, and initiatives delivered by our subsidiary companies."
            />

            <section className="bg-white py-16 dark:bg-solstice-950 sm:py-20">
                <div className="container">
                    {events.length === 0 ? (
                        <ScrollReveal>
                            <p className="text-center text-slate-600 dark:text-slate-400">Projects will appear here once added in the CMS.</p>
                        </ScrollReveal>
                    ) : (
                        <ProjectsGrid projects={events} />
                    )}
                </div>
            </section>
        </div>
    );
}
