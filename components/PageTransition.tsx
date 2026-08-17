'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

const TRANSITION_MS = 420;

export function PageTransition() {
    const pathname = usePathname();
    const router = useRouter();
    const [isCovering, setIsCovering] = useState(false);
    const previousPathname = useRef(pathname);
    const pendingHref = useRef<string | null>(null);

    useEffect(() => {
        function handleClick(event: MouseEvent) {
            if (event.defaultPrevented || event.button !== 0) return;
            if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

            const target = event.target as HTMLElement;
            const anchor = target.closest('a');
            if (!anchor) return;

            const href = anchor.getAttribute('href');
            if (!href || !href.startsWith('/') || href.startsWith('//')) return;
            if (anchor.target && anchor.target !== '_self') return;
            if (anchor.hasAttribute('download')) return;
            if (new URL(href, window.location.origin).pathname === pathname) return;

            // Capture-phase intercept: preventDefault stops next/link's own
            // click-to-navigate (it checks defaultPrevented before doing so),
            // since we're taking over navigation to run the transition first.
            // Deliberately NOT calling stopPropagation - that would also block
            // this same click from ever reaching React's synthetic event system,
            // silently breaking any onClick on the link (e.g. closing a nav menu).
            event.preventDefault();

            pendingHref.current = href;
            setIsCovering(true);

            window.setTimeout(() => {
                if (pendingHref.current) {
                    router.push(pendingHref.current);
                }
            }, TRANSITION_MS);
        }

        document.addEventListener('click', handleClick, true);
        return () => document.removeEventListener('click', handleClick, true);
    }, [pathname, router]);

    useEffect(() => {
        if (previousPathname.current !== pathname) {
            previousPathname.current = pathname;
            pendingHref.current = null;
            const timer = window.setTimeout(() => setIsCovering(false), 60);
            return () => window.clearTimeout(timer);
        }
    }, [pathname]);

    return (
        <div
            aria-hidden="true"
            className={`fixed inset-0 z-[100] flex items-center justify-center bg-solstice-800 transition-opacity duration-500 ease-in-out ${
                isCovering ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
            }`}
        >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                src="/logos/solstice-group-logo.png"
                alt=""
                className={`h-14 w-auto rounded-2xl transition-all duration-500 ${
                    isCovering ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
                }`}
            />
        </div>
    );
}
