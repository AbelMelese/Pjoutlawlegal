import { Link, useLocation } from 'react-router-dom';
import {
  ArrowRight,
  Facebook,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Twitter,
  Youtube,
} from 'lucide-react';

const quickLinks = [
  { name: 'Home', path: '/' },
  { name: 'Mediation Services', path: '/mediation-services' },
  { name: 'Legal Services', path: '/legal-services' },
  { name: 'Coaching', path: '/coaching' },
  { name: 'About the Principal', path: '/about-phyllis-j-outlaw' },
  { name: 'Online Payment', path: '/online-payment' },
  { name: 'Contact Us', path: '/contact' },
];

const services = [
  'Mediation Services',
  'Legal Services',
  'Coaching',
  'Professional Development',
  'Court-Appointed Mediation',
  'Consultation Services',
];

const socialLinks = [
  { Icon: Facebook, href: 'https://www.facebook.com/CLRCommunityEmpowerment/' },
  { Icon: Youtube, href: 'https://www.youtube.com/channel/UCBD_unvoJ9pascMwOcYHpqg/videos' },
  { Icon: Twitter, href: 'https://x.com/clrcommunity' },
  { Icon: Linkedin, href: 'https://www.linkedin.com/in/phyllis-j-outlaw-esq/' },
];

const ctaPages = ['/', '/mediation-services'];

const Footer = () => {
  const location = useLocation();
  const showCta = ctaPages.includes(location.pathname);

  return (
    <footer className="relative overflow-hidden">
      {showCta && (
      <div className="relative border-b border-white/10 bg-gradient-to-br from-[#3D6B6E] to-[#9B2335] overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left">
              <h2 className="text-2xl md:text-4xl font-bold font-['Playfair_Display'] mb-3 text-white">
                Ready to Find Your <span className="text-white/80">Resolution</span>?
              </h2>
              <p className="text-white/70 text-lg max-w-xl">
                Schedule your consultation today and take the first step toward clarity.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="tel:+12025482999"
                className="btn-premium flex items-center justify-center gap-2 px-8 py-4 bg-white text-[#3D6B6E] rounded-full font-bold text-lg hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <Phone size={20} />
                <span>(202) 548-2999</span>
              </a>
              <Link
                to="/contact"
                className="flex items-center justify-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/20 text-white rounded-full font-semibold text-lg hover:bg-white/20 transition-all duration-300 hover:-translate-y-1"
              >
                <span>Contact Us</span>
                <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </div>
      </div>
      )}

      <div className="relative bg-gradient-to-br from-[#3D6B6E]/95 to-[#9B2335]/95 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          <div className="lg:col-span-1">
            <div className="mb-6">
              <h3 className="text-lg md:text-xl font-bold font-['Playfair_Display'] text-white whitespace-nowrap">
                Phyllis J. Outlaw & Associates
              </h3>
              <p className="text-white/70 mt-2">
                Legal, mediation, and coaching services grounded in preparation and professional
                service.
              </p>
            </div>
            <div className="flex gap-3">
              {socialLinks.map(({ Icon, href }, index) => (
                <a
                  key={index}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white/60 hover:bg-white/20 hover:text-white transition-all duration-300 hover:-translate-y-1"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-white/40"></span>
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-white/70 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <ArrowRight
                      size={14}
                      className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                    />
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-white/40"></span>
              Our Services
            </h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <Link
                    to="/mediation-services"
                    className="text-white/70 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <ArrowRight
                      size={14}
                      className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                    />
                    <span>{service}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-white/40"></span>
              Contact Us
            </h4>
            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-white/10 border border-white/15 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone size={18} className="text-white/80" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white/50 text-xs font-bold uppercase tracking-wider mb-1">Phone</p>
                  <a href="tel:+12025482999" className="text-white/90 hover:text-white transition-colors font-medium">
                    (202) 548-2999
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-white/10 border border-white/15 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone size={18} className="text-white/80" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white/50 text-xs font-bold uppercase tracking-wider mb-1">Fax</p>
                  <a href="tel:+12025488114" className="text-white/90 hover:text-white transition-colors font-medium">
                    (202) 548-8114
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-white/10 border border-white/15 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail size={18} className="text-white/80" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white/50 text-xs font-bold uppercase tracking-wider mb-1">Email</p>
                  <a href="mailto:lawfirm@pjoutlawlegal.com" className="text-white/90 hover:text-white transition-colors font-medium break-all">
                    lawfirm@pjoutlawlegal.com
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-white/10 border border-white/15 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin size={18} className="text-white/80" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white/50 text-xs font-bold uppercase tracking-wider mb-1">Address</p>
                  <p className="text-white/90 text-sm leading-relaxed font-medium">
                    412 H Street, NE
                    <br />
                    Washington, DC 20002
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>

      <div className="relative bg-[#2A4A4C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/60">
            <p className="whitespace-nowrap">Copyright © 2026, Phyllis J. Outlaw & Associates</p>
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-white transition-colors">Terms of Use</a>
              <span>|</span>
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
