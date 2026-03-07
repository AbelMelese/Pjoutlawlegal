import { Link } from 'react-router-dom';
import {
    ArrowRight,
    Phone,
    CheckCircle,
    Scale,
    Heart,
    Users,
    Briefcase,
    Shield,
    Target,
    Award,
    ChevronRight,
    ChevronLeft,
    Calendar
} from 'lucide-react';
import { useState, useEffect } from 'react';

const Home = () => {
    const [activeTestimonial, setActiveTestimonial] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const services = [
        {
            icon: Scale,
            title: 'Divorce Mediation',
            description: 'Navigate your divorce with dignity, clarity, and fair outcomes for both parties.',
            color: 'from-blue-500 to-blue-600',
            link: '/divorce-family-law',
        },
        {
            icon: Users,
            title: 'Family Mediation',
            description: 'Heal family rifts and rebuild relationships through guided communication.',
            color: 'from-emerald-500 to-emerald-600',
            link: '/divorce-family-law',
        },
        {
            icon: Briefcase,
            title: 'Business Mediation',
            description: 'Resolve workplace disputes without costly litigation or damaged relationships.',
            color: 'from-[#c4a052] to-[#a88c3d]',
            link: '/business-services',
        },
        {
            icon: Heart,
            title: 'Coaching Services',
            description: 'Strategic guidance for families, divorcing couples, and business professionals.',
            color: 'from-rose-500 to-rose-600',
            link: '/coaching',
        },
    ];

    const heroSlides = [
        {
            title: "Divorce Mediation",
            subtitle: "Fairness & Clarity",
            description: "We guide you through the process of divorce with dignity, ensuring fair outcomes for both parties without the cost and stress of litigation.",
            icon: Scale,
            color: "bg-blue-500",
            bg: "from-blue-900 to-slate-900"
        },
        {
            title: "Family Mediation",
            subtitle: "Healing Relationships",
            description: "Rebuild and repair familial bonds through guided, constructive communication in a safe and neutral environment.",
            icon: Users,
            color: "bg-emerald-500",
            bg: "from-emerald-900 to-slate-900"
        },
        {
            title: "Business Services",
            subtitle: "Professional Resolution",
            description: "Resolve workplace conflicts and contract disputes swiftly to protect your business relationships and bottom line.",
            icon: Briefcase,
            color: "bg-[#c4a052]",
            bg: "from-[#a88c3d] to-slate-900"
        },
        {
            title: "Strategic Coaching",
            subtitle: "Personalized Guidance",
            description: "Targeted coaching to help you navigate life's toughest transitions and achieve your personal and professional goals.",
            icon: Target,
            color: "bg-rose-500",
            bg: "from-rose-900 to-slate-900"
        }
    ];

    const testimonials = [
        {
            quote: "Phyllis helped me get through a very complicated divorce with dignity and direction. I couldn't have done it without her guidance and expertise.",
            author: "Lisa R.",
            role: "Divorce Mediation Client",
            rating: 5,
        },
        {
            quote: "We wouldn't feel comfortable trusting anyone else to represent our company in legal matters. Their professionalism is unmatched.",
            author: "Helen M.",
            role: "Business Advisory Client",
            rating: 5,
        },
        {
            quote: "The coaching sessions transformed how our family communicates. We're closer now than we've been in years.",
            author: "Michael T.",
            role: "Family Coaching Client",
            rating: 5,
        },
    ];



    // Auto slide for Hero Slider
    useEffect(() => {
        const slideInterval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
        }, 6000);
        return () => clearInterval(slideInterval);
    }, [heroSlides.length]);

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1));

    // Auto slide for Testimonials
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [testimonials.length]);

    return (
        <div className="overflow-hidden bg-[#f8fafc]">
            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
                {/* Animated Background Blobs */}
                <div className="blob blob-gold w-[500px] h-[500px] top-[-100px] right-[-100px]"></div>
                <div className="blob blob-blue w-[600px] h-[600px] bottom-[-200px] left-[-200px] delay-500"></div>

                {/* Grid Pattern */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 z-[1] pointer-events-none"></div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-12 md:pt-0">
                    <div className="grid lg:grid-cols-2 gap-12 md:gap-16 items-center">
                        {/* Left Content */}
                        <div className={`space-y-6 md:space-y-8 transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>


                            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 font-['Playfair_Display'] leading-[1.1]">
                                From Conflict to
                                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#c4a052] to-[#a88c3d] relative">
                                    Clarity
                                    <svg className="absolute w-full h-2 md:h-3 -bottom-1 left-0 text-[#c4a052] opacity-30" viewBox="0 0 100 10" preserveAspectRatio="none">
                                        <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="3" fill="none" />
                                    </svg>
                                </span>
                            </h1>

                            <p className="text-lg md:text-xl text-slate-600 max-w-lg leading-relaxed">
                                Guiding families and professionals through life's toughest transitions
                                with compassion, expertise, and proven results.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                <Link
                                    to="/contact"
                                    className="btn-glow flex items-center justify-center gap-3 px-6 py-3 md:px-8 md:py-4 bg-slate-900 text-white rounded-full font-bold text-base md:text-lg shadow-2xl hover:bg-slate-800"
                                >
                                    <span>Book a Consultation</span>
                                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                                        <ArrowRight size={16} />
                                    </div>
                                </Link>
                                <div className="flex items-center gap-4 px-4 py-2 md:px-6 md:py-4">
                                    <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-[#c4a052] animate-pulse">
                                        <Phone size={20} />
                                    </div>
                                    <div className="text-left">
                                        <p className="text-[10px] md:text-xs text-slate-400 font-bold uppercase tracking-wider">Call Us Now</p>
                                        <p className="text-slate-900 font-bold text-base md:text-lg">(202) 548-2999</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Visual - Slider */}
                        <div className={`relative transition-all duration-1000 delay-300 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'} h-[420px] md:h-[500px] w-full mt-10 md:mt-0`}>
                            <div className="relative w-full h-full rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white bg-[#0f172a] transform md:-rotate-2 group">
                                {/* Slides */}
                                {heroSlides.map((slide, index) => {
                                    const Icon = slide.icon;
                                    return (
                                        <div
                                            key={index}
                                            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out flex flex-col items-center justify-center p-8 text-center ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}
                                        >
                                            <div className={`absolute inset-0 bg-gradient-to-br ${slide.bg} opacity-90`}></div>
                                            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>

                                            <div className="relative z-20 flex flex-col items-center">
                                                <div className={`w-20 h-20 md:w-24 md:h-24 rounded-2xl ${slide.color} flex items-center justify-center mb-6 shadow-xl shadow-black/30 transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}>
                                                    <Icon size={40} className="text-white" />
                                                </div>
                                                <h3 className="text-3xl md:text-4xl font-bold text-white font-['Playfair_Display'] mb-3 drop-shadow-md">{slide.title}</h3>
                                                <p className="text-[#c4a052] font-bold text-xs md:text-sm tracking-widest uppercase mb-6">{slide.subtitle}</p>
                                                <p className="text-slate-200 text-sm md:text-base max-w-[280px] md:max-w-xs mx-auto leading-relaxed drop-shadow">
                                                    {slide.description}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}

                                {/* Navigation Arrows */}
                                <button
                                    onClick={prevSlide}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/20 hover:bg-black/40 border border-white/10 backdrop-blur-md flex items-center justify-center text-white transition-all transform hover:scale-110 focus:outline-none"
                                    aria-label="Previous Slide"
                                >
                                    <ChevronLeft size={24} />
                                </button>
                                <button
                                    onClick={nextSlide}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/20 hover:bg-black/40 border border-white/10 backdrop-blur-md flex items-center justify-center text-white transition-all transform hover:scale-110 focus:outline-none"
                                    aria-label="Next Slide"
                                >
                                    <ChevronRight size={24} />
                                </button>

                                {/* Dots */}
                                <div className="absolute bottom-6 left-0 right-0 z-30 flex justify-center gap-3">
                                    {heroSlides.map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setCurrentSlide(index)}
                                            className={`transition-all duration-300 rounded-full focus:outline-none ${index === currentSlide ? 'w-8 h-2.5 bg-[#c4a052] shadow-lg shadow-[#c4a052]/50' : 'w-2.5 h-2.5 bg-white/40 hover:bg-white/70'}`}
                                            aria-label={`Go to slide ${index + 1}`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>



            {/* Services Grid with Hover Effects */}
            <section className="py-20 md:py-32 relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12 md:mb-20">
                        <h2 className="text-3xl md:text-5xl font-bold text-slate-900 font-['Playfair_Display'] mb-4 md:mb-6">
                            Mediation & Coaching<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c4a052] to-[#a88c3d]">Built Around You</span>
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {services.map((service, index) => (
                            <div key={index} className="group relative bg-white rounded-[2rem] p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden border border-slate-100">
                                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${service.color} opacity-10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700`}></div>

                                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center text-white shadow-lg mb-8 group-hover:rotate-6 transition-transform duration-300`}>
                                    <service.icon size={32} />
                                </div>

                                <h3 className="text-2xl font-bold text-slate-900 font-['Playfair_Display'] mb-4">{service.title}</h3>
                                <p className="text-slate-500 leading-relaxed mb-8">{service.description}</p>

                                <Link to={service.link} className="flex items-center gap-2 text-slate-900 font-bold group-hover:text-[#a88c3d] transition-colors">
                                    <span className="text-sm uppercase tracking-wider">Learn More</span>
                                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-[#c4a052]/20 transition-colors">
                                        <ArrowRight size={14} />
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Process Section - Dark Mode */}
            <section className="py-20 md:py-32 bg-[#0f172a] relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
                    <div className="blob blob-gold w-[800px] h-[800px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20"></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-20 items-center">
                        <div>
                            <h2 className="text-4xl md:text-6xl font-bold text-white font-['Playfair_Display'] mb-8">
                                A Process That <br />
                                <span className="text-[#c4a052]">Works For You</span>
                            </h2>
                            <p className="text-xl text-slate-400 mb-12 leading-relaxed">
                                Whether you are navigating a divorce, resolving a family dispute, or facing conflict at work, our proven process is designed to create momentum.
                            </p>

                            <div className="space-y-8">
                                {[
                                    { title: "Book Consultation", desc: "Schedule your consultation.", icon: Calendar },
                                    { title: "Get Clarity", desc: "We structure a plan tailored to your needs.", icon: Target },
                                    { title: "Move Forward", desc: "Resolve conflict with confidence and peace.", icon: CheckCircle },
                                ].map((step, i) => (
                                    <div key={i} className="flex items-start gap-6 group">
                                        <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#c4a052] group-hover:bg-[#c4a052] group-hover:text-slate-900 transition-all duration-300 shadow-lg">
                                            <step.icon size={28} />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-bold text-white mb-2">{step.title}</h3>
                                            <p className="text-slate-400 text-lg">{step.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="relative">
                            <div className="absolute -inset-4 bg-gradient-to-r from-[#c4a052] to-[#a88c3d] rounded-[2.5rem] rotate-3 opacity-30 blur-lg"></div>
                            <div className="relative h-[400px] md:h-[500px] rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white/10 bg-gradient-to-br from-slate-800 to-slate-900 flex flex-col justify-center items-center p-8 text-center relative group">
                                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none"></div>
                                <div className="absolute inset-0 bg-blue-500/10 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                                <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center text-[#c4a052] mb-8 relative z-10 transition-transform duration-500 group-hover:scale-110">
                                    <Shield size={48} />
                                </div>
                                <h3 className="text-3xl font-bold text-white font-['Playfair_Display'] mb-4 relative z-10">Trusted Guidance</h3>
                                <p className="text-slate-400 text-lg relative z-10 leading-relaxed max-w-sm">
                                    With over 30 years of experience, we provide a secure, confidential environment for you to resolve disputes and plan for the future.
                                </p>

                                <div className="absolute bottom-6 left-6 right-6 z-10 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                    <div className="glass-panel p-6 rounded-xl border border-white/20 bg-white/5 backdrop-blur-md">
                                        <p className="text-white font-['Playfair_Display'] text-xl italic drop-shadow-md">"The clarity I gained after just one session was life-changing."</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-20 md:py-32 bg-slate-50 relative">
                <div className="max-w-5xl mx-auto px-4 text-center">
                    <Award size={48} className="text-[#c4a052] mx-auto mb-8 animate-bounce" />
                    <h2 className="text-3xl md:text-5xl font-bold text-slate-900 font-['Playfair_Display'] mb-12 md:mb-16">Stories of Resolution</h2>

                    <div className="relative h-[300px]">
                        {testimonials.map((t, i) => (
                            <div
                                key={i}
                                className={`absolute inset-0 transition-all duration-700 transform ${i === activeTestimonial ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95 pointer-events-none'}`}
                            >
                                <p className="text-2xl md:text-4xl font-['Playfair_Display'] text-slate-800 leading-tight mb-8">"{t.quote}"</p>
                                <div className="flex items-center justify-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-600">
                                        {t.author[0]}
                                    </div>
                                    <div className="text-left">
                                        <p className="font-bold text-slate-900">{t.author}</p>
                                        <p className="text-[#a88c3d] text-sm font-semibold uppercase">{t.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-center gap-3 mt-8">
                        {testimonials.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setActiveTestimonial(i)}
                                className={`transition-all duration-300 rounded-full ${i === activeTestimonial ? 'w-12 h-3 bg-[#c4a052]' : 'w-3 h-3 bg-slate-300'}`}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Parallax */}
            <section className="relative py-20 md:py-32 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0 bg-[#0f172a]">
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#1e293b] to-[#0f172a] opacity-80"></div>
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none"></div>
                </div>

                <div className="relative z-10 text-center max-w-4xl px-4">
                    <h2 className="text-4xl md:text-7xl font-bold text-white font-['Playfair_Display'] mb-6 md:mb-8">
                        Let's Start a <span className="text-[#c4a052]">Conversation</span>
                    </h2>
                    <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto">
                        You don't have to figure it out alone. We are here to help you move forward.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <Link to="/contact" className="btn-glow px-10 py-5 bg-[#c4a052] text-white rounded-full font-bold text-xl shadow-lg hover:bg-[#a88c3d] transition-colors">
                            Book Consultation
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;

