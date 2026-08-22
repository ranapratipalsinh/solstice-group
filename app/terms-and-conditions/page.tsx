import type { Metadata } from 'next';
import { getSiteSettings } from '@/lib/cms/settings';
import { PageHeader } from '@/components/PageHeader';

export const metadata: Metadata = {
    title: 'Terms & Conditions | Solstice Group',
    description: 'The terms that govern your use of the Solstice Group website.',
};

export default async function TermsPage() {
    const settings = await getSiteSettings();

    return (
        <div>
            <PageHeader eyebrow="Legal" title="Terms & Conditions" />
            <section className="bg-white py-16 dark:bg-solstice-950 sm:py-20">
                <div className="container max-w-3xl space-y-8 text-slate-600 dark:text-slate-400">
                    <p className="text-sm text-slate-500 dark:text-slate-500">Last updated: 2026</p>

                    <div className="space-y-3">
                        <h2 className="font-display text-xl font-semibold text-slate-950 dark:text-white">1. Acceptance of Terms</h2>
                        <p className="leading-7">
                            By accessing this website, you agree to be bound by these terms. If you do not agree, please do not use this site.
                        </p>
                    </div>

                    <div className="space-y-3">
                        <h2 className="font-display text-xl font-semibold text-slate-950 dark:text-white">2. Use of Content</h2>
                        <p className="leading-7">
                            All text, images, logos, and other content on this website belong to Solstice Group and its subsidiary companies
                            unless otherwise noted. You may not reproduce, distribute, or use this content commercially without our written
                            permission.
                        </p>
                    </div>

                    <div className="space-y-3">
                        <h2 className="font-display text-xl font-semibold text-slate-950 dark:text-white">3. No Warranty</h2>
                        <p className="leading-7">
                            This website and its content are provided "as is". While we aim to keep information accurate and current, we make no
                            warranty as to its completeness or accuracy.
                        </p>
                    </div>

                    <div className="space-y-3">
                        <h2 className="font-display text-xl font-semibold text-slate-950 dark:text-white">4. Enquiries and Business Dealings</h2>
                        <p className="leading-7">
                            Submitting an enquiry through this website does not create a binding business relationship. Any commercial
                            arrangement with Solstice Group or its subsidiary companies is subject to a separate written agreement.
                        </p>
                    </div>

                    <div className="space-y-3">
                        <h2 className="font-display text-xl font-semibold text-slate-950 dark:text-white">5. Changes to These Terms</h2>
                        <p className="leading-7">
                            We may update these terms from time to time. Continued use of the website after changes are posted constitutes
                            acceptance of the revised terms.
                        </p>
                    </div>

                    <div className="space-y-3">
                        <h2 className="font-display text-xl font-semibold text-slate-950 dark:text-white">6. Contact</h2>
                        <p className="leading-7">
                            Questions about these terms can be sent to {settings.groupEmail} or {settings.officeAddress}.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}
