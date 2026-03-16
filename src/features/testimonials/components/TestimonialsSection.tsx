import React, { useEffect, useRef, useState } from 'react';
import './TestimonialsSection.css';
import bgImage from '../../../Images/banner/banner.jpg';

const TESTIMONIALS = [
    {
        text: '“Zestine’s products bring a practical approach to BIM automation. Their solutions are clearly designed with real project workflows in mind and have helped our team simplify several coordination tasks across Revit models.”',
        name: '- Director of BIM',
    },
    {
        text: '“What stands out about Zestine is how their tools focus on solving everyday BIM workflow challenges. Their products integrate smoothly with existing processes and help teams work more efficiently.”',
        name: '- Head of Digital Engineering',
    },
    {
        text: '“ZeConnect helped streamline how our team manages Revit links and exports model views for coordination. The workflow feels much more structured and easier to handle during project collaboration.”',
        name: '- Senior Digital Delivery Expert',
    },
    {
        text: '“With ZeFacility, generating schedules and managing space data across multiple Revit models became far more organized for our team. It reduced a lot of repetitive manual work.”',
        name: '- Facility Management Lead',
    },
    {
        text: '“Our coordination workflows involve frequent sharing of model views and linked files. ZeConnect simplified those tasks and helped our team maintain consistency across projects.”',
        name: '- Project BIM Coordinator',
    },
    {
        text: '“ZeFacility improved the way we manage room data and schedules across our BIM models. It gave our team a more reliable way to keep information organized.”',
        name: '- VDC Manager',
    }
];

export const TestimonialsSection: React.FC = () => {
    const listRef = useRef<HTMLUListElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const leftColRef = useRef<HTMLDivElement>(null);
    const [started, setStarted] = useState(false);

    useEffect(() => {
        if (!containerRef.current || !listRef.current) return;

        // Clone all children multiple times to ensure no gaps on very large screens
        const originalChildren = Array.from(listRef.current.children);
        // Add 2 sets of clones for safety
        for (let j = 0; j < 2; j++) {
            originalChildren.forEach((child) => {
                const clone = child.cloneNode(true) as HTMLElement;
                listRef.current!.appendChild(clone);
            });
        }

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
            <h2 className="ts-title">Trusted by BIM professionals</h2>
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
