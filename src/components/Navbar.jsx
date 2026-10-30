import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import logo from '../assets/pjoa-logo-transparent.png';
import { telHref, useContent } from '../content';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Mediation Services', path: '/mediation-services' },
  { name: 'Practice Areas & Case Highlights', path: '/practice-areas' },
  { name: 'About the Principal', path: '/about-phyllis-j-outlaw' },
  { name: 'Online Payment', path: '/online-payment' },
  { name: 'Contact Us', path: '/contact' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const settings = useContent('settings');

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <header className="site-header">
      <div className="section-shell brand-row">
        <Link to="/" className="brand-block" aria-label={`${settings.businessName} home`}>
          <img className="brand-logo" src={logo} alt={`${settings.businessName} logo`} />
        </Link>

        <div className="brand-actions">
          <div className="brand-actions__callout">
            <span>{settings.headerCallout}</span>
            <a href={telHref(settings.phone)}>{settings.phone}</a>
          </div>

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
