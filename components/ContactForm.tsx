'use client';

import { FormEvent, useState } from 'react';

type Status = 'idle' | 'submitting' | 'success' | 'error';

export function ContactForm() {
    const [status, setStatus] = useState<Status>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setStatus('submitting');
        setErrorMessage('');

        const form = event.currentTarget;
        const payload = {
            name: (form.elements.namedItem('name') as HTMLInputElement).value,
            company: (form.elements.namedItem('company') as HTMLInputElement).value,
            email: (form.elements.namedItem('email') as HTMLInputElement).value,
            phone: (form.elements.namedItem('phone') as HTMLInputElement).value,
            enquiryType: (form.elements.namedItem('enquiryType') as HTMLSelectElement).value,
            message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
        };

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error('Failed to send your message. Please try again.');
            }

            setStatus('success');
            form.reset();
        } catch (error) {
            setStatus('error');
            setErrorMessage(error instanceof Error ? error.message : 'Something went wrong.');
        }
    }

    return (
        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            <div className="grid gap-5 sm:grid-cols-2">
                <div>
                    <label htmlFor="name" className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-400">Name</label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-solstice-500 dark:border-slate-700 dark:bg-solstice-950 dark:text-white dark:placeholder-slate-500"
                        placeholder="Your name"
                    />
                </div>
                <div>
                    <label htmlFor="company" className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-400">Company</label>
                    <input
                        id="company"
                        name="company"
                        type="text"
                        className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-solstice-500 dark:border-slate-700 dark:bg-solstice-950 dark:text-white dark:placeholder-slate-500"
                        placeholder="Your company (optional)"
                    />
                </div>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
                <div>
                    <label htmlFor="email" className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-400">Email</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-solstice-500 dark:border-slate-700 dark:bg-solstice-950 dark:text-white dark:placeholder-slate-500"
                        placeholder="Your email"
                    />
                </div>
                <div>
                    <label htmlFor="phone" className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-400">Phone</label>
                    <input
                        id="phone"
                        name="phone"
                        type="tel"
                        className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-solstice-500 dark:border-slate-700 dark:bg-solstice-950 dark:text-white dark:placeholder-slate-500"
                        placeholder="Your phone (optional)"
                    />
                </div>
            </div>
            <div>
                <label htmlFor="enquiryType" className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-400">Enquiry Type</label>
                <select
                    id="enquiryType"
                    name="enquiryType"
                    defaultValue="general"
                    className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-solstice-500 dark:border-slate-700 dark:bg-solstice-950 dark:text-white"
                >
                    <option value="business-partnership">Business Partnership</option>
                    <option value="product-enquiry">Product Enquiry</option>
                    <option value="import-export">Import / Export</option>
                    <option value="events">Events</option>
                    <option value="general">General Enquiry</option>
                </select>
            </div>
            <div>
                <label htmlFor="message" className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-400">Message</label>
                <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-solstice-500 dark:border-slate-700 dark:bg-solstice-950 dark:text-white dark:placeholder-slate-500"
                    placeholder="How can we help?"
                />
            </div>
            <button
                type="submit"
                disabled={status === 'submitting'}
                className="rounded-full bg-solstice-700 px-6 py-3 text-sm font-semibold text-white hover:bg-solstice-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
                {status === 'submitting' ? 'Sending…' : 'Submit inquiry'}
            </button>
            {status === 'success' && (
                <p className="text-sm font-semibold text-solstice-700 dark:text-solstice-400">Thanks — we will reply within 2 business days.</p>
            )}
            {status === 'error' && (
                <p className="text-sm font-semibold text-red-600">{errorMessage}</p>
            )}
        </form>
    );
}
