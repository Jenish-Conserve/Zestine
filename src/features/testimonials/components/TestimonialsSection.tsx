import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import './TestimonialsSection.css';
import bgImage from '../../../Images/testiminial/Frame 42.png';
import quotesImg from '../../../Images/testiminial/quotes.png';

gsap.registerPlugin(ScrollTrigger);

const TESTIMONIALS = [
    {
        text: 'Zestine tools helped us simplify co-\nordination across complex linked models.\nEngineering Technology Firm',
        name: 'Jhon Doe',
        avatarUrl: 'https://i.pravatar.cc/150?img=11'
    },
    {
        text: 'Reduced repetitive documentation effort\nacross multiple project phases.\nBIM Technology FIRM',
        name: 'Jhon Doe',
        avatarUrl: 'https://i.pravatar.cc/150?img=11'
    },
    {
        text: 'Enabled our teams to focus on design in\ntent instead of data management.\nSustainability FIRM',
        name: 'Jhon Doe',
        avatarUrl: 'https://i.pravatar.cc/150?img=11'
    }
];

export const TestimonialsSection: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

    useGSAP(() => {
        if (!sectionRef.current || cardsRef.current.length === 0) return;

        // Set initial state for cards 2 and 3 so they come from above (behind the previous card)
        cardsRef.current.forEach((card, index) => {
            if (!card) return;

            // Ensure earlier cards render on top of later cards so they can slide out from under them
            gsap.set(card, { zIndex: 10 - index });

            if (index > 0) {
                // start higher (negative y) and faded
                gsap.set(card, { y: -150, opacity: 0 });
            }
        });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top top", // pin when top of section hits top of viewport
                end: "+=200%", // scroll distance controls animation duration
                scrub: 1, // smooth scrubbing
                pin: true, // pin the section
                anticipatePin: 1,
                refreshPriority: 1 // Calculate after all upstream sections
            }
        });

        // initial hold for card 1
        tl.to({}, { duration: 0.5 });

        cardsRef.current.forEach((card, index) => {
            if (index === 0) return;

            tl.to(card, {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: "power2.out"
            });

            // hold after each card appears
            tl.to({}, { duration: 1.5 });
        });

        // final hold before unpinning
        tl.to({}, { duration: 0.5 });

    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} className="ts-section" style={{ backgroundImage: `url(${bgImage})` }}>
            <div className="ts-container">
                <h2 className="ts-title">Trusted by BIM Professionals</h2>
                <div className="ts-cards-wrapper">
                    {TESTIMONIALS.map((item, i) => (
                        <div
                            key={i}
                            className="ts-card"
                            ref={(el) => { cardsRef.current[i] = el; }}
                        >
                            <p className="ts-text" style={{ whiteSpace: 'pre-line' }}>{item.text}</p>

                            <div className="ts-author-row">
                                <img src={item.avatarUrl} alt={item.name} className="ts-avatar-img" />
                                <span className="ts-author-name">{item.name}</span>
                                <img src={quotesImg} alt="quotes" className="ts-quotes-img" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
