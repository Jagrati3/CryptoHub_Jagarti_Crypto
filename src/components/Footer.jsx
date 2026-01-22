import React, { useState } from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaGithub, FaTwitter, FaDiscord } from 'react-icons/fa';
import { FaCcVisa, FaCcMastercard, FaCcPaypal, FaApplePay, FaGooglePay } from 'react-icons/fa';
import { FiSend } from 'react-icons/fi';


const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState('');

  const currentYear = new Date().getFullYear();

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email.includes('@')) {
      setStatus('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);
    setStatus('Subscribing...');

    // Simulate API call
    setTimeout(() => {
      setStatus('Successfully subscribed to CryptoHub Insights!');
      setEmail('');
      setIsSubmitting(false);
      setTimeout(() => setStatus(''), 3000);
    }, 1500);
  };

  return (
    <footer className="footer-container">
      <div className="footer-content">
        {/* Main Content Grid */}
        <div className="footer-main">
          {/* Brand Section */}
          <div className="footer-brand">
            <h2 className="footer-logo">
              Crypto<span>Hub</span>.
            </h2>
            <p>
              The world's most accurate real-time crypto tracking & analytics platform. 
              Live prices, advanced charts, portfolio tracking & AI insights.
            </p>
            <div className="payment-methods">
              <FaCcVisa className="payment-icon" title="Visa" />
              <FaCcMastercard className="payment-icon" title="Mastercard" />
              <FaCcPaypal className="payment-icon" title="PayPal" />
              <FaApplePay className="payment-icon" title="Apple Pay" />
              <FaGooglePay className="payment-icon" title="Google Pay" />
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-links">
            <h4>Markets</h4>
            <ul>
              <li><Link to="/trending">Trending Coins</Link></li>
              <li><Link to="/gainers">Top Gainers</Link></li>
              <li><Link to="/losers">Top Losers</Link></li>
              <li><Link to="/new">New Listings</Link></li>
            </ul>
          </div>

          <div className="footer-links">
            <h4>Product</h4>
            <ul>
              <li><Link to="/features">Features</Link></li>
              <li><Link to="/pricing">Pricing</Link></li>
              <li><Link to="/portfolio">Portfolio</Link></li>
              <li><Link to="/api">API Access</Link></li>
            </ul>
          </div>

          {/* Newsletter Section */}
          <div className="footer-newsletter">
            <h4 id="newsletter">Newsletter</h4>
            <p>Weekly crypto insights, alpha signals & market analysis</p>
            <form onSubmit={handleSubscribe} className="newsletter-form">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isSubmitting}
              />
              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? '...' : <FiSend />}
              </button>
            </form>
            {status && <p className={`status-message ${status.includes('Successfully') ? 'success' : 'error'}`}>{status}</p>}
          </div>
        </div>

        {/* Social & Bottom Section */}
        <div className="footer-bottom-section">
          <div className="social-links">
            <a href="https://twitter.com" aria-label="Twitter" title="Follow us on Twitter">
              <FaTwitter />
            </a>
            <a href="https://instagram.com" aria-label="Instagram" title="Follow us on Instagram">
              <FaInstagram />
            </a>
            <a href="https://facebook.com" aria-label="Facebook" title="Follow us on Facebook">
              <FaFacebook />
            </a>
            <a href="https://github.com/KaranUnique/CryptoHub" aria-label="GitHub" title="View source on GitHub">
              <FaGithub />
            </a>
            <a href="https://discord.gg" aria-label="Discord" title="Join our Discord community">
              <FaDiscord />
            </a>
          </div>

          <div className="footer-bottom">
            <p>
              <Link to="/privacy">Privacy Policy</Link> • 
              <Link to="/terms"> Terms of Service</Link> • 
              <Link to="/cookies"> Cookie Policy</Link>
            </p>
            <p>Copyright © {currentYear} CryptoHub. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;