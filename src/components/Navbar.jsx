import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, PhoneCall, X } from 'lucide-react';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Mediation Services', path: '/mediation-services' },
  { name: 'Divorce & Family Law', path: '/divorce-family-law' },
  { name: 'Coaching', path: '/coaching' },
  { name: 'Business Services', path: '/business-services' },
  { name: 'Blog', path: '/blog' },
  { name: 'Contact Us', path: '/contact' },
];

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
            <span>Mediation Service</span>
          </Link>

          <div className="desktop-nav">
            {navLinks
              .filter((link) => link.path !== '/contact')
              .map((link) => (
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

          <div className="nav-contact">
            <a href="tel:+12025482999" className="primary-button">
              <PhoneCall size={18} />
              <span>Consultation</span>
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
              <span>Mediation Service</span>
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
                key={link.path}
                to={link.path}
                className={location.pathname === link.path ? 'is-active' : ''}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <a href="tel:+12025482999" className="primary-button">
            <PhoneCall size={18} />
            <span>(202) 548-2999</span>
          </a>
        </div>
      </div>
    </>
  );
};

export default Navbar;
