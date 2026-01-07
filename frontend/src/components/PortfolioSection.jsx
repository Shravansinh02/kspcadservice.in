import React, { useEffect, useRef, useState } from 'react';
import { ZoomIn } from 'lucide-react';

const portfolioImages = [
  {
    url: 'https://customer-assets.emergentagent.com/job_cad-blueprint-1/artifacts/wvrlxbx9_d084c85baf63dca6aefa6f4f16e41282.jpg',
    title: 'Residential Floor Plan',
    category: '2D Drawing'
  },
  {
    url: 'https://customer-assets.emergentagent.com/job_cad-blueprint-1/artifacts/6khotva7_2df7b68f9801e0a6cd1dd80d53eda858.jpg',
    title: 'Ground Floor Layout',
    category: '2D Planning'
  },
  {
    url: 'https://customer-assets.emergentagent.com/job_cad-blueprint-1/artifacts/6s30d4ip_b035ff8184f04e015b059e2d83319304.jpg',
    title: '3BHK House Plan',
    category: 'Complete Layout'
  },
  {
    url: 'https://customer-assets.emergentagent.com/job_cad-blueprint-1/artifacts/0phdr2jx_5fb5e57f6618519f9596de4bbd0b34df.jpg',
    title: 'Detailed Floor Plan',
    category: 'Technical Drawing'
  }
];

const PortfolioSection = () => {
  const [visibleCards, setVisibleCards] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            portfolioImages.forEach((_, index) => {
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
    <section id="portfolio" className="portfolio-section" ref={sectionRef}>
      <div className="section-container">
        <div className="section-header">
          <h2 className="section-title">Our Portfolio</h2>
          <p className="section-subtitle">Professional CAD drawings and architectural plans</p>
        </div>
        <div className="portfolio-grid">
          {portfolioImages.map((item, index) => (
            <div 
              key={index} 
              className={`portfolio-card ${visibleCards.includes(index) ? 'visible' : ''}`}
              onClick={() => setSelectedImage(item)}
            >
              <div className="portfolio-image-wrapper">
                <img src={item.url} alt={item.title} className="portfolio-image" />
                <div className="portfolio-overlay">
                  <ZoomIn size={32} className="zoom-icon" />
                </div>
              </div>
              <div className="portfolio-info">
                <p className="portfolio-category">{item.category}</p>
                <h3 className="portfolio-title">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedImage && (
        <div className="modal-overlay" onClick={() => setSelectedImage(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img src={selectedImage.url} alt={selectedImage.title} className="modal-image" />
            <button className="modal-close" onClick={() => setSelectedImage(null)}>×</button>
          </div>
        </div>
      )}
    </section>
  );
};

export default PortfolioSection;
