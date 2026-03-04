import { useRef } from 'react';
import { useWhoWeAreAnimation } from '../hooks/useWhoWeAreAnimation';
import blueprintImg from '../../../Images/who are we/Blueprint.png';
import buildingImg from '../../../Images/who are we/1003825_OIU9MP1 1.png';
import './WhoWeAre.css';

export function WhoWeAreSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const badgeRef = useRef<HTMLSpanElement>(null);
    const introRef = useRef<HTMLDivElement>(null);
    const imageOneRef = useRef<HTMLDivElement>(null);
    const imageTwoRef = useRef<HTMLDivElement>(null);
    const storyBlocksRef = useRef<(HTMLDivElement | null)[]>([]);
    const pillarsRef = useRef<HTMLDivElement>(null);
    const closingRef = useRef<HTMLDivElement>(null);

    useWhoWeAreAnimation({
        sectionRef,
        titleRef,
        badgeRef,
        introRef,
        imageOneRef,
        imageTwoRef,
        storyBlocksRef,
        pillarsRef,
        closingRef,
    });

    return (
        <section className="wwa-section" ref={sectionRef}>
            {/* Giant watermark background text */}
            <span className="wwa-bg-word" aria-hidden="true">ZESTINE</span>

            {/* ─── HEADER ─── */}
            <header className="wwa-header">
                <span className="wwa-badge" ref={badgeRef}>Who We Are</span>
                <h2 className="wwa-title" ref={titleRef}>
                    Born in Engineering.<br />Built for Operations.
                </h2>
            </header>

            <div className="wwa-container">

                {/* ─── INTRO: Blueprint image + Origin story ─── */}
                <div className="wwa-intro" ref={introRef}>
                    {/* Image left */}
                    <div className="wwa-image-frame" ref={imageOneRef}>
                        <img src={blueprintImg} alt="Engineering blueprint" />
                    </div>

                    {/* Text right */}
                    <div className="wwa-intro-text">
                        <div className="wwa-divider" />
                        <h3 className="wwa-tagline">
                            Zestine was built by professionals who lived those{' '}
                            <span className="highlight">workflows first.</span>
                        </h3>
                        <p className="wwa-body-text">
                            It started inside an engineering office where highly capable teams were
                            still caught in manual coordination, disconnected data, and repetitive
                            execution.
                        </p>
                        <p className="wwa-body-text">
                            Despite powerful AEC tools, real-world project delivery remained slowed
                            by workflow friction, implementation gaps, and processes that software
                            never truly solved.
                        </p>
                    </div>
                </div>

                {/* ─── STORY: What slowed them down ─── */}
                <div className="wwa-story-section">
                    <p className="wwa-story-section-label">The Challenge</p>

                    <div
                        className="wwa-story-block"
                        ref={(el) => { storyBlocksRef.current[0] = el; }}
                    >
                        <h3 className="wwa-story-headline">
                            Despite powerful AEC tools, real-world project delivery remained slowed by:
                        </h3>
                    </div>

                    {/* Pillars grid */}
                    <div className="wwa-pillars" ref={pillarsRef}>
                        {[
                            'Workflow friction',
                            'Implementation gaps',
                            'Manual documentation',
                            'Repetitive operational tasks',
                        ].map((item) => (
                            <div key={item} className="wwa-pillar-item">
                                <span>{item}</span>
                            </div>
                        ))}
                    </div>

                    <div
                        className="wwa-story-block"
                        ref={(el) => { storyBlocksRef.current[1] = el; }}
                    >
                        <h3 className="wwa-story-headline">We saw a disconnect.</h3>
                        <p className="wwa-story-body">
                            Software was being built for engineering — without engineering.
                        </p>
                    </div>
                </div>

                {/* ─── PIVOT: We reversed the model ─── */}
                <div className="wwa-pivot">
                    {/* Left: text */}
                    <div className="wwa-pivot-content">
                        <p className="wwa-story-section-label">The Turning Point</p>

                        <div className="wwa-quote-block">
                            <p>"So we reversed the model."</p>
                        </div>

                        <ul className="wwa-point-list">
                            <li>Domain experts led the design.</li>
                            <li>Technology became the accelerator.</li>
                        </ul>

                        <p className="wwa-body-text">
                            What began as internal tools to reduce coordination effort quickly
                            became adopted by BIM professionals across projects — shaping the
                            foundation for scalable digital systems built around engineering
                            reality.
                        </p>
                    </div>

                    {/* Right: Building photo */}
                    <div className="wwa-image-frame wwa-pivot-image" ref={imageTwoRef}>
                        <img src={buildingImg} alt="Engineering building" />
                    </div>
                </div>

                {/* ─── CLOSING STATEMENT ─── */}
                <div className="wwa-closing" ref={closingRef}>
                    <h3 className="wwa-closing-headline">
                        Today, Zestine builds intelligent platforms that help AEC teams operate
                        with clarity, precision, and control.
                    </h3>
                    <p className="wwa-closing-body">
                        From model governance to data coordination — we connect the gap between
                        engineering intent and operational reality.
                    </p>
                </div>

            </div>
        </section>
    );
}
