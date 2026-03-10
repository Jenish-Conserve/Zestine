import { Link } from 'react-router-dom';
import { FaInstagram, FaYoutube, FaLinkedinIn, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaArrowUp } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import logoImg from '../../Images/logo/Group 174.png';
import footerPattern from '../../Images/footer/Group 162.png';
import './Footer.css';

import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);

export function Footer() {
    const scrollToTop = () => {
        // Use GSAP to animate window scroll cleanly to the banner
        gsap.to(window, { duration: 1, scrollTo: 0, ease: 'power3.inOut' });
    };

    return (
        <footer id="footer" className="footer-container" style={{ backgroundColor: '#002145' }}>
            <div className="footer-backgrounds">
                {/* Background Pattern overlaying the entire footer */}
                <div
                    className="footer-pattern"
                    style={{ '--bg-pattern': `url('${footerPattern}')` } as React.CSSProperties}
                />

                {/* Watermark text */}
                <h1 className="footer-watermark">Zestine</h1>
            </div>

            <div className="footer-content">
                {/* Top Section - Grid */}
                <div className="footer-grid">
                    {/* Column 1: Logo & Description */}
                    <div className="footer-col brand-col">
                        <Link to="/" className="footer-logo">
                            <img src={logoImg} alt="Zestine" />
                        </Link>
                        <p className="footer-description">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus leo mi, malesuada eget ultrices at.Lorem ipsum dolor sit amet
                        </p>
                        <div className="footer-socials">
                            <a href="#"><FaXTwitter /></a>
                            <a href="#"><FaInstagram /></a>
                            <a href="#"><FaYoutube /></a>
                            <a href="#"><FaLinkedinIn /></a>
                        </div>
                    </div>

                    {/* Column 2: Explore */}
                    <div className="footer-col nav-col">
                        <h3 className="footer-heading">Explore</h3>
                        <div className="footer-heading-underline" />
                        <nav className="footer-nav">
                            <a href="#hero" onClick={(e) => {
                                e.preventDefault();
                                const el = document.getElementById('hero');
                                if (el) gsap.to(window, { duration: 1, scrollTo: el, ease: 'power3.inOut' });
                            }}>Home</a>
                            <a href="#who-we-are" onClick={(e) => {
                                e.preventDefault();
                                const el = document.getElementById('who-we-are');
                                if (el) gsap.to(window, { duration: 1, scrollTo: el, ease: 'power3.inOut' });
                            }}>About us</a>
                            <a href="#who-we-are" onClick={(e) => {
                                e.preventDefault();
                                const el = document.getElementById('who-we-are');
                                if (el) gsap.to(window, { duration: 1, scrollTo: el, ease: 'power3.inOut' });
                            }}>Who We Are</a>
                            <a href="#products" onClick={(e) => {
                                e.preventDefault();
                                const el = document.getElementById('products');
                                if (el) gsap.to(window, { duration: 1, scrollTo: el, ease: 'power3.inOut' });
                            }}>Products</a>
                            <a href="#contact" onClick={(e) => {
                                e.preventDefault();
                                const el = document.getElementById('contact');
                                if (el) gsap.to(window, { duration: 1, scrollTo: el, ease: 'power3.inOut' });
                            }}>Contact us</a>
                        </nav>
                    </div>

                    {/* Column 3: Products */}
                    <div className="footer-col nav-col">
                        <h3 className="footer-heading">Products</h3>
                        <div className="footer-heading-underline" />
                        <nav className="footer-nav">
                            <a href="#products" onClick={(e) => {
                                e.preventDefault();
                                const element = document.getElementById('products');
                                if (element) {
                                    element.scrollIntoView({ behavior: 'smooth' });
                                }
                            }}>ZeManage</a>
                            <a href="#products" onClick={(e) => {
                                e.preventDefault();
                                const element = document.getElementById('products');
                                if (element) {
                                    element.scrollIntoView({ behavior: 'smooth' });
                                }
                            }}>ZeFacility</a>
                            <a href="#products" onClick={(e) => {
                                e.preventDefault();
                                const element = document.getElementById('products');
                                if (element) {
                                    element.scrollIntoView({ behavior: 'smooth' });
                                }
                            }}>ZeConnect</a>
                        </nav>
                    </div>

                    {/* Column 4: Locations */}
                    <div className="footer-col location-col">
                        <h3 className="footer-heading">Our Locations</h3>
                        <div className="footer-heading-underline" />
                        <ul className="footer-list">
                            <li><FaMapMarkerAlt className="footer-icon" /> India</li>
                            <li><FaMapMarkerAlt className="footer-icon" /> Dubai, UAE</li>
                            <li><FaMapMarkerAlt className="footer-icon" /> USA</li>
                        </ul>
                    </div>

                    {/* Column 5: Contact */}
                    <div className="footer-col contact-col">
                        <h3 className="footer-heading">Contact Us</h3>
                        <div className="footer-heading-underline" />
                        <ul className="footer-list">
                            <li><FaPhoneAlt className="footer-icon" /> +91 987654321</li>
                            <li><FaEnvelope className="footer-icon" /> info@company.com</li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Section - Action Card */}
                <div className="footer-action-card">
                    <div className="action-col">
                        <h2>Get in touch with us</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </div>
                    <div className="action-col flex-row">
                        <div className="action-item">
                            <span className="action-label">Email</span>
                            <div className="action-value">
                                <FaEnvelope />
                                info@company.com
                            </div>
                        </div>
                        <div className="action-item">
                            <span className="action-label">Phone Number</span>
                            <div className="action-value">
                                <FaPhoneAlt />
                                +91 987654321
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Floating Scroll to Top button pointing out from edge */}
            <button className="scroll-to-top" onClick={scrollToTop} aria-label="Scroll to top">
                <FaArrowUp />
            </button>
        </footer>
    );
}
