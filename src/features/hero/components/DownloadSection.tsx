import { useState } from 'react';
import { FaDownload, FaCheckCircle } from 'react-icons/fa';
import './DownloadSection.css';

export function DownloadSection() {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isError, setIsError] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            company: formData.get('company'),
            location: formData.get('location'),
            product: 'Company Brochure',
        };

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/download`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                setIsSubmitted(true);
                setIsError(false);
                
                // Auto-trigger brochure download
                const link = document.createElement('a');
                link.href = '/brochure.pdf';
                link.download = 'Zestine_Brochure.pdf';
                link.click();
            } else {
                setIsError(true);
            }
        } catch (error) {
            console.error('Submission error:', error);
            setIsError(true);
        }
    };

    return (
        <section id="download" className="download-section">
            <div className="download-container">
                <div className="download-content">
                    <div className="download-left">
                        <h2 className="download-title">Download Our <br /><span className="text-highlight">Capabilities</span> Brochure</h2>
                        <p className="download-text">
                            Get a detailed overview of how Zestine is transforming AEC workflows. 
                            Our brochure covers our full product suite, integration capabilities, and success stories.
                        </p>
                        <ul className="download-features">
                            <li><FaCheckCircle className="icon" /> Product Technical Specs</li>
                            <li><FaCheckCircle className="icon" /> Implementation Roadmap</li>
                            <li><FaCheckCircle className="icon" /> Case Studies & ROI</li>
                        </ul>
                    </div>

                    <div className="download-right">
                        <div className="download-form-card">
                            {isSubmitted ? (
                                <div className="download-success">
                                    <FaCheckCircle className="success-icon" />
                                    <h3>Ready for Download!</h3>
                                    <p>Thank you for your interest. Your brochure is ready.</p>
                                    <a href="/brochure.pdf" download className="btn-zestine download-now">
                                        <FaDownload /> Download Now
                                    </a>
                                    <button className="link-btn" onClick={() => setIsSubmitted(false)}>Submit another request</button>
                                </div>
                            ) : (
                                <>
                                    <h3 className="form-title">Get the Brochure</h3>
                                    <form className="download-form" onSubmit={handleSubmit}>
                                        <div className="form-grid">
                                            <input name="name" type="text" placeholder="Name *" required />
                                            <input name="email" type="email" placeholder="Email *" required />
                                        </div>
                                        <input name="phone" type="tel" placeholder="Phone Number *" required />
                                        <input name="company" type="text" placeholder="Company Name *" required />
                                        <input name="location" type="text" placeholder="Location *" required />
                                        {isError && <p className="form-error">Something went wrong. Please try again.</p>}
                                        <button type="submit" className="btn-zestine submit-btn">
                                            Request Download Link
                                        </button>
                                        <p className="privacy-text">We value your privacy. No spam, ever.</p>
                                    </form>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
