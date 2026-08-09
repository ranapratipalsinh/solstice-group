'use client';

import { FormEvent, useState } from 'react';

type Status = 'idle' | 'submitting' | 'success' | 'error';

export function JobApplicationForm({ jobs }: { jobs: { documentId: string; title: string }[] }) {
    const [status, setStatus] = useState<Status>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setStatus('submitting');
        setErrorMessage('');

        const form = event.currentTarget;
        const formData = new FormData(form);

        try {
            const response = await fetch('/api/careers/apply', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Failed to submit your application. Please try again.');
            }

            setStatus('success');
            form.reset();
        } catch (error) {
            setStatus('error');
            setErrorMessage(error instanceof Error ? error.message : 'Something went wrong.');
        }
    }

    return (
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <div>
                <label htmlFor="applicantName" className="mb-2 block text-sm font-semibold text-slate-700">Name</label>
                <input
                    id="applicantName"
                    name="name"
                    type="text"
                    required
                    className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-solstice-500"
                    placeholder="Your name"
                />
            </div>
            <div>
                <label htmlFor="applicantEmail" className="mb-2 block text-sm font-semibold text-slate-700">Email</label>
                <input
                    id="applicantEmail"
                    name="email"
                    type="email"
                    required
                    className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-solstice-500"
                    placeholder="Your email"
                />
            </div>
            <div>
                <label htmlFor="applicantPhone" className="mb-2 block text-sm font-semibold text-slate-700">Phone</label>
                <input
                    id="applicantPhone"
                    name="phone"
                    type="tel"
                    className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-solstice-500"
                    placeholder="Your phone number"
                />
            </div>
            {jobs.length > 0 && (
                <div>
                    <label htmlFor="jobOpening" className="mb-2 block text-sm font-semibold text-slate-700">Role</label>
                    <select
                        id="jobOpening"
                        name="jobOpeningId"
                        className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-solstice-500"
                    >
                        <option value="">General application</option>
                        {jobs.map((job) => (
                            <option key={job.documentId} value={job.documentId}>{job.title}</option>
                        ))}
                    </select>
                </div>
            )}
            <div>
                <label htmlFor="resume" className="mb-2 block text-sm font-semibold text-slate-700">Resume (PDF)</label>
                <input
                    id="resume"
                    name="resume"
                    type="file"
                    accept="application/pdf"
                    required
                    className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-solstice-500"
                />
            </div>
            <div>
                <label htmlFor="applicantMessage" className="mb-2 block text-sm font-semibold text-slate-700">Message</label>
                <textarea
                    id="applicantMessage"
                    name="message"
                    rows={3}
                    className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-solstice-500"
                    placeholder="A brief note about why you're a good fit"
                />
            </div>
            <button
                type="submit"
                disabled={status === 'submitting'}
                className="rounded-full bg-solstice-700 px-6 py-3 text-sm font-semibold text-white hover:bg-solstice-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
                {status === 'submitting' ? 'Submitting…' : 'Submit application'}
            </button>
            {status === 'success' && (
                <p className="text-sm font-semibold text-solstice-700">Application received — our HR team will be in touch.</p>
            )}
            {status === 'error' && (
                <p className="text-sm font-semibold text-red-600">{errorMessage}</p>
            )}
        </form>
    );
}
