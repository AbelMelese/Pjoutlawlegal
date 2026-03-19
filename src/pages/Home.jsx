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
    Calendar,
    Tv,
    MapPin
} from 'lucide-react';
import HeroSlider from '../components/HeroSlider';
import { useState, useEffect, useRef } from 'react';
import image1 from '../assets/image1.jpg';
import image2 from '../assets/image 2.jpg';
import booksImage from '../assets/books image.jpg';
import pjoPortrait from "../assets/use this picture in PJO's resume.jpg";

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
            color: 'from-purple-500 to-purple-600',
            link: '/divorce-family-law',
        },
        {
            icon: Users,
            title: 'Family Mediation',
            description: 'Heal family rifts and rebuild relationships through guided communication.',
            color: 'from-rose-500 to-rose-600',
            link: '/divorce-family-law',
        },
        {
            icon: Briefcase,
            title: 'Business Mediation',
            description: 'Resolve workplace disputes without costly litigation or damaged relationships.',
            color: 'from-purple-600 to-rose-600',
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
            title: "PHYLLIS J. OUTLAW & ASSOCIATES MAINTAINS THE HIGHEST STANDARD OF EXCELLENCE ON BEHALF OF OUR CLIENTS.",
            image: image1
        },
        {
            title: "A COURT-APPOINTED MEDIATOR WHO POSSESSES KNOWLEDGE, SKILLS AND EXPERTISE IN MEDIATION OF DISPUTES.",
            image: image2
        },
        {
            title: "OUR LEGAL TEAM EMPLOYS INNOVATIVE METHODS TO ENSURE A SUCCESSFUL OUTCOME FOR YOUR LEGAL MATTERS.",
            image: booksImage
        },
        {
            title: "OUR FIRM POSSESSES OVER FOUR DECADES OF EXPERIENCE IN MEDIATION, ARBITRATION AND CIVIL LITIGATION.",
            image: pjoPortrait
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
            <HeroSlider slides={heroSlides}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                    <div className="max-w-3xl animate-enter delay-300">
                        <div className="flex flex-col sm:flex-row gap-4 pt-12">
                            <Link
                                to="/contact"
                                className="btn-premium flex items-center justify-center gap-3 px-6 py-3 md:px-8 md:py-4 bg-purple-600 text-white rounded-full font-bold text-base md:text-lg shadow-2xl hover:bg-purple-500"
                            >
                                <span>Book a Consultation</span>
                                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                                    <ArrowRight size={16} />
                                </div>
                            </Link>
                            <div className="flex items-center gap-4 px-4 py-2 md:px-6 md:py-4 bg-slate-900/60 backdrop-blur-md rounded-full border border-white/10">
                                <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-purple-600 animate-pulse">
                                    <Phone size={20} />
                                </div>
                                <div className="text-left text-white pr-4">
                                    <p className="text-[10px] md:text-xs text-white/70 font-bold uppercase tracking-wider">Call Us Now</p>
                                    <p className="font-bold text-base md:text-lg">(202) 548-2999</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </HeroSlider>



            {/* Services Grid with Hover Effects */}
            <section className="py-20 md:py-32 relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12 md:mb-20">
                        <h2 className="text-3xl md:text-5xl font-bold text-slate-900 font-['Playfair_Display'] mb-4 md:mb-6">
                            Mediation & Coaching<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-rose-600">Built Around You</span>
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {services.map((service, index) => (
                            <div key={index} className={`group relative bg-white rounded-[2rem] p-8 shadow-xl border border-slate-100 overflow-hidden card-hover-effect animate-enter delay-${(index % 4 + 1) * 100}`}>
                                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${service.color} opacity-10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700`}></div>

                                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center text-white shadow-lg mb-8 group-hover:rotate-6 transition-transform duration-300`}>
                                    <service.icon size={32} />
                                </div>

                                <h3 className="text-2xl font-bold text-slate-900 font-['Playfair_Display'] mb-4">{service.title}</h3>
                                <p className="text-slate-500 leading-relaxed mb-8">{service.description}</p>

                                <Link to={service.link} className="flex items-center gap-2 text-slate-900 font-bold group-hover:text-rose-600 transition-colors">
                                    <span className="text-sm uppercase tracking-wider">Learn More</span>
                                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-purple-600/20 transition-colors">
                                        <ArrowRight size={14} />
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* DC Office Location Section */}
            <section className="py-20 md:py-28 bg-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="space-y-8 animate-slide-right">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600/10 rounded-full border border-purple-600/30">
                                <MapPin size={16} className="text-rose-600" />
                                <span className="text-rose-600 font-bold text-sm tracking-wide uppercase">Our Location</span>
                            </div>
                            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 font-['Playfair_Display'] leading-tight">
                                Serving Maryland &<br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-rose-600">Washington, DC</span>
                            </h2>
                            <p className="text-lg text-slate-600 leading-relaxed">
                                Phyllis J. Outlaw & Associates have provided legal services to residents and local businesses in Maryland and Washington, DC. Our offices are located in the commercial district which is known for its resurgence and emerging small businesses. Our offices are convenient to the financial and business districts of the city, public transportation, as well as to the federal and local courts located in the District of Columbia and Maryland.
                            </p>
                        </div>
                        <div className="relative animate-slide-left delay-300">
                            <div className="absolute -inset-4 bg-gradient-to-r from-purple-600 to-rose-600 rounded-[2.5rem] rotate-2 opacity-20 blur-lg animate-pulse"></div>
                            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border border-slate-100 h-[300px] md:h-[400px] magnetic">
                                <img
                                    src={booksImage}
                                    alt="Washington DC commercial district"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                                <div className="absolute bottom-6 left-6 right-6 z-10">
                                    <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                                        <p className="text-slate-900 font-bold font-['Playfair_Display'] text-lg">412 H Street, NE</p>
                                        <p className="text-slate-600 text-sm">Washington, DC 20002 · (202) 548-2999</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* TV & Radio Appearances Marquee */}
            <section className="py-12 md:py-16 bg-white relative overflow-hidden border-y border-slate-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-full border border-purple-200 mb-4">
                        <Tv size={16} className="text-purple-600" />
                        <span className="text-purple-600 font-bold text-sm tracking-wide uppercase">As Seen On</span>
                    </div>
                    <p className="text-slate-600 text-lg">
                        Phyllis J. Outlaw has appeared as a guest on radio, as well as local and national television shows.
                    </p>
                </div>
                <div className="relative overflow-hidden">
                    <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10"></div>
                    <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10"></div>
                    <div className="flex animate-marquee whitespace-nowrap">
                        {[...Array(2)].map((_, setIndex) => (
                            <div key={setIndex} className="flex items-center gap-12 px-6">
                                {[
                                    "CNN's Burden of Proof",
                                    "C-Span's Fox News",
                                    "BET's Business Report",
                                    "WHUT's Evening Exchange",
                                    "The Bottom Line hosted by former Congressman Kweisi Mfume"
                                ].map((station, i) => (
                                    <div key={i} className="flex items-center gap-4 px-8 py-4 bg-slate-50 rounded-full border border-slate-200 backdrop-blur-sm hover:bg-slate-100 transition-colors duration-300 flex-shrink-0">
                                        <Tv size={20} className="text-purple-600" />
                                        <span className="text-slate-900 font-semibold text-lg whitespace-nowrap">{station}</span>
                                    </div>
                                ))}
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
                                <span className="text-purple-600">Works For You</span>
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
                                        <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-purple-600 group-hover:bg-purple-600 group-hover:text-slate-900 transition-all duration-300 shadow-lg">
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
                            <div className="absolute -inset-4 bg-gradient-to-r from-purple-600 to-rose-600 rounded-[2.5rem] rotate-3 opacity-30 blur-lg"></div>
                            <div className="relative h-[400px] md:h-[500px] rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white/10 bg-gradient-to-br from-slate-800 to-slate-900 flex flex-col justify-center items-center p-8 text-center relative group">
                                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none"></div>
                                <div className="absolute inset-0 bg-purple-500/10 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                                <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center text-purple-600 mb-8 relative z-10 transition-transform duration-500 group-hover:scale-110">
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
                    <Award size={48} className="text-purple-600 mx-auto mb-8 animate-bounce" />
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
                                        <p className="text-rose-600 text-sm font-semibold uppercase">{t.role}</p>
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
                                className={`transition-all duration-300 rounded-full ${i === activeTestimonial ? 'w-12 h-3 bg-purple-600' : 'w-3 h-3 bg-slate-300'}`}
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
                        Let's Start a <span className="text-purple-600">Conversation</span>
                    </h2>
                    <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto">
                        You don't have to figure it out alone. We are here to help you move forward.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <Link to="/contact" className="btn-glow px-10 py-5 bg-purple-600 text-white rounded-full font-bold text-xl shadow-lg hover:bg-rose-600 transition-colors">
                            Book Consultation
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;

