import { Link } from 'react-router-dom';
import {
    ArrowRight
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import PageHero from '../components/PageHero';
import { useContent } from '../content';
import { resolveImage } from '../content/assets';
import FleurDeLisIcon from '../components/FleurDeLisIcon';


const Home = () => {
    const [activeTestimonial, setActiveTestimonial] = useState(0);
    const [heroSlideIndex, setHeroSlideIndex] = useState(0);
    const content = useContent('home');
    const heroSlides = content.heroSlides;

    // Scroll reveal refs for each section
    const servicesHeaderRef = useScrollReveal();
    const servicesGridRef = useScrollReveal({ staggerChildren: true, staggerDelay: 150 });



    const testimonialsRef = useScrollReveal();

    // Card gradients are part of the design, not the content: they cycle in order.
    const serviceColors = [
        'from-[#2A4F7A] to-[#1E3A5F]',
        'from-[#1E3A5F] to-[#5B2C6F]',
        'from-[#2A4F7A] to-[#1E3A5F]',
    ];
    const services = content.services.map((service, index) => ({
        ...service,
        color: serviceColors[index % serviceColors.length],
    }));
    const marqueeServices = [...services, ...services];




    const testimonials = content.testimonials;

    // Auto slide for Hero images
    useEffect(() => {
        const heroInterval = setInterval(() => {
            setHeroSlideIndex((prev) => (prev + 1) % heroSlides.length);
        }, 4000);
        return () => clearInterval(heroInterval);
    }, [heroSlides.length]);

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
                {heroSlides.map((slide, index) => (
                    <img
                        key={index}
                        src={resolveImage(slide.src)}
                        alt={slide.alt}
                        className={`hero-slider__slide ${
                            index === heroSlideIndex ? 'hero-slider__slide--active' : ''
                        }`}
                    />
                ))}
                {/* Slider Dots */}
                <div className="hero-slider__dots">
                    {heroSlides.map((_, index) => (
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
                            {content.introHeading}
                        </h2>
                            <div className="mx-auto grid max-w-4xl grid-cols-1 gap-3 sm:grid-cols-3 lg:grid-cols-3 lg:gap-4">
                                {services.map((service) => ({ label: service.title })).map((item) => (
                                    <div
                                        key={item.label}
                                        className="flex min-h-16 items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white/90 px-4 py-3 shadow-sm"
                                    >
                                        <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#1E3A5F] to-[#5B2C6F] text-white shadow-md">
                                            <FleurDeLisIcon size="sm" variant="transparent" />
                                        </div>
                                        <span className="text-center text-base font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#1E3A5F] to-[#5B2C6F] font-['Playfair_Display']">
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

                                    <FleurDeLisIcon size="lg" variant="transparent" className={`bg-gradient-to-br ${service.color} shadow-lg mb-6`} />

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
                        {content.testimonialsHeading} <span className="text-[#C5A03A]">{content.testimonialsHeadingAccent}</span>
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

