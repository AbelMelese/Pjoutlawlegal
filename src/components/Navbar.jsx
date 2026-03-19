import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, PhoneCall, X } from 'lucide-react';
import { contactDetails, navLinks } from '../data/siteContent';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 18);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      <nav className={`site-nav ${isScrolled ? 'is-scrolled' : ''}`}>
        <div className="section-shell nav-inner">
          <Link to="/" className="brand-lockup" aria-label="Phyllis J. Outlaw home">
            <strong>Phyllis J. Outlaw</strong>
            <span>Mediation and counsel</span>
          </Link>

          <div className="desktop-nav">
            {navLinks
              .filter((link) => link.to !== '/contact')
              .map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={location.pathname === link.to ? 'is-active' : ''}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
          </div>

          <div className="nav-contact">
            <div className="nav-contact-meta">
              <span>Call for consultation</span>
              <span>{contactDetails.phone}</span>
            </div>
            <a href={contactDetails.phoneHref} className="primary-button">
              <PhoneCall size={18} />
              <span>Book now</span>
            </a>
          </div>

          <button
            type="button"
            className="mobile-menu-button"
            onClick={() => setIsOpen(true)}
            aria-label="Open navigation menu"
          >
            <Menu size={22} />
          </button>
        </div>
      </nav>

      <div className={`mobile-drawer ${isOpen ? 'is-open' : ''}`}>
        <div className="mobile-drawer-panel">
          <div className="mobile-drawer-header">
            <div className="brand-lockup">
              <strong>Menu</strong>
              <span>Navigate the site</span>
            </div>
            <button
              type="button"
              className="mobile-menu-button"
              onClick={() => setIsOpen(false)}
              aria-label="Close navigation menu"
            >
              <X size={22} />
            </button>
          </div>

          <div className="mobile-drawer-links">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={location.pathname === link.to ? 'is-active' : ''}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <a href={contactDetails.phoneHref} className="primary-button">
            <PhoneCall size={18} />
            <span>{contactDetails.phone}</span>
          </a>
        </div>
      </div>
    </>
  );
};

export default Navbar;
