import {
    Briefcase,
    Building2,
    Heart,
    FileText,
    Users,
    Target,
    ArrowRight,
    CheckCircle,
    TrendingUp,
    Globe,
    Scale,
    Gavel,
    HardHat,
    ScrollText,
    Landmark,
    Stethoscope,
    Quote
} from 'lucide-react';
import PageHero from '../components/PageHero';
import { Link } from 'react-router-dom';
import image1 from '../assets/image1.jpg';
import image2 from '../assets/image 2.jpg';
import booksImage from '../assets/books image.jpg';
const laborLawImg = null;
const realEstateImg = null;
const personalInjuryImg = null;


const BusinessServices = () => {
    const businessAdvising = {
        title: 'Strategic Business Advising',
        subtitle: 'You Built Something Valuable—Let\'s Take It Further',
        description: 'Running a business is a constant balancing act. At Phyllis J Outlaw Mediation Service, we provide strategic business advising that helps you align your goals, operations, and leadership without losing your focus or peace of mind.',
        helpsWith: [
            'Vision and values alignment',
            'Strategic planning and leadership',
            'Internal communication clarity',
            'Team role definition',
            'Workplace conflict coaching',
            'Thought partnership',
            'Boundaries for owners',
            'Growth planning',
        ],
        clients: [
            'Small business owners',
            'Family-run companies',
            'Founders',
            'Nonprofits',
            'Entrepreneurs',
            'Executive teams',
        ],
        process: [
            { step: '01', title: 'Discovery', desc: 'We begin with a discovery session to understand your goals, team dynamics, and internal obstacles.' },
            { step: '02', title: 'Strategy', desc: 'We co-create a roadmap—leadership restructuring, communication protocols, or decision-making systems.' },
            { step: '03', title: 'Action', desc: 'Continued support as you roll out changes and create new habits across your team.' },
        ],
    };

    const nonprofitAdvisory = {
        title: 'Taxation & Non-Profit Corporate Law',
        subtitle: 'Establishing Foundations for Success',
        description: 'Phyllis J. Outlaw and Associates represents organizations regarding corporate formation to include drafting articles of incorporation and bylaws, as well as assists organizations in qualifying for tax-exempt status for the federal and local government.',
        highlight: 'The firm successfully represents non-profit organizations that experience challenges in securing their tax exempt status on both the federal and local levels.',
        services: [
            '501(c)(3) Application Support',
            'Mission and Vision Clarity',
            'Board Governance Structuring',
            'Bylaws Review',
            'Fundraising Strategy',
            'HR Policy Development',
            'Conflict Resolution',
            'Succession Planning',
            'Strategic Advisory',
        ],
    };

    const practiceAreas = [
        {
            title: 'Employment & Labor Law',
            description: 'For nearly three decades, Phyllis J. Outlaw & Associates has represented federal and local government employees on matters to include employee discharge, unemployment compensation, discrimination, and retirement benefits in Maryland, Virginia and Washington, DC.',
            highlight: 'The firm represented a retired employee on appeal before the United States Court of Appeals for the Federal Circuit who claimed retirement benefits from both the District of Columbia and the Office of Personnel Management.',
            image: laborLawImg,
            icon: Users
        },
        {
            title: 'Real Estate',
            description: 'Phyllis J. Outlaw & Associates offers comprehensive services to address the full range of business and legal issues clients face in today’s marketplace. VWe take a multidisciplinary team approach to provide our clients with a full range of legal services in connection with the purchase, sale, financing, leasing, property management and rehabilitation of real estate.',
            highlight: 'The firm successfully represented a client in federal court in a complex case against a national mortgage company with multiple parties involving the fraudulent lending practices to small investors for properties in the District of Columbia involving millions of dollars. In this case, the firm handled property sales, assisted in property management, property maintenance and foreclosures.',
            image: realEstateImg,
            icon: Building2
        },
        {
            title: 'Automobile & Personal Injury',
            subtitle: 'Medical Malpractice, Product Liability, Slip and Fall',
            description: 'For over 29 years, Phyllis J. Outlaw & Associates has successfully represented hundreds of clients in personal injury cases. Our lawyers make sure you receive quality medical care for your injuries and that your medical bills are paid. We also seek compensation for time lost from work and our consultations are free.',
            highlight: 'Our firm won a substantial award against a construction company for a pedestrian who was injured when a truck ran over his foot at a construction site. In some instances, the cases involved multiple corporations regarding general liability issues that often arise in construction projects.',
            image: personalInjuryImg,
            icon: Stethoscope
        }
    ];

    const additionalPractices = [
        {
            title: 'Property Tax Liens',
            description: 'No other law firm is better positioned than Phyllis J. Outlaw & Associates to represent clients in property tax lien cases. Our legal team has a comprehensive understanding of these issues.',
            highlight: 'The firm successfully prevented the sale of commercial property for a striving business located in Northwest Washington, DC pursuant to a valid tax lien.',
            icon: Landmark
        },
        {
            title: 'Corporate Governance',
            description: 'Our firm represents emerging businesses, government entities, as well as the individual interest of multi-million dollar corporations and non-profit organizations. We develop systems for our clients to ensure compliance with agency regulations.',
            highlight: 'Represented clients who were injured at construction sites and received substantial awards on behalf of the client.',
            icon: Briefcase
        },
        {
            title: 'Construction Issues',
            description: 'The firm has over 28 years of experience in the construction of small commercial and residential properties, contract negotiation, and drafting for general contractors and subcontractors.',
            highlight: 'Litigated a case before the United States District Court for the District of Columbia involving structural and mechanical defects of an HVAC system in a newly renovated mixed-use property.',
            icon: HardHat
        },
        {
            title: 'Administrative Law',
            description: 'Phyllis J. Outlaw & Associates has successfully represented clients before federal and local government agencies including adjudicatory hearings.',
            highlight: 'Participated in alternative dispute resolution and adjudicatory hearings for employees with the school system for the District of Columbia.',
            icon: Scale
        },
    ];

    const heroSlides = [
        {
            title: "Business Services",
            subtitle: "From strategic advising to nonprofit compliance, we help businesses and organizations navigate growth with clarity and confidence.",
            image: image1
        },
        {
            title: "Strategic Business Advising",
            subtitle: "You Built Something Valuable—Let's Take It Further. Align your goals, operations, and leadership.",
            image: image2
        },
        {
            title: "Non-Profit Corporate Law",
            subtitle: "Establishing foundations for success with corporate formation and tax-exempt status qualification.",
            image: booksImage
        }
    ];

    return (
        <div className="overflow-hidden bg-[#f8fafc]">
            {/* Hero Section */}
            <PageHero
                slides={heroSlides}
                actions={[
                    { label: 'Business Advising', href: '#advising' },
                    { label: 'Non-Profit Advisory', href: '#nonprofit' },
                ]}
            />

            {/* Business Advising Section */}
            <section id="advising" className="py-20 md:py-32 bg-white relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-20 items-center mb-20 animate-enter">
                        <div>
                            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 font-['Playfair_Display'] mb-4">
                                {businessAdvising.title}
                            </h2>
                            <p className="text-2xl text-rose-600 font-['Playfair_Display'] italic mb-6">
                                "{businessAdvising.subtitle}"
                            </p>
                            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                                {businessAdvising.description}
                            </p>

                            <div className="grid grid-cols-2 gap-4">
                                {businessAdvising.helpsWith.slice(0, 6).map((item, i) => (
                                    <div key={i} className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 bg-purple-600 rounded-full"></div>
                                        <span className="text-slate-700 text-sm font-medium">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                         <div className="relative">
                            <div className="absolute -inset-4 bg-purple-600/5 rounded-[2.5rem] -rotate-2"></div>
                            <div className="relative bg-white rounded-[2rem] p-12 overflow-hidden shadow-2xl border border-slate-100">
                                <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-rose-50 opacity-50"></div>
                                <div className="grid grid-cols-2 gap-4 relative z-10">
                                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 text-slate-900 hover:shadow-md transition-shadow">
                                        <TrendingUp size={32} className="text-purple-600 mb-4" />
                                        <h4 className="font-bold text-lg">Growth Strategy</h4>
                                    </div>
                                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 text-slate-900 mt-8 hover:shadow-md transition-shadow">
                                        <Users size={32} className="text-purple-600 mb-4" />
                                        <h4 className="font-bold text-lg">Team Alignment</h4>
                                    </div>
                                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 text-slate-900 hover:shadow-md transition-shadow">
                                        <Target size={32} className="text-rose-600 mb-4" />
                                        <h4 className="font-bold text-lg">Clear Vision</h4>
                                    </div>
                                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 text-slate-900 mt-8 hover:shadow-md transition-shadow">
                                        <Globe size={32} className="text-purple-600 mb-4" />
                                        <h4 className="font-bold text-lg">Sustainability</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-50 rounded-[2rem] p-12 mb-20">
                        <h3 className="text-2xl font-bold text-slate-900 font-['Playfair_Display'] mb-10 text-center">
                            Our Process
                        </h3>
                        <div className="grid md:grid-cols-3 gap-8">
                            {businessAdvising.process.map((item, index) => (
                                <div
                                    key={index}
                                    className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 hover:shadow-lg transition-shadow relative"
                                >
                                    <p className="text-6xl font-bold text-slate-100 absolute -top-4 -right-4 font-sans">{item.step}</p>
                                    <h4 className="text-xl font-bold text-slate-900 mb-3 relative z-10">
                                        {item.title}
                                    </h4>
                                    <p className="text-slate-600 relative z-10 text-sm leading-relaxed">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Non-Profit Advisory Section */}
            <section id="nonprofit" className="py-20 md:py-32 bg-slate-50 relative overflow-hidden">
                <div className="absolute inset-0">
                    <div className="blob bg-rose-500/10 w-[600px] h-[600px] bottom-0 left-0 rounded-full blur-3xl"></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-20 items-center">
                        <div className="lg:order-2">
                            <div className="inline-flex items-center gap-3 px-4 py-2 bg-rose-100 rounded-full mb-6 border border-rose-200">
                                <Heart size={18} className="text-rose-600" />
                                <span className="font-bold text-slate-700 text-sm tracking-wide uppercase">Mission-Driven Support</span>
                            </div>

                            <h2 className="text-4xl font-bold text-slate-900 font-['Playfair_Display'] mb-4">
                                {nonprofitAdvisory.title}
                            </h2>
                            <p className="text-xl text-rose-600 font-medium mb-8">
                                {nonprofitAdvisory.subtitle}
                            </p>
                            <p className="text-lg text-slate-600 mb-10 leading-relaxed">
                                {nonprofitAdvisory.description}
                            </p>

                            <div className="grid sm:grid-cols-2 gap-4 mb-10">
                                {nonprofitAdvisory.services.map((s, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <CheckCircle size={18} className="text-rose-500" />
                                        <span className="text-slate-700 text-sm font-medium">{s}</span>
                                    </div>
                                ))}
                            </div>

                            <Link
                                to="/contact"
                                className="btn-premium inline-flex items-center gap-2 px-8 py-4 bg-rose-600 text-white rounded-full font-bold hover:bg-rose-500 shadow-xl shadow-rose-600/20"
                            >
                                <span>Get Nonprofit Support</span>
                                <ArrowRight size={18} />
                            </Link>
                        </div>

                        <div className="lg:order-1 relative">
                            <div className="absolute -inset-4 bg-rose-500/10 rounded-[2.5rem] rotate-3 blur-md"></div>
                            <div className="relative bg-white rounded-[2rem] p-10 border border-slate-100 shadow-2xl flex flex-col justify-center h-full">
                                <Quote size={48} className="text-purple-600 mb-6" />
                                <p className="text-2xl md:text-3xl font-['Playfair_Display'] text-slate-900 leading-relaxed mb-8 italic">
                                    “Phyllis J. Outlaw & Associates provides exceptional legal services and always represents our best interest. The attorneys are accessible and highly responsive to our requests.”
                                </p>
                                <div>
                                    <p className="text-purple-600 font-bold text-lg">Dr. Mary Quinn</p>
                                    <p className="text-slate-500 text-sm">Council of Women Ministers & Male Support Division, Inc. Washington, DC</p>
                                </div>
                                <div className="mt-8 pt-8 border-t border-slate-100">
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Case Highlight</p>
                                    <p className="text-slate-600 italic">"{nonprofitAdvisory.highlight}"</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Legal Practice Areas Section */}
            <section className="py-20 md:py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 font-['Playfair_Display'] mb-6">
                            Practice Areas & <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-800">Case Highlights</span>
                        </h2>
                        <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                            Decades of experience across diverse legal disciplines.
                        </p>
                    </div>

                    <div className="space-y-32">
                        {practiceAreas.map((area, index) => (
                            <div key={index} className={`flex flex-col gap-12 items-center ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                                <div className="flex-1 space-y-6">
                                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full border border-blue-100">
                                        <area.icon size={18} className="text-purple-600" />
                                        <span className="text-blue-900 font-bold text-sm tracking-wide uppercase">{area.title}</span>
                                    </div>
                                    <h3 className="text-4xl font-bold text-slate-900 font-['Playfair_Display']">
                                        {area.subtitle || area.title}
                                    </h3>
                                    <p className="text-lg text-slate-600 leading-relaxed">
                                        {area.description}
                                    </p>
                                    <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                                        <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                                            <CheckCircle size={18} className="text-purple-600" />
                                            Case Highlight
                                        </h4>
                                        <p className="text-slate-600 italic">"{area.highlight}"</p>
                                    </div>
                                </div>
                                <div className="flex-1 w-full relative group">
                                    <div className="absolute inset-0 bg-purple-600/5 rounded-[2rem] transform rotate-3 transition-transform group-hover:rotate-0"></div>
                                    {area.image ? (
                                        <img
                                            src={area.image}
                                            alt={area.title}
                                            className="relative w-full rounded-[2rem] shadow-xl border border-slate-100 object-cover aspect-[4/3]"
                                        />
                                    ) : (
                                        <div className="relative w-full rounded-[2rem] shadow-xl border border-slate-100 aspect-[4/3] bg-gradient-to-br from-purple-600 to-blue-800 flex flex-col items-center justify-center gap-6 overflow-hidden">
                                            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none"></div>
                                            <div className="w-28 h-28 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-xl group-hover:scale-110 transition-transform duration-500">
                                                <area.icon size={56} className="text-white drop-shadow-lg" />
                                            </div>
                                            <p className="text-white/90 text-xl font-['Playfair_Display'] font-bold tracking-wide relative z-10">{area.title}</p>
                                            <div className="flex gap-2">
                                                {[...Array(3)].map((_, i) => (
                                                    <div key={i} className="w-2 h-2 rounded-full bg-white/30"></div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Additional Practices Grid */}
                    <div className="grid md:grid-cols-2 gap-8 mt-24">
                        {additionalPractices.map((practice, index) => (
                            <div key={index} className="bg-slate-50 rounded-2xl p-8 border border-slate-100 hover:shadow-lg transition-shadow">
                                <practice.icon size={32} className="text-purple-600 mb-6" />
                                <h3 className="text-2xl font-bold text-slate-900 font-['Playfair_Display'] mb-4">{practice.title}</h3>
                                <p className="text-slate-600 mb-6">{practice.description}</p>
                                <div className="pt-6 border-t border-slate-200">
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Case Highlight</p>
                                    <p className="text-slate-700 italic">"{practice.highlight}"</p>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-white">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold text-slate-900 font-['Playfair_Display'] mb-8">
                        Stop Guessing. Start <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-rose-600">Growing.</span>
                    </h2>
                    <Link
                        to="/contact"
                        className="btn-premium px-10 py-5 bg-slate-900 text-white rounded-full font-bold text-xl shadow-2xl"
                    >
                        Start the Conversation
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default BusinessServices;


