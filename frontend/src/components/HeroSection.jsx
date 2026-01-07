import React, { useEffect, useState } from 'react';
import { ArrowRight, Download } from 'lucide-react';

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="hero-section">
      <div className="hero-grid-bg"></div>
      <div className="hero-content">
        <div className={`hero-text ${isVisible ? 'visible' : ''}`}>
          <h1 className="hero-title">
            Professional AutoCAD & House Planning Services
          </h1>
          <p className="hero-subtitle">
            Accurate 2D drawings, 3D elevations, and complete building layouts
          </p>
          <div className="hero-cta-group">
            <a 
              href="https://wa.me/917990245100?text=Hello%20KSP%20CAD%20Service%2C%20I%20would%20like%20to%20get%20a%20quote%20for%20my%20project"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary hero-btn"
            >
              Get Quote on WhatsApp
              <ArrowRight size={20} />
            </a>
            <button 
              onClick={scrollToContact}
              className="btn-secondary hero-btn"
            >
              View Portfolio
              <Download size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
