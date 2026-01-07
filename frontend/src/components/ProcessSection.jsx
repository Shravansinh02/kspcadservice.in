import React, { useEffect, useRef, useState } from 'react';
import { MessageSquare, Layout, Pencil, CheckCircle } from 'lucide-react';

const steps = [
  {
    icon: MessageSquare,
    number: '01',
    title: 'Inquiry',
    description: 'Share your requirements and project details with us'
  },
  {
    icon: Layout,
    number: '02',
    title: 'Planning',
    description: 'We analyze and create a detailed plan for your project'
  },
  {
    icon: Pencil,
    number: '03',
    title: 'Design',
    description: 'Our experts create accurate CAD drawings and designs'
  },
  {
    icon: CheckCircle,
    number: '04',
    title: 'Delivery',
    description: 'Receive final drawings with revisions if needed'
  }
];

const ProcessSection = () => {
  const [visibleSteps, setVisibleSteps] = useState([]);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            steps.forEach((_, index) => {
              setTimeout(() => {
                setVisibleSteps(prev => [...prev, index]);
              }, index * 200);
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
    <section id="process" className="process-section" ref={sectionRef}>
      <div className="section-container">
        <div className="section-header">
          <h2 className="section-title">Our Process</h2>
          <p className="section-subtitle">Simple and efficient workflow from inquiry to delivery</p>
        </div>
        <div className="process-timeline">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div 
                key={index} 
                className={`process-step ${visibleSteps.includes(index) ? 'visible' : ''}`}
              >
                <div className="step-number">{step.number}</div>
                <div className="step-icon-wrapper">
                  <Icon size={28} className="step-icon" />
                </div>
                <h3 className="step-title">{step.title}</h3>
                <p className="step-description">{step.description}</p>
                {index < steps.length - 1 && <div className="step-connector"></div>}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
