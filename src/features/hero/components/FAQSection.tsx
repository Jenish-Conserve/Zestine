import { useState } from 'react';
import { FiArrowUpRight, FiArrowRight } from 'react-icons/fi';
import './FAQSection.css';

const faqs = [
    { id: 1, question: "How does BIM Coordination improve project efficiency?" },
    { id: 2, question: "How does BIM Coordination improve project efficiency?" },
    { id: 3, question: "How does BIM Coordination improve project efficiency?" },
    { id: 4, question: "How does BIM Coordination improve project efficiency?" },
    { id: 5, question: "How does BIM Coordination improve project efficiency?" }
];

export function FAQSection() {
    const [activeFaq, setActiveFaq] = useState<number | null>(null);

    const toggleFaq = (id: number) => {
        setActiveFaq(activeFaq === id ? null : id);
    };

    return (
        <section className="faq-container">
            <div className="faq-content">

                {/* Left Side: FAQ List */}
                <div className="faq-left">
                    <h2 className="faq-title">FAQ's</h2>
                    <div className="faq-list">
                        {faqs.map((faq) => (
                            <div
                                key={faq.id}
                                className={`faq-item ${activeFaq === faq.id ? 'active' : ''}`}
                                onClick={() => toggleFaq(faq.id)}
                            >
                                <span className="faq-question">{faq.question}</span>
                                <span className="faq-icon">
                                    {activeFaq === faq.id ? <FiArrowUpRight /> : <FiArrowUpRight />}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Side: Contact Form */}
                <div className="faq-right">
                    <div className="contact-form-card">
                        <h3 className="form-title">Have Any Other Questions?</h3>
                        <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
                            <input type="text" placeholder="Name" required />
                            <input type="email" placeholder="Email" required />
                            <input type="tel" placeholder="Phone Number" required />
                            <input type="text" placeholder="Company Name" />
                            <textarea placeholder="Your Questions" rows={4} required></textarea>
                            <div className="form-submit-wrapper">
                                <button type="submit" className="form-submit-btn">
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
