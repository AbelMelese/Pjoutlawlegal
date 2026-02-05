import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';
import logo from '../assets/logo.png';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);

            const totalScroll = document.documentElement.scrollTop;
            const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scroll = `${totalScroll / windowHeight}`;
            setScrollProgress(Number(scroll));
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Mediation Services', path: '/mediation-services' },
        { name: 'Divorce & Family Law', path: '/divorce-family-law' },
        { name: 'Coaching', path: '/coaching' },
        { name: 'Business Services', path: '/business-services' },
        { name: 'Blog', path: '/blog' },
        { name: 'Contact Us', path: '/contact' },
    ];

    return (
        <>
            {/* Scroll Progress Bar */}
            <div className="fixed top-0 left-0 h-1 bg-gradient-to-r from-[#c4a052] to-[#a88c3d] z-[100] transition-all duration-100" style={{ width: `${scrollProgress * 100}%` }}></div>

            {/* Top Bar - Hidden on scroll for cleaner look */}
            <div className={`bg-[#0f172a] text-white py-2 px-4 hidden md:block transition-all duration-300 ${isScrolled ? '-translate-y-full absolute opacity-0' : 'relative opacity-100'}`}>
                <div className="max-w-7xl mx-auto flex justify-between items-center text-xs tracking-widest font-medium uppercase">
                    <div className="flex items-center gap-6">
                        <span className="flex items-center gap-2">
                            <span className="text-[#c4a052]">Washington, DC</span> (202) 548-2999
                        </span>
                    </div>
                    <div className="flex items-center gap-2 hover:text-[#c4a052] transition-colors cursor-pointer">
                        <span>lawfirm@pjoutlawlegal.com</span>
                    </div>
                </div>
            </div>

            {/* Main Navigation */}
            <nav
                className={`sticky top-0 z-50 transition-all duration-500 border-b border-transparent ${isScrolled
                    ? 'glass-panel py-2 md:py-3 shadow-lg border-white/20'
                    : 'bg-white py-3 md:py-5'
                    }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center">
                        {/* Logo */}
                        <Link to="/" className="flex items-center gap-3 group relative">
                            <img
                                src={logo}
                                alt="Phyllis J. Outlaw & Associates"
                                className="h-12 md:h-16 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
                            />
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden xl:flex items-center gap-1 bg-slate-100/50 p-1 rounded-full backdrop-blur-sm">
                            {navLinks.filter(link => link.path !== '/contact').map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className={`px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-300 relative overflow-hidden ${location.pathname === link.path
                                        ? 'bg-white text-[#0f172a] shadow-md'
                                        : 'text-slate-600 hover:text-[#0f172a] hover:bg-white/50'
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>

                        {/* Right Side Actions */}
                        <div className="hidden md:flex items-center gap-3">
                            <Link to="/contact" className="hidden xl:block font-medium text-slate-600 hover:text-[#a88c3d] transition-colors text-sm">
                                Contact
                            </Link>
                            <a
                                href="tel:+12025482999"
                                className="btn-glow flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#0f172a] to-[#1e293b] text-white rounded-full font-bold text-sm shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
                            >
                                <Phone size={16} className="text-[#c4a052]" />
                                <span>Consultation</span>
                            </a>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="xl:hidden p-2 rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors text-slate-800"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Overlay */}
                <div
                    className={`fixed inset-0 bg-[#0f172a]/95 backdrop-blur-xl z-[100] transition-all duration-500 xl:hidden ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
                        }`}
                >
                    <div className="flex flex-col h-full p-8">
                        <div className="flex justify-between items-center mb-12">
                            <span className="text-white font-['Playfair_Display'] text-2xl font-bold">Menu</span>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-2 bg-white/10 rounded-full text-white hover:bg-white/20 transition-colors"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <div className="space-y-4 flex-grow overflow-y-auto">
                            {navLinks.map((link, idx) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    onClick={() => setIsOpen(false)}
                                    className="block text-3xl font-['Playfair_Display'] font-bold text-white/50 hover:text-white hover:translate-x-4 transition-all duration-300"
                                    style={{ transitionDelay: `${idx * 50}ms` }}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>

                        <div className="mt-8 pt-8 border-t border-white/10">
                            <a
                                href="tel:+12025482999"
                                className="flex items-center justify-center gap-2 w-full py-4 bg-gradient-to-r from-[#c4a052] to-[#a88c3d] text-[#0f172a] rounded-xl font-bold text-lg"
                            >
                                <Phone size={20} />
                                <span>(202) 548-2999</span>
                            </a>
                            <div className="mt-6 text-center text-white/40 text-sm uppercase tracking-widest">
                                Phyllis J Outlaw Mediation Service
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;


