'use client';

import { useEffect, useRef, useState } from 'react';

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
    const parallaxRef = useRef<HTMLDivElement>(null);
    const [isRevealed, setIsRevealed] = useState(false);

    // One-time fade + slide reveal when the section enters the viewport.
    useEffect(() => {
        const el = sectionRef.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsRevealed(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.2 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    // Continuous subtle parallax on the image while the section is on screen.
    useEffect(() => {
        let ticking = false;

        function update() {
            const section = sectionRef.current;
            const image = parallaxRef.current;
            if (!section || !image) return;

            const rect = section.getBoundingClientRect();
            const viewportCenter = window.innerHeight / 2;
            const sectionCenter = rect.top + rect.height / 2;
            const distance = sectionCenter - viewportCenter;
            const offset = Math.max(-24, Math.min(24, distance * -0.06));

            image.style.transform = `translateY(${offset}px)`;
            ticking = false;
        }

        function onScroll() {
            if (!ticking) {
                requestAnimationFrame(update);
                ticking = true;
            }
        }

        update();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const initials = name
        .split(' ')
        .map((word) => word[0])
        .slice(0, 2)
        .join('');

    return (
        <section ref={sectionRef} className="relative overflow-hidden bg-[#0a0a0a] py-24 sm:py-32">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(212,175,55,0.10),transparent_55%)]" />

            <div className="container relative z-10">
                <div className="grid gap-14 lg:grid-cols-[0.9fr_1fr] lg:items-center">
                    <div
                        className={`transition-all duration-[900ms] ease-out ${
                            isRevealed ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                        }`}
                    >
                        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-gold-400">Leadership</p>
                        <div className="mt-5 h-px w-16 bg-gold-500/60" />
                        <h2 className="mt-6 font-display text-4xl font-semibold text-white sm:text-5xl">Our Founder</h2>
                        <p className="mt-6 max-w-lg text-base leading-8 text-white/60 sm:text-lg">{description}</p>
                        <p className="mt-8 text-lg font-semibold text-white">{name}</p>
                        <p className="mt-1 text-xs font-semibold uppercase tracking-[0.25em] text-gold-400">{role}</p>
                    </div>

                    <div
                        className={`transition-all duration-[1100ms] ease-out ${
                            isRevealed ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-16 scale-95 opacity-0'
                        }`}
                        style={{ transitionDelay: isRevealed ? '200ms' : '0ms' }}
                    >
                        <div ref={parallaxRef} className="will-change-transform">
                            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-[0_30px_80px_-20px_rgba(212,175,55,0.25)] ring-1 ring-gold-500/20">
                                {photoUrl ? (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img src={photoUrl} alt={name} className="h-full w-full object-cover" />
                                ) : (
                                    <div className="flex h-full w-full items-center justify-center bg-[#141414] text-6xl font-bold text-gold-500">
                                        {initials}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
