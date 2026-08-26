'use client';

import { useMemo, useState } from 'react';
import { Event } from '@/lib/cms/events';

export function ProjectsGrid({ projects }: { projects: Event[] }) {
    const companyFilters = useMemo(() => {
        const seen = new Map<string, string>();
        projects.forEach((project) => {
            if (project.companySlug && project.companyName && !seen.has(project.companySlug)) {
                seen.set(project.companySlug, project.companyName);
            }
        });
        return Array.from(seen, ([slug, name]) => ({ slug, name }));
    }, [projects]);

    const [activeFilter, setActiveFilter] = useState<string>('all');

    const filtered = activeFilter === 'all' ? projects : projects.filter((project) => project.companySlug === activeFilter);

    return (
        <div>
            {companyFilters.length > 1 && (
                <div className="mb-10 flex flex-wrap justify-center gap-3">
                    <button
                        type="button"
                        onClick={() => setActiveFilter('all')}
                        className={`rounded-full px-5 py-3 text-sm font-semibold transition-colors ${
                            activeFilter === 'all'
                                ? 'bg-solstice-700 text-white'
                                : 'bg-solstice-50 text-solstice-700 hover:bg-solstice-100 dark:bg-solstice-900 dark:text-solstice-400'
                        }`}
                    >
                        All
                    </button>
                    {companyFilters.map((company) => (
                        <button
                            key={company.slug}
                            type="button"
                            onClick={() => setActiveFilter(company.slug)}
                            className={`rounded-full px-5 py-3 text-sm font-semibold transition-colors ${
                                activeFilter === company.slug
                                    ? 'bg-solstice-700 text-white'
                                    : 'bg-solstice-50 text-solstice-700 hover:bg-solstice-100 dark:bg-solstice-900 dark:text-solstice-400'
                            }`}
                        >
                            {company.name}
                        </button>
                    ))}
                </div>
            )}

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map((project) => (
                    <article
                        key={project.slug}
                        className="overflow-hidden rounded-3xl border border-slate-200 bg-solstice-50 shadow-sm dark:border-slate-700/60 dark:bg-solstice-900"
                    >
                        {project.coverImageUrl && (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={project.coverImageUrl} alt={project.title} className="h-44 w-full object-cover" />
                        )}
                        <div className="p-6">
                            {project.companyName && (
                                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-solstice-700 dark:text-solstice-400">
                                    {project.companyName}
                                </p>
                            )}
                            <h3 className="mt-2 text-lg font-semibold text-slate-950 dark:text-white">{project.title}</h3>
                            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                {new Date(project.date).toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric' })}
                                {project.location ? ` · ${project.location}` : ''}
                            </p>
                            <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">{project.description}</p>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
}
