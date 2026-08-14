'use client';

import { useState } from 'react';

export function ImageWithFallback({
    src,
    alt,
    className,
    fallback,
    loading,
    style,
}: {
    src: string | null;
    alt: string;
    className?: string;
    fallback: React.ReactNode;
    loading?: 'lazy' | 'eager';
    style?: React.CSSProperties;
}) {
    const [failed, setFailed] = useState(false);

    if (!src || failed) {
        return <>{fallback}</>;
    }

    return (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt} className={className} style={style} loading={loading} onError={() => setFailed(true)} />
    );
}
