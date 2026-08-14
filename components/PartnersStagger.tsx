'use client';

import { Partner } from '@/lib/cms/partners';
import { StaggerTestimonials, StaggerCard } from '@/components/ui/stagger-testimonials';

function hostnameFor(url: string) {
    try {
        return new URL(url).hostname.replace(/^www\./, '');
    } catch {
        return url;
    }
}

export function PartnersStagger({ partners }: { partners: Partner[] }) {
    if (!partners.length) return null;

    const cards: StaggerCard[] = partners.map((partner, index) => ({
        tempId: index,
        testimonial: partner.name,
        by: partner.websiteUrl ? hostnameFor(partner.websiteUrl) : 'Trusted Partner',
        imgSrc: partner.logoUrl ?? undefined,
        href: partner.websiteUrl || undefined,
    }));

    return <StaggerTestimonials testimonials={cards} />;
}
