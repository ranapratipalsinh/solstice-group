import { strapiFind } from '@/lib/strapi';

export type Industry = {
    title: string;
    description: string;
};

export async function getIndustries(): Promise<Industry[]> {
    return strapiFind<Industry>('/industries?sort=title:asc');
}
