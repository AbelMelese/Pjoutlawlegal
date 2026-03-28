import { Link } from 'react-router-dom';

const footerLinks = [
  { name: 'Home', path: '/' },
  { name: 'Mediation Services', path: '/mediation-services' },
  { name: 'Legal Services', path: '/legal-services' },
  { name: 'Coaching', path: '/coaching' },
  { name: 'About Phyllis J. Outlaw', path: '/about-phyllis-j-outlaw' },
  { name: 'Testimonials', path: '/testimonials' },
  { name: 'Contact Us', path: '/contact' },
];

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="section-shell footer-grid">
        <div>
          <p className="footer-script">Phyllis J. Outlaw &amp; Associates</p>
          <h2>Trusted legal and mediation guidance in Washington, D.C. and Maryland.</h2>
          <p>
            Our office serves individuals, families, businesses, and organizations with careful
            counsel, practical strategy, and respected mediation experience.
          </p>
        </div>

        <div>
          <h3>Office Information</h3>
          <ul className="footer-list">
            <li>412 H Street, NE</li>
            <li>Washington, DC 20002</li>
            <li>
              <a href="tel:+12025482999">(202) 548-2999</a>
            </li>
            <li>
              <a href="tel:+12025488114">(202) 548-8114</a>
            </li>
            <li>
              <a href="mailto:lawfirm@pjoutlawlegal.com">lawfirm@pjoutlawlegal.com</a>
            </li>
          </ul>
        </div>

        <div>
          <h3>Website</h3>
          <ul className="footer-list">
            {footerLinks.map((link) => (
              <li key={link.path}>
                <Link to={link.path}>{link.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="site-footer__bottom">
        <div className="section-shell">
          <p>Copyright © 2026, Phyllis J. Outlaw &amp; Associates</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
