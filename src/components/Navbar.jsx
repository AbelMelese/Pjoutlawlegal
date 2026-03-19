import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';

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
            <div className="fixed top-0 left-0 h-1 bg-gradient-to-r from-purple-600 to-rose-600 z-[100] transition-all duration-100" style={{ width: `${scrollProgress * 100}%` }}></div>

            {/* Top Bar - Hidden on scroll for cleaner look */}
            <div className={`bg-slate-50 text-slate-600 py-2 px-4 hidden md:block transition-all duration-300 border-b border-slate-100 ${isScrolled ? '-translate-y-full absolute opacity-0' : 'relative opacity-100'}`}>
                <div className="max-w-7xl mx-auto flex justify-between items-center text-[10px] tracking-[0.2em] font-bold uppercase">
                    <div className="flex items-center gap-6">
                        <span className="flex items-center gap-2">
                            <span className="text-purple-600">Washington, DC</span> (202) 548-2999
                        </span>
                    </div>
                    <div className="flex items-center gap-2 hover:text-purple-600 transition-colors cursor-pointer">
                        <span>lawfirm@pjoutlawlegal.com</span>
                    </div>
                </div>
            </div>

            {/* Main Navigation */}
            <nav
                className={`sticky top-0 z-50 transition-all duration-500 border-b border-transparent ${isScrolled
                    ? 'bg-white/80 backdrop-blur-md py-2 md:py-3 shadow-lg border-slate-100'
                    : 'bg-white py-3 md:py-5'
                    }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center">
                        {/* Logo */}
                        <Link to="/" className="flex flex-col group relative">
                            <span className="font-['Playfair_Display'] font-bold text-xl md:text-2xl text-slate-900 leading-none group-hover:text-purple-600 transition-colors">
                                Phyllis J. Outlaw
                            </span>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-1">
                                Mediation Service
                            </span>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden xl:flex items-center gap-1 bg-slate-100/50 p-1 rounded-full border border-slate-200/50">
                            {navLinks.filter(link => link.path !== '/contact').map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className={`px-4 py-2.5 rounded-full text-sm font-bold transition-all duration-300 relative overflow-hidden ${location.pathname === link.path
                                        ? 'bg-white text-purple-600 shadow-sm'
                                        : 'text-slate-600 hover:text-purple-600 hover:bg-white/50'
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>

                        {/* Right Side Actions */}
                        <div className="hidden md:flex items-center gap-4">
                            <Link to="/contact" className={`hidden xl:block font-bold transition-colors text-xs uppercase tracking-widest ${location.pathname === '/contact' ? 'text-purple-600' : 'text-slate-500 hover:text-purple-600'}`}>
                                Contact
                            </Link>
                            <a
                                href="tel:+12025482999"
                                className="btn-premium flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-full font-bold text-sm shadow-xl hover:shadow-purple-500/10 transition-all duration-300"
                            >
                                <Phone size={16} className="text-purple-400" />
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
                    className={`fixed inset-0 bg-white z-[100] transition-all duration-500 xl:hidden ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
                        }`}
                >
                    <div className="flex flex-col h-full">
                        <div className="p-6 flex justify-between items-center border-b border-slate-100">
                            <span className="text-slate-900 font-['Playfair_Display'] text-2xl font-bold">Menu</span>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-2 bg-slate-100 rounded-full text-slate-800 hover:bg-slate-200 transition-colors"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <div className="flex-grow overflow-y-auto px-6 py-8">
                            <div className="space-y-6">
                                {navLinks.map((link, idx) => (
                                    <Link
                                        key={link.path}
                                        to={link.path}
                                        onClick={() => setIsOpen(false)}
                                        className={`block text-3xl font-['Playfair_Display'] font-bold transition-all duration-300 ${location.pathname === link.path ? 'text-purple-600 translate-x-4' : 'text-slate-400 hover:text-slate-900 hover:translate-x-4'}`}
                                        style={{ transitionDelay: `${idx * 50}ms` }}
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        <div className="p-6 bg-slate-50 border-t border-slate-100">
                            <a
                                href="tel:+12025482999"
                                className="btn-premium flex items-center justify-center gap-3 w-full py-5 bg-slate-900 text-white rounded-2xl font-bold text-lg shadow-xl"
                            >
                                <Phone size={20} className="text-purple-400" />
                                <span>Book a Consultation</span>
                            </a>
                            <div className="mt-6 text-center text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em]">
                                Phyllis J. Outlaw & Associates
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;


