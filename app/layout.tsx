import type { Metadata } from 'next';
import { Playfair_Display } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ScrollToTopButton } from '@/components/ScrollToTopButton';
import { PageTransition } from '@/components/PageTransition';

const playfairDisplay = Playfair_Display({
    subsets: ['latin'],
    variable: '--font-playfair',
    display: 'swap',
});

export const metadata: Metadata = {
    title: 'Solstice Group',
    description: 'Solstice Group parent company website for Solbath Global Private Limited, Solstice Spices, GTC Solstice Import Export, and more.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className={playfairDisplay.variable}>
            <body>
                <div className="flex min-h-screen flex-col bg-white text-slate-900">
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
