import { strapiFind, strapiMediaUrl } from '@/lib/strapi';
import { StrapiMedia } from '@/lib/cms/types';

export type TeamMember = {
    name: string;
    role: string;
    bio: string;
    category: 'founder' | 'director' | 'leadership';
    photoUrl: string | null;
};

type RawTeamMember = {
    name: string;
    role: string;
    bio: string;
    category: 'founder' | 'director' | 'leadership';
    photo: StrapiMedia | null;
};

function mapTeamMember(raw: RawTeamMember): TeamMember {
    return {
        name: raw.name,
        role: raw.role,
        bio: raw.bio,
        category: raw.category,
        photoUrl: strapiMediaUrl(raw.photo?.url),
    };
}

export async function getTeamMembers(): Promise<TeamMember[]> {
    const items = await strapiFind<RawTeamMember>('/team-members?populate=photo&sort=order:asc');
    return items.map(mapTeamMember);
}

export async function getFounder(): Promise<TeamMember | null> {
    const members = await getTeamMembers();
    return members.find((member) => member.category === 'founder') ?? null;
}
