import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import ServicesSection from '../components/ServicesSection';
import PortfolioSection from '../components/PortfolioSection';
import WhyChooseUs from '../components/WhyChooseUs';
import ProcessSection from '../components/ProcessSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';

const HomePage = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className={`home-page ${isLoaded ? 'loaded' : ''}`}>
      <Header />
      <HeroSection />
      <ServicesSection />
      <PortfolioSection />
      <WhyChooseUs />
      <ProcessSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default HomePage;
