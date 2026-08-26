'use client';

import Link from 'next/link';
import { Company, imageForCompany } from '@/lib/cms/companies';
import {
    Dialog,
    DialogTrigger,
    DialogContainer,
    DialogContent,
    DialogClose,
    DialogTitle,
    DialogSubtitle,
    DialogDescription,
    DialogImage,
} from '@/components/ui/linear-card';
import { Bath, Wheat, Globe, PartyPopper, LucideIcon } from 'lucide-react';

const ICON_BY_KEYWORD: { keyword: string; icon: LucideIcon }[] = [
    { keyword: 'import', icon: Globe },
    { keyword: 'bath', icon: Bath },
    { keyword: 'spice', icon: Wheat },
    { keyword: 'event', icon: PartyPopper },
];

function iconForCompany(slug: string): LucideIcon {
    return ICON_BY_KEYWORD.find((item) => slug.includes(item.keyword))?.icon ?? Globe;
}

export function CompanyLinearCards({ companies }: { companies: Company[] }) {
    if (!companies.length) return null;

    return (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {companies.map((company) => {
                const hasLogo = Boolean(company.logoUrl);
                const imageUrl = company.logoUrl ?? imageForCompany(company.slug);
                const Icon = iconForCompany(company.slug);

                return (
                    <Dialog key={company.slug} transition={{ type: 'spring', bounce: 0.05, duration: 0.5 }}>
                        <DialogTrigger
                            style={{ borderRadius: '24px' }}
                            className="glass-card group flex w-full flex-col items-center p-6 text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-solstice-500 focus-visible:ring-offset-2"
                        >
                            <div className="relative mb-5 h-16 w-16 shrink-0">
                                <div className="h-full w-full overflow-hidden rounded-full shadow-inner ring-4 ring-white/70 dark:ring-slate-900/60">
                                    <DialogImage
                                        src={imageUrl}
                                        alt={company.name}
                                        className={`h-full w-full transition-transform duration-500 group-hover:scale-110 ${
                                            hasLogo ? 'object-contain bg-white p-2 dark:bg-slate-100' : 'object-cover'
                                        }`}
                                    />
                                </div>
                                <span className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-solstice-500 text-white shadow-sm dark:border-slate-900">
                                    <Icon className="h-3.5 w-3.5" strokeWidth={2} />
                                </span>
                            </div>
                            <DialogTitle className="text-xl font-bold text-solstice-800 dark:text-white">{company.name}</DialogTitle>
                            <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{company.tagline}</p>
                        </DialogTrigger>

                        <DialogContainer className="pt-20">
                            <DialogContent
                                style={{ borderRadius: '28px' }}
                                className="relative mx-auto flex h-full w-[90%] flex-col overflow-y-auto border border-slate-200 bg-white lg:w-[900px] dark:border-slate-800 dark:bg-solstice-900"
                            >
                                <DialogImage
                                    src={imageUrl}
                                    alt={company.name}
                                    className={`mx-auto h-full w-[60%] object-contain ${hasLogo ? 'bg-white p-6 dark:bg-slate-100' : ''}`}
                                />
                                <div className="p-6 sm:p-10">
                                    <DialogTitle className="font-display text-3xl font-semibold text-slate-950 dark:text-white sm:text-4xl">
                                        {company.name}
                                    </DialogTitle>
                                    <DialogSubtitle className="mt-2 text-sm font-semibold uppercase tracking-[0.2em] text-solstice-700 dark:text-solstice-400">
                                        {company.tagline}
                                    </DialogSubtitle>

                                    <DialogDescription
                                        disableLayoutAnimation
                                        variants={{
                                            initial: { opacity: 0, scale: 0.8, y: -40 },
                                            animate: { opacity: 1, scale: 1, y: 0 },
                                            exit: { opacity: 0, scale: 0.8, y: -50 },
                                        }}
                                    >
                                        <p className="mt-4 leading-7 text-slate-600 dark:text-slate-400">{company.description}</p>
                                        {company.services.length > 0 && (
                                            <div className="mt-4 flex flex-wrap gap-2">
                                                {company.services.map((service) => (
                                                    <span
                                                        key={service}
                                                        className="rounded-full bg-solstice-50 px-3 py-1 text-xs font-semibold text-solstice-700 dark:bg-solstice-500/10 dark:text-solstice-400"
                                                    >
                                                        {service}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                        <Link
                                            href={`/companies/${company.slug}`}
                                            className="mt-6 inline-block text-sm font-semibold text-solstice-700 hover:text-solstice-900 dark:text-solstice-400 dark:hover:text-solstice-300"
                                        >
                                            Visit company page →
                                        </Link>
                                    </DialogDescription>
                                </div>
                                <DialogClose className="absolute right-4 top-4 rounded-full bg-slate-100 p-3 text-slate-700 hover:bg-slate-200 dark:bg-solstice-800 dark:text-slate-300 dark:hover:bg-slate-700" />
                            </DialogContent>
                        </DialogContainer>
                    </Dialog>
                );
            })}
        </div>
    );
}
