import { ContactForm } from '@/components/ContactForm';
import { PageHeader } from '@/components/PageHeader';
import { ScrollReveal } from '@/components/ScrollReveal';

export default function ContactPage() {
    return (
        <div>
            <PageHeader
                eyebrow="Contact"
                title="Get in touch with Solstice Group"
                description="Reach out for business enquiries, partnership discussions, or general information about our group and subsidiary companies."
            />

            <section className="bg-white py-16 dark:bg-solstice-950 sm:py-20">
                <div className="container grid gap-10 lg:grid-cols-[0.9fr_0.8fr]">
                    <ScrollReveal>
                        <div className="space-y-6">
                            <div className="rounded-3xl bg-solstice-50 p-6 dark:bg-solstice-900">
                                <p className="text-sm uppercase tracking-[0.2em] text-solstice-700 dark:text-solstice-400">Office location</p>
                                <p className="mt-2 text-slate-700 dark:text-slate-400">Ahmedabad, Gujarat, India</p>
                            </div>
                            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700/60 dark:bg-solstice-900 dark:shadow-none">
                                <p className="text-sm uppercase tracking-[0.2em] text-solstice-700 dark:text-solstice-400">Email</p>
                                <p className="mt-2 text-slate-700 dark:text-slate-400">info@solsticegroup.com</p>
                            </div>
                            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700/60 dark:bg-solstice-900 dark:shadow-none">
                                <p className="text-sm uppercase tracking-[0.2em] text-solstice-700 dark:text-solstice-400">Phone</p>
                                <p className="mt-2 text-slate-700 dark:text-slate-400">+91 98765 43210</p>
                            </div>
                        </div>
                    </ScrollReveal>
                    <ScrollReveal delayMs={200}>
                        <div className="h-full rounded-[2rem] border border-slate-200 bg-solstice-50 p-6 shadow-sm dark:border-slate-700/60 dark:bg-solstice-900 sm:p-10">
                            <h2 className="font-display text-2xl font-semibold text-slate-950 dark:text-white">Inquiry form</h2>
                            <p className="mt-4 leading-7 text-slate-600 dark:text-slate-400">Send us a message and we will reply within 2 business days.</p>
                            <ContactForm />
                        </div>
                    </ScrollReveal>
                </div>
            </section>
        </div>
    );
}
