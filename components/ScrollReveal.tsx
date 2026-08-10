'use client';

import { useEffect, useRef, useState } from 'react';

export function ScrollReveal({
    children,
    delayMs = 0,
    className = '',
}: {
    children: React.ReactNode;
    delayMs?: number;
    className?: string;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            className={`transition-all duration-700 ease-out ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
            } ${className}`}
            style={{ transitionDelay: isVisible ? `${delayMs}ms` : '0ms' }}
        >
            {children}
        </div>
    );
}
