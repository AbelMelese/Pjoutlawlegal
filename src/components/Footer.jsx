import { Link } from 'react-router-dom';
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
  { name: 'About Phyllis J. Outlaw', path: '/about-phyllis-j-outlaw' },
  { name: 'Testimonials', path: '/testimonials' },
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

const Footer = () => {
  return (
    <footer className="relative bg-white text-slate-900 overflow-hidden border-t border-slate-100">
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-rose-600/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

      <div className="relative border-b border-slate-100 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left">
              <h2 className="text-2xl md:text-4xl font-bold font-['Playfair_Display'] mb-3">
                Ready to Find Your <span className="text-purple-600">Resolution</span>?
              </h2>
              <p className="text-slate-600 text-lg max-w-xl">
                Schedule your consultation today and take the first step toward clarity.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="tel:+12025482999"
                className="btn-premium flex items-center justify-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-full font-bold text-lg hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <Phone size={20} />
                <span>(202) 548-2999</span>
              </a>
              <Link
                to="/contact"
                className="flex items-center justify-center gap-2 px-8 py-4 bg-white border-2 border-slate-200 text-slate-900 rounded-full font-semibold text-lg hover:bg-slate-50 hover:border-slate-300 transition-all duration-300 hover:-translate-y-1 shadow-sm"
              >
                <span>Contact Us</span>
                <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          <div className="lg:col-span-1">
            <div className="mb-6">
              <h3 className="text-xl font-bold font-['Playfair_Display'] text-slate-900">
                Phyllis J. Outlaw & Associates
              </h3>
              <p className="text-slate-600 mt-2">
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
                  className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 hover:bg-purple-600 hover:text-white transition-all duration-300 hover:-translate-y-1"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-purple-600"></span>
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-slate-600 hover:text-purple-600 transition-colors duration-300 flex items-center gap-2 group"
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
            <h4 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-purple-600"></span>
              Our Services
            </h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <Link
                    to="/mediation-services"
                    className="text-slate-600 hover:text-purple-600 transition-colors duration-300 flex items-center gap-2 group"
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
            <h4 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-purple-600"></span>
              Contact Us
            </h4>
            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-white shadow-sm border border-slate-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone size={18} className="text-purple-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Phone</p>
                  <a href="tel:+12025482999" className="text-slate-700 hover:text-purple-600 transition-colors font-medium">
                    (202) 548-2999
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-white shadow-sm border border-slate-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone size={18} className="text-purple-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Fax</p>
                  <a href="tel:+12025488114" className="text-slate-700 hover:text-purple-600 transition-colors font-medium">
                    (202) 548-8114
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-white shadow-sm border border-slate-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail size={18} className="text-purple-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Email</p>
                  <a href="mailto:lawfirm@pjoutlawlegal.com" className="text-slate-700 hover:text-purple-600 transition-colors font-medium break-all">
                    lawfirm@pjoutlawlegal.com
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-white shadow-sm border border-slate-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin size={18} className="text-purple-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Office Location</p>
                  <p className="text-slate-700 text-sm leading-relaxed font-medium">
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

      <div className="relative border-t border-slate-100 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500">
            <p>Copyright © 2026, Phyllis J. Outlaw & Associates</p>
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-purple-600 transition-colors">Terms of Use</a>
              <span>|</span>
              <a href="#" className="hover:text-purple-600 transition-colors">Privacy Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
