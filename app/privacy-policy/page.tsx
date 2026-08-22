import type { Metadata } from 'next';
import { getSiteSettings } from '@/lib/cms/settings';
import { PageHeader } from '@/components/PageHeader';

export const metadata: Metadata = {
    title: 'Privacy Policy | Solstice Group',
    description: 'How Solstice Group collects, uses, and protects the information you share with us.',
};

export default async function PrivacyPolicyPage() {
    const settings = await getSiteSettings();

    return (
        <div>
            <PageHeader eyebrow="Legal" title="Privacy Policy" />
            <section className="bg-white py-16 dark:bg-solstice-950 sm:py-20">
                <div className="container max-w-3xl space-y-8 text-slate-600 dark:text-slate-400">
                    <p className="text-sm text-slate-500 dark:text-slate-500">Last updated: 2026</p>

                    <div className="space-y-3">
                        <h2 className="font-display text-xl font-semibold text-slate-950 dark:text-white">1. Introduction</h2>
                        <p className="leading-7">
                            Solstice Group ("we", "us", "our") respects your privacy. This policy explains what information we collect through this
                            website, how we use it, and the choices you have.
                        </p>
                    </div>

                    <div className="space-y-3">
                        <h2 className="font-display text-xl font-semibold text-slate-950 dark:text-white">2. Information We Collect</h2>
                        <p className="leading-7">
                            We collect information you voluntarily provide through our contact and enquiry forms, such as your name, company,
                            email address, phone number, and the content of your message. We do not knowingly collect sensitive personal
                            information through this site.
                        </p>
                    </div>

                    <div className="space-y-3">
                        <h2 className="font-display text-xl font-semibold text-slate-950 dark:text-white">3. How We Use Your Information</h2>
                        <p className="leading-7">
                            We use the information you submit solely to respond to your enquiry, evaluate business or partnership requests, and
                            communicate with you about the subject of your message. We do not sell your personal information to third parties.
                        </p>
                    </div>

                    <div className="space-y-3">
                        <h2 className="font-display text-xl font-semibold text-slate-950 dark:text-white">4. Data Retention</h2>
                        <p className="leading-7">
                            We retain enquiry submissions only as long as reasonably necessary to address your request and for our legitimate
                            business record-keeping.
                        </p>
                    </div>

                    <div className="space-y-3">
                        <h2 className="font-display text-xl font-semibold text-slate-950 dark:text-white">5. Your Rights</h2>
                        <p className="leading-7">
                            You may request access to, correction of, or deletion of the personal information you have submitted to us by
                            contacting us using the details below.
                        </p>
                    </div>

                    <div className="space-y-3">
                        <h2 className="font-display text-xl font-semibold text-slate-950 dark:text-white">6. Contact</h2>
                        <p className="leading-7">
                            Questions about this policy can be sent to {settings.groupEmail} or {settings.officeAddress}.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}
