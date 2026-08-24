import Link from 'next/link';
import { Globe } from 'lucide-react';
import { FacebookIcon, InstagramIcon, XIcon, LinkedInIcon, YoutubeIcon, WhatsAppIcon } from '@/components/icons/SocialIcons';
import { getSiteSettings } from '@/lib/cms/settings';
import { COMPANY_NAV_ITEMS } from '@/lib/nav';

const SOCIAL_ICON: Record<string, (props: { className?: string }) => JSX.Element> = {
    facebook: FacebookIcon,
    instagram: InstagramIcon,
    twitter: XIcon,
    linkedin: LinkedInIcon,
    youtube: YoutubeIcon,
    whatsapp: WhatsAppIcon,
};

export async function Footer() {
    const settings = await getSiteSettings();

    return (
        <footer className="border-t border-solstice-700 bg-solstice-800 text-solstice-100 dark:border-solstice-900 dark:bg-solstice-950">
            <div className="container py-16 sm:py-20">
                <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
                    <div>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="/logos/solstice-group-logo.png" alt="Solstice Trading International LLP" className="h-12 w-auto rounded-lg" />
                        <p className="mt-4 text-sm text-solstice-200">{settings.legalEntityName}</p>
                        {settings.socialLinks.length > 0 && (
                            <div className="mt-5 flex items-center gap-3">
                                {settings.socialLinks.map((link) => {
                                    const Icon = SOCIAL_ICON[link.platform] ?? Globe;
                                    return (
                                        <a
                                            key={link.url}
                                            href={link.url}
                                            target="_blank"
                                            rel="noreferrer"
                                            aria-label={link.platform}
                                            className="flex h-10 w-10 items-center justify-center rounded-full border border-solstice-600 text-solstice-200 transition-colors hover:border-solstice-400 hover:bg-solstice-700 hover:text-white"
                                        >
                                            <Icon className="h-4 w-4" />
                                        </a>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white">Solstice Group</p>
                        <ul className="mt-5 space-y-3 text-sm">
                            <li><Link href="/about" className="hover:text-solstice-300">About</Link></li>
                            <li><Link href="/about#our-story" className="hover:text-solstice-300">Our Story</Link></li>
                            <li><Link href="/founder-message" className="hover:text-solstice-300">Founder</Link></li>
                            <li><Link href="/leadership" className="hover:text-solstice-300">Leadership</Link></li>
                            <li><Link href="/about#sustainability" className="hover:text-solstice-300">Sustainability</Link></li>
                        </ul>
                    </div>
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white">Business</p>
                        <ul className="mt-5 space-y-3 text-sm">
                            <li><Link href="/industries" className="hover:text-solstice-300">Industries</Link></li>
                            <li><Link href="/projects" className="hover:text-solstice-300">Projects</Link></li>
                            <li><Link href="/global-presence" className="hover:text-solstice-300">Global Presence</Link></li>
                            <li><Link href="/certifications" className="hover:text-solstice-300">Certifications</Link></li>
                        </ul>
                    </div>
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white">Our Companies</p>
                        <ul className="mt-5 space-y-3 text-sm">
                            {COMPANY_NAV_ITEMS.map((company) => (
                                <li key={company.href}>
                                    <Link href={company.href} className="hover:text-solstice-300">{company.label}</Link>
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
                        <Link
                            href="/contact"
                            className="mt-6 inline-flex items-center justify-center rounded-full bg-white/10 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/20"
                        >
                            Contact Solstice Group
                        </Link>
                    </div>
                </div>
                <div className="mt-14 flex flex-col gap-3 border-t border-solstice-700 pt-8 text-xs text-solstice-300 sm:flex-row sm:items-center sm:justify-between">
                    <p>© {new Date().getFullYear()} Solstice Group. All Rights Reserved.</p>
                    <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                        <Link href="/privacy-policy" className="hover:text-solstice-100">Privacy Policy</Link>
                        <Link href="/terms-and-conditions" className="hover:text-solstice-100">Terms & Conditions</Link>
                        <Link href="/cookie-policy" className="hover:text-solstice-100">Cookie Policy</Link>
                        <a href="https://ivisioncraft.dev/" target="_blank" rel="noreferrer" className="hover:text-solstice-100">
                            Design by iVisionCraft
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
