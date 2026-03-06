import React from 'react';
import './DeliveryStatsSection.css';

const STATS = [
    { value: '10+', label: 'Years on AEC' },
    { value: '20+', label: 'AEC Workflow Accelerators' },
    { value: '200+', label: 'of trusted Users' },
    { value: '100%', label: 'AEC-Focused' },
    { value: '10+', label: 'Years on AEC' }, // Duplicated from screenshot
    { value: '20+', label: 'AEC Workflow Accelerators' }
];

export const DeliveryStatsSection: React.FC = () => {
    return (
        <section className="ds-section">
            <div className="ds-container">
                <h2 className="ds-title">
                    Designed for Real<br />World Delivery
                </h2>

                <div className="ds-watermark">Zestine</div>

                <div className="ds-cards-wrapper">
                    <div className="ds-cards-track">
                        {/* Render the set twice for seamless infinite scrolling */}
                        {STATS.map((stat, i) => (
                            <div key={`set1-${i}`} className="ds-card">
                                <h3 className="ds-card-value">{stat.value}</h3>
                                <p className="ds-card-label">{stat.label}</p>
                            </div>
                        ))}
                        {STATS.map((stat, i) => (
                            <div key={`set2-${i}`} className="ds-card">
                                <h3 className="ds-card-value">{stat.value}</h3>
                                <p className="ds-card-label">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
