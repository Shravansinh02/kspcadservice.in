import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone } from 'lucide-react';

const Footer = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3 className="footer-brand">KSP CAD Service</h3>
          <p className="footer-description">
            Professional AutoCAD and architectural planning services for your dream projects.
          </p>
          <div className="footer-social">
            <a href="#" className="social-icon" aria-label="Facebook">
              <Facebook size={20} />
            </a>
            <a href="#" className="social-icon" aria-label="Twitter">
              <Twitter size={20} />
            </a>
            <a href="#" className="social-icon" aria-label="Instagram">
              <Instagram size={20} />
            </a>
            <a href="#" className="social-icon" aria-label="LinkedIn">
              <Linkedin size={20} />
            </a>
          </div>
        </div>

        <div className="footer-section">
          <h4 className="footer-heading">Services</h4>
          <ul className="footer-links">
            <li><a onClick={() => scrollToSection('services')}>2D Floor Plans</a></li>
            <li><a onClick={() => scrollToSection('services')}>3D Elevation Design</a></li>
            <li><a onClick={() => scrollToSection('services')}>Working Drawings</a></li>
            <li><a onClick={() => scrollToSection('services')}>Layout Planning</a></li>
            <li><a onClick={() => scrollToSection('services')}>AutoCAD Drafting</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4 className="footer-heading">Quick Links</h4>
          <ul className="footer-links">
            <li><a onClick={() => scrollToSection('hero')}>Home</a></li>
            <li><a onClick={() => scrollToSection('portfolio')}>Portfolio</a></li>
            <li><a onClick={() => scrollToSection('process')}>Our Process</a></li>
            <li><a onClick={() => scrollToSection('contact')}>Contact</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4 className="footer-heading">Contact</h4>
          <ul className="footer-contact">
            <li>
              <Mail size={16} />
              <span>info@kspcadservice.in</span>
            </li>
            <li>
              <Phone size={16} />
              <span>+91 7990245100</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2025 KSP CAD Service. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
