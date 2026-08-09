import { getOpenJobs } from '@/lib/cms/careers';
import { JobApplicationForm } from '@/components/JobApplicationForm';

export const dynamic = 'force-dynamic';

export default async function CareersPage() {
    const jobs = await getOpenJobs();

    return (
        <div className="container py-16">
            <div className="rounded-[2rem] bg-white p-6 shadow-sm sm:p-10">
                <p className="text-sm uppercase tracking-[0.3em] text-solstice-700">Careers</p>
                <h1 className="mt-4 font-display text-3xl font-semibold text-slate-950 sm:text-4xl">Join the Solstice Group team</h1>
                <p className="mt-6 text-lg leading-8 text-slate-600">
                    We are looking for talented people who want to contribute to our group’s growth across trade, events, spices, and wellness.
                </p>
                <div className="mt-10 grid gap-8 lg:grid-cols-2">
                    <div className="rounded-3xl bg-solstice-50 p-8">
                        <h2 className="font-display text-xl font-semibold text-slate-950">Open roles</h2>
                        {jobs.length === 0 ? (
                            <p className="mt-5 text-sm text-slate-600">No open roles right now — check back soon.</p>
                        ) : (
                            <ul className="mt-5 space-y-4 text-slate-700">
                                {jobs.map((job) => (
                                    <li key={job.documentId} className="rounded-3xl bg-white p-5 shadow-sm">
                                        <p className="font-semibold">{job.title}</p>
                                        <p className="mt-1 text-xs uppercase tracking-[0.2em] text-solstice-700">
                                            {job.department} · {job.location} · {job.employmentType}
                                        </p>
                                        <p className="mt-2 text-sm text-slate-600">{job.description}</p>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <div className="rounded-3xl bg-white p-8 shadow-sm">
                        <h2 className="font-display text-xl font-semibold text-slate-950">Apply now</h2>
                        <p className="mt-4 text-slate-600 leading-7">Send your CV and a brief message to our HR team. We welcome people who are curious, detail-oriented, and ready to grow.</p>
                        <JobApplicationForm jobs={jobs.map((job) => ({ documentId: job.documentId, title: job.title }))} />
                        <div className="mt-8 space-y-4">
                            <div className="rounded-3xl bg-slate-50 p-5">
                                <p className="text-sm font-semibold text-slate-900">Email</p>
                                <p className="mt-1 text-slate-600">careers@solsticegroup.com</p>
                            </div>
                            <div className="rounded-3xl bg-slate-50 p-5">
                                <p className="text-sm font-semibold text-slate-900">Phone</p>
                                <p className="mt-1 text-slate-600">+91 98765 43210</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
