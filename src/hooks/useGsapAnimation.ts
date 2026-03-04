import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface UseGsapAnimationProps {
    /** The animation definition function. Should return a GSAP Tween or Timeline if cleanup is needed */
    animation: (element: HTMLElement | null) => gsap.core.Tween | gsap.core.Timeline | void;
    /** Dependencies block array that might trigger re-renders */
    dependencies?: any[];
    /** Flag to respect user preferences for reduced motion */
    respectReducedMotion?: boolean;
}

/**
 * A reusable hook for declarative GSAP animations.
 * Ensures strict memory cleanup on re-renders and unmounts, following TDD standards.
 */
export function useGsapAnimation<T extends HTMLElement = HTMLDivElement>({
    animation,
    dependencies = [],
    respectReducedMotion = true,
}: UseGsapAnimationProps) {
    const elementRef = useRef<T>(null);
    const animationContext = useRef<gsap.Context | null>(null);

    useEffect(() => {
        // 1. Accessibility First: check for reduced motion
        const prefersReducedMotion =
            respectReducedMotion && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

        if (prefersReducedMotion) {
            if (elementRef.current) gsap.set(elementRef.current, { opacity: 1 });
            return;
        }

        // 2. Wrap via context for clean scope management and teardown
        animationContext.current = gsap.context(() => {
            animation(elementRef.current);
        }, elementRef);

        // 3. Cleanup to prevent tricky memory leaks on unmount
        return () => {
            animationContext.current?.revert();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, dependencies);

    return { elementRef };
}
