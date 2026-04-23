import { Link } from 'react-router-dom';
import {
    ArrowRight,
    CheckCircle,
    Scale,
    Users,
    Briefcase,
    Gavel,
    Shield,
    Target,
    Calendar
} from 'lucide-react';
import { useEffect, useState, useRef } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import PageHero from '../components/PageHero';
import designSlide1 from '../assets/design_  slide1.png';
import designSlide2 from '../assets/design_  slide2.png';
import designSlide3 from '../assets/design_  slide3.png';
import designSlide4 from '../assets/design_  slide4.png';



const Home = () => {
    const [activeTestimonial, setActiveTestimonial] = useState(0);
    const [heroSlideIndex, setHeroSlideIndex] = useState(0);
    const heroSlideImages = [designSlide1, designSlide2, designSlide3, designSlide4];

    // Scroll reveal refs for each section
    const servicesHeaderRef = useScrollReveal();
    const servicesGridRef = useScrollReveal({ staggerChildren: true, staggerDelay: 150 });


    const processTextRef = useScrollReveal();
    const processStepsRef = useScrollReveal({ staggerChildren: true, staggerDelay: 200 });
    const processCardRef = useScrollReveal();
    const testimonialsRef = useScrollReveal();
    const ctaRef = useScrollReveal();

    const services = [
        {
            icon: Users,
            title: 'Family & Divorce Mediation',
            description: 'We assist spouses and families in navigating separation, divorce, and post-divorce matters. Our process focuses on cooperation and long-term stability, especially where children are involved.',
            color: 'from-[#2A4F7A] to-[#1E3A5F]',
            link: '/mediation-services',
        },
        {
            icon: Briefcase,
            title: 'Business & Commercial Mediation',
            description: 'Disputes between business partners, employers and employees, vendors, or clients can disrupt operations and damage relationships. Mediation provides a practical pathway to resolution while preserving professionalism.',
            color: 'from-[#1E3A5F] to-[#5B2C6F]',
            link: '/mediation-services',
        },
        {
            icon: Gavel,
            title: 'Court-Referred Mediation',
            description: 'We accept court-referred cases and provide mediation services aligned with legal standards and judicial expectations. Our legal background ensures agreements are practical, enforceable, and well-documented.',
            color: 'from-[#2A4F7A] to-[#1E3A5F]',
            link: '/mediation-services',
        },
        {
            icon: Scale,
            title: 'Child Custody & Parenting Mediation',
            description: 'We help parents create balanced, workable parenting agreements that prioritize the well-being of children while respecting each parentâ€™s rights and responsibilities.',
            color: 'from-[#5B2C6F] to-[#5B2C6F]',
            link: '/mediation-services',
        },
    ];
    const marqueeServices = [...services, ...services];




    const testimonials = [
        {
            quote: "I am very pleased and satisfied with the firm's work. They keep me fully informed both in person and with a written copy of all details. The attorneys have been competent, thorough and timely in their legal work.",
            author: 'Terrance Howell',
            role: 'Prince Georges County, MD',
        },
        {
            quote: 'Phyllis J. Outlaw & Associates are highly skilled in their approach to personnel matters. The attorneys are very professional and courteous with their clients and treat them with the utmost respect.',
            author: 'Quinsola N. McCray',
            role: 'Washington, DC',
        },
        {
            quote: 'Phyllis J. Outlaw & Associates provides exceptional legal services and always represents our best interest. The attorneys are accessible and highly responsive to our requests.',
            author: 'Dr. Mary Quinn',
            role: 'Council of Women Ministers & Male Support Division, Inc., Washington, DC',
        },
        {
            quote: 'Phyllis J. Outlaw & Associates\' managerial-employee training programs are highly effective and would be an asset to any organization.',
            author: 'Ann Brown',
            role: 'Mary Kay Cosmetics, Charlotte, North Carolina',
        },
    ];

    // Auto slide for Hero images
    useEffect(() => {
        const heroInterval = setInterval(() => {
            setHeroSlideIndex((prev) => (prev + 1) % heroSlideImages.length);
        }, 4000);
        return () => clearInterval(heroInterval);
    }, [heroSlideImages.length]);

    // Auto slide for Testimonials
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [testimonials.length]);

    return (
        <div className="overflow-hidden bg-[#f8fafc]">
            {/* Hero Slider Section */}
            <div className="hero-slider w-full relative overflow-hidden">
                {heroSlideImages.map((slide, index) => (
                    <img
                        key={index}
                        src={slide}
                        alt={`Phyllis J. Outlaw & Associates – Slide ${index + 1}`}
                        className={`hero-slider__slide ${
                            index === heroSlideIndex ? 'hero-slider__slide--active' : ''
                        }`}
                    />
                ))}
                {/* Slider Dots */}
                <div className="hero-slider__dots">
                    {heroSlideImages.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setHeroSlideIndex(index)}
                            className={`hero-slider__dot ${
                                index === heroSlideIndex ? 'hero-slider__dot--active' : ''
                            }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>



            {/* Services Grid with Hover Effects */}
            <section className="py-14 md:py-20 relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div ref={servicesHeaderRef} className="scroll-reveal text-center mb-10 md:mb-14">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 font-['Playfair_Display'] mb-4">
                            Mediation Services Focused on<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1E3A5F] to-[#5B2C6F]">Delivering Effective Outcomes</span>
                        </h2>
                    </div>

                    <div ref={servicesGridRef} className="scroll-reveal services-marquee">
                        <div className="services-marquee__track">
                            {marqueeServices.map((service, index) => (
                                <div
                                    key={`${service.title}-${index}`}
                                    className="scroll-reveal-child services-marquee__card group relative bg-white rounded-[2rem] p-6 shadow-xl border border-slate-100 overflow-hidden"
                                >
                                    <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${service.color} opacity-10 rounded-full blur-2xl`}></div>

                                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center text-white shadow-lg mb-6`}>
                                        <service.icon size={32} />
                                    </div>

                                    <h3 className="text-xl font-bold text-slate-900 font-['Playfair_Display'] mb-3">{service.title}</h3>
                                    <p className="text-slate-600 leading-relaxed mb-6">{service.description}</p>

                                    <Link to={service.link} className="flex items-center gap-2 text-slate-900 font-bold transition-colors hover:text-[#5B2C6F]">
                                        <span className="text-sm uppercase tracking-wider">Learn More</span>
                                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center transition-colors hover:bg-[#1E3A5F]/20">
                                            <ArrowRight size={14} />
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="pb-14 md:pb-20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 font-['Playfair_Display'] mb-6">
                        Coaching Services
                    </h2>
                    <p className="text-lg text-slate-700 leading-relaxed">
                        Our coaching services assist individuals, couples, families and businesses in setting goals, improving skills, and achieving results through customized support and actionable steps.
                    </p>
                </div>
            </section>


            {/* Process Section - Dark Mode */}
            <section className="py-14 md:py-20 bg-[#4D1A28] relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
                    <div className="blob blob-gold w-[800px] h-[800px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20"></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-14 items-center">
                        <div ref={processTextRef} className="scroll-reveal">
                            <h2 className="text-3xl md:text-5xl font-bold text-white font-['Playfair_Display'] mb-6">
                                A Process That <br />
                                <span className="text-[#1E3A5F]">Works For You</span>
                            </h2>
                            <p className="text-lg text-slate-300 mb-8 leading-relaxed">
                                Whether you are navigating a divorce, resolving a family dispute, or facing conflict at work, our proven process is designed to create momentum.
                            </p>

                            <div ref={processStepsRef} className="scroll-reveal space-y-6">
                                {[
                                    { title: 'Reach Out', desc: 'Call or contact our office to discuss your needs.', icon: Calendar },
                                    { title: 'Get Clarity', desc: 'We structure a plan tailored to your needs.', icon: Target },
                                    { title: 'Move Forward', desc: 'Resolve conflict with confidence and peace.', icon: CheckCircle },
                                ].map((step, i) => (
                                    <div key={i} className="scroll-reveal-child flex items-start gap-6 group">
                                        <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#1E3A5F] group-hover:bg-[#1E3A5F] group-hover:text-slate-900 transition-all duration-300 shadow-lg">
                                            <step.icon size={28} />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                                            <p className="text-slate-300">{step.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div ref={processCardRef} className="scroll-reveal--scale scroll-reveal relative">
                            <div className="absolute -inset-4 bg-gradient-to-r from-[#1E3A5F] to-[#5B2C6F] rounded-[2.5rem] rotate-3 opacity-30 blur-lg"></div>
                            <div className="relative min-h-[340px] md:min-h-[420px] rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white/10 bg-gradient-to-br from-slate-800 to-slate-900 flex flex-col items-center p-7 text-center">
                                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none"></div>

                                <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center text-[#1E3A5F] mb-6 mt-6 relative z-10">
                                    <Shield size={48} />
                                </div>
                                <h3 className="text-2xl md:text-3xl font-bold text-white font-['Playfair_Display'] mb-4 relative z-10">Trusted Guidance</h3>
                                <p className="text-slate-300 relative z-10 leading-relaxed max-w-sm">
                                    With over 30 years of experience, we provide a secure, confidential environment for you to resolve disputes and plan for the future.
                                </p>

                                <div className="relative z-10 mt-8 w-full md:mt-auto">
                                    <div className="glass-panel p-6 rounded-xl border border-white/20 bg-white/5 backdrop-blur-md">
                                        <p className="text-white font-['Playfair_Display'] text-lg md:text-xl italic drop-shadow-md">"The clarity I gained after just one session was life-changing."</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-14 md:py-18 bg-slate-50 relative">
                <div ref={testimonialsRef} className="scroll-reveal max-w-5xl mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 font-['Playfair_Display'] mb-10 md:mb-12">Client Testimonials</h2>

                    <div className="relative min-h-[290px] md:min-h-[250px]">
                        {testimonials.map((t, i) => (
                            <div
                                key={i}
                                className={`absolute inset-0 transition-all duration-700 ${i === activeTestimonial ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}
                            >
                                <p className="text-xl md:text-3xl font-['Playfair_Display'] text-slate-800 leading-tight mb-6">"{t.quote}"</p>
                                <div className="space-y-2">
                                    <p className="font-bold text-slate-900 text-lg">{t.author}</p>
                                    <p className="text-[#5B2C6F] text-sm font-semibold uppercase tracking-[0.16em]">{t.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-center gap-3 mt-8">
                        {testimonials.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setActiveTestimonial(i)}
                                className={`transition-all duration-300 rounded-full ${i === activeTestimonial ? 'w-12 h-3 bg-[#1E3A5F]' : 'w-3 h-3 bg-slate-300'}`}
                            />
                        ))}
                    </div>
                </div>
            </section>


        </div>
    );
};

export default Home;

