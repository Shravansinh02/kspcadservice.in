import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header className={`dark-header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-content">
        <div className="logo-container" onClick={() => scrollToSection('hero')}>
          <h1 className="logo-text">KSP CAD Service</h1>
        </div>

        <nav className="dark-nav desktop-nav">
          <a onClick={() => scrollToSection('services')} className="dark-nav-link">Services</a>
          <a onClick={() => scrollToSection('portfolio')} className="dark-nav-link">Portfolio</a>
          <a onClick={() => scrollToSection('process')} className="dark-nav-link">Process</a>
          <a onClick={() => scrollToSection('contact')} className="dark-nav-link">Contact</a>
          <a 
            href="https://wa.me/917990245100?text=Hello%20KSP%20CAD%20Service%2C%20I%20would%20like%20to%20get%20a%20quote"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary header-cta"
          >
            Get Quote
          </a>
        </nav>

        <button 
          className="mobile-menu-btn"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="mobile-menu">
          <a onClick={() => scrollToSection('services')} className="mobile-nav-link">Services</a>
          <a onClick={() => scrollToSection('portfolio')} className="mobile-nav-link">Portfolio</a>
          <a onClick={() => scrollToSection('process')} className="mobile-nav-link">Process</a>
          <a onClick={() => scrollToSection('contact')} className="mobile-nav-link">Contact</a>
          <a 
            href="https://wa.me/917990245100?text=Hello%20KSP%20CAD%20Service%2C%20I%20would%20like%20to%20get%20a%20quote"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            Get Quote
          </a>
        </div>
      )}
    </header>
  );
};

export default Header;
