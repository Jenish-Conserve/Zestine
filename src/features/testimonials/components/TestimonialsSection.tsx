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
        title: 'Recommended',
        text: 'Very happy with the app. Does what it says, simple payments and transactions. Quick account verification and withdrawals. 24/7 support available.',
        name: 'Vamsi K.',
        initials: 'VK',
        avatarColor: '#bbf7d0', // green
        textColor: '#14532d'
    },
    {
        title: 'Awesome app very user friendly',
        text: 'Would highly recommend Jeton to my friends.',
        name: 'Leonie A.',
        initials: 'LA',
        avatarColor: '#bfdbfe', // blue
        textColor: '#1e3a8a'
    },
    {
        title: 'The best payment solution for German customers',
        text: 'I\'ve been a Jeton user for a few years! The support was always great and I\'m always able to make my payments to the websites I want with no problem.',
        name: 'Karl R.',
        initials: 'KR',
        avatarColor: '#fef08a', // yellow
        textColor: '#713f12'
    }
];

export const TestimonialsSection: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

    useGSAP(() => {
        if (!sectionRef.current || cardsRef.current.length === 0) return;

        // Set initial state
        cardsRef.current.forEach((card, index) => {
            if (!card) return;
            if (index === 0) {
                gsap.set(card, { y: 0, opacity: 1, scale: 1, zIndex: 10 });
            } else {
                // start behind the first card
                gsap.set(card, { y: -20, opacity: 0, scale: 0.95, zIndex: 10 - index });
            }
        });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top top",
                end: "+=300%",
                scrub: 1,
                pin: true,
                anticipatePin: 1,
                pinSpacing: true,
            }
        });

        cardsRef.current.forEach((card, index) => {
            if (index === 0) return;

            // Small pause before sliding down
            tl.to({}, { duration: 0.1 });

            // Using 220px for a more spread out cascading look
            const slideDownDist = index * 220;

            tl.to(card, {
                y: slideDownDist,
                opacity: 1,
                scale: 1,
                duration: 1,
                ease: "power2.out"
            });
        });

        // Add a final hold so the user can read the last card before unpinning
        tl.to({}, { duration: 0.5 });

    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} className="ts-section" style={{ backgroundImage: `url(${bgImage})` }}>
            <div className="ts-container">
                <h2 className="ts-title">Trusted by BIM Professionals</h2>

                <div className="ts-cards-wrapper">
                    <div className="ts-cards-track">
                        {TESTIMONIALS.map((item, i) => (
                            <div
                                key={i}
                                className="ts-card"
                                ref={(el) => { cardsRef.current[i] = el; }}
                            >
                                <h3 className="ts-card-title">{item.title}</h3>
                                <p className="ts-text">{item.text}</p>

                                <div className="ts-author-row">
                                    <div
                                        className="ts-avatar-circle"
                                        style={{ backgroundColor: item.avatarColor, color: item.textColor }}
                                    >
                                        {item.initials}
                                    </div>
                                    <span className="ts-author-name">{item.name}</span>
                                    <img src={quotesImg} alt="quotes" className="ts-quotes-img" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
