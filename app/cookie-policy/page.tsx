import type { Metadata } from 'next';
import { getSiteSettings } from '@/lib/cms/settings';
import { PageHeader } from '@/components/PageHeader';

export const metadata: Metadata = {
    title: 'Cookie Policy | Solstice Group',
    description: 'How Solstice Group uses cookies and similar technologies on this website.',
};

export default async function CookiePolicyPage() {
    const settings = await getSiteSettings();

    return (
        <div>
            <PageHeader eyebrow="Legal" title="Cookie Policy" />
            <section className="bg-white py-16 dark:bg-solstice-950 sm:py-20">
                <div className="container max-w-3xl space-y-8 text-slate-600 dark:text-slate-400">
                    <p className="text-sm text-slate-500 dark:text-slate-500">Last updated: 2026</p>

                    <div className="space-y-3">
                        <h2 className="font-display text-xl font-semibold text-slate-950 dark:text-white">1. What Are Cookies</h2>
                        <p className="leading-7">
                            Cookies are small text files stored on your device that help websites function correctly and remember your
                            preferences.
                        </p>
                    </div>

                    <div className="space-y-3">
                        <h2 className="font-display text-xl font-semibold text-slate-950 dark:text-white">2. How We Use Cookies and Similar Technology</h2>
                        <p className="leading-7">
                            This website does not use advertising or third-party tracking cookies. It stores your light/dark theme preference
                            in your browser's local storage, a similar technology to cookies, purely so the site remembers your choice between
                            visits.
                        </p>
                    </div>

                    <div className="space-y-3">
                        <h2 className="font-display text-xl font-semibold text-slate-950 dark:text-white">3. Managing This Data</h2>
                        <p className="leading-7">
                            You can clear your browser's local storage and cookies through your browser settings at any time. Doing so may
                            reset your theme preference but will not affect your ability to browse the site.
                        </p>
                    </div>

                    <div className="space-y-3">
                        <h2 className="font-display text-xl font-semibold text-slate-950 dark:text-white">4. Contact</h2>
                        <p className="leading-7">
                            Questions about this policy can be sent to {settings.groupEmail} or {settings.officeAddress}.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}
