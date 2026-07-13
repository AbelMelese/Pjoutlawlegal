import { Link } from 'react-router-dom';
import {
    ArrowRight,
    CheckCircle
} from 'lucide-react';
import FleurDeLisIcon from '../components/FleurDeLisIcon';
import mediationPageHero from '../assets/Mediation page.png';




const MediationServices = () => {
    const services = [
        {
            id: 'court',
            title: 'Court-Ordered Mediation',
            subtitle: 'Aligned with court standards',
            description: 'As a court-appointed mediator, Phyllis J. Outlaw has successfully mediated numerous Maryland Circuit Court cases, ensuring compliance with court standards. The resulting settlement agreements are legally enforceable and aligned with judicial expectations.',
            benefits: [],
            color: 'from-[#2A4F7A] to-[#1E3A5F]',
            bgColor: 'bg-blue-50/50',
        },
        {
            id: 'family',
            title: 'Divorce and Family Mediation',
            subtitle: 'Cooperation for long-term stability',
            description: 'Helps spouses and families navigate separation, divorce, and post-divorce matters through a cooperative process focused on long-term stability, especially when children are involved. Divorce settlement agreements can address:',
            benefits: [
                'Spousal Alimony Support',
                'Property and asset division/distribution',
            ],
            color: 'from-[#1E3A5F] to-[#5B2C6F]',
            bgColor: 'bg-[#e8f4f4]/50',
        },

        {
            id: 'custody',
            title: 'Child Custody and Visitation Mediation',
            subtitle: 'Balanced agreements for families',
            description: 'Assists parents in creating balanced, practical parenting agreements that prioritize their children’s best interests while respecting each parent’s rights and responsibilities.',
            benefits: [
                'Child Custody and Parenting Plans',
                'Child Support agreements',
            ],
            color: 'from-[#2A4F7A] to-[#1E3A5F]',
            bgColor: 'bg-[#e8f4f4]/50',
        },
        {
            id: 'business',
            title: 'Business Dispute Mediation',
            subtitle: 'Practical resolution for organizations',
            description: 'Disputes involving business partners, employers, employees, vendors, or clients can disrupt operations and strain relationships. Mediation offers a practical way to resolve conflicts while helping companies avoid significant legal costs.',
            benefits: [
                'Partnership Disputes',
                'Contract Disputes',
                'Workplace conflicts',
                'Employer–Employee Disputes',
                'Vendor Service Disputes',
            ],
            color: 'from-[#5B2C6F] to-[#5B2C6F]',
            bgColor: 'bg-[#fdf2f4]/50',
        },
    ];



    const whyChoose = [
        {
            title: 'Open Dialogue',
            description: 'Encourages open, productive dialogue.',
        },
        {
            title: 'Confidentiality',
            description: 'Maintains confidentiality by keeping mediation discussions private.',
        },
        {
            title: 'Faster Resolution',
            description: 'Resolves disputes more quickly and helps avoid court litigation.',
        },
        {
            title: 'Cost-Effective',
            description: 'Offers a cost-effective alternative to expensive court battles.',
        },
        {
            title: 'Party Control',
            description: 'Allows parties to retain control over the outcome.',
        },
        {
            title: 'Virtual Sessions',
            description: 'Provides virtual sessions accessible from anywhere in the world.',
        },
    ];

    const steps = [
        {
            title: 'Initial Consultation',
            description: 'Discuss your concerns with the mediator to determine whether mediation is the right option and to clarify your goals.',
        },
        {
            title: 'Agreement and Documentation',
            description: 'After signing a mediation agreement with our firm and paying the mediation fee, you will submit the necessary documents and information for the mediator’s review.',
        },
        {
            title: 'Contact Parties',
            description: 'All parties are contacted to confirm their willingness to mediate the issues that need resolution.',
        },
        {
            title: 'Mediation Scheduling',
            description: 'Once all affected parties agree to proceed, virtual mediation sessions are scheduled at times convenient for everyone.',
        },
        {
            title: 'Virtual Conference',
            description: 'A confidential video conference is held to help the parties work toward resolving their challenges.',
        },
        {
            title: 'Neutral Facilitation',
            description: 'The mediator remains neutral while encouraging open discussion and guiding the parties toward practical dispute resolution.',
        },
        {
            title: 'Resolution Agreement',
            description: 'The mediator prepares a written summary or draft agreement outlining the terms accepted by the parties. The agreement may be reviewed by an attorney before signing.',
        }
    ];

    const reviews = [
        {
            quote: '“Ms. Outlaw is a phenomenal mediator. She took extremely tense moments and somehow made them comfortable, productive, and even humorous. She has a remarkable ability to relate to people, help them see logic, and encourage fairness without making anyone feel unheard. I am beyond grateful for her. I went from the very real possibility of not seeing my 6-year-old son during the school year except every other weekend—only four days per month—to receiving TOTAL equal parenting time. 🙌🏿😂🤎 If it were not for Ms. Outlaw, I truly believe my relationship with my son would have ultimately been impaired….4 days per month would’ve been a tragedy. And honestly, I received so much more than that but for the sake of time I’ll just say I felt heard, respected, and understood throughout the process. Ms. Outlaw is a GODSEND, and it is my absolute pleasure to write this review.”',
            attribution: 'Wayne, Montgomery County, MD',
        },
        {
            quote: '“Thank you again for the opportunity to observe your thoughtful and skillful approach to mediation. It was truly a valuable experience, and I learned so much from watching your approach, especially the way you connected with and listened to both parties.”',
            attribution: 'Michelle Jones, Mediator, Maryland',
        },
    ];

    return (
        <div className="overflow-hidden bg-[#f8fafc]">
            <div className="w-full">
                <img
                    src={mediationPageHero}
                    alt="Mediation Services"
                    className="w-full h-auto block"
                />
            </div>

            <section className="bg-white py-16 md:py-20">
                <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
                    <h1 className="font-['Playfair_Display'] text-4xl font-bold leading-tight text-slate-900 md:text-5xl">
                        Mediation Services Designed to Deliver Meaningful Results
                    </h1>
                </div>
            </section>

            {/* Services Overview */}
            <section className="py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="space-y-32">
                        {services.map((service, index) => (
                            <div
                                key={service.id}
                                id={service.id}
                                className={`flex flex-col gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'
                                    }`}
                            >
                                {/* Content Side */}
                                <div className="flex-1 space-y-8 animate-enter" style={{ animationDelay: '200ms' }}>
                                    <div className={`inline-flex items-center gap-3 px-4 py-2 ${service.bgColor} rounded-full border border-slate-100`}>
                                        <FleurDeLisIcon size="xs" />
                                        <span className="font-semibold text-slate-700 text-sm tracking-wide uppercase">{service.subtitle}</span>
                                    </div>

                                    <h3 className="text-4xl md:text-5xl font-bold text-slate-900 font-['Playfair_Display']">
                                        {service.title}
                                    </h3>

                                    <p className="text-lg text-slate-600 leading-relaxed">
                                        {service.description}
                                    </p>

                                    {service.benefits.length > 0 && (
                                        <div className="grid sm:grid-cols-2 gap-4">
                                            {service.benefits.map((benefit, i) => (
                                                <div key={i} className="flex items-start gap-3">
                                                    <CheckCircle size={20} className="text-[#1E3A5F] flex-shrink-0 mt-1" />
                                                    <span className="text-slate-600 font-medium">{benefit}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}

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
                                        <div className={`absolute -inset-4 bg-gradient-to-br ${service.color.replace('from', 'from-').replace('to', 'to-')} opacity-30 rounded-[2.5rem] blur-2xl group-hover:opacity-50 transition-opacity duration-500`}></div>
                                        <div className={`relative rounded-[2rem] overflow-hidden shadow-2xl border border-slate-100 flex items-center justify-center h-[400px] bg-gradient-to-br ${service.color}`}>
                                            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
                                            <FleurDeLisIcon size="raw-lg" className="opacity-20 transform group-hover:scale-110 transition-transform duration-700" />
                                            <div className="absolute bottom-6 right-6 p-4 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-white/50">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                                    <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">Available Now</span>
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

            {/* Process Steps Section */}
            <section className="py-24 bg-gradient-to-b from-white to-slate-50 relative overflow-hidden">
                <div className="absolute inset-0 opacity-30 pointer-events-none">
                    <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#1E3A5F]/50 to-transparent"></div>
                    <div className="blob blob-gold w-[800px] h-[800px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10"></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-20">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#1E3A5F]/10 rounded-full mb-6 border border-[#1E3A5F]/30">
                            <span className="text-[#5B2C6F] font-bold text-sm tracking-wide uppercase">How Mediation Works</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 font-['Playfair_Display'] mb-6">
                            A Seven-Step Path to <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1E3A5F] to-[#5B2C6F]">Resolution</span>
                        </h2>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                            Mediation provides a constructive path for parties to find common ground outside the courtroom. Our structured process offers clear guidance and keeps you informed at every stage.
                        </p>
                    </div>

                    <div className="relative">
                        {/* Connecting Line (Desktop) */}
                        <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-slate-200 -translate-x-1/2"></div>

                        <div className="space-y-12 relative">
                            {steps.map((step, index) => (
                                <div key={index} className={`flex flex-col lg:flex-row items-center gap-8 ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                                    }`}>
                                    {/* Empty side for layout balance */}
                                    <div className="flex-1 hidden lg:block"></div>

                                    {/* Center Icon */}
                                    <div className="relative z-10 flex-shrink-0">
                                        <div className="w-16 h-16 rounded-full bg-white border-4 border-[#1E3A5F]/20 shadow-xl flex items-center justify-center relative group">
                                            <div className="absolute inset-0 bg-gradient-to-br from-[#1E3A5F] to-[#5B2C6F] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                            <FleurDeLisIcon size="xs" className="w-7 h-7 text-[#1E3A5F] relative z-10 group-hover:scale-110 transition-transform duration-300" />
                                            <div className="absolute -top-2 -right-2 w-8 h-8 bg-slate-900 rounded-full flex items-center justify-center text-white font-bold text-sm border-2 border-white z-20">
                                                {index + 1}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Content Card */}
                                    <div className="flex-1 w-full lg:w-auto">
                                        <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300 relative group overflow-hidden">
                                            <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-[#1E3A5F] to-[#5B2C6F]"></div>
                                            <h3 className="text-2xl font-bold text-slate-900 mb-4 font-['Playfair_Display']">
                                                {step.title}
                                            </h3>
                                            <p className="text-slate-600 leading-relaxed">
                                                {step.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Mediation Works Section */}
            <section className="py-20 lg:py-32 bg-slate-50 relative overflow-hidden">
                <div className="absolute inset-0">
                    <div className="blob bg-[#1E3A5F]/10 w-[800px] h-[800px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20"></div>
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="order-2 lg:order-1 relative group">
                            <div className="absolute -inset-4 bg-[#1E3A5F]/10 rounded-[2.5rem] blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
                            <div className="relative rounded-[2rem] overflow-hidden border border-slate-200 shadow-2xl h-[500px] bg-white flex items-center justify-center">
                                <FleurDeLisIcon size="raw-lg" className="opacity-10 transform group-hover:scale-110 transition-transform duration-700" />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-transparent to-transparent opacity-80"></div>
                            </div>
                        </div>

                        <div className="order-1 lg:order-2">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#d1e9ea] rounded-full mb-6 border border-[#b3d9db]">
                                <span className="text-[#1E3A5F] font-bold text-sm tracking-wide uppercase">Benefits</span>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 font-['Playfair_Display'] mb-8">
                                Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1E3A5F] to-[#5B2C6F]">Mediation</span>
                            </h2>
                            <p className="text-slate-600 text-lg mb-12">
                                Mediation provides a constructive path for parties to find common ground outside the courtroom.
                            </p>

                            <div className="grid gap-6">
                                {whyChoose.map((item, index) => (
                                    <div
                                        key={index}
                                        className="bg-white rounded-xl p-6 hover:-translate-y-1 shadow-sm border border-slate-100 transition-transform duration-300 group flex items-start gap-5"
                                    >
                                        <FleurDeLisIcon size="md" className="group-hover:scale-110 transition-transform" />
                                        <div>
                                            <h3 className="text-xl font-bold text-slate-900 mb-2 font-['Playfair_Display']">
                                                {item.title}
                                            </h3>
                                            <p className="text-slate-600 text-sm leading-relaxed">{item.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mediation Reviews */}
            <section className="bg-white py-20 md:py-24">
                <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-12 text-center">
                        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#1E3A5F]/20 bg-[#1E3A5F]/5 px-4 py-2">
                            <FleurDeLisIcon size="xs" />
                            <span className="text-sm font-bold uppercase tracking-wide text-[#1E3A5F]">Client Experiences</span>
                        </div>
                        <h2 className="font-['Playfair_Display'] text-4xl font-bold text-slate-900 md:text-5xl">
                            Mediation <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1E3A5F] to-[#5B2C6F]">Reviews</span>
                        </h2>
                    </div>

                    <div className="mx-auto max-w-5xl space-y-8">
                        {reviews.map((review) => (
                            <figure key={review.attribution} className="rounded-[2rem] border border-slate-100 bg-slate-50 p-8 shadow-sm md:p-10">
                                <FleurDeLisIcon size="md" className="mb-6" />
                                <blockquote className="font-['Playfair_Display'] text-lg italic leading-relaxed text-slate-700 md:text-xl">
                                    {review.quote}
                                </blockquote>
                                <figcaption className="mt-6 border-t border-slate-200 pt-5 text-sm font-bold uppercase tracking-wide text-[#1E3A5F]">
                                    {review.attribution}
                                </figcaption>
                            </figure>
                        ))}
                    </div>
                </div>
            </section>

        </div>
    );
};

export default MediationServices;
