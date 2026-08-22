import { ScrollReveal } from '@/components/ScrollReveal';

export function PageHeader({
    eyebrow,
    title,
    description,
}: {
    eyebrow: string;
    title: React.ReactNode;
    description?: string;
}) {
    return (
        <section className="relative overflow-hidden bg-solstice-950 py-20 text-center text-white sm:py-28">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(15,156,99,0.25),transparent_60%)]" />
            <div className="container relative">
                <ScrollReveal>
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-solstice-400">{eyebrow}</p>
                    <h1 className="mt-4 font-display text-3xl font-bold sm:text-4xl md:text-5xl">{title}</h1>
                    {description && (
                        <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-solstice-100/90 sm:text-lg">{description}</p>
                    )}
                </ScrollReveal>
            </div>
        </section>
    );
}
