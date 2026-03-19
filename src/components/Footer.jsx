import { Link } from 'react-router-dom';
import { Mail, MapPin, PhoneCall } from 'lucide-react';
import {
  contactDetails,
  footerServiceLinks,
  navLinks,
} from '../data/siteContent';

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="section-shell footer-grid">
        <div className="footer-column">
          <div className="brand-lockup">
            <strong>Phyllis J. Outlaw</strong>
            <span>Mediation and counsel</span>
          </div>
          <p>
            Practical mediation, family law guidance, coaching, and business
            advising for clients who need progress without chaos.
          </p>
          <a href={contactDetails.phoneHref} className="primary-button">
            <PhoneCall size={18} />
            <span>{contactDetails.phone}</span>
          </a>
        </div>

        <div className="footer-column">
          <strong>Explore</strong>
          {navLinks.map((link) => (
            <Link key={link.to} to={link.to}>
              {link.label}
            </Link>
          ))}
        </div>

        <div className="footer-column">
          <strong>Services</strong>
          {footerServiceLinks.map((link) => (
            <Link key={`${link.to}-${link.label}`} to={link.to}>
              {link.label}
            </Link>
          ))}
        </div>

        <div className="footer-column">
          <strong>Contact</strong>
          <a href={contactDetails.phoneHref}>
            <PhoneCall size={16} className="inline mr-2" />
            {contactDetails.phone}
          </a>
          <a href={contactDetails.emailHref}>
            <Mail size={16} className="inline mr-2" />
            {contactDetails.email}
          </a>
          <span>
            <MapPin size={16} className="inline mr-2" />
            {contactDetails.addressLines.join(', ')}
          </span>
          <span>{contactDetails.officeHours}</span>
        </div>
      </div>

      <div className="section-shell footer-bottom">
        <span>Copyright 2026 Phyllis J. Outlaw & Associates</span>
        <span>{contactDetails.serviceArea}</span>
      </div>
    </footer>
  );
};

export default Footer;
