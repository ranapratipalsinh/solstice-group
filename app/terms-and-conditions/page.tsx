import type { Metadata } from 'next';
import { getSiteSettings } from '@/lib/cms/settings';
import { getTermsAndConditions, LegalSection } from '@/lib/cms/legal';
import { PageHeader } from '@/components/PageHeader';

export const metadata: Metadata = {
    title: 'Terms & Conditions | Solstice Group',
    description: 'The terms that govern your use of the Solstice Group website.',
};

const DEFAULT_LAST_UPDATED = 'Last updated: 2026';

const DEFAULT_SECTIONS: LegalSection[] = [
    {
        title: '1. Acceptance of Terms',
        description: 'By accessing this website, you agree to be bound by these terms. If you do not agree, please do not use this site.',
    },
    {
        title: '2. Use of Content',
        description:
            'All text, images, logos, and other content on this website belong to Solstice Group and its subsidiary companies unless otherwise noted. You may not reproduce, distribute, or use this content commercially without our written permission.',
    },
    {
        title: '3. No Warranty',
        description:
            'This website and its content are provided "as is". While we aim to keep information accurate and current, we make no warranty as to its completeness or accuracy.',
    },
    {
        title: '4. Enquiries and Business Dealings',
        description:
            'Submitting an enquiry through this website does not create a binding business relationship. Any commercial arrangement with Solstice Group or its subsidiary companies is subject to a separate written agreement.',
    },
    {
        title: '5. Changes to These Terms',
        description:
            'We may update these terms from time to time. Continued use of the website after changes are posted constitutes acceptance of the revised terms.',
    },
];

export default async function TermsPage() {
    const [settings, legalPage] = await Promise.all([getSiteSettings(), getTermsAndConditions()]);

    const lastUpdated = legalPage?.lastUpdated || DEFAULT_LAST_UPDATED;
    const sections = legalPage?.sections.length ? legalPage.sections : DEFAULT_SECTIONS;

    return (
        <div>
            <PageHeader eyebrow="Legal" title="Terms & Conditions" />
            <section className="bg-white py-16 dark:bg-solstice-900 sm:py-20">
                <div className="container max-w-3xl space-y-8 text-slate-600 dark:text-slate-400">
                    <p className="text-sm text-slate-500 dark:text-slate-400">{lastUpdated}</p>

                    {sections.map((section) => (
                        <div key={section.title} className="space-y-3">
                            <h2 className="font-display text-xl font-semibold text-slate-950 dark:text-white">{section.title}</h2>
                            <p className="leading-7">{section.description}</p>
                        </div>
                    ))}

                    <div className="space-y-3">
                        <h2 className="font-display text-xl font-semibold text-slate-950 dark:text-white">{sections.length + 1}. Contact</h2>
                        <p className="leading-7">
                            Questions about these terms can be sent to {settings.groupEmail} or {settings.officeAddress}.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}
