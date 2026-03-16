import { lazy, Suspense, useState, useEffect } from 'react';
import { useGsapAnimation } from '../../../hooks/useGsapAnimation';
import { heroRevealAnimation } from '../hooks/useHeroAnimation';
import { FaWhatsapp, FaArrowUp } from 'react-icons/fa';
import './HeroSection.css';

// Lazy-load the heavy Three.js canvas so it doesn't block the initial render
const Antigravity = lazy(() => import('../../../components/3d/Antigravity'));

export function HeroSection() {
    const { elementRef: containerRef } = useGsapAnimation<HTMLDivElement>({ animation: heroRevealAnimation });
    const [isMobile, setIsMobile] = useState(false);
    const [showScrollTop, setShowScrollTop] = useState(false);
    const [showWhatsApp, setShowWhatsApp] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= 768);
        const handleScroll = () => {
            // Show WhatsApp only after scrolling past the hero (e.g., 600px)
            setShowWhatsApp(window.scrollY > 600);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('resize', checkMobile);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                // Show button when the section is visible
                setShowScrollTop(entry.isIntersecting);
            },
            {
                threshold: 0.1, // Trigger when 10% of the section is visible
            }
        );

        const contactSection = document.getElementById('contact');
        if (contactSection) {
            observer.observe(contactSection);
        }

        return () => {
            if (contactSection) {
                observer.unobserve(contactSection);
            }
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <>
            <section id="hero" ref={containerRef} className="heroContainer">

                {/* ── Full-screen Antigravity animation background ── */}
                <div className="heroAnimBg">
                    <Suspense fallback={<div className="heroAnimFallback" />}>
                        <Antigravity
                            count={isMobile ? 50 : 160}
                            magnetRadius={10}
                            ringRadius={10}
                            waveSpeed={0.4}
                            waveAmplitude={3.4}
                            particleSize={0.5}
                            lerpSpeed={0.1}
                            color="#FC424F"
                            color2="#033465"
                            autoAnimate={false}
                            particleVariance={1}
                            rotationSpeed={0}
                            depthFactor={1}
                            pulseSpeed={3}
                            particleShape="capsule"
                            fieldStrength={10}
                        />
                    </Suspense>
                </div>

                {/* ── Dark overlay to keep text readable over animation ── */}
                <div className="heroOverlay" />

                {/* ── Text content — centered ── */}
                <div className="heroContent">
                    <div className="heroLeft">
                        <h1 className="heroTitle">
                            <span className="heroTitleDark">Engineering Intelligence.</span><br />
                            <span className="heroTitleRed">Amplified.</span>
                        </h1>
                        <p className="heroSubhead">
                            Built for the people designing<br />
                            the world we live in.
                        </p>
                    </div>
                    <div className="heroRight">
                        <p className="heroText">
                            Zestine helps AEC organizations move from fragmented
                            workflows to intelligent operations replacing repetitive
                            processes with systems that think, guide, and scale
                            with your projects.
                        </p>
                        <div className="heroButtons">
                            <button
                                className="btnPrimary"
                                onClick={() => {
                                    const el = document.getElementById('products');
                                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                                }}
                            >
                                Products
                            </button>
                            <button className="btnSecondary">Contact with experts</button>
                        </div>
                    </div>
                </div>
            </section>


            {/* Floating WhatsApp button */}
            <a
                href="https://wa.me/+18322065663"
                className={`whatsappFloat ${showWhatsApp ? 'visible' : ''}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat on WhatsApp"
            >
                <FaWhatsapp />
            </a>

            {/* Floating Scroll to Top button */}
            <button
                className={`scrollTopFloat ${showScrollTop ? 'visible' : ''}`}
                onClick={scrollToTop}
                aria-label="Scroll to top"
            >
                <FaArrowUp />
            </button>
        </>
    );
}
