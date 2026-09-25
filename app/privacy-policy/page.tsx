import type { Metadata } from 'next';
import { getSiteSettings } from '@/lib/cms/settings';
import { getPrivacyPolicy, LegalSection } from '@/lib/cms/legal';
import { PageHeader } from '@/components/PageHeader';

export const metadata: Metadata = {
    title: 'Privacy Policy | Solstice Group',
    description: 'How Solstice Group collects, uses, and protects the information you share with us.',
};

const DEFAULT_LAST_UPDATED = 'Last updated: 2026';

const DEFAULT_SECTIONS: LegalSection[] = [
    {
        title: '1. Introduction',
        description:
            'Solstice Group ("we", "us", "our") respects your privacy. This policy explains what information we collect through this website, how we use it, and the choices you have.',
    },
    {
        title: '2. Information We Collect',
        description:
            'We collect information you voluntarily provide through our contact and enquiry forms, such as your name, company, email address, phone number, and the content of your message. We do not knowingly collect sensitive personal information through this site.',
    },
    {
        title: '3. How We Use Your Information',
        description:
            'We use the information you submit solely to respond to your enquiry, evaluate business or partnership requests, and communicate with you about the subject of your message. We do not sell your personal information to third parties.',
    },
    {
        title: '4. Data Retention',
        description:
            'We retain enquiry submissions only as long as reasonably necessary to address your request and for our legitimate business record-keeping.',
    },
    {
        title: '5. Your Rights',
        description:
            'You may request access to, correction of, or deletion of the personal information you have submitted to us by contacting us using the details below.',
    },
];

export default async function PrivacyPolicyPage() {
    const [settings, legalPage] = await Promise.all([getSiteSettings(), getPrivacyPolicy()]);

    const lastUpdated = legalPage?.lastUpdated || DEFAULT_LAST_UPDATED;
    const sections = legalPage?.sections.length ? legalPage.sections : DEFAULT_SECTIONS;

    return (
        <div>
            <PageHeader eyebrow="Legal" title="Privacy Policy" />
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
