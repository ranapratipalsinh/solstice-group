import { strapiFind } from '@/lib/strapi';

export type JobOpening = {
    id: number;
    documentId: string;
    title: string;
    department: string;
    location: string;
    description: string;
    employmentType: string;
    isActive: boolean;
};

export async function getOpenJobs(): Promise<JobOpening[]> {
    return strapiFind<JobOpening>('/job-openings?filters[isActive][$eq]=true&sort=title:asc');
}
