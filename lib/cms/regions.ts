import { strapiFind } from '@/lib/strapi';

export type Region = {
    name: string;
    isHeadquarters: boolean;
    mapX: number | null;
    mapY: number | null;
    isoCode: string | null;
};

export async function getRegions(): Promise<Region[]> {
    return strapiFind<Region>('/regions?sort=order:asc');
}
