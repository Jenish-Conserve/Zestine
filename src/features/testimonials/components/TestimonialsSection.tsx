import React, { useEffect, useRef, useState } from 'react';
import './TestimonialsSection.css';
import bgImage from '../../../Images/banner/banner.jpg';

const TESTIMONIALS = [
    {
        text: 'Zestine tools helped us simplify\ncoordination across complex\nlinked models. Engineering\nTechnology Firm',
        name: '- Jhon Doe',
    },
    {
        text: 'Reduced repetitive\ndocumentation effort across\nmultiple project phases.\nBIM Technology FIRM',
        name: '- Jhon Doe',
    },
    {
        text: 'Enabled our teams to focus\non design intent instead of\ndata management.\nSustainability FIRM',
        name: '- Jhon Doe',
    }
];

export const TestimonialsSection: React.FC = () => {
    const listRef = useRef<HTMLUListElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const leftColRef = useRef<HTMLDivElement>(null);
    const [started, setStarted] = useState(false);

    useEffect(() => {
        if (!containerRef.current || !listRef.current) return;

        // Clone all children to create the seamless loop
        const originalChildren = Array.from(listRef.current.children);
        originalChildren.forEach((child) => {
            const clone = child.cloneNode(true) as HTMLElement;
            listRef.current!.appendChild(clone);
        });

        // Direction & Speed
        containerRef.current.style.setProperty('--animation-direction', 'forwards');
        containerRef.current.style.setProperty('--animation-duration', '50s'); 

        setStarted(true);
    }, []);

    // Intersection Observer to detect when a card overlaps the left column
    useEffect(() => {
        if (!listRef.current || !leftColRef.current) return;

        const checkOverlap = () => {
            if (!leftColRef.current || !listRef.current) return;
            const leftRect = leftColRef.current.getBoundingClientRect();
            const cards = listRef.current.querySelectorAll('.ts-card');

            cards.forEach(card => {
                const rect = card.getBoundingClientRect();
                // We consider it "overlapping" if the left edge of the card touches the left column
                const cardLeftEdge = rect.left;

                // Transition as soon as it crosses the boundary
                if (cardLeftEdge <= leftRect.right) {
                    card.classList.add('ts-card-light');
                    card.classList.remove('ts-card-dark');
                } else {
                    card.classList.add('ts-card-dark');
                    card.classList.remove('ts-card-light');
                }
            });

            requestAnimationFrame(checkOverlap);
        };

        const animationId = requestAnimationFrame(checkOverlap);
        return () => cancelAnimationFrame(animationId);
    }, [started]);

    return (
        <section id="testimonials" className="ts-section">
            <h2 className="ts-title">Trusted by BIM Professionals</h2>
            <div className="ts-layout">
                <div ref={leftColRef} className="ts-left-col" style={{ backgroundImage: `url(${bgImage})` }}>
                    <div className="ts-left-overlay">
                        <div className="ts-quote-icon">“</div>
                        <h3 className="ts-left-text">
                            Zestine was<br />
                            built by<br />
                            professionals<br />
                            who lived those<br />
                            workflows first.
                        </h3>
                    </div>
                </div>
                <div className="ts-right-col">
                    <div ref={containerRef} className="ts-scroller" style={{ overflowX: 'auto', scrollBehavior: 'smooth', scrollbarWidth: 'none' }}>
                        <ul ref={listRef} className={`ts-scroller-list${started ? ' animate-scroll' : ''}`}>
                            {TESTIMONIALS.map((item, i) => (
                                <li key={i} className="ts-card ts-card-dark">
                                    <p className="ts-text" style={{ whiteSpace: 'pre-line' }}>{item.text}</p>
                                    <span className="ts-author-name">{item.name}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="ts-arrows">
                        <button
                            className="ts-arrow-btn"
                            onClick={() => {
                                if (containerRef.current) {
                                    containerRef.current.scrollBy({ left: -350, behavior: 'smooth' });
                                }
                            }}
                        >{'<'}</button>
                        <button
                            className="ts-arrow-btn"
                            onClick={() => {
                                if (containerRef.current) {
                                    containerRef.current.scrollBy({ left: 350, behavior: 'smooth' });
                                }
                            }}
                        >{'>'}</button>
                    </div>
                </div>
            </div>
        </section>
    );
};
