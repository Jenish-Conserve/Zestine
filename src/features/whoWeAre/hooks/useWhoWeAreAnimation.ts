import { useEffect, RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface AnimationRefs {
    sectionRef: RefObject<HTMLElement | null>;
    titleRef: RefObject<HTMLHeadingElement | null>;
    badgeRef: RefObject<HTMLSpanElement | null>;
    introRef: RefObject<HTMLDivElement | null>;
    imageOneRef: RefObject<HTMLDivElement | null>;
    imageTwoRef: RefObject<HTMLDivElement | null>;
    storyBlocksRef: RefObject<(HTMLDivElement | null)[]>;
    pillarsRef: RefObject<HTMLDivElement | null>;
    closingRef: RefObject<HTMLDivElement | null>;
}

export function useWhoWeAreAnimation(refs: AnimationRefs) {
    const {
        sectionRef,
        titleRef,
        badgeRef,
        introRef,
        imageOneRef,
        imageTwoRef,
        storyBlocksRef,
        pillarsRef,
        closingRef,
    } = refs;

    useEffect(() => {
        const ctx = gsap.context(() => {
            // 1. Section title + badge entrance
            const titleTl = gsap.timeline({
                scrollTrigger: {
                    trigger: titleRef.current,
                    start: 'top 85%',
                    toggleActions: 'play none none none',
                },
            });
            titleTl
                .fromTo(
                    badgeRef.current,
                    { opacity: 0, scale: 0.6 },
                    { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.7)' }
                )
                .fromTo(
                    titleRef.current,
                    { opacity: 0, y: 40 },
                    { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
                    '-=0.2'
                );

            // 2. Intro block: image from left, text from right
            const introTl = gsap.timeline({
                scrollTrigger: {
                    trigger: introRef.current,
                    start: 'top 80%',
                    toggleActions: 'play none none none',
                },
            });
            introTl
                .fromTo(
                    imageOneRef.current,
                    { opacity: 0, x: -80, rotation: -4 },
                    { opacity: 1, x: 0, rotation: 0, duration: 1, ease: 'expo.out' }
                )
                .fromTo(
                    introRef.current?.querySelector('.wwa-intro-text') as Element,
                    { opacity: 0, x: 60 },
                    { opacity: 1, x: 0, duration: 0.9, ease: 'power3.out' },
                    '-=0.6'
                );

            // 3. Story blocks staggered fade-up
            if (storyBlocksRef.current) {
                storyBlocksRef.current.forEach((block) => {
                    if (!block) return;
                    gsap.fromTo(
                        block,
                        { opacity: 0, y: 50 },
                        {
                            opacity: 1,
                            y: 0,
                            duration: 0.8,
                            ease: 'power3.out',
                            scrollTrigger: {
                                trigger: block,
                                start: 'top 85%',
                                toggleActions: 'play none none none',
                            },
                        }
                    );
                });
            }

            // 4. Pillars (friction items) stagger
            const pillarItems = pillarsRef.current?.querySelectorAll('.wwa-pillar-item');
            if (pillarItems) {
                gsap.fromTo(
                    pillarItems,
                    { opacity: 0, y: 30, scale: 0.95 },
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 0.6,
                        ease: 'power3.out',
                        stagger: 0.15,
                        scrollTrigger: {
                            trigger: pillarsRef.current,
                            start: 'top 80%',
                            toggleActions: 'play none none none',
                        },
                    }
                );
            }

            // 5. Second image enters from right
            gsap.fromTo(
                imageTwoRef.current,
                { opacity: 0, x: 80, rotation: 4 },
                {
                    opacity: 1,
                    x: 0,
                    rotation: 0,
                    duration: 1,
                    ease: 'expo.out',
                    scrollTrigger: {
                        trigger: imageTwoRef.current,
                        start: 'top 80%',
                        toggleActions: 'play none none none',
                    },
                }
            );

            // 6. Closing statement elegant reveal
            gsap.fromTo(
                closingRef.current,
                { opacity: 0, y: 40 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: closingRef.current,
                        start: 'top 85%',
                        toggleActions: 'play none none none',
                    },
                }
            );

            // 7. Subtle parallax on the section background
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

        return () => ctx.revert(); // Clean up all ScrollTriggers on unmount
    }, []);
}
