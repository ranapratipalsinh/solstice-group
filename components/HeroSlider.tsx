'use client';

import { useEffect, useState } from 'react';

const DEFAULT_IMAGES = [
    '/hero/city-skyline-night.jpg',
    '/companies/bath.jpg',
    '/companies/spices.jpg',
    '/companies/import-export.jpg',
    '/companies/event.jpg',
];

const SLIDE_INTERVAL_MS = 3000;

export function HeroSlider({ images }: { images: string[] }) {
    const slides = images.length > 0 ? images : DEFAULT_IMAGES;
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        setActiveIndex(0);
    }, [slides.join('|')]);

    useEffect(() => {
        if (slides.length <= 1) return;
        const timer = setInterval(() => {
            setActiveIndex((current) => (current + 1) % slides.length);
        }, SLIDE_INTERVAL_MS);
        return () => clearInterval(timer);
    }, [slides.length]);

    return (
        <div className="absolute inset-0">
            {slides.map((src, index) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                    key={src}
                    src={src}
                    alt=""
                    aria-hidden="true"
                    className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-in-out ${
                        index === activeIndex ? 'opacity-100 animate-ken-burns' : 'opacity-0'
                    }`}
                />
            ))}
        </div>
    );
}
