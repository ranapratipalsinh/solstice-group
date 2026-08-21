import { ContactForm } from '@/components/ContactForm';
import { ScrollReveal } from '@/components/ScrollReveal';

export default function ContactPage() {
    return (
        <div className="container py-16">
            <div className="grid gap-10 lg:grid-cols-[0.9fr_0.8fr]">
                <ScrollReveal>
                    <section className="h-full rounded-[2rem] bg-white p-6 shadow-sm dark:bg-slate-900 sm:p-10">
                        <p className="text-sm uppercase tracking-[0.3em] text-solstice-700 dark:text-solstice-400">Contact</p>
                        <h1 className="mt-4 font-display text-3xl font-semibold text-slate-950 dark:text-white sm:text-4xl">Get in touch with Solstice Group</h1>
                        <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-400">
                            Reach out for business enquiries, partnership discussions, or general information about our group and subsidiary companies.
                        </p>
                        <div className="mt-10 space-y-6">
                            <div className="rounded-3xl bg-solstice-50 p-6 dark:bg-solstice-500/15">
                                <p className="text-sm uppercase tracking-[0.2em] text-solstice-700 dark:text-solstice-400">Office location</p>
                                <p className="mt-2 text-slate-700 dark:text-slate-400">Ahmedabad, Gujarat, India</p>
                            </div>
                            <div className="rounded-3xl bg-white p-6 shadow-sm dark:border dark:border-slate-700/60 dark:bg-slate-800 dark:shadow-none">
                                <p className="text-sm uppercase tracking-[0.2em] text-slate-700 dark:text-slate-400">Email</p>
                                <p className="mt-2 text-slate-700 dark:text-slate-400">info@solsticegroup.com</p>
                            </div>
                            <div className="rounded-3xl bg-white p-6 shadow-sm dark:border dark:border-slate-700/60 dark:bg-slate-800 dark:shadow-none">
                                <p className="text-sm uppercase tracking-[0.2em] text-solstice-700 dark:text-solstice-400">Phone</p>
                                <p className="mt-2 text-slate-700 dark:text-slate-400">+91 98765 43210</p>
                            </div>
                        </div>
                    </section>
                </ScrollReveal>
                <ScrollReveal delayMs={200}>
                    <section className="h-full rounded-[2rem] bg-solstice-50 p-6 shadow-sm dark:bg-slate-900 sm:p-10">
                        <h2 className="font-display text-2xl font-semibold text-slate-950 dark:text-white">Inquiry form</h2>
                        <p className="mt-4 text-slate-600 leading-7 dark:text-slate-400">Send us a message and we will reply within 2 business days.</p>
                        <ContactForm />
                    </section>
                </ScrollReveal>
            </div>
        </div>
    );
}
