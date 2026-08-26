'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ThemeToggle } from '@/components/ThemeToggle';

const primaryNavItems = [{ href: '/', label: 'Home' }];

const aboutDropdownItems = [
    { href: '/about#our-story', label: 'Our Story' },
    { href: '/about#vision-mission', label: 'Vision & Mission' },
    { href: '/founder-message', label: 'Founder' },
    { href: '/leadership', label: 'Leadership' },
    { href: '/about#sustainability', label: 'Sustainability' },
];

const trailingNavItems = [
    { href: '/industries', label: 'Industries' },
    { href: '/projects', label: 'Projects' },
    { href: '/global-presence', label: 'Global Presence' },
];

const contactNavItem = { href: '/contact', label: "Let's Talk" };

export function Navbar({ companies }: { companies: { href: string; label: string }[] }) {
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [isAboutOpen, setIsAboutOpen] = useState(false);
    const [isCompaniesOpen, setIsCompaniesOpen] = useState(false);
    const [isMobileAboutOpen, setIsMobileAboutOpen] = useState(false);
    const [isMobileCompaniesOpen, setIsMobileCompaniesOpen] = useState(false);

    const closeAll = () => {
        setIsMobileOpen(false);
        setIsAboutOpen(false);
        setIsCompaniesOpen(false);
        setIsMobileAboutOpen(false);
        setIsMobileCompaniesOpen(false);
    };

    useEffect(() => {
        document.documentElement.classList.toggle('mobile-nav-open', isMobileOpen);
        return () => document.documentElement.classList.remove('mobile-nav-open');
    }, [isMobileOpen]);

    return (
        <header className="sticky top-0 z-50 border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-solstice-950">
            <div className="container flex items-center justify-between py-5">
                <Link href="/" className="flex items-center overflow-hidden rounded-xl" onClick={closeAll}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/logos/solstice-group-logo.png" alt="Solstice Group" className="h-14 w-auto" />
                </Link>

                <nav className="hidden md:flex items-center gap-7 text-sm font-medium tracking-wide text-slate-600 dark:text-slate-300">
                    {primaryNavItems.map((item) => (
                        <Link key={item.href} href={item.href} className="hover:text-solstice-700 dark:hover:text-solstice-400" onClick={closeAll}>
                            {item.label}
                        </Link>
                    ))}

                    <NavDropdown label="About" isOpen={isAboutOpen} setIsOpen={setIsAboutOpen} items={aboutDropdownItems} onNavigate={closeAll} />
                    <NavDropdown label="Our Companies" isOpen={isCompaniesOpen} setIsOpen={setIsCompaniesOpen} items={companies} onNavigate={closeAll} />

                    {trailingNavItems.map((item) => (
                        <Link key={item.href} href={item.href} className="hover:text-solstice-700 dark:hover:text-solstice-400" onClick={closeAll}>
                            {item.label}
                        </Link>
                    ))}
                </nav>

                <div className="flex items-center gap-3">
                    <Link
                        href={contactNavItem.href}
                        className="hidden rounded-full bg-solstice-700 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-solstice-500 md:inline-flex"
                        onClick={closeAll}
                    >
                        {contactNavItem.label}
                    </Link>
                    <ThemeToggle />

                    <button
                        type="button"
                        className="md:hidden inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 text-slate-700 dark:border-slate-700 dark:text-slate-300"
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
            </div>

            {isMobileOpen && (
                <nav className="md:hidden border-t border-slate-200 bg-white px-4 py-4 dark:border-slate-800 dark:bg-solstice-950">
                    <div className="flex flex-col gap-1 text-sm font-semibold text-slate-700 dark:text-slate-300">
                        {primaryNavItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="rounded-xl px-3 py-3 hover:bg-solstice-50 hover:text-solstice-700 dark:hover:bg-solstice-500/10 dark:hover:text-solstice-400"
                                onClick={closeAll}
                            >
                                {item.label}
                            </Link>
                        ))}

                        <MobileNavGroup label="About" isOpen={isMobileAboutOpen} setIsOpen={setIsMobileAboutOpen} items={aboutDropdownItems} onNavigate={closeAll} />
                        <MobileNavGroup label="Our Companies" isOpen={isMobileCompaniesOpen} setIsOpen={setIsMobileCompaniesOpen} items={companies} onNavigate={closeAll} />

                        {trailingNavItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="rounded-xl px-3 py-3 hover:bg-solstice-50 hover:text-solstice-700 dark:hover:bg-solstice-500/10 dark:hover:text-solstice-400"
                                onClick={closeAll}
                            >
                                {item.label}
                            </Link>
                        ))}

                        <Link
                            href={contactNavItem.href}
                            className="mt-2 rounded-xl bg-solstice-700 px-3 py-3 text-center text-white hover:bg-solstice-500"
                            onClick={closeAll}
                        >
                            {contactNavItem.label}
                        </Link>
                    </div>
                </nav>
            )}
        </header>
    );
}

function NavDropdown({
    label,
    isOpen,
    setIsOpen,
    items,
    onNavigate,
}: {
    label: string;
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    items: { href: string; label: string }[];
    onNavigate: () => void;
}) {
    return (
        <div className="relative" onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
            <button
                type="button"
                className="flex items-center gap-1 hover:text-solstice-700 dark:hover:text-solstice-400"
                aria-expanded={isOpen}
                onClick={() => setIsOpen(!isOpen)}
            >
                {label}
                <span className="text-[10px]">▾</span>
            </button>
            {isOpen && (
                <div className="absolute left-0 top-full w-64 rounded-2xl border border-slate-200 bg-white py-2 shadow-lg normal-case tracking-normal dark:border-slate-800 dark:bg-solstice-900">
                    {items.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="block px-4 py-2 text-sm text-slate-700 hover:bg-solstice-50 hover:text-solstice-700 dark:text-slate-300 dark:hover:bg-solstice-500/10 dark:hover:text-solstice-400"
                            onClick={onNavigate}
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}

function MobileNavGroup({
    label,
    isOpen,
    setIsOpen,
    items,
    onNavigate,
}: {
    label: string;
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    items: { href: string; label: string }[];
    onNavigate: () => void;
}) {
    return (
        <>
            <button
                type="button"
                className="flex items-center justify-between rounded-xl px-3 py-3 text-left hover:bg-solstice-50 hover:text-solstice-700 dark:hover:bg-solstice-500/10 dark:hover:text-solstice-400"
                aria-expanded={isOpen}
                onClick={() => setIsOpen(!isOpen)}
            >
                {label}
                <span className="text-xs">{isOpen ? '▴' : '▾'}</span>
            </button>
            {isOpen && (
                <div className="ml-3 flex flex-col gap-1 border-l border-slate-200 pl-3 dark:border-slate-800">
                    {items.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="rounded-xl px-3 py-2 font-medium text-slate-600 hover:bg-solstice-50 hover:text-solstice-700 dark:text-slate-400 dark:hover:bg-solstice-500/10 dark:hover:text-solstice-400"
                            onClick={onNavigate}
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>
            )}
        </>
    );
}
