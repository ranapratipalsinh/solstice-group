import { getTeamMembers } from '@/lib/cms/team';
import { PageHeader } from '@/components/PageHeader';
import { ScrollReveal } from '@/components/ScrollReveal';
import { ImageWithFallback } from '@/components/ImageWithFallback';

export const dynamic = 'force-dynamic';

export default async function LeadershipPage() {
    const members = await getTeamMembers();

    return (
        <div>
            <PageHeader
                eyebrow="Leadership"
                title="The people leading Solstice Group"
                description="Directors and executives who set the strategy and governance for the group and its subsidiaries."
            />

            <section className="bg-white py-16 dark:bg-solstice-950 sm:py-20">
                <div className="container">
                    {members.length === 0 ? (
                        <p className="text-center text-slate-600 dark:text-slate-400">Leadership profiles will appear here once added in the CMS.</p>
                    ) : (
                        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                            {members.map((member, index) => {
                                const initials = member.name
                                    .split(' ')
                                    .map((word) => word[0])
                                    .slice(0, 2)
                                    .join('');

                                return (
                                    <ScrollReveal key={member.name} delayMs={((index % 3) + 1) * 200}>
                                        <div className="group h-full overflow-hidden rounded-3xl border border-slate-200 bg-solstice-50 shadow-sm dark:border-slate-700/60 dark:bg-solstice-900">
                                            <div className="relative h-64 overflow-hidden bg-solstice-100 dark:bg-solstice-500/10">
                                                <ImageWithFallback
                                                    src={member.photoUrl}
                                                    alt={member.name}
                                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                    fallback={
                                                        <div className="flex h-full w-full items-center justify-center text-4xl font-bold text-solstice-700 dark:text-solstice-400">
                                                            {initials}
                                                        </div>
                                                    }
                                                />
                                            </div>
                                            <div className="p-7">
                                                <h2 className="text-xl font-semibold text-slate-950 dark:text-white">{member.name}</h2>
                                                <p className="mt-1 text-sm uppercase tracking-[0.2em] text-solstice-700 dark:text-solstice-400">{member.role}</p>
                                                {member.bio && <p className="mt-4 leading-7 text-slate-600 dark:text-slate-400">{member.bio}</p>}
                                            </div>
                                        </div>
                                    </ScrollReveal>
                                );
                            })}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
