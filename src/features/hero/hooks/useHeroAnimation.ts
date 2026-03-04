import gsap from 'gsap';

export const heroRevealAnimation = (element: HTMLElement | null) => {
    if (!element) return;
    element.style.willChange = 'transform, opacity';

    // We'll target the children for a staggered reveal
    const title = element.querySelector('.heroTitle');
    const subhead = element.querySelector('.heroSubhead');
    const text = element.querySelector('.heroText');
    const buttons = element.querySelectorAll('.heroButtons button');

    const tl = gsap.timeline({
        onComplete: () => {
            element.style.willChange = 'auto';
        }
    });

    // Scale the background slightly using the container
    tl.fromTo(element,
        { backgroundSize: '110%' },
        { backgroundSize: '100%', duration: 2, ease: 'power2.out' }
    )
        .fromTo([title, subhead],
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: 'power3.out' },
            '-=1.5' // Start earlier
        )
        .fromTo(text,
            { opacity: 0, x: 20 },
            { opacity: 1, x: 0, duration: 0.8, ease: 'power2.out' },
            '-=1.0'
        )
        .fromTo(buttons,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'back.out(1.5)' },
            '-=0.6'
        );

    return tl;
};
