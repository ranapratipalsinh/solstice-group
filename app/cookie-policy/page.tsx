import type { Metadata } from 'next';
import { getSiteSettings } from '@/lib/cms/settings';
import { getCookiePolicy, LegalSection } from '@/lib/cms/legal';
import { PageHeader } from '@/components/PageHeader';

export const metadata: Metadata = {
    title: 'Cookie Policy | Solstice Group',
    description: 'How Solstice Group uses cookies and similar technologies on this website.',
};

const DEFAULT_LAST_UPDATED = 'Last updated: 2026';

const DEFAULT_SECTIONS: LegalSection[] = [
    {
        title: '1. What Are Cookies',
        description: 'Cookies are small text files stored on your device that help websites function correctly and remember your preferences.',
    },
    {
        title: '2. How We Use Cookies and Similar Technology',
        description:
            "This website does not use advertising or third-party tracking cookies. It stores your light/dark theme preference in your browser's local storage, a similar technology to cookies, purely so the site remembers your choice between visits.",
    },
    {
        title: '3. Managing This Data',
        description:
            "You can clear your browser's local storage and cookies through your browser settings at any time. Doing so may reset your theme preference but will not affect your ability to browse the site.",
    },
];

export default async function CookiePolicyPage() {
    const [settings, legalPage] = await Promise.all([getSiteSettings(), getCookiePolicy()]);

    const lastUpdated = legalPage?.lastUpdated || DEFAULT_LAST_UPDATED;
    const sections = legalPage?.sections.length ? legalPage.sections : DEFAULT_SECTIONS;

    return (
        <div>
            <PageHeader eyebrow="Legal" title="Cookie Policy" />
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
                            Questions about this policy can be sent to {settings.groupEmail} or {settings.officeAddress}.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}
