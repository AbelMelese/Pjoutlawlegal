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
    Star,
    MessageCircle,
    Calendar,
    Target,
    Award,
    Clock,
    Video,
    DollarSign,
    ChevronRight,
    Play
} from 'lucide-react';
import attorneyPortrait from '../assets/attorney_portrait.png';
import lawBooks from '../assets/law_books.jpg';
import { useState, useEffect } from 'react';

const Home = () => {
    const [activeTestimonial, setActiveTestimonial] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const services = [
        {
            icon: Scale,
            title: 'Divorce Mediation',
            description: 'Navigate your divorce with dignity, clarity, and fair outcomes for both parties.',
            color: 'from-blue-500 to-blue-600',
        },
        {
            icon: Heart,
            title: 'Elder Care Mediation',
            description: 'Resolve family disputes about aging parents with compassion and understanding.',
            color: 'from-rose-500 to-rose-600',
        },
        {
            icon: Users,
            title: 'Family Mediation',
            description: 'Heal family rifts and rebuild relationships through guided communication.',
            color: 'from-emerald-500 to-emerald-600',
        },
        {
            icon: Briefcase,
            title: 'Business Mediation',
            description: 'Resolve workplace disputes without costly litigation or damaged relationships.',
            color: 'from-amber-500 to-amber-600',
        },
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

    const stats = [
        { value: '30+', label: 'Years Experience' },
        { value: '500+', label: 'Cases Resolved' },
        { value: '98%', label: 'Client Satisfaction' },
        { value: '2', label: 'Office Locations' },
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

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
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-white/50 backdrop-blur-md border border-white/60 rounded-full shadow-sm animate-float">
                                <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></span>
                                <span className="text-slate-600 text-xs md:text-sm font-semibold tracking-wide uppercase">Now Serving Nationwide</span>
                            </div>

                            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 font-['Playfair_Display'] leading-[1.1]">
                                From Conflict to
                                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-600 relative">
                                    Clarity
                                    <svg className="absolute w-full h-2 md:h-3 -bottom-1 left-0 text-amber-500 opacity-30" viewBox="0 0 100 10" preserveAspectRatio="none">
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
                                    <span>Free Consultation</span>
                                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                                        <ArrowRight size={16} />
                                    </div>
                                </Link>
                                <div className="flex items-center gap-4 px-4 py-2 md:px-6 md:py-4">
                                    <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-amber-500 animate-pulse">
                                        <Phone size={20} />
                                    </div>
                                    <div className="text-left">
                                        <p className="text-[10px] md:text-xs text-slate-400 font-bold uppercase tracking-wider">Call Us Now</p>
                                        <p className="text-slate-900 font-bold text-base md:text-lg">(202) 548-2999</p>
                                    </div>
                                </div>
                            </div>

                            {/* Verified Badge */}
                            <div className="flex items-center gap-4 pt-8 border-t border-slate-200/60">
                                <div className="flex -space-x-3">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                                            <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="Client" className="w-full h-full object-cover" />
                                        </div>
                                    ))}
                                </div>
                                <div>
                                    <div className="flex text-amber-400">
                                        {[1, 2, 3, 4, 5].map(s => <Star key={s} size={14} fill="currentColor" />)}
                                    </div>
                                    <p className="text-sm text-slate-500 font-medium">500+ Successful Resolutions</p>
                                </div>
                            </div>
                        </div>

                        {/* Right Visual */}
                        <div className={`relative transition-all duration-1000 delay-300 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
                            <div className="relative z-10">
                                <div className="relative rounded-[3rem] overflow-hidden shadow-2xl animate-float-delayed transform rotate-[-2deg] border-4 border-white">
                                    <img
                                        src={attorneyPortrait}
                                        alt="Phyllis J Outlaw"
                                        className="w-full object-cover aspect-[4/5]"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
                                    <div className="absolute bottom-0 left-0 p-8 text-white">
                                        <p className="font-['Playfair_Display'] text-2xl font-bold">Phyllis J Outlaw, J.D.</p>
                                        <p className="text-white/80">Principal Mediator</p>
                                    </div>
                                </div>

                                {/* Floating Card */}
                                <div className="absolute top-10 right-0 md:-right-10 bg-white p-4 md:p-6 rounded-2xl shadow-xl animate-float z-20 max-w-[180px] md:max-w-[200px] border border-slate-100">
                                    <div className="w-8 h-8 md:w-10 md:h-10 bg-amber-100 rounded-full flex items-center justify-center text-amber-600 mb-3">
                                        <Scale size={20} />
                                    </div>
                                    <p className="text-slate-900 font-bold mb-1 text-sm md:text-base">98% Success Rate</p>
                                    <p className="text-[10px] md:text-xs text-slate-500">In resolving complex family disputes.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* StatsTicker */}
            <div className="bg-[#0f172a] py-12 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center opacity-10">
                    <div className="text-[200px] font-bold text-white whitespace-nowrap animate-marquee">
                        MEDIATION • LAW • COACHING • RESOLUTION • PEACE •
                    </div>
                </div>
                <div className="max-w-7xl mx-auto px-4 relative z-10">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, i) => (
                            <div key={i} className="text-center group hover:-translate-y-2 transition-transform duration-300">
                                <p className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 mb-2 font-['Outfit']">{stat.value}</p>
                                <p className="text-amber-500 text-sm font-bold tracking-widest uppercase">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Services Grid with Hover Effects */}
            <section className="py-20 md:py-32 relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12 md:mb-20">
                        <h2 className="text-3xl md:text-5xl font-bold text-slate-900 font-['Playfair_Display'] mb-4 md:mb-6">
                            Mediation & Coaching<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-600">Built Around You</span>
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

                                <div className="flex items-center gap-2 text-slate-900 font-bold group-hover:text-amber-600 transition-colors">
                                    <span className="text-sm uppercase tracking-wider">Learn More</span>
                                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-amber-100 transition-colors">
                                        <ArrowRight size={14} />
                                    </div>
                                </div>
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
                                <span className="text-amber-400">Works For You</span>
                            </h2>
                            <p className="text-xl text-slate-400 mb-12 leading-relaxed">
                                Whether you are navigating a divorce, resolving a family dispute, or facing conflict at work, our proven process is designed to create momentum.
                            </p>

                            <div className="space-y-8">
                                {[
                                    { title: "Book Consultation", desc: "No obligation, 15-minute free chat.", icon: Calendar },
                                    { title: "Get Clarity", desc: "We structure a plan tailored to your needs.", icon: Target },
                                    { title: "Move Forward", desc: "Resolve conflict with confidence and peace.", icon: CheckCircle },
                                ].map((step, i) => (
                                    <div key={i} className="flex items-start gap-6 group">
                                        <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-amber-400 group-hover:bg-amber-400 group-hover:text-slate-900 transition-all duration-300 shadow-lg">
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
                            <div className="absolute -inset-4 bg-gradient-to-r from-amber-400 to-amber-600 rounded-[2.5rem] rotate-3 opacity-30 blur-lg"></div>
                            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white/10">
                                <img
                                    src={lawBooks}
                                    alt="Law Books"
                                    className="w-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent"></div>

                                <div className="absolute bottom-10 left-10 right-10">
                                    <div className="glass-panel p-6 rounded-xl border border-white/20 bg-white/10 backdrop-blur-md">
                                        <p className="text-white font-['Playfair_Display'] text-xl italic">"The clarity I gained after just one session was life-changing."</p>
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
                    <Award size={48} className="text-amber-500 mx-auto mb-8 animate-bounce" />
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
                                        <p className="text-amber-600 text-sm font-semibold uppercase">{t.role}</p>
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
                                className={`transition-all duration-300 rounded-full ${i === activeTestimonial ? 'w-12 h-3 bg-amber-500' : 'w-3 h-3 bg-slate-300'}`}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Parallax */}
            <section className="relative py-20 md:py-32 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80" className="w-full h-full object-cover fixed top-0 left-0 opacity-20" style={{ zIndex: -1 }} />
                    {/* Note: Fixed position image trick for parallax or just CSS attachment fixed if supported */}
                    <div className="absolute inset-0 bg-[#0f172a]/90"></div>
                </div>

                <div className="relative z-10 text-center max-w-4xl px-4">
                    <h2 className="text-4xl md:text-7xl font-bold text-white font-['Playfair_Display'] mb-6 md:mb-8">
                        Let's Start a <span className="text-amber-400">Conversation</span>
                    </h2>
                    <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto">
                        You don't have to figure it out alone. We are here to help you move forward.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <Link to="/contact" className="btn-glow px-10 py-5 bg-amber-500 text-white rounded-full font-bold text-xl shadow-lg hover:bg-amber-400">
                            Book Consultation
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
