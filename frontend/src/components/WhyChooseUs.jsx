import React, { useEffect, useRef, useState } from 'react';
import { Target, Clock, DollarSign, Award } from 'lucide-react';

const features = [
  {
    icon: Target,
    title: 'Accurate CAD Drawings',
    description: 'Precision-engineered drawings following industry standards and building codes.'
  },
  {
    icon: Clock,
    title: 'Fast Delivery',
    description: 'Quick turnaround time without compromising on quality and accuracy.'
  },
  {
    icon: DollarSign,
    title: 'Affordable Pricing',
    description: 'Competitive rates with transparent pricing and no hidden charges.'
  },
  {
    icon: Award,
    title: 'Industry Standards',
    description: 'All drawings comply with national and local building regulations.'
  }
];

const WhyChooseUs = () => {
  const [visibleCards, setVisibleCards] = useState([]);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            features.forEach((_, index) => {
              setTimeout(() => {
                setVisibleCards(prev => [...prev, index]);
              }, index * 150);
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="why-choose-us" className="why-choose-section" ref={sectionRef}>
      <div className="section-container">
        <div className="section-header">
          <h2 className="section-title">Why Choose Us</h2>
          <p className="section-subtitle">Excellence in every drawing, commitment in every project</p>
        </div>
        <div className="features-grid">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div 
                key={index} 
                className={`feature-card ${visibleCards.includes(index) ? 'visible' : ''}`}
              >
                <div className="feature-icon-wrapper">
                  <Icon size={36} className="feature-icon" />
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
