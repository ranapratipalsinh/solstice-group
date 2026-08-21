'use client';

import { useEffect, useRef } from 'react';

function clamp(value: number, min: number, max: number) {
    return Math.max(min, Math.min(max, value));
}

export function FounderSpotlight({
    name,
    role,
    photoUrl,
    description,
}: {
    name: string;
    role: string;
    photoUrl: string | null;
    description: string;
}) {
    const sectionRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);

    // Scroll-scrubbed reveal: opacity/position track scroll progress directly,
    // so the image appears as the user scrolls (and reverses on scroll-up)
    // instead of firing a fixed-length animation once on first view.
    useEffect(() => {
        let ticking = false;

        function update() {
            const section = sectionRef.current;
            const text = textRef.current;
            const image = imageRef.current;
            if (!section || !text || !image) return;

            const rect = section.getBoundingClientRect();
            const vh = window.innerHeight;

            // Text starts appearing as soon as the section's top touches the
            // bottom of the viewport, and is fully in by 60% of a viewport height later.
            const textProgress = clamp((vh - rect.top) / (vh * 0.6), 0, 1);

            // Image starts a bit later (once the section has scrolled up further),
            // so it consistently lags behind the text - a scroll-driven stagger.
            const imageProgress = clamp((vh * 0.85 - rect.top) / (vh * 0.6), 0, 1);

            const sectionCenter = rect.top + rect.height / 2;
            const parallax = clamp((sectionCenter - vh / 2) * -0.06, -24, 24);

            text.style.opacity = String(textProgress);
            text.style.transform = `translateY(${(1 - textProgress) * 32}px)`;

            image.style.opacity = String(imageProgress);
            image.style.transform = `translateY(${(1 - imageProgress) * 56 + parallax}px) scale(${0.94 + 0.06 * imageProgress})`;

            ticking = false;
        }

        function onScrollOrResize() {
            if (!ticking) {
                requestAnimationFrame(update);
                ticking = true;
            }
        }

        update();
        window.addEventListener('scroll', onScrollOrResize, { passive: true });
        window.addEventListener('resize', onScrollOrResize);
        return () => {
            window.removeEventListener('scroll', onScrollOrResize);
            window.removeEventListener('resize', onScrollOrResize);
        };
    }, []);

    const initials = name
        .split(' ')
        .map((word) => word[0])
        .slice(0, 2)
        .join('');

    return (
        <section ref={sectionRef} className="relative overflow-hidden bg-white py-24 dark:bg-slate-950 sm:py-32">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(15,156,99,0.06),transparent_55%)]" />

            <div className="container relative z-10">
                <div className="grid gap-14 lg:grid-cols-[0.9fr_1fr] lg:items-center">
                    <div ref={textRef} className="will-change-transform" style={{ opacity: 0, transform: 'translateY(32px)' }}>
                        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-solstice-700 dark:text-solstice-400">Leadership</p>
                        <div className="mt-5 h-px w-16 bg-solstice-500/60" />
                        <h2 className="mt-6 font-display text-4xl font-semibold text-slate-950 dark:text-white sm:text-5xl">Our Founder</h2>
                        <p className="mt-6 max-w-lg text-base leading-8 text-slate-600 dark:text-slate-400 sm:text-lg">{description}</p>
                        <p className="mt-8 text-lg font-semibold text-slate-950 dark:text-white">{name}</p>
                        <p className="mt-1 text-xs font-semibold uppercase tracking-[0.25em] text-solstice-700 dark:text-solstice-400">{role}</p>
                    </div>

                    <div ref={imageRef} className="will-change-transform" style={{ opacity: 0, transform: 'translateY(56px) scale(0.94)' }}>
                        <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-[0_30px_80px_-20px_rgba(15,156,99,0.25)] ring-1 ring-solstice-200 dark:ring-solstice-800/50">
                            {photoUrl ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img src={photoUrl} alt={name} className="h-full w-full object-cover" />
                            ) : (
                                <div className="flex h-full w-full items-center justify-center bg-solstice-50 text-6xl font-bold text-solstice-700 dark:bg-solstice-500/15 dark:text-solstice-400">
                                    {initials}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
