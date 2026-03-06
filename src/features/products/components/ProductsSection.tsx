import { useRef } from 'react';
import { FaDownload } from 'react-icons/fa';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

import logoColorImg from '../../../Images/product/logo-color.png';
import logoBwImg from '../../../Images/product/logo = bw.png';
import zbgImg from '../../../Images/product/product bg z.png';
import zemanageImg from '../../../Images/product/zemanage.jpg';
import zefacilityImg from '../../../Images/product/zefacility.jpg';
import './ProductsSection.css';

gsap.registerPlugin(ScrollTrigger);

const PRODUCTS = [
    {
        id: 'zemanage',
        label: 'ZeManage',
        description:
            'Govern BIM environments in real-time with centralized monitoring and standards enforcement, without interrupting design workflows.',
        bg: '#ffffff',
        cardBg: '#ffffff',
        textColor: '#0f172a',
        subTextColor: '#475569',
        badgeBg: '#ffe4e6',      // light red-pink pill
        badgeText: '#f43f5e',
        downloadBg: '#f04141',   // Red button
        downloadText: '#ffffff',
        downloadBorder: 'none',
        tabAccent: '#0f172a',
        logo: logoColorImg,
        // Z bg: white (#FFFFFF)
        zFilter: 'brightness(0) invert(1) opacity(0.15)',
        image: zemanageImg,
    },
    {
        id: 'zefacility',
        label: 'ZeFacility',
        description:
            'Automate schedules, space creation, and documentation to simplify data coordination across project teams.',
        bg: '#1a4490',
        cardBg: '#1a4490',
        textColor: '#ffffff',
        subTextColor: 'rgba(255,255,255,0.75)',
        badgeBg: '#ffffff',      // white pill on blue card
        badgeText: '#111827',    // dark text
        downloadBg: '#ffffff',   // White button
        downloadText: '#111827',
        downloadBorder: 'none',
        tabAccent: '#1a4490',
        logo: logoBwImg,
        zFilter: 'brightness(0) invert(1) opacity(0.12)',  // white Z on blue card
        image: zefacilityImg,
    },
    {
        id: 'zeconnect',
        label: 'ZeConnect',
        description:
            'Streamline model export and link management with intelligent cloud-enabled integrations.',
        bg: '#f04141',
        cardBg: '#f04141',
        textColor: '#ffffff',
        subTextColor: 'rgba(255,255,255,0.80)',
        badgeBg: '#ffffff',      // white pill on red card
        badgeText: '#111827',    // dark text
        downloadBg: '#ffffff',   // White button
        downloadText: '#111827',
        downloadBorder: 'none',
        tabAccent: '#f04141',
        logo: logoBwImg,
        // Z bg: #FC424F (red-pink)
        zFilter: 'brightness(0) saturate(100%) invert(48%) sepia(61%) saturate(2855%) hue-rotate(325deg) brightness(101%) contrast(101%) opacity(0.8)',
        image: zemanageImg,
    },
];

// Each card gets: 1 unit hold + 1 unit transition, plus a final hold for the last card
// GSAP scrub maps the total timeline duration to the total scroll distance evenly.
// So each "chapter" gets exactly equal scroll space = totalScrollVh / totalDuration

