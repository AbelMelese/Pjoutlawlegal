import { Link } from 'react-router-dom';
import {
    ArrowRight,
    CheckCircle,
    Scale,
    Heart,
    Users,
    Briefcase,
    Shield,
    Target,
    Calendar,
    MapPin
} from 'lucide-react';
import { useEffect, useState } from 'react';
import PageHero from '../components/PageHero';
import goldWomanHoldingScales from '../assets/gold-woman-holding-scales.jpg';
import pjoaOffice264 from '../assets/pjoa-office-264.jpg';
import officeShoot044 from '../assets/office-shoot-044-client.jpg';
import officeShoot110 from '../assets/office-shoot-110-client.jpg';
import booksImage from '../assets/books image.jpg';
import pjoPortrait from "../assets/use this picture in PJO's resume.jpg";
import mediaLogosStrip from '../assets/media-logos-strip.png';

const Home = () => {
    const [activeTestimonial, setActiveTestimonial] = useState(0);

    const services = [
        {
            icon: Scale,
            title: 'Divorce Mediation',
            description: 'Navigate your divorce with dignity, clarity, and fair outcomes for both parties.',
            color: 'from-purple-500 to-purple-600',
            link: '/mediation-services',
        },
        {
            icon: Users,
            title: 'Family Mediation',
            description: 'Heal family rifts and rebuild relationships through guided communication.',
            color: 'from-rose-500 to-rose-600',
            link: '/mediation-services',
        },
        {
            icon: Briefcase,
            title: 'Business Mediation',
            description: 'Resolve workplace disputes without costly litigation or damaged relationships.',
            color: 'from-purple-600 to-rose-600',
            link: '/legal-services',
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
            image: goldWomanHoldingScales,
            background: '#d9d6cc',
            transition: 'wipe-left',
            eyebrowColor: '#214b63',
            titleColor: '#13293d',
            rotatingColor: 'rgba(19, 41, 61, 0.86)',
            descriptionColor: 'rgba(19, 41, 61, 0.8)',
            textShadow: '0 1px 3px rgba(248, 244, 239, 0.9), 0 2px 12px rgba(248, 244, 239, 0.7)',
            secondaryColor: '#13293d',
            secondaryBackground: 'rgba(255, 255, 255, 0.7)',
            secondaryBorder: 'rgba(19, 41, 61, 0.18)',
        },
        {
            title: "A COURT-APPOINTED MEDIATOR WHO POSSESSES KNOWLEDGE, SKILLS AND EXPERTISE IN MEDIATION OF DISPUTES.",
            image: pjoaOffice264,
            background: '#ece7df',
            transition: 'split-open',
            eyebrowColor: '#214b63',
            titleColor: '#13293d',
            rotatingColor: 'rgba(19, 41, 61, 0.86)',
            descriptionColor: 'rgba(19, 41, 61, 0.8)',
            textShadow: '0 1px 3px rgba(248, 244, 239, 0.9), 0 2px 12px rgba(248, 244, 239, 0.7)',
            secondaryColor: '#13293d',
            secondaryBackground: 'rgba(255, 255, 255, 0.7)',
            secondaryBorder: 'rgba(19, 41, 61, 0.18)',
        },
        {
            title: "OUR LEGAL TEAM EMPLOYS INNOVATIVE METHODS TO ENSURE A SUCCESSFUL OUTCOME FOR YOUR LEGAL MATTERS.",
            image: officeShoot044,
            background: '#efe4da',
            transition: 'diagonal-rise',
            titleSize: 'clamp(2rem, 4.2vw, 3.45rem)',
            eyebrowColor: '#214b63',
            titleColor: '#13293d',
            rotatingColor: 'rgba(19, 41, 61, 0.86)',
            descriptionColor: 'rgba(19, 41, 61, 0.8)',
            textShadow: '0 1px 3px rgba(248, 244, 239, 0.9), 0 2px 12px rgba(248, 244, 239, 0.7)',
            secondaryColor: '#13293d',
            secondaryBackground: 'rgba(255, 255, 255, 0.7)',
            secondaryBorder: 'rgba(19, 41, 61, 0.18)',
        },
        {
            title: "OUR FIRM POSSESSES OVER FOUR DECADES OF EXPERIENCE IN MEDIATION, ARBITRATION AND CIVIL LITIGATION.",
            image: officeShoot110,
            background: '#ebe5de',
            transition: 'wipe-up',
            eyebrowColor: '#214b63',
            titleColor: '#13293d',
            rotatingColor: 'rgba(19, 41, 61, 0.86)',
            descriptionColor: 'rgba(19, 41, 61, 0.8)',
            textShadow: '0 1px 3px rgba(248, 244, 239, 0.9), 0 2px 12px rgba(248, 244, 239, 0.7)',
            secondaryColor: '#13293d',
            secondaryBackground: 'rgba(255, 255, 255, 0.7)',
            secondaryBorder: 'rgba(19, 41, 61, 0.18)',
        }
    ];


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
            quote: 'Phyllis J. Outlaw and Associates\' managerial-employee training programs are highly effective and would be an asset to any organization.',
            author: 'Ann Brown',
            role: 'Mary Kay Cosmetics, Charlotte, North Carolina',
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
            <PageHero
                slides={heroSlides}
                rotatingPrefix="Resolution for"
                rotatingWords={['families', 'leaders', 'partners', 'workplaces']}
                actions={[
                    { label: 'Contact Us', to: '/contact' },
                    { label: 'Call Us Now', href: 'tel:+12025482999', icon: 'phone' },
                ]}
            />



            {/* Services Grid with Hover Effects */}
            <section className="py-14 md:py-20 relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-10 md:mb-14">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 font-['Playfair_Display'] mb-4">
                            Mediation & Coaching<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-rose-600">Built Around You</span>
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {services.map((service, index) => (
                            <div key={index} className="group relative bg-white rounded-[2rem] p-6 shadow-xl border border-slate-100 overflow-hidden card-hover-effect">
                                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${service.color} opacity-10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700`}></div>

                                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center text-white shadow-lg mb-6 group-hover:rotate-6 transition-transform duration-300`}>
                                    <service.icon size={32} />
                                </div>

                                <h3 className="text-xl font-bold text-slate-900 font-['Playfair_Display'] mb-3">{service.title}</h3>
                                <p className="text-slate-600 leading-relaxed mb-6">{service.description}</p>

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
            <section className="py-14 md:py-18 bg-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600/10 rounded-full border border-purple-600/30">
                                <MapPin size={16} className="text-rose-600" />
                                <span className="text-rose-600 font-bold text-sm tracking-wide uppercase">Our Location</span>
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 font-['Playfair_Display'] leading-tight">
                                Serving Maryland &<br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-rose-600">Washington, DC</span>
                            </h2>
                            <p className="text-base md:text-lg text-slate-600 leading-relaxed">
                                Phyllis J. Outlaw & Associates have provided legal services to residents and local businesses in Maryland and Washington, DC. Our offices are located in the commercial district which is known for its resurgence and emerging small businesses. Our offices are convenient to the financial and business districts of the city, public transportation, as well as to the federal and local courts located in the District of Columbia and Maryland.
                            </p>
                        </div>
                        <div className="relative">
                            <div className="relative rounded-[2rem] overflow-hidden border border-slate-100 h-[260px] md:h-[340px]">
                                <img
                                    src={booksImage}
                                    alt="Washington DC commercial district"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute bottom-6 left-6 right-6 z-10">
                                    <div className="bg-white rounded-xl p-4">
                                        <p className="text-slate-900 font-bold font-['Playfair_Display'] text-lg">412 H Street, NE</p>
                                        <p className="text-slate-600 text-sm">Washington, DC 20002 · (202) 548-2999</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Media Appearances */}
            <section className="page-section page-section--white">
                <div className="section-shell">
                    <div className="portrait-panel">
                        <img src={pjoPortrait} alt="Phyllis J. Outlaw portrait" />
                        <div className="body-copy">
                            <p className="section-script" style={{ textAlign: 'left', marginBottom: '0.6rem' }}>
                                Media Appearances
                            </p>
                            <p>
                                Phyllis J. Outlaw has appeared as a guest on radio as well as local and national
                                television programs. This section highlights those appearances in a more formal
                                recognition presentation.
                            </p>
                        </div>
                    </div>

                    <div className="media-marquee" style={{ marginTop: '1.5rem' }}>
                        <div className="media-marquee__track">
                            {[0, 1].map((index) => (
                                <img
                                    key={index}
                                    src={mediaLogosStrip}
                                    alt="Media appearances including CNN, C-SPAN, FOX News, WUSA 9, WYCB Podcast, WPFW, WHUT, JET, Ebony, Essence, and Bottomline"
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Process Section - Dark Mode */}
            <section className="py-14 md:py-20 bg-[#0f172a] relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
                    <div className="blob blob-gold w-[800px] h-[800px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20"></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-14 items-center">
                        <div>
                            <h2 className="text-3xl md:text-5xl font-bold text-white font-['Playfair_Display'] mb-6">
                                A Process That <br />
                                <span className="text-purple-600">Works For You</span>
                            </h2>
                            <p className="text-lg text-slate-300 mb-8 leading-relaxed">
                                Whether you are navigating a divorce, resolving a family dispute, or facing conflict at work, our proven process is designed to create momentum.
                            </p>

                            <div className="space-y-6">
                                {[
                                    { title: 'Reach Out', desc: 'Call or contact our office to discuss your needs.', icon: Calendar },
                                    { title: 'Get Clarity', desc: 'We structure a plan tailored to your needs.', icon: Target },
                                    { title: 'Move Forward', desc: 'Resolve conflict with confidence and peace.', icon: CheckCircle },
                                ].map((step, i) => (
                                    <div key={i} className="flex items-start gap-6 group">
                                        <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-purple-600 group-hover:bg-purple-600 group-hover:text-slate-900 transition-all duration-300 shadow-lg">
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

                        <div className="relative">
                            <div className="absolute -inset-4 bg-gradient-to-r from-purple-600 to-rose-600 rounded-[2.5rem] rotate-3 opacity-30 blur-lg"></div>
                            <div className="relative h-[340px] md:h-[420px] rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white/10 bg-gradient-to-br from-slate-800 to-slate-900 flex flex-col justify-center items-center p-7 text-center">
                                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none"></div>

                                <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center text-purple-600 mb-6 relative z-10">
                                    <Shield size={48} />
                                </div>
                                <h3 className="text-2xl md:text-3xl font-bold text-white font-['Playfair_Display'] mb-4 relative z-10">Trusted Guidance</h3>
                                <p className="text-slate-300 relative z-10 leading-relaxed max-w-sm">
                                    With over 30 years of experience, we provide a secure, confidential environment for you to resolve disputes and plan for the future.
                                </p>

                                <div className="absolute bottom-6 left-6 right-6 z-10">
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
                <div className="max-w-5xl mx-auto px-4 text-center">
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
                                    <p className="text-rose-600 text-sm font-semibold uppercase tracking-[0.16em]">{t.role}</p>
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
            <section className="relative py-14 md:py-18 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0 bg-[#0f172a]">
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#1e293b] to-[#0f172a] opacity-80"></div>
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none"></div>
                </div>

                <div className="relative z-10 text-center max-w-4xl px-4">
                    <h2 className="text-3xl md:text-5xl font-bold text-white font-['Playfair_Display'] mb-5 md:mb-6">
                        Let's Start a <span className="text-purple-600">Conversation</span>
                    </h2>
                    <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
                        You don't have to figure it out alone. We are here to help you move forward.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <Link to="/contact" className="btn-glow px-8 py-4 bg-purple-600 text-white rounded-full font-bold text-lg shadow-lg hover:bg-rose-600 transition-colors">
                            Contact Us
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;

