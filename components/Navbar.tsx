'use client';

import Link from 'next/link';
import { useState } from 'react';

const primaryNavItems = [
    { href: '/', label: 'Home' },
    { href: '/companies', label: 'Our Companies' },
    { href: '/industries', label: 'Industries' },
    { href: '/careers', label: 'Careers' },
    { href: '/news', label: 'News' },
    { href: '/events', label: 'Events' },
    { href: '/contact', label: 'Contact' },
];

const aboutDropdownItems = [
    { href: '/about', label: 'About the Group' },
    { href: '/leadership', label: 'Leadership Team' },
    { href: '/founder-message', label: 'Founder Message' },
    { href: '/csr', label: 'CSR / Social Work' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/certifications', label: 'Certifications & Awards' },
    { href: '/partners', label: 'Partners & Clients' },
];

export function Navbar() {
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [isAboutOpen, setIsAboutOpen] = useState(false);
    const [isMobileAboutOpen, setIsMobileAboutOpen] = useState(false);

    const closeAll = () => {
        setIsMobileOpen(false);
        setIsAboutOpen(false);
        setIsMobileAboutOpen(false);
    };

    return (
        <header className="sticky top-0 z-50 border-b border-slate-200 bg-white">
            <div className="container flex items-center justify-between py-5">
                <Link href="/" className="flex items-center overflow-hidden rounded-xl" onClick={closeAll}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/logos/solstice-group-logo.png" alt="Solstice Group" className="h-14 w-auto" />
                </Link>

                <nav className="hidden md:flex items-center gap-7 text-sm font-medium tracking-wide text-slate-600">
                    <div
                        className="relative"
                        onMouseEnter={() => setIsAboutOpen(true)}
                        onMouseLeave={() => setIsAboutOpen(false)}
                    >
                        <button
                            type="button"
                            className="flex items-center gap-1 hover:text-solstice-700"
                            aria-expanded={isAboutOpen}
                            onClick={() => setIsAboutOpen((open) => !open)}
                        >
                            About
                            <span className="text-[10px]">▾</span>
                        </button>
                        {isAboutOpen && (
                            <div className="absolute left-0 top-full w-64 rounded-2xl border border-slate-200 bg-white py-2 shadow-lg normal-case tracking-normal">
                                {aboutDropdownItems.map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className="block px-4 py-2 text-sm text-slate-700 hover:bg-solstice-50 hover:text-solstice-700"
                                        onClick={closeAll}
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                    {primaryNavItems.map((item) => (
                        <Link key={item.href} href={item.href} className="hover:text-solstice-700" onClick={closeAll}>
                            {item.label}
                        </Link>
                    ))}
                </nav>

                <button
                    type="button"
                    className="md:hidden inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 text-slate-700"
                    aria-label="Toggle navigation menu"
                    aria-expanded={isMobileOpen}
                    onClick={() => setIsMobileOpen((open) => !open)}
                >
                    <span className="sr-only">Toggle navigation menu</span>
                    {isMobileOpen ? (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M6 6l12 12M6 18L18 6" strokeLinecap="round" />
                        </svg>
                    ) : (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
                        </svg>
                    )}
                </button>
            </div>

            {isMobileOpen && (
                <nav className="md:hidden border-t border-slate-200 bg-white px-4 py-4">
                    <div className="flex flex-col gap-1 text-sm font-semibold text-slate-700">
                        <button
                            type="button"
                            className="flex items-center justify-between rounded-xl px-3 py-3 text-left hover:bg-solstice-50 hover:text-solstice-700"
                            aria-expanded={isMobileAboutOpen}
                            onClick={() => setIsMobileAboutOpen((open) => !open)}
                        >
                            About
                            <span className="text-xs">{isMobileAboutOpen ? '▴' : '▾'}</span>
                        </button>
                        {isMobileAboutOpen && (
                            <div className="ml-3 flex flex-col gap-1 border-l border-slate-200 pl-3">
                                {aboutDropdownItems.map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className="rounded-xl px-3 py-2 font-medium text-slate-600 hover:bg-solstice-50 hover:text-solstice-700"
                                        onClick={closeAll}
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                            </div>
                        )}
                        {primaryNavItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="rounded-xl px-3 py-3 hover:bg-solstice-50 hover:text-solstice-700"
                                onClick={closeAll}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>
                </nav>
            )}
        </header>
    );
}
