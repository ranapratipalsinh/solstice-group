'use client';

import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, animate } from 'motion/react';

const RING_SIZE = 42;
const RING_SCALE_HOVER = 64 / RING_SIZE;
const RING_SCALE_PRESS = 0.85;
const DOT_SIZE = 5;

const INTERACTIVE_SELECTOR =
    'a, button, [role="button"], input[type="submit"], input[type="button"], input[type="checkbox"], input[type="radio"], select, label, [data-cursor-hover]';

// Global, reusable custom cursor: a small dot that tracks the pointer almost
// instantly and a ring that trails behind it on a softer spring. Desktop
// (fine-pointer) only - touch/tablet input never hides the native cursor,
// and the whole thing is skipped when the user prefers reduced motion.
export function CustomCursor() {
    const ringRef = useRef<HTMLDivElement>(null);
    const dotRef = useRef<HTMLDivElement>(null);

    const mouseX = useMotionValue(-100);
    const mouseY = useMotionValue(-100);

    const ringX = useSpring(mouseX, { stiffness: 280, damping: 32, mass: 0.6 });
    const ringY = useSpring(mouseY, { stiffness: 280, damping: 32, mass: 0.6 });
    // Dot follows almost instantly - a much stiffer/lighter spring than the ring.
    const dotX = useSpring(mouseX, { stiffness: 1000, damping: 60, mass: 0.3 });
    const dotY = useSpring(mouseY, { stiffness: 1000, damping: 60, mass: 0.3 });

    const ringScale = useMotionValue(1);
    const ringOpacity = useMotionValue(0);
    const dotOpacity = useMotionValue(0);

    useEffect(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        let isFinePointer = false;
        let isHovering = false;
        let isPressed = false;

        function targetRingScale() {
            const base = isHovering ? RING_SCALE_HOVER : 1;
            return isPressed ? base * RING_SCALE_PRESS : base;
        }

        function targetRingOpacity() {
            if (!isFinePointer) return 0;
            return isHovering ? 0.5 : 1;
        }

        function setEnabled(enabled: boolean) {
            if (enabled === isFinePointer) return;
            isFinePointer = enabled;
            document.documentElement.classList.toggle('custom-cursor-enabled', enabled);
            animate(ringOpacity, targetRingOpacity(), { duration: 0.2 });
            animate(dotOpacity, enabled ? 1 : 0, { duration: 0.2 });
        }

        function updateHover(target: EventTarget | null) {
            const nextHover = target instanceof Element ? Boolean(target.closest(INTERACTIVE_SELECTOR)) : false;
            if (nextHover === isHovering) return;
            isHovering = nextHover;
            animate(ringScale, targetRingScale(), { type: 'spring', stiffness: 300, damping: 24 });
            animate(ringOpacity, targetRingOpacity(), { duration: 0.25 });
        }

        function handlePointerMove(event: PointerEvent) {
            mouseX.set(event.clientX);
            mouseY.set(event.clientY);
            setEnabled(event.pointerType === 'mouse');
            updateHover(event.target);
        }

        function handlePointerDown(event: PointerEvent) {
            if (event.pointerType !== 'mouse') return;
            isPressed = true;
            animate(ringScale, targetRingScale(), { type: 'spring', stiffness: 400, damping: 20 });
        }

        function handlePointerUp(event: PointerEvent) {
            if (event.pointerType !== 'mouse') return;
            isPressed = false;
            animate(ringScale, targetRingScale(), { type: 'spring', stiffness: 300, damping: 20 });
        }

        function handleWindowLeave() {
            animate(ringOpacity, 0, { duration: 0.2 });
            animate(dotOpacity, 0, { duration: 0.2 });
        }

        function handleWindowEnter() {
            if (isFinePointer) {
                animate(ringOpacity, targetRingOpacity(), { duration: 0.2 });
                animate(dotOpacity, 1, { duration: 0.2 });
            }
        }

        window.addEventListener('pointermove', handlePointerMove, { passive: true });
        window.addEventListener('pointerdown', handlePointerDown, { passive: true });
        window.addEventListener('pointerup', handlePointerUp, { passive: true });
        document.documentElement.addEventListener('mouseleave', handleWindowLeave);
        document.documentElement.addEventListener('mouseenter', handleWindowEnter);

        return () => {
            window.removeEventListener('pointermove', handlePointerMove);
            window.removeEventListener('pointerdown', handlePointerDown);
            window.removeEventListener('pointerup', handlePointerUp);
            document.documentElement.removeEventListener('mouseleave', handleWindowLeave);
            document.documentElement.removeEventListener('mouseenter', handleWindowEnter);
            document.documentElement.classList.remove('custom-cursor-enabled');
        };
    }, [mouseX, mouseY, ringScale, ringOpacity, dotOpacity]);

    return (
        <>
            <motion.div
                ref={ringRef}
                aria-hidden="true"
                className="pointer-events-none fixed left-0 top-0 rounded-full border border-white mix-blend-difference"
                style={{
                    width: RING_SIZE,
                    height: RING_SIZE,
                    borderWidth: 1.5,
                    x: ringX,
                    y: ringY,
                    translateX: '-50%',
                    translateY: '-50%',
                    scale: ringScale,
                    opacity: ringOpacity,
                    zIndex: 9999,
                }}
            />
            <motion.div
                ref={dotRef}
                aria-hidden="true"
                className="pointer-events-none fixed left-0 top-0 rounded-full bg-white mix-blend-difference"
                style={{
                    width: DOT_SIZE,
                    height: DOT_SIZE,
                    x: dotX,
                    y: dotY,
                    translateX: '-50%',
                    translateY: '-50%',
                    opacity: dotOpacity,
                    zIndex: 9999,
                }}
            />
        </>
    );
}
