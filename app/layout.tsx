import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ScrollToTopButton } from '@/components/ScrollToTopButton';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { PageTransition } from '@/components/PageTransition';
import { getSiteSettings } from '@/lib/cms/settings';
import { getCompanies } from '@/lib/cms/companies';

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-sans',
    display: 'swap',
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://group.solsticellp.com';

export const metadata: Metadata = {
    metadataBase: new URL(SITE_URL),
    title: 'Solstice Group | A Diversified Group of Companies',
    description:
        'Solstice Group is a diversified business group operating across international trade, spices manufacturing, bathware, and events through specialized companies.',
    openGraph: {
        type: 'website',
        siteName: 'Solstice Group',
        title: 'Solstice Group | A Diversified Group of Companies',
        description:
            'Solstice Group is a diversified business group operating across international trade, spices manufacturing, bathware, and events through specialized companies.',
        images: ['/logos/solstice-group-logo.png'],
    },
    twitter: {
        card: 'summary',
        title: 'Solstice Group | A Diversified Group of Companies',
        description:
            'Solstice Group is a diversified business group operating across international trade, spices manufacturing, bathware, and events through specialized companies.',
        images: ['/logos/solstice-group-logo.png'],
    },
};

const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Solstice Group',
    url: SITE_URL,
    logo: `${SITE_URL}/logos/solstice-group-logo.png`,
};

const themeInitScript = `(function(){try{var stored=localStorage.getItem('theme');var prefersDark=window.matchMedia('(prefers-color-scheme: dark)').matches;var isDark=stored?stored==='dark':prefersDark;document.documentElement.classList.toggle('dark',isDark);if(!stored){window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change',function(e){document.documentElement.classList.toggle('dark',e.matches);});}}catch(e){}})();`;

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    const [settings, companies] = await Promise.all([getSiteSettings(), getCompanies()]);
    const companyNavItems = companies.map((company) => ({ href: `/companies/${company.slug}`, label: company.name }));

    return (
        <html lang="en" className={inter.variable} data-scroll-behavior="smooth" suppressHydrationWarning>
            <head>
                <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
            </head>
            <body>
                <div className="flex min-h-screen flex-col bg-white text-slate-900 dark:bg-solstice-950 dark:text-slate-100">
                    <Navbar companies={companyNavItems} />
                    <main className="flex-1">{children}</main>
                    <Footer />
                    <WhatsAppButton phoneNumber={settings.whatsappNumber} message={settings.whatsappDefaultMessage} />
                    <ScrollToTopButton />
                </div>
                <PageTransition />
            </body>
        </html>
    );
}
