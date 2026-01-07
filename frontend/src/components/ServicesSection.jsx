import React, { useEffect, useRef, useState } from 'react';
import { FileText, Box, PenTool, MapPin, Ruler } from 'lucide-react';

const services = [
  {
    icon: FileText,
    title: '2D Floor Plans',
    description: 'Detailed floor plans with accurate measurements and specifications for residential and commercial projects.'
  },
  {
    icon: Box,
    title: '3D Elevation Design',
    description: 'Realistic 3D visualizations of building exteriors and interiors to bring your vision to life.'
  },
  {
    icon: PenTool,
    title: 'Working Drawings',
    description: 'Complete construction drawings with all technical details for builders and contractors.'
  },
  {
    icon: MapPin,
    title: 'Layout Planning',
    description: 'Strategic space planning and plot layouts optimized for functionality and aesthetics.'
  },
  {
    icon: Ruler,
    title: 'AutoCAD Drafting',
    description: 'Professional CAD drafting services for architectural, structural, and MEP drawings.'
  }
];

const ServicesSection = () => {
  const [visibleCards, setVisibleCards] = useState([]);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            services.forEach((_, index) => {
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
    <section id="services" className="services-section" ref={sectionRef}>
      <div className="section-container">
        <div className="section-header">
          <h2 className="section-title">Our Services</h2>
          <p className="section-subtitle">Comprehensive CAD solutions for all your architectural needs</p>
        </div>
        <div className="services-grid">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div 
                key={index} 
                className={`service-card ${visibleCards.includes(index) ? 'visible' : ''}`}
              >
                <div className="service-icon-wrapper">
                  <Icon size={32} className="service-icon" />
                </div>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
