import React, { useState } from 'react';
import { Send, Mail, Phone, MapPin } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post(`${API}/contact`, formData);
      
      if (response.status === 200) {
        toast.success("Message Sent!", {
          description: "We'll get back to you within 24 hours.",
        });
        setFormData({ name: '', email: '', phone: '', message: '' });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error("Failed to send message", {
        description: "Please try again or contact us via WhatsApp.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="contact-section">
      <div className="section-container">
        <div className="section-header">
          <h2 className="section-title">Get In Touch</h2>
          <p className="section-subtitle">Let's discuss your project and bring your vision to life</p>
        </div>
        
        <div className="contact-content">
          <div className="contact-info">
            <h3 className="contact-info-title">Contact Information</h3>
            <div className="contact-info-items">
              <div className="contact-info-item">
                <Mail size={20} />
                <span>info@kspcadservice.top</span>
              </div>
              <div className="contact-info-item">
                <Phone size={20} />
                <span>+91 7990245100</span>
              </div>
              <div className="contact-info-item">
                <MapPin size={20} />
                <span>Gujarat, India</span>
              </div>
            </div>
            <a 
              href="https://wa.me/917990245100?text=Hello%20KSP%20CAD%20Service%2C%20I%20would%20like%20to%20discuss%20my%20project"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary whatsapp-cta"
            >
              Chat on WhatsApp
            </a>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="form-input"
                placeholder="Your name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="form-input"
                placeholder="your@email.com"
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="form-input"
                placeholder="+91 XXXXXXXXXX"
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                className="form-textarea"
                placeholder="Tell us about your project..."
                rows="4"
              ></textarea>
            </div>
            <button 
              type="submit" 
              className="btn-primary submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
              <Send size={18} />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
