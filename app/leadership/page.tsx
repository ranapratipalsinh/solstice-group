import { getTeamMembers } from '@/lib/cms/team';
import { ScrollReveal } from '@/components/ScrollReveal';

export const dynamic = 'force-dynamic';

export default async function LeadershipPage() {
    const members = await getTeamMembers();

    return (
        <div className="container py-16">
            <div className="rounded-[2rem] bg-white p-6 shadow-sm sm:p-10">
                <p className="text-sm uppercase tracking-[0.3em] text-solstice-700">Leadership</p>
                <h1 className="mt-4 font-display text-3xl font-semibold text-slate-950 sm:text-4xl">The people leading Solstice Group</h1>
                <p className="mt-6 text-lg leading-8 text-slate-600">
                    Directors and executives who set the strategy and governance for the group and its subsidiaries.
                </p>
                {members.length === 0 ? (
                    <p className="mt-10 text-slate-600">Leadership profiles will appear here once added in the CMS.</p>
                ) : (
                    <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                        {members.map((member, index) => (
                            <ScrollReveal key={member.name} delayMs={((index % 3) + 1) * 200}>
                                <div className="rounded-3xl border border-slate-200 bg-solstice-50 p-7 shadow-sm">
                                    <h2 className="text-xl font-semibold text-slate-950">{member.name}</h2>
                                    <p className="mt-1 text-sm uppercase tracking-[0.2em] text-solstice-700">{member.role}</p>
                                    <p className="mt-4 text-slate-600 leading-7">{member.bio}</p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
