import { Link } from 'react-router-dom';
import {
    Scale,
    Users,
    Briefcase,
    Heart,
    ArrowRight,
    CheckCircle,
    HardHat,
    Stethoscope,
    Quote,
    PhoneCall,
} from 'lucide-react';
import PageHero from '../components/PageHero';
import image1 from '../assets/image1.jpg';
import image2 from '../assets/image 2.jpg';
import booksImage from '../assets/books image.jpg';

const PracticeAreas = () => {
    /* ──────────────────── Hero Slides ──────────────────── */
    const heroSlides = [
        {
            title: 'Practice Areas & Case Highlights',
            subtitle:
                `Comprehensive legal services for the business and legal issues clients face in today's market.`,
            image: image1,
        },
        {
            title: 'Decades of Litigation Experience',
            subtitle:
                'From personal injury to corporate governance, our attorneys bring proven results.',
            image: image2,
        },
        {
            title: 'Results That Speak',
            subtitle:
                'Substantial awards, successful appeals, and a legacy of client advocacy.',
            image: booksImage,
        },
    ];

    /* ──────────────────── Intro Copy ──────────────────── */
    const introText =
        'Phyllis J. Outlaw & Associates provides comprehensive legal services for the business and legal issues clients face in today\'s market. Litigation practice areas include Arbitration, Mediation, Family Law to include divorce, complex marital property to include business assets, custody and child support issues; Personal Injury to include Auto Tort and Medical Malpractice cases; Real Estate; Probate; Consumer Law; Business/Corporate Law; Labor and Employment Law to include Wrongful Termination; Equal Employment Opportunity Law; Discrimination Law and Administrative Law to include practice before Federal and local agencies. We advise clients on the purchase, sale, financing, leasing, management, and rehabilitation of real estate.';

    /* ──────────────────── Practice Areas ──────────────────── */
    const practiceAreaSections = [
        {
            id: 'personal-injury',
            icon: Stethoscope,
            title: 'Personal Injury',
            subtitle: 'Automobile, Medical Malpractice, Product Liability, Slip and Fall',
            description:
                'Phyllis J. Outlaw & Associates has represented hundreds of clients in personal injury matters. Our attorneys help clients obtain quality medical treatment, address medical expenses, and pursue compensation for lost wages, pain, and suffering. In some instances, the cases involved multiple corporations regarding general liability issues that often arise in construction projects.',
            caseHighlight:
                'Our firm won a substantial award against a construction company for a pedestrian who was injured when a truck ran over his foot at a construction site.',
            color: 'from-[#1E3A5F] to-[#2A4F7A]',
            bgColor: 'bg-blue-50/50',
        },
        {
            id: 'corporate-governance',
            icon: Briefcase,
            title: 'Corporate Governance',
            subtitle: 'Business Formation & Compliance',
            description:
                'Our firm represents emerging businesses before government entities, multimillion dollar corporations, and nonprofit organizations. We help clients build compliance systems that meet agency requirements. Our services include preparing articles of incorporation and bylaws for small businesses and advising on business structure, growth, expansion, partnership agreements, minutes, dissolution, and risk management. Phyllis J. Outlaw & Associates assists organizations in qualifying for tax-exempt status for the federal and local government.',
            caseHighlight:
                'Phyllis J. Outlaw & Associates successfully represented multimillion-dollar businesses in litigation matters.',
            color: 'from-[#5B2C6F] to-[#1E3A5F]',
            bgColor: 'bg-[#fdf2f4]/50',
        },
        {
            id: 'employment-labor',
            icon: Users,
            title: 'Employment & Labor Law',
            subtitle: 'Protecting Employee Rights',
            description:
                'Phyllis J. Outlaw & Associates represents federal, local government, and private-sector employees in cases involving wrongful termination, unemployment compensation, retirement benefits, and discrimination in Maryland and the District of Columbia.',
            caseHighlight:
                'The firm represented a retired employee in a Federal Circuit appeal involving retirement benefits sought from both the District of Columbia and the Office of Personnel Management.',
            color: 'from-[#1E3A5F] to-[#5B2C6F]',
            bgColor: 'bg-[#e8f4f4]/50',
        },
        {
            id: 'construction',
            icon: HardHat,
            title: 'Construction and Construction-Related Issues',
            subtitle: 'Commercial & Residential Projects',
            description:
                'The firm has experience with small commercial and residential construction projects and with all phases of the construction process, including contract negotiation and drafting for general contractors and subcontractors, permit acquisition, inspections, contractor payment draws, certificates of occupancy, change orders, code compliance, and architectural plans.',
            caseHighlight:
                'Phyllis J. Outlaw & Associates litigated a case in the United States District Court for the District of Columbia involving structural and mechanical defects in the HVAC system of a newly renovated mixed-use commercial property. The firm brought claims against the architect for malpractice, the HVAC installer, and the construction inspection company. It also demonstrated its knowledge of architectural and engineering plans and appealed the court\'s ruling to the United States Court of Appeals for the District of Columbia.',
            color: 'from-[#2A4F7A] to-[#1E3A5F]',
            bgColor: 'bg-blue-50/50',
        },
    ];

    /* ──────────────────── Testimonial ──────────────────── */
    const testimonial = {
        quote:
            'Phyllis J. Outlaw & Associates provides exceptional legal services and always represents our best interest. The attorneys are accessible and highly responsive to our requests.',
        author: 'Council of Women Ministers & Male Support Division, Inc.',
        location: 'Washington, DC',
    };

    /* ──────────────────── Litigation Scope Chips ──────────────────── */
    const litigationAreas = [
        'Arbitration',
        'Mediation',
        'Family Law',
        'Personal Injury',
        'Real Estate',
        'Probate',
        'Consumer Law',
        'Business/Corporate Law',
        'Labor & Employment Law',
        'Equal Employment Opportunity',
        'Discrimination Law',
        'Administrative Law',
    ];

    return (
        <div className="overflow-hidden bg-[#f8fafc]">
            {/* Hero Section */}
            <PageHero
                slides={heroSlides}
                noSlide
                actions={[
                    { label: 'Schedule a Free Consultation', to: '/contact' },
                    { label: '(202) 548-2999', href: 'tel:+12025482999', icon: 'phone' },
                ]}
            />

            {/* ═══════ Intro Section ═══════ */}
            <section className="py-20 md:py-28 bg-white relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#1E3A5F]/20 to-transparent"></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="animate-enter">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#1E3A5F]/10 rounded-full mb-6 border border-[#1E3A5F]/30">
                                <Scale size={18} className="text-[#1E3A5F]" />
                                <span className="text-[#5B2C6F] font-bold text-sm tracking-wide uppercase">
                                    Our Practice
                                </span>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 font-['Playfair_Display'] mb-6">
                                Comprehensive{' '}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1E3A5F] to-[#5B2C6F]">
                                    Legal Services
                                </span>
                            </h2>
                            <p className="text-lg text-slate-600 leading-relaxed mb-8">
                                {introText}
                            </p>
                            <Link
                                to="/contact"
                                className="btn-premium inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#1E3A5F] to-[#5B2C6F] text-white rounded-full font-bold shadow-xl shadow-[#1E3A5F]/20"
                            >
                                <span>Schedule a Free Consultation</span>
                                <ArrowRight size={18} />
                            </Link>
                        </div>

                        {/* Litigation areas chip cloud */}
                        <div className="relative">
                            <div className="absolute -inset-4 bg-[#1E3A5F]/5 rounded-[2.5rem] -rotate-2"></div>
                            <div className="relative bg-white rounded-[2rem] p-10 overflow-hidden shadow-2xl border border-slate-100">
                                <div className="absolute inset-0 bg-gradient-to-br from-[#e8f4f4] to-[#fdf2f4] opacity-50"></div>
                                <h3 className="text-2xl font-bold text-slate-900 font-['Playfair_Display'] mb-6 relative z-10">
                                    Litigation Practice Areas
                                </h3>
                                <div className="flex flex-wrap gap-3 relative z-10">
                                    {litigationAreas.map((area) => (
                                        <span
                                            key={area}
                                            className="px-4 py-2 bg-white rounded-full text-sm font-semibold text-slate-700 border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
                                        >
                                            {area}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════ Practice Area Detail Sections ═══════ */}
            <section className="py-24 bg-[#f8fafc]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 font-['Playfair_Display'] mb-6">
                            Practice Areas &{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1E3A5F] to-[#5B2C6F]">
                                Case Highlights
                            </span>
                        </h2>
                        <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                            Decades of experience across diverse legal disciplines, with proven results that speak for themselves.
                        </p>
                    </div>

                    <div className="space-y-32">
                        {practiceAreaSections.map((area, index) => (
                            <div
                                key={area.id}
                                id={area.id}
                                className={`flex flex-col gap-12 items-center ${
                                    index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                                }`}
                            >
                                {/* Content Side */}
                                <div className="flex-1 space-y-6 animate-enter" style={{ animationDelay: '200ms' }}>
                                    <div
                                        className={`inline-flex items-center gap-3 px-4 py-2 ${area.bgColor} rounded-full border border-slate-100`}
                                    >
                                        <area.icon size={20} className="text-[#1E3A5F]" />
                                        <span className="font-semibold text-slate-700 text-sm tracking-wide uppercase">
                                            {area.subtitle}
                                        </span>
                                    </div>

                                    <h3 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-slate-900 font-['Playfair_Display']">
                                        {area.title}
                                    </h3>

                                    <p className="text-lg text-slate-600 leading-relaxed">
                                        {area.description}
                                    </p>

                                    {/* Case Highlight Card */}
                                    <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                                        <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                                            <CheckCircle size={18} className="text-[#1E3A5F]" />
                                            Case Highlight
                                        </h4>
                                        <p className="text-slate-600 italic">
                                            &ldquo;{area.caseHighlight}&rdquo;
                                        </p>
                                    </div>

                                    <Link
                                        to="/contact"
                                        className="inline-flex items-center gap-2 text-[#5B2C6F] font-bold hover:gap-4 transition-all duration-300 group"
                                    >
                                        <span>Schedule Your Consultation Today</span>
                                        <ArrowRight size={18} />
                                    </Link>
                                </div>

                                {/* Visual Side */}
                                <div className="flex-1 w-full">
                                    <div className="relative group">
                                        <div
                                            className={`absolute -inset-4 bg-gradient-to-br ${area.color} opacity-30 rounded-[2.5rem] blur-2xl group-hover:opacity-50 transition-opacity duration-500`}
                                        ></div>
                                        <div
                                            className={`relative rounded-[2rem] overflow-hidden shadow-2xl border border-slate-100 flex flex-col items-center justify-center gap-6 h-[400px] bg-gradient-to-br ${area.color}`}
                                        >
                                            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
                                            <div className="w-28 h-28 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-xl group-hover:scale-110 transition-transform duration-500">
                                                <area.icon
                                                    size={56}
                                                    className="text-white drop-shadow-lg"
                                                />
                                            </div>
                                            <p className="text-white/90 text-xl font-['Playfair_Display'] font-bold tracking-wide relative z-10 text-center px-6">
                                                {area.title}
                                            </p>
                                            <div className="absolute bottom-6 right-6 p-4 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-white/50">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                                    <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                                                        Accepting Cases
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════ Testimonial Section ═══════ */}
            <section className="py-20 md:py-28 bg-slate-50 relative overflow-hidden">
                <div className="absolute inset-0">
                    <div className="blob bg-[#5B2C6F]/10 w-[600px] h-[600px] bottom-0 left-0 rounded-full blur-3xl"></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-20 items-center">
                        <div className="lg:order-2">
                            <div className="inline-flex items-center gap-3 px-4 py-2 bg-[#fce7ea] rounded-full mb-6 border border-rose-200">
                                <Heart size={18} className="text-[#5B2C6F]" />
                                <span className="font-bold text-slate-700 text-sm tracking-wide uppercase">
                                    Client Testimonial
                                </span>
                            </div>

                            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 font-['Playfair_Display'] mb-8">
                                What Our{' '}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1E3A5F] to-[#5B2C6F]">
                                    Clients Say
                                </span>
                            </h2>
                        </div>

                        <div className="lg:order-1 relative">
                            <div className="absolute -inset-4 bg-[#5B2C6F]/10 rounded-[2.5rem] rotate-3 blur-md"></div>
                            <div className="relative bg-white rounded-[2rem] p-10 border border-slate-100 shadow-2xl flex flex-col justify-center h-full">
                                <Quote size={48} className="text-[#1E3A5F] mb-6" />
                                <p className="text-2xl md:text-3xl font-['Playfair_Display'] text-slate-900 leading-relaxed mb-8 italic">
                                    &ldquo;{testimonial.quote}&rdquo;
                                </p>
                                <div>
                                    <p className="text-[#1E3A5F] font-bold text-lg">
                                        {testimonial.author}
                                    </p>
                                    <p className="text-slate-600 text-sm">{testimonial.location}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════ CTA Section ═══════ */}
            <section className="py-24 bg-gradient-to-br from-[#1E3A5F] to-[#5B2C6F] relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none"></div>
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
                <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
                    <h2 className="text-4xl md:text-5xl font-bold text-white font-['Playfair_Display'] mb-6">
                        Schedule a Free{' '}
                        <span className="text-white/80">Consultation</span>
                    </h2>
                    <p className="text-xl text-white/70 mb-10 max-w-2xl mx-auto">
                        Let our experienced team review your case and advise you on the best path forward.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link
                            to="/contact"
                            className="btn-premium px-10 py-5 bg-white text-[#1E3A5F] rounded-full font-bold text-xl shadow-2xl"
                        >
                            Contact Our Office
                        </Link>
                        <a
                            href="tel:+12025482999"
                            className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-lg text-white border-2 border-white/30 hover:border-white/60 transition-colors duration-300"
                        >
                            <PhoneCall size={20} />
                            <span>(202) 548-2999</span>
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PracticeAreas;
