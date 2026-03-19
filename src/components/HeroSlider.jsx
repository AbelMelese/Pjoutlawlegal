import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const HeroSlider = ({ slides, children }) => {
    const [currentSlide, setCurrentSlide] = useState(0);

    // Auto slide
    useEffect(() => {
        const slideInterval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 6000);
        return () => clearInterval(slideInterval);
    }, [slides.length]);

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
    const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

    return (
        <section className="relative w-full min-h-[85vh] overflow-hidden flex items-center pt-20">
            {/* Image Slides Background */}
            {slides.map((slide, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                >
                    <div className="absolute inset-0 w-full h-full transform scale-105 transition-transform duration-[10000ms] ease-out" style={{ transform: index === currentSlide ? 'scale(1)' : 'scale(1.05)' }}>
                        <img
                            src={slide.image}
                            alt=""
                            className="w-full h-full object-cover opacity-70"
                        />
                    </div>
                    {/* Advanced gradient overlay for crisp text readability */}
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/40 to-transparent"></div>

                    {/* Content overlay */}
                    <div className="absolute inset-0 flex items-center">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                            {(slide.title || slide.description || slide.subtitle) && (
                                <div className="max-w-3xl animate-slide-right">
                                    {/* Slide Text */}
                                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-['Playfair_Display'] leading-[1.2] drop-shadow-xl mb-6">
                                        {slide.title || slide.description}
                                    </h1>

                                    {/* Optional Author / Subtext */}
                                    {slide.subtitle && (
                                        <p className="mt-4 text-xl text-slate-300 font-medium mb-12">
                                            {slide.subtitle}
                                        </p>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ))}

            {/* Static Children overlay (Buttons, static headers) */}
            <div className="relative z-20 w-full">
                {children}
            </div>

            {/* Navigation Arrows */}
            <div className="absolute right-4 bottom-24 lg:right-12 lg:bottom-1/2 lg:translate-y-1/2 z-30 flex lg:flex-col gap-4">
                <button
                    onClick={prevSlide}
                    className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 hover:bg-white/30 backdrop-blur-md border border-white/20 flex items-center justify-center text-white transition-all transform hover:scale-110 focus:outline-none"
                    aria-label="Previous Slide"
                >
                    <ChevronLeft size={24} />
                </button>
                <button
                    onClick={nextSlide}
                    className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 hover:bg-white/30 backdrop-blur-md border border-white/20 flex items-center justify-center text-white transition-all transform hover:scale-110 focus:outline-none"
                    aria-label="Next Slide"
                >
                    <ChevronRight size={24} />
                </button>
            </div>

            {/* Dots */}
            <div className="absolute bottom-8 right-8 lg:right-12 z-30 flex gap-3">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`transition-all duration-300 rounded-full focus:outline-none ${index === currentSlide ? 'w-10 h-2 bg-purple-500 shadow-lg shadow-purple-500/50' : 'w-2 h-2 bg-white/40 hover:bg-white/70'}`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </section>
    );
};

export default HeroSlider;
