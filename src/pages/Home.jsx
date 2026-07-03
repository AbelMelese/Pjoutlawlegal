import { Link } from 'react-router-dom';
import {
    ArrowRight,
    Scale,
    Building2,
    UserCheck,
    HeartHandshake
} from 'lucide-react';
import { useEffect, useState, useRef } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import PageHero from '../components/PageHero';
import designSlide1 from '../assets/design_  slide1.png';
import designSlide2 from '../assets/design_  slide2.png';
import designSlide3 from '../assets/design_  slide3.png';
import designSlide4 from '../assets/design_  slide4.png';
import fleurDeLis from '../assets/fleur-de-lis.png';



const Home = () => {
    const [activeTestimonial, setActiveTestimonial] = useState(0);
    const [heroSlideIndex, setHeroSlideIndex] = useState(0);
    const heroSlideImages = [designSlide1, designSlide2, designSlide3, designSlide4];

    // Scroll reveal refs for each section
    const servicesHeaderRef = useScrollReveal();
    const servicesGridRef = useScrollReveal({ staggerChildren: true, staggerDelay: 150 });



    const testimonialsRef = useScrollReveal();
    const ctaRef = useScrollReveal();

    const services = [
        {
            icon: Scale,
            title: 'Mediation Services',
            description: 'Whether you are going through a divorce, addressing a family dispute, or managing workplace conflict, our proven process helps you reach effective results.',
            color: 'from-[#2A4F7A] to-[#1E3A5F]',
            link: '/mediation-services',
        },
        {
            icon: Building2,
            title: 'Corporate Services',
            description: 'Phyllis J. Outlaw & Associates provides legal services to businesses, nonprofit organizations, and individuals seeking experienced counsel. We handle each matter with careful preparation, clear communication, and a strong focus on our clients\' long-term interests.',
            color: 'from-[#1E3A5F] to-[#5B2C6F]',
            link: '/legal-services',
        },
        {
            icon: UserCheck,
            title: 'Individual Client Services',
            description: 'Phyllis J. Outlaw & Associates possess extensive trial experience in federal and local courts and have represented clients before agencies in Washington, D.C., and Maryland. Our firm has substantial knowledge and skills in litigation, arbitration, and mediation involving family law matters, including divorce, marital property, child custody, visitation, and child support, as well as personal injury, medical malpractice, probate, consumer law, real estate, labor law, equal employment opportunity law, and discrimination law.',
            color: 'from-[#2A4F7A] to-[#1E3A5F]',
            link: '/practice-areas',
        },
        {
            icon: HeartHandshake,
            title: 'Coaching Services',
            description: 'Our coaching services help individuals, couples, families, and businesses set goals, strengthen skills, and achieve results through personalized support and practical action steps.',
            color: 'from-[#5B2C6F] to-[#5B2C6F]',
            link: '/coaching',
        },
    ];
    const marqueeServices = [...services, ...services];




    const testimonials = [
        {
            quote: "I am very pleased and satisfied with the firm's work. They kept me fully informed both in person and with a written copy of all details. The attorneys have been competent, thorough and timely in their legal work.",
            author: 'Terrance Howell',
            role: 'Prince Georges County, MD',
        },
        {
            quote: 'From the beginning, Attorney Outlaw was very upfront with me about my case, and she directed me how to proceed with my case. Throughout the process, Atty. Outlaw and her staff kept me informed of what to expect. I appreciated her professionalism in handling my case. I would highly recommend Phyllis J. Outlaw & Associates to anyone who needs legal representation. Thank you for handling my case.',
            author: 'Sheryl Garrison',
            role: 'Newnan, GA',
        },
        {
            quote: 'Phyllis J. Outlaw & Associates represented me after I was injured in a car accident. Attorney Outlaw and her staff were professional and kept me informed throughout my case. I highly recommend Phyllis J. Outlaw & Associates to anyone in need of legal services.',
            author: 'Emma Dorsey',
            role: 'Washington, DC',
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
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 font-['Playfair_Display'] mb-6">
                            Phyllis J. Outlaw &amp; Associates
                        </h2>
                        <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 sm:gap-4 md:gap-6">
                            {[
                                { icon: Scale, label: 'Mediation Services' },
                                { icon: Building2, label: 'Corporate Services' },
                                { icon: UserCheck, label: 'Individual Client Services' },
                                { icon: HeartHandshake, label: 'Coaching Services' },
                            ].map((item, idx) => (
                                <div key={idx} className="flex items-center gap-2">
                                    {idx > 0 && (
                                        <span className="hidden sm:inline-block w-[3px] h-[3px] rounded-full bg-[#C5A03A] mr-2 md:mr-4" />
                                    )}
                                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#1E3A5F] to-[#5B2C6F] flex items-center justify-center text-white shadow-md">
                                        <item.icon size={16} />
                                    </div>
                                    <span className="text-base md:text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#1E3A5F] to-[#5B2C6F] font-['Playfair_Display']">
                                        {item.label}
                                    </span>
                                </div>
                            ))}
                        </div>
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
                                        <img src={fleurDeLis} alt={service.title} className="w-8 h-8 object-contain" />
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




            {/* Client Testimonials - Dark Mode */}
            <section className="py-14 md:py-20 bg-[#1E3A5F] relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
                    <div className="blob bg-[#5B2C6F] w-[800px] h-[800px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-30 rounded-full blur-3xl"></div>
                </div>

                <div ref={testimonialsRef} className="scroll-reveal max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <h2 className="text-3xl md:text-5xl font-bold text-white font-['Playfair_Display'] mb-4">
                        Client <span className="text-[#C5A03A]">Testimonials</span>
                    </h2>
                    <div className="w-20 h-[3px] bg-gradient-to-r from-[#C5A03A] to-[#5B2C6F] mx-auto mb-10 md:mb-14 rounded-full"></div>

                    <div className="relative min-h-[560px] sm:min-h-[500px] md:min-h-[460px] lg:min-h-[420px]">
                        {testimonials.map((t, i) => (
                            <div
                                key={i}
                                className={`absolute inset-0 transition-all duration-700 flex flex-col items-center justify-center ${i === activeTestimonial ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}
                            >
                                <div className="relative rounded-[2rem] p-8 md:p-10 border border-white/10 bg-white/5 backdrop-blur-md shadow-2xl max-w-3xl mx-auto">
                                    <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-gradient-to-br from-[#C5A03A] to-[#5B2C6F] flex items-center justify-center shadow-lg">
                                        <span className="text-white text-xl font-bold font-['Playfair_Display']">&ldquo;</span>
                                    </div>
                                    <p className="text-lg md:text-2xl font-['Playfair_Display'] text-white leading-relaxed mb-6 italic">
                                        "{t.quote}"
                                    </p>
                                    <div className="w-12 h-[2px] bg-[#C5A03A] mx-auto mb-4 rounded-full"></div>
                                    <p className="font-bold text-white text-lg">{t.author}</p>
                                    <p className="text-[#C5A03A] text-sm font-semibold uppercase tracking-[0.16em] mt-1">{t.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-center gap-3 mt-8">
                        {testimonials.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setActiveTestimonial(i)}
                                className={`transition-all duration-300 rounded-full ${i === activeTestimonial ? 'w-12 h-3 bg-[#C5A03A]' : 'w-3 h-3 bg-white/30'}`}
                            />
                        ))}
                    </div>
                </div>
            </section>


        </div>
    );
};

export default Home;

