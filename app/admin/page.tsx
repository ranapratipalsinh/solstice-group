import type { Metadata } from 'next';
import { PageHeader } from '@/components/PageHeader';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL ?? 'http://localhost:1337';

export const metadata: Metadata = {
    title: 'Admin | Solstice Group',
    robots: { index: false, follow: false },
};

export default function AdminPage() {
    return (
        <div>
            <PageHeader eyebrow="Admin" title="Manage this site in Strapi" />

            <section className="bg-white py-16 dark:bg-solstice-950 sm:py-20">
                <div className="container">
                    <div className="rounded-3xl bg-solstice-50 p-8 shadow-sm dark:bg-solstice-900 sm:p-10">
                        <p className="text-lg leading-8 text-slate-600 dark:text-slate-400">
                            Companies, team members, regions, industries, certifications, gallery items, partners, and contact submissions are all
                            managed in the Strapi admin panel.
                        </p>
                        <a
                            href={`${STRAPI_URL}/admin`}
                            target="_blank"
                            rel="noreferrer"
                            className="mt-8 inline-flex items-center justify-center rounded-full bg-solstice-700 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-solstice-500"
                        >
                            Open Strapi admin →
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}
