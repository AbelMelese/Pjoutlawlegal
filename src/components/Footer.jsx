import { Link } from 'react-router-dom';
import {
    Phone,
    Mail,
    MapPin,
    Facebook,
    Linkedin,
    Twitter,
    Instagram,
    ArrowRight
} from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const quickLinks = [
        { name: 'Home', path: '/' },
        { name: 'Mediation Services', path: '/mediation-services' },
        { name: 'Divorce & Family Law', path: '/divorce-family-law' },
        { name: 'Coaching', path: '/coaching' },
        { name: 'Business Services', path: '/business-services' },
        { name: 'Blog', path: '/blog' },
        { name: 'Contact Us', path: '/contact' },
    ];

    const services = [
        'Divorce Mediation',
        'Family Mediation',
        'Business Mediation',
        'Divorce Coaching',
        'Business Advising',
        'Non-Profit Advisory',
    ];

    return (
        <footer className="relative bg-gradient-to-br from-[#1a365d] via-[#1e3a5f] to-[#0f2744] text-white overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-[#c4a052]/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#3182ce]/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

            {/* CTA Section */}
            <div className="relative border-b border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                        <div className="text-center lg:text-left">
                            <h2 className="text-2xl md:text-4xl font-bold font-['Playfair_Display'] mb-3">
                                Ready to Find Your{' '}
                                <span className="text-[#c4a052]">Resolution</span>?
                            </h2>
                            <p className="text-white/70 text-lg max-w-xl">
                                Schedule your free consultation today and take the first step toward clarity.
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <a
                                href="tel:+12025482999"
                                className="flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-[#c4a052] to-[#d4b872] text-[#1a365d] rounded-full font-bold text-lg hover:shadow-lg hover:shadow-[#c4a052]/30 transition-all duration-300 hover:-translate-y-1"
                            >
                                <Phone size={20} />
                                <span>(202) 548-2999</span>
                            </a>
                            <Link
                                to="/contact"
                                className="flex items-center justify-center gap-2 px-8 py-4 bg-transparent border-2 border-white/30 text-white rounded-full font-semibold text-lg hover:bg-white/10 hover:border-white/50 transition-all duration-300 hover:-translate-y-1"
                            >
                                <span>Contact Us</span>
                                <ArrowRight size={20} />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Footer Content */}
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
                    {/* Brand Column */}
                    <div className="lg:col-span-1">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-gradient-to-br from-[#c4a052] to-[#d4b872] rounded-xl flex items-center justify-center">
                                <span className="text-[#1a365d] font-bold text-xl font-['Playfair_Display']">P</span>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold font-['Playfair_Display']">Phyllis J. Outlaw & Associates</h3>
                                <p className="text-sm text-white/60">Mediation Service</p>
                            </div>
                        </div>
                        <p className="text-white/70 mb-6 leading-relaxed">
                            Our offices are located on Capitol Hill in the commercial district designated as an enterprise hub zone. We are conveniently located near the financial and business districts of the city, as well as to the federal and local courts in the District of Columbia and Maryland.
                        </p>
                        <div className="flex gap-3">
                            {[Facebook, Linkedin, Twitter, Instagram].map((Icon, index) => (
                                <a
                                    key={index}
                                    href="#"
                                    className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#c4a052] hover:text-[#1a365d] transition-all duration-300 hover:-translate-y-1"
                                >
                                    <Icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-bold mb-6 flex items-center gap-2">
                            <span className="w-8 h-0.5 bg-[#c4a052]"></span>
                            Quick Links
                        </h4>
                        <ul className="space-y-3">
                            {quickLinks.map((link) => (
                                <li key={link.path}>
                                    <Link
                                        to={link.path}
                                        className="text-white/70 hover:text-[#c4a052] transition-colors duration-300 flex items-center gap-2 group"
                                    >
                                        <ArrowRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                                        <span>{link.name}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="text-lg font-bold mb-6 flex items-center gap-2">
                            <span className="w-8 h-0.5 bg-[#c4a052]"></span>
                            Our Services
                        </h4>
                        <ul className="space-y-3">
                            {services.map((service, index) => (
                                <li key={index}>
                                    <Link
                                        to="/mediation-services"
                                        className="text-white/70 hover:text-[#c4a052] transition-colors duration-300 flex items-center gap-2 group"
                                    >
                                        <ArrowRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                                        <span>{service}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-lg font-bold mb-6 flex items-center gap-2">
                            <span className="w-8 h-0.5 bg-[#c4a052]"></span>
                            Contact Us
                        </h4>
                        <div className="space-y-5">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <Phone size={18} className="text-[#c4a052]" />
                                </div>
                                <div>
                                    <p className="text-white/50 text-sm mb-1">Phone</p>
                                    <a href="tel:+12025482999" className="text-white hover:text-[#c4a052] transition-colors">
                                        (202) 548-2999
                                    </a>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <Phone size={18} className="text-[#c4a052]" />
                                </div>
                                <div>
                                    <p className="text-white/50 text-sm mb-1">Fax</p>
                                    <a href="tel:+12025488114" className="text-white hover:text-[#c4a052] transition-colors">
                                        (202) 548-8114
                                    </a>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <Mail size={18} className="text-[#c4a052]" />
                                </div>
                                <div>
                                    <p className="text-white/50 text-sm mb-1">Email</p>
                                    <a href="mailto:lawfirm@pjoutlawlegal.com" className="text-white hover:text-[#c4a052] transition-colors break-all">
                                        lawfirm@pjoutlawlegal.com
                                    </a>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <MapPin size={18} className="text-[#c4a052]" />
                                </div>
                                <div>
                                    <p className="text-white/50 text-sm mb-1">Office Location</p>
                                    <p className="text-white text-sm leading-relaxed">
                                        412 H Street, NE<br />
                                        Washington, DC 20002
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="relative border-t border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/50">
                        <p>
                            © {currentYear} Phyllis J Outlaw Mediation Service. All rights reserved.
                        </p>
                        <div className="flex items-center gap-6">
                            <a href="#" className="hover:text-[#c4a052] transition-colors">Terms of Use</a>
                            <span>|</span>
                            <a href="#" className="hover:text-[#c4a052] transition-colors">Privacy Policy</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;


