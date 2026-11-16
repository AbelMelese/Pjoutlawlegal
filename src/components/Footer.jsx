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
import { telHref, useContent } from '../content';

const quickLinks = [
  { name: 'Home', path: '/' },
  { name: 'Mediation Services', path: '/mediation-services' },
  { name: 'Practice Areas & Case Highlights', path: '/practice-areas' },
  { name: 'About the Principal', path: '/about-phyllis-j-outlaw' },
  { name: 'Online Payment', path: '/online-payment' },
  { name: 'Contact Us', path: '/contact' },
];

const services = [
  { name: 'Mediation Services', path: '/mediation-services' },
  { name: 'Practice Areas & Case Highlights', path: '/practice-areas' },
];

const socialIcons = {
  facebook: Facebook,
  youtube: Youtube,
  twitter: Twitter,
  linkedin: Linkedin,
};

const Footer = () => {
  const settings = useContent('settings');
  const socialLinks = settings.socialLinks
    .filter((link) => socialIcons[link.platform] && /^https:\/\//.test(link.url))
    .map((link) => ({ Icon: socialIcons[link.platform], href: link.url, label: link.platform }));
  return (
    <footer className="relative overflow-hidden">
      <div className="relative overflow-hidden" style={{ background: 'linear-gradient(160deg, #1E3A5F 0%, #2A1F4E 40%, #5B2C6F 100%)' }}>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          <div className="lg:col-span-1">
            <div className="mb-6">
              <h3 className="text-lg md:text-xl font-bold font-['Playfair_Display'] text-white whitespace-nowrap">
                {settings.businessName}
              </h3>
              <p className="text-white/70 mt-2">
                {settings.footerTagline}
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
              <span className="w-8 h-0.5 bg-[#C5A03A]"></span>
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
              <span className="w-8 h-0.5 bg-[#C5A03A]"></span>
              Our Services
            </h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.name}>
                  <Link
                    to={service.path}
                    className="text-white/70 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <ArrowRight
                      size={14}
                      className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                    />
                    <span>{service.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-[#C5A03A]"></span>
              <span>Contact Us</span>
            </h4>
            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-white/10 border border-white/15 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone size={18} className="text-white/80" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white/50 text-xs font-bold uppercase tracking-wider mb-1">Phone</p>
                  <a href={telHref(settings.phone)} className="text-white/90 hover:text-white transition-colors font-medium">
                    {settings.phone}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-white/10 border border-white/15 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone size={18} className="text-white/80" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white/50 text-xs font-bold uppercase tracking-wider mb-1">Fax</p>
                  <a href={telHref(settings.fax)} className="text-white/90 hover:text-white transition-colors font-medium">
                    {settings.fax}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-white/10 border border-white/15 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail size={18} className="text-white/80" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white/50 text-xs font-bold uppercase tracking-wider mb-1">Email</p>
                  <a href={`mailto:${settings.email}`} className="text-white/90 hover:text-white transition-colors font-medium break-all">
                    {settings.email}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-white/10 border border-white/15 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin size={18} className="text-white/80" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white/50 text-xs font-bold uppercase tracking-wider mb-1">Address</p>
                  <p className="text-white/90 text-[0.8rem] xl:text-sm tracking-tight whitespace-nowrap font-medium">
                    {settings.addressLine1}, {settings.addressLine2}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>

      <div className="relative bg-[#C5A03A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-[#1E3A5F]">
            <p className="whitespace-nowrap">{settings.copyright}</p>
            <div className="flex items-center gap-6">
              <a href={settings.termsUrl || '#'} className="hover:text-white transition-colors">Terms of Use</a>
              <span>|</span>
              <a href={settings.privacyUrl || '#'} className="hover:text-white transition-colors">Privacy Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
