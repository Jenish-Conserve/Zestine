import { useEffect, RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface AnimationRefs {
    sectionRef: RefObject<HTMLElement | null>;
    pinContainerRef: RefObject<HTMLDivElement | null>;
    imagesRef: RefObject<(HTMLDivElement | null)[]>;
    textsRef: RefObject<(HTMLDivElement | null)[]>;
}

export function useWhoWeAreAnimation(refs: AnimationRefs) {
    const { sectionRef, pinContainerRef, imagesRef, textsRef } = refs;

    useEffect(() => {
        let ctx = gsap.context(() => {
            const images = imagesRef.current.filter(Boolean);
            const texts = textsRef.current.filter(Boolean);

            if (images.length === 0 || texts.length === 0) return;

            // Setup initial states
            // Image 0 is visible and at origin
            gsap.set(images[0], { xPercent: 0, yPercent: 0, opacity: 1 });
            // Text 0 is visible and centered
            gsap.set(texts[0], { opacity: 1, autoAlpha: 1, yPercent: -50, y: 0 });

            // Image 1 and 2 are offscreen bottom right (e.g. x: 100%, y: 100%)
            gsap.set(images.slice(1), { xPercent: 100, yPercent: 100 });
            // Text 1 and 2 are hidden, slightly lower
            gsap.set(texts.slice(1), { opacity: 0, autoAlpha: 0, yPercent: -50, y: 40 });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: pinContainerRef.current,
                    start: 'top top',
                    end: '+=3000', // How long the pin lasts (3x viewport height)
                    scrub: 1,    // Smooth scrubbing
                    pin: true,
                    anticipatePin: 1
                }
            });

            // Step 1: Transition from Block 0 -> Block 1
            tl.to(texts[0], { autoAlpha: 0, y: -40, duration: 1 })
                .to(images[0], { xPercent: 100, yPercent: -100, duration: 1 }, "<")
                .to(images[1], { xPercent: 0, yPercent: 0, duration: 1 }, "<")
                .to(texts[1], { autoAlpha: 1, y: 0, duration: 1 }, "-=0.5");

            // Pause slightly
            tl.to({}, { duration: 0.5 });

            // Step 2: Transition from Block 1 -> Block 2
            tl.to(texts[1], { autoAlpha: 0, y: -40, duration: 1 })
                .to(images[1], { xPercent: 100, yPercent: -100, duration: 1 }, "<")
                .to(images[2], { xPercent: 0, yPercent: 0, duration: 1 }, "<")
                .to(texts[2], { autoAlpha: 1, y: 0, duration: 1 }, "-=0.5");

            // Pause slightly
            tl.to({}, { duration: 0.5 });

            // Subtle parallax Background Word
            gsap.to('.wwa-bg-word', {
                yPercent: -20,
                ease: 'none',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: 1.5,
                },
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);
}
