'use client';

import { useEffect, useRef, useState } from 'react';

function easeOutQuint(t: number) {
    return 1 - Math.pow(1 - t, 5);
}

export function CountUpStat({ value, label }: { value: string; label: string }) {
    const match = value.match(/^([\d,]+)(.*)$/);
    const target = match ? parseInt(match[1].replace(/,/g, ''), 10) : null;
    const suffix = match ? match[2] : '';

    const ref = useRef<HTMLParagraphElement>(null);
    const [display, setDisplay] = useState(target === null ? value : '0');

    useEffect(() => {
        if (target === null) return;
        const finalValue: number = target;
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting) return;
                observer.disconnect();

                const durationMs = 1400;
                const start = performance.now();

                function tick(now: number) {
                    const progress = Math.min((now - start) / durationMs, 1);
                    setDisplay(Math.round(easeOutQuint(progress) * finalValue).toString());
                    if (progress < 1) requestAnimationFrame(tick);
                }
                requestAnimationFrame(tick);
            },
            { threshold: 0.3 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, [target]);

    return (
        <div className="rounded-3xl bg-white p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border dark:border-slate-700/60 dark:bg-slate-800 dark:shadow-none dark:hover:border-solstice-700/60">
            <p ref={ref} className="font-display text-3xl font-semibold text-solstice-700 dark:text-solstice-400 sm:text-4xl">
                {display}
                {suffix}
            </p>
            <p className="mt-2 text-sm uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">{label}</p>
        </div>
    );
}
