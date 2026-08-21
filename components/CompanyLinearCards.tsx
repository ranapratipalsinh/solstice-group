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
import { Plus } from 'lucide-react';

export function CompanyLinearCards({ companies }: { companies: Company[] }) {
    if (!companies.length) return null;

    return (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {companies.map((company) => {
                const imageUrl = imageForCompany(company.slug);

                return (
                    <Dialog key={company.slug} transition={{ type: 'spring', bounce: 0.05, duration: 0.5 }}>
                        <DialogTrigger
                            style={{ borderRadius: '20px' }}
                            className="flex w-full flex-col overflow-hidden border border-slate-200 bg-white shadow-sm hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
                        >
                            <DialogImage src={imageUrl} alt={company.name} className="h-48 w-full object-cover" />
                            <div className="flex flex-grow flex-row items-end justify-between p-4 pr-14">
                                <DialogTitle className="text-lg font-semibold text-slate-950 dark:text-white">{company.name}</DialogTitle>
                                <span className="absolute bottom-3 right-3 shrink-0 rounded-full bg-solstice-100 p-2 text-solstice-700 dark:bg-solstice-500/15 dark:text-solstice-400">
                                    <Plus className="h-5 w-5" />
                                </span>
                            </div>
                        </DialogTrigger>

                        <DialogContainer className="pt-20">
                            <DialogContent
                                style={{ borderRadius: '28px' }}
                                className="relative mx-auto flex h-full w-[90%] flex-col overflow-y-auto border border-slate-200 bg-white lg:w-[900px] dark:border-slate-800 dark:bg-slate-900"
                            >
                                <DialogImage
                                    src={imageUrl}
                                    alt={company.name}
                                    className="mx-auto h-full w-[60%] object-contain"
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
                                <DialogClose className="absolute right-4 top-4 rounded-full bg-slate-100 p-3 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700" />
                            </DialogContent>
                        </DialogContainer>
                    </Dialog>
                );
            })}
        </div>
    );
}