export function ProductsSection() {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const stickyRef = useRef<HTMLDivElement>(null);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
    const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
    const activeIndexRef = useRef(0);

    const setActiveTab = (index: number) => {
        activeIndexRef.current = index;
        tabRefs.current.forEach((tab, i) => {
            if (!tab) return;
            const isActive = i === index;
            tab.style.borderColor = isActive ? PRODUCTS[i].tabAccent : 'transparent';
            tab.style.color = isActive ? PRODUCTS[i].tabAccent : '#6b7280';
            tab.style.fontWeight = isActive ? '600' : '400';
        });
    };

    useGSAP(() => {
        if (!wrapperRef.current || !stickyRef.current) return;

        const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
        if (cards.length === 0) return;

        // Stack all cards: first one visible, rest hidden below
        gsap.set(cards, { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' });
        gsap.set(cards[0], { y: 0, opacity: 1, scale: 1, zIndex: 10 });
        cards.slice(1).forEach((card, i) => {
            gsap.set(card, { y: '100%', opacity: 0, scale: 1, zIndex: 10 + i + 1 });
        });

        // Single timeline covering the entire sticky scroll range
        // Structure: [hold card0] [transition 0→1] [hold card1] [transition 1→2] ... [hold lastCard]
        // Each phase has duration: 1, so total = 2*(n-1) + 1 units for n cards
        // Initialise first tab as active
        setActiveTab(0);

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: wrapperRef.current,
                start: 'top top',
                end: 'bottom bottom',
                scrub: 1.5,
                refreshPriority: 5, // Calculate after WhoWeAre pin space
                onUpdate: (self) => {
                    // There are 3 cards, so progress maps linearly:
                    // 0.0 - 0.33 -> 0
                    // 0.33 - 0.66 -> 1
                    // 0.66 - 1.0 -> 2
                    let newIndex = Math.min(
                        cards.length - 1,
                        Math.floor(self.progress * cards.length)
                    );

                    if (activeIndexRef.current !== newIndex) {
                        setActiveTab(newIndex);
                    }
                }
            }
        });

        // Build the timeline chapters
        // Timeline sequence: [hold card0] → [0→1 transition] → [hold card1] → [1→2 transition] → [hold card2]
        // Rule: hold plays sequentially (no position), transition pairs use '<' only on prevCard
        cards.forEach((card, index) => {
            if (index === 0) {
                // First card: just hold it visible
                tl.to({}, { duration: 1 });
                return;
            }

            const prevCard = cards[index - 1];

            // ── Transition phase: plays AFTER the hold (sequential, no '<') ──
            tl.to(card, {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: 'power2.inOut',
            });

            // Previous card folds back — concurrent with incoming card
            tl.to(prevCard, {
                scale: 0.92,
                opacity: 0.6,
                y: -60,
                duration: 1,
                ease: 'power2.inOut',
            }, '<');

            // ── Hold phase: new card is fully visible, nothing moves ──
            tl.to({}, { duration: 1 });
        });

    }, { scope: wrapperRef });

    // Wrapper height = (2*(n-1) + 1) chapters × 100vh each
    // So: 3 cards → 5 chapters → 500vh total
    const numChapters = 2 * (PRODUCTS.length - 1) + 1;
    const totalScrollVh = numChapters * 100;

    return (
        /* Outer wrapper: sets the total scroll distance so next section is pushed down */
        <div
            ref={wrapperRef}
            className="ps-scroll-wrapper"
            style={{ height: `${totalScrollVh}vh` }}
        >
            {/* Inner sticky pane: stays fixed while outer wrapper scrolls */}
            <div ref={stickyRef} className="ps-sticky-pane">
                {/* Tab row: active tab border matches the current card accent */}
                <div className="ps-tabs">
                    {PRODUCTS.map((prod, i) => (
                        <button
                            key={prod.id}
                            ref={(el) => { if (el) tabRefs.current[i] = el; }}
                            className="ps-tab"
                            style={{
                                color: i === 0 ? prod.tabAccent : '#6b7280',
                                borderColor: i === 0 ? prod.tabAccent : 'transparent',
                                fontWeight: i === 0 ? '600' : '400'
                            }}
                        >
                            {prod.label}
                        </button>
                    ))}
                </div>
                <div className="ps-cards-container">
                    {PRODUCTS.map((p, i) => (
                        <div
                            ref={(el) => { if (el) cardRefs.current[i] = el; }}
                            className="ps-card"
                            key={p.id}
                            style={{ backgroundColor: p.cardBg }}
                        >
                            {/* Z Background Image — tinted per card via filter */}
                            <img
                                src={zbgImg}
                                alt=""
                                className="ps-card-bg"
                                style={{ filter: p.zFilter }}
                            />

                            {/* Top row: badge + logo */}
                            <div className="ps-card-top">
                                <span
                                    className="ps-badge"
                                    style={{ backgroundColor: p.badgeBg, color: p.badgeText }}
                                >
                                    Product
                                </span>
                                <img src={p.logo} alt="Zestine logo" className="ps-logo" />
                            </div>

                            {/* Product name */}
                            <h2 className="ps-product-name" style={{ color: p.textColor }}>
                                {p.label}
                            </h2>

                            {/* Bottom row: text + image */}
                            <div className="ps-card-bottom">
                                <div className="ps-card-text">
                                    <p className="ps-description" style={{ color: p.subTextColor }}>
                                        {p.description}
                                    </p>
                                    <button
                                        className="ps-download-btn"
                                        style={{
                                            backgroundColor: p.downloadBg,
                                            color: p.downloadText,
                                            border: p.downloadBorder,
                                        }}
                                    >
                                        Download <FaDownload />
                                    </button>
                                </div>

                                {/* Tilted image */}
                                <div className="ps-image-wrap">
                                    <img src={p.image} alt={p.label} className="ps-product-image" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
