import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, PhoneCall, X } from 'lucide-react';
import logo from '../assets/pjoa-logo-transparent.png';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Mediation Services', path: '/mediation-services' },
  { name: 'Legal Services', path: '/legal-services' },
  { name: 'Coaching', path: '/coaching' },
  { name: 'About the Principal', path: '/about-phyllis-j-outlaw' },
  { name: 'Testimonials', path: '/testimonials' },
  { name: 'Online Payment', path: '/online-payment' },
  { name: 'Contact Us', path: '/contact' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <header className="site-header">
      <div className="contact-ribbon">
        <div className="section-shell contact-ribbon__inner">
          <p>Legal, Mediation &amp; Coaching Services</p>
          <div className="contact-ribbon__meta">
            <a href="tel:+12025482999">Washington, D.C. 202.548.2999</a>
            <span>|</span>
            <a href="mailto:lawfirm@pjoutlawlegal.com">lawfirm@pjoutlawlegal.com</a>
          </div>
        </div>
      </div>

      <div className="section-shell brand-row">
        <Link to="/" className="brand-block" aria-label="Phyllis J. Outlaw & Associates home">
          <img className="brand-logo" src={logo} alt="Phyllis J. Outlaw & Associates logo" />
        </Link>

        <div className="brand-actions">
          <div className="brand-actions__callout">
            <span>Contact Us Today</span>
            <a href="tel:+12025482999">(202) 548-2999</a>
          </div>

          <a href="tel:+12025482999" className="primary-button">
            <PhoneCall size={18} />
            <span>Call Our Office</span>
          </a>

          <button
            type="button"
            className="mobile-menu-button"
            onClick={() => setIsOpen((current) => !current)}
            aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <nav className="primary-nav">
        <div className="section-shell primary-nav__inner">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={location.pathname === link.path ? 'is-active' : ''}
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </nav>

      {isOpen ? (
        <div className="mobile-nav-panel">
          <div className="section-shell mobile-nav-panel__inner">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={location.pathname === link.path ? 'is-active' : ''}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
};

export default Navbar;
