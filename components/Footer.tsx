import Link from 'next/link';
import { getSiteSettings } from '@/lib/cms/settings';
import { getCompanies } from '@/lib/cms/companies';

export async function Footer() {
    const [settings, companies] = await Promise.all([getSiteSettings(), getCompanies()]);

    return (
        <footer className="border-t border-solstice-800 bg-solstice-950 text-solstice-100">
            <div className="container py-16 sm:py-20">
                <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
                    <div>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="/logos/solstice-group-logo.png" alt="Solstice Trading International LLP" className="h-12 w-auto rounded-lg" />
                        <p className="mt-4 text-sm text-solstice-200">Solstice Trading International LLP</p>
                    </div>
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white">Companies</p>
                        <ul className="mt-5 space-y-3 text-sm">
                            {companies.map((company) => (
                                <li key={company.slug}>
                                    <Link href={`/companies/${company.slug}`} className="hover:text-solstice-300">{company.name}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white">Contact</p>
                        <ul className="mt-5 space-y-3 text-sm">
                            <li>{settings.officeAddress}</li>
                            <li>{settings.groupEmail}</li>
                            <li>{settings.groupPhone}</li>
                        </ul>
                    </div>
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white">Quick Links</p>
                        <ul className="mt-5 space-y-3 text-sm">
                            <li><Link href="/about" className="hover:text-solstice-300">About the Group</Link></li>
                            <li><Link href="/careers" className="hover:text-solstice-300">Careers</Link></li>
                            <li><Link href="/contact" className="hover:text-solstice-300">Contact</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="mt-14 flex flex-col gap-3 border-t border-solstice-800 pt-8 text-xs text-solstice-300 sm:flex-row sm:items-center sm:justify-between">
                    <p>© {new Date().getFullYear()} Solstice Trading International LLP. Built for corporate growth.</p>
                    <a
                        href="https://ivisioncraft.dev/"
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-solstice-100"
                    >
                        Design by iVisionCraft
                    </a>
                </div>
            </div>
        </footer>
    );
}
