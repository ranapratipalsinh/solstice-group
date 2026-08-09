import { strapiFind } from '@/lib/strapi';

export type Region = {
    name: string;
    isHeadquarters: boolean;
};

export async function getRegions(): Promise<Region[]> {
    return strapiFind<Region>('/regions?sort=order:asc');
}
