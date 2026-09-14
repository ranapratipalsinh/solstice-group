import type { Metadata } from 'next';
import { getAboutPage } from '@/lib/cms/pages';
import { getFounders } from '@/lib/cms/team';
import { FounderSpotlight } from '@/components/FounderSpotlight';
import { PageHeader } from '@/components/PageHeader';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: 'Founders | Solstice Group',
    description: "Messages from Solstice Group's founders on the vision and philosophy behind the group.",
};

export default async function FounderMessagePage() {
    const [about, founders] = await Promise.all([getAboutPage(), getFounders()]);

    const profiles =
        founders.length > 0
            ? founders
            : [
                  {
                      name: 'Founder',
                      role: 'Founder & Chairman',
                      bio:
                          about?.founderStory ||
                          'A strategic entrepreneur with experience in trade, hospitality, and event management launched Solstice Group to scale complementary ventures under one trusted parent identity, focused on quality, governance, and long-term growth for every subsidiary.',
                      photoUrl: about?.founderPhotoUrl ?? null,
                  },
              ];

    return (
        <div>
            <PageHeader
                eyebrow="Leadership"
                title={profiles.length > 1 ? 'Our Founders' : 'Our Founder'}
                description="The vision and philosophy behind Solstice Group, in the founders' own words."
            />
            {profiles.map((founder, index) => (
                <FounderSpotlight
                    key={`${founder.name}-${index}`}
                    name={founder.name}
                    role={founder.role}
                    photoUrl={founder.photoUrl}
                    description={founder.bio}
                    reverse={index % 2 === 1}
                    tinted={index % 2 === 1}
                />
            ))}
        </div>
    );
}
