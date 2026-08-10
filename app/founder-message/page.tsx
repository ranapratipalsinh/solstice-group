import { getAboutPage } from '@/lib/cms/pages';
import { getFounder } from '@/lib/cms/team';
import { FounderSpotlight } from '@/components/FounderSpotlight';

export const dynamic = 'force-dynamic';

export default async function FounderMessagePage() {
    const [about, founder] = await Promise.all([getAboutPage(), getFounder()]);

    const founderStory =
        founder?.bio ??
        about?.founderStory ??
        'A strategic entrepreneur with experience in trade, hospitality, and event management launched Solstice Group to scale complementary ventures under one trusted parent identity, focused on quality, governance, and long-term growth for every subsidiary.';

    const founderName = founder?.name ?? 'Founder';
    const founderRole = founder?.role ?? 'Founder & Chairman';
    const photoUrl = founder?.photoUrl ?? about?.founderPhotoUrl ?? null;

    return (
        <FounderSpotlight
            name={founderName}
            role={founderRole}
            photoUrl={photoUrl}
            description={founderStory}
        />
    );
}
