import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ScrollToTopButton } from '@/components/ScrollToTopButton';
import { PageTransition } from '@/components/PageTransition';

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-sans',
    display: 'swap',
});

export const metadata: Metadata = {
    title: 'Solstice Group',
    description: 'Solstice Group parent company website for Solbath Global Private Limited, Solstice Spices, GTC Solstice Import Export, and more.',
};

const themeInitScript = `(function(){try{var stored=localStorage.getItem('theme');var prefersDark=window.matchMedia('(prefers-color-scheme: dark)').matches;var isDark=stored?stored==='dark':prefersDark;document.documentElement.classList.toggle('dark',isDark);if(!stored){window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change',function(e){document.documentElement.classList.toggle('dark',e.matches);});}}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className={inter.variable}>
            <head>
                <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
            </head>
            <body>
                <div className="flex min-h-screen flex-col bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100">
                    <Navbar />
                    <main className="flex-1">{children}</main>
                    <Footer />
                    <ScrollToTopButton />
                </div>
                <PageTransition />
            </body>
        </html>
    );
}
