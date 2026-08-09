'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Company } from '@/lib/cms/companies';

const AUTO_ADVANCE_MS = 3000;

const IMAGE_BY_KEYWORD: { keyword: string; src: string }[] = [
    { keyword: 'import', src: '/companies/import-export.jpg' },
    { keyword: 'bath', src: '/companies/bath.jpg' },
    { keyword: 'spice', src: '/companies/spices.jpg' },
    { keyword: 'event', src: '/companies/event.jpg' },
];

function imageForCompany(slug: string) {
    const match = IMAGE_BY_KEYWORD.find((item) => slug.includes(item.keyword));
    return match?.src ?? '/companies/import-export.jpg';
}

export function CompanyShowcase({ companies }: { companies: Company[] }) {
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        if (companies.length <= 1) return;

        const timer = setInterval(() => {
            setActiveIndex((current) => (current + 1) % companies.length);
        }, AUTO_ADVANCE_MS);

        return () => clearInterval(timer);
    }, [activeIndex, companies.length]);

    const active = companies[activeIndex];

    if (!active) return null;

    return (
        <section
            className="relative flex min-h-[85vh] items-center overflow-hidden bg-cover bg-center text-white transition-[background-image] duration-700"
            style={{ backgroundImage: `url('${imageForCompany(active.slug)}')` }}
        >
            <div className="absolute inset-0 bg-gradient-to-r from-solstice-950/95 via-solstice-950/85 to-solstice-950/50" />
            <div className="container relative z-10">
                <div className="grid gap-10 lg:grid-cols-[1.3fr_0.7fr] lg:items-center">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-solstice-300">Our Companies</p>
                        <h2 className="mt-4 font-display text-3xl font-semibold sm:text-4xl md:text-5xl">{active.name}</h2>
                        <p className="mt-6 max-w-xl text-sm leading-7 text-solstice-100 sm:text-base">{active.description}</p>
                        <Link
                            href={`/companies/${active.slug}`}
                            className="mt-8 inline-block rounded-full border border-white/50 px-8 py-3 text-sm font-semibold text-white hover:bg-white/10"
                        >
                            Read More →
                        </Link>
                    </div>
                    <div className="flex flex-col gap-1 lg:border-l lg:border-white/20 lg:pl-10">
                        {companies.map((company, index) => (
                            <button
                                key={company.slug}
                                type="button"
                                onClick={() => setActiveIndex(index)}
                                className={`border-b py-3 text-left text-sm font-semibold uppercase tracking-[0.15em] transition ${
                                    index === activeIndex
                                        ? 'border-solstice-400 text-white'
                                        : 'border-white/10 text-solstice-200 hover:text-white'
                                }`}
                            >
                                {company.name}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
