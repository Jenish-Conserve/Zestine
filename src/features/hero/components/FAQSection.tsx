import { useState } from 'react';
import { FiArrowUpRight } from 'react-icons/fi';
import './FAQSection.css';

const faqs = [
    { id: 1, question: "What is ZeManage?", answer: "ZeManage helps AEC teams reduce project risks and operational downtime by bringing better structure and visibility to daily workflows and coordination." },
    { id: 2, question: "Who is ZeManage for?", answer: "ZeManage is built for BIM/VDC teams, design technology leaders, and project managers working on complex AEC projects with multiple stakeholders." },
    { id: 3, question: "Will it work with our current tools?", answer: "Yes. ZeManage is designed to integrate into existing AEC environments and support teams using multiple systems and data formats." },
    { id: 4, question: "Do we need to change our existing workflows?", answer: "No. ZeManage works alongside your current processes and tools, allowing teams to improve consistency without disrupting how they already work." },
    { id: 5, question: "Is ZeManage secure?", answer: "Yes. The platform supports enterprise-grade security practices and aligns with standard IT governance and access control requirements." },
    { id: 6, question: "Will this disrupt our current project delivery?", answer: "No. ZeManage is meant to support existing processes, not interrupt them. Implementation is typically phased to avoid operational disruption." }
];

export function FAQSection() {
    const [activeFaq, setActiveFaq] = useState<number | null>(null);

    const toggleFaq = (id: number) => {
        setActiveFaq(activeFaq === id ? null : id);
    };

    return (
        <section id="contact" className="faq-container">
            <div className="faq-content">

                {/* Left Side: FAQ List */}
                <div className="faq-left">
                    <h2 className="faq-title">FAQ's</h2>
                    <div className="faq-list">
                        {faqs.map((faq) => {
                            const isActive = activeFaq === faq.id;
                            return (
                                <div
                                    key={faq.id}
                                    className={`faq-item ${isActive ? 'active' : ''}`}
                                    onClick={() => toggleFaq(faq.id)}
                                >
                                    <div className="faq-item-header">
                                        <span className="faq-question">{faq.question}</span>
                                        <span className={`faq-icon ${isActive ? 'rotate' : ''}`}>
                                            <FiArrowUpRight />
                                        </span>
                                    </div>
                                    <div className="faq-answer-wrapper" style={{ height: isActive ? 'auto' : 0 }}>
                                        <div className="faq-answer-inner">
                                            <p className="faq-answer-text">{faq.answer}</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Right Side: Contact Form */}
                <div className="faq-right">
                    <div className="contact-form-card">
                        <h3 className="form-title">Get Started with Zestine</h3>
                        <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
                            <input type="text" placeholder="Name *" required />
                            <input type="email" placeholder="Email *" required />
                            <input type="tel" placeholder="Phone Number" />
                            <input type="text" placeholder="Company Name *" required />
                            <textarea placeholder="Tell us about your requirements / problems" rows={4} required></textarea>
                            <p className="form-privacy-notice">Your information is safe with us. We respect your privacy and never spam.</p>
                            <div className="form-submit-wrapper">
                                <button type="submit" className="form-submit-btn btn-zestine">
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </section>
    );
}
