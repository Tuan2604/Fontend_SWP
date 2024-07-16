import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import './Footer.css'; // Ensure the correct import statement for CSS

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section about">
          <h3>About Us</h3>
          <p>
            This website is designed to help FPT University students exchange goods easily and efficiently. We aim to provide a trusted platform where students can buy, sell, and trade items within the university community.
          </p>
        </div>
        <div className="footer-section contact">
          <h3>Contact Us</h3>
          <p>
            <FontAwesomeIcon icon={faEnvelope} className="icon" /> <strong>Email:</strong> support@yourcompany.com
          </p>
          <p>
            <FontAwesomeIcon icon={faPhone} className="icon" /> <strong>Phone:</strong> (123) 456-7890
          </p>
          <p>
            Reach out to us for any queries or support. We're here to help you!
          </p>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="social-icons">
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faFacebook} className="icon" />
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faInstagram} className="icon" />
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faTwitter} className="icon" />
          </a>
          <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faLinkedin} className="icon" />
          </a>
        </div>
        <p>&copy; 2024 Your Company. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
