import { useGsapAnimation } from '../../../hooks/useGsapAnimation';
import { heroRevealAnimation } from '../hooks/useHeroAnimation';
import { FaWhatsapp } from 'react-icons/fa';
import bannerImg from '../../../Images/banner/banner.jpg';
import './HeroSection.css';

export function HeroSection() {
    const { elementRef: containerRef } = useGsapAnimation<HTMLDivElement>({ animation: heroRevealAnimation });

    return (
        <>
            <section
                ref={containerRef}
                className="heroContainer"
                style={{ backgroundImage: `url('${bannerImg}')` }}
            >
                <div className="heroOverlay" />

                <div className="heroContent">
                    <div className="heroLeft">
                        <h1 className="heroTitle">
                            Engineering Intelligence.<br />Amplified.
                        </h1>
                        <p className="heroSubhead">
                            Built for the people designing the world<br />we live in.
                        </p>
                    </div>

                    <div className="heroRight">
                        <p className="heroText">
                            Zestine helps AEC organizations move from fragmented workflows to intelligent operations replacingrepetitive processes with systems that think, guide, and scale with your projects.
                        </p>
                        <div className="heroButtons">
                            <button className="btnPrimary">Products</button>
                            <button className="btnSecondary">Connect with Experts</button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Floating WhatsApp button */}
            <a
                href="https://wa.me/something"
                className="whatsappFloat"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat on WhatsApp"
            >
                <FaWhatsapp />
            </a>
        </>
    );
}
