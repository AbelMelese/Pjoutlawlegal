import { Link } from 'react-router-dom';
import {
    Scale,
    Users,
    Briefcase,
    Heart,
    ArrowRight,
    CheckCircle,
    Shield,
    Clock,
    MessageSquare,
    FileText,
    PhoneCall,
    Calendar,
    Video,
    FileCheck,
    Gavel,
    DollarSign
} from 'lucide-react';
import mediationPageHero from '../assets/Mediation page.png';




const MediationServices = () => {
    const services = [
        {
            id: 'family',
            icon: Users,
            title: 'Family & Divorce Mediation',
            subtitle: 'Navigating separation with cooperation',
            description: 'We assist spouses and families in navigating separation, divorce, and post-divorce matters. Our process focuses on cooperation and long-term stability, especially where children are involved.',
            benefits: [
                'Divorce settlement negotiations',
                'Child custody and parenting plans',
                'Child support arrangements',
                'Spousal support agreements',
                'Property and asset division',
            ],
            color: 'from-[#2A4F7A] to-[#1E3A5F]',
            bgColor: 'bg-blue-50/50',
        },
        {
            id: 'business',
            icon: Briefcase,
            title: 'Business & Commercial Mediation',
            subtitle: 'Preserving professional relationships',
            description: 'Disputes between business partners, employers and employees, vendors, or clients can disrupt operations and damage relationships. Mediation provides a practical pathway to resolution while preserving professionalism.',
            benefits: [
                'Partnership disputes',
                'Contract disagreements',
                'Workplace conflicts',
                'Employer–employee disputes',
                'Vendor and service disputes',
            ],
            color: 'from-[#1E3A5F] to-[#5B2C6F]',
            bgColor: 'bg-[#e8f4f4]/50',
        },

        {
            id: 'court',
            icon: Gavel,
            title: 'Court-Referred Mediation',
            subtitle: 'Aligned with legal standards',
            description: 'We accept court-referred cases and provide mediation services aligned with legal standards and judicial expectations. Our legal background ensures agreements are practical, enforceable, and well-documented.',
            benefits: [
                'Legal standards alignment',
                'Judicial expectations',
                'Practical agreements',
                'Enforceable outcomes',
                'Well-documented results',
            ],
            color: 'from-[#2A4F7A] to-[#1E3A5F]',
            bgColor: 'bg-[#e8f4f4]/50',
        },
        {
            id: 'custody',
            icon: Heart,
            title: 'Child Custody & Parenting Mediation',
            subtitle: 'Prioritizing child well-being',
            description: 'We help parents create balanced, workable parenting agreements that prioritize the well-being of children while respecting each parent’s rights and responsibilities.',
            benefits: [
                'Balanced agreements',
                'Workable parenting plans',
                'Child well-being priority',
                'Respect parental rights',
                'Clear responsibilities',
            ],
            color: 'from-[#5B2C6F] to-[#5B2C6F]',
            bgColor: 'bg-[#fdf2f4]/50',
        },
    ];



    const whyChoose = [
        {
            icon: Shield,
            title: 'Confidential Process',
            description: 'A private and neutral environment for open dialogue.',
        },
        {
            icon: Clock,
            title: 'Faster Resolution',
            description: 'Significantly quicker than traditional litigation and court proceedings.',
        },
        {
            icon: DollarSign,
            title: 'Cost-Effective',
            description: 'A more affordable alternative to expensive court battles.',
        },
        {
            icon: CheckCircle,
            title: 'Control & Privacy',
            description: 'Parties maintain control over outcomes while preserving relationships.',
        },
    ];

    const steps = [
        {
            title: 'Initial Consultation',
            description: 'Discuss your issues with the Mediator to determine whether mediation is the best option for you and to determine your goals.',
            icon: MessageSquare
        },
        {
            title: 'Agreement & Documentation',
            description: 'Once you enter into a mediation agreement with our firm, you will submit all necessary documents/information for review by the Mediator.',
            icon: FileText
        },
        {
            title: 'Contacting All Parties',
            description: 'All parties will be contacted to confirm their interest in mediating the issues that need resolution.',
            icon: PhoneCall
        },
        {
            title: 'Scheduling Sessions',
            description: 'Once all affected parties agree to mediate the matter, Virtual (Remote) Mediation Sessions will be scheduled at the convenience of all parties.',
            icon: Calendar
        },
        {
            title: 'Video Conference',
            description: 'A Video conference will be held with the goal of facilitating a resolution to the challenges facing the parties where all information shared will remain confidential.',
            icon: Video
        },
        {
            title: 'Neutral Facilitation',
            description: 'The Mediator will remain neutral with the goal of creating an environment that promotes open engagement with a focus on problem solving.',
            icon: Scale
        },
        {
            title: 'Resolution Agreement',
            description: 'A Written Summary or Draft Agreement will be prepared by the Mediator that will contain any terms that the parties agree upon that you have the option of having it reviewed by an attorney.',
            icon: FileCheck
        }
    ];

    return (
        <div className="overflow-hidden bg-[#f8fafc]">
            <div className="w-full" style={{ marginBottom: '-12%' }}>
                <img
                    src={mediationPageHero}
                    alt="Mediation Services"
                    className="w-full h-auto block"
                    style={{ clipPath: 'inset(0 0 12% 0)' }}
                />
            </div>

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
                                        <service.icon size={20} className={`text-${service.color.split('-')[1]}-500`} />
                                        <span className="font-semibold text-slate-700 text-sm tracking-wide uppercase">{service.subtitle}</span>
                                    </div>

                                    <h3 className="text-4xl md:text-5xl font-bold text-slate-900 font-['Playfair_Display']">
                                        {service.title}
                                    </h3>

                                    <p className="text-lg text-slate-600 leading-relaxed">
                                        {service.description}
                                    </p>

                                    <div className="grid sm:grid-cols-2 gap-4">
                                        {service.benefits.map((benefit, i) => (
                                            <div key={i} className="flex items-start gap-3">
                                                <CheckCircle size={20} className="text-[#1E3A5F] flex-shrink-0 mt-1" />
                                                <span className="text-slate-600 font-medium">{benefit}</span>
                                            </div>
                                        ))}
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
                                        <div className={`absolute -inset-4 bg-gradient-to-br ${service.color.replace('from', 'from-').replace('to', 'to-')} opacity-30 rounded-[2.5rem] blur-2xl group-hover:opacity-50 transition-opacity duration-500`}></div>
                                        <div className={`relative rounded-[2rem] overflow-hidden shadow-2xl border border-slate-100 flex items-center justify-center h-[400px] bg-gradient-to-br ${service.color}`}>
                                            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
                                            <service.icon size={160} className="text-white opacity-20 transform group-hover:scale-110 transition-transform duration-700" />
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
                            <span className="text-[#5B2C6F] font-bold text-sm tracking-wide uppercase">The Process</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 font-['Playfair_Display'] mb-6">
                            Seven Steps to <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1E3A5F] to-[#5B2C6F]">Resolution</span>
                        </h2>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                            Our structured approach ensures a clear path forward, keeping you informed and empowered at every stage.
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
                                            <step.icon className="w-7 h-7 text-[#1E3A5F] relative z-10 group-hover:text-white transition-colors duration-300" />
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
                                <Shield size={160} className="text-[#1E3A5F] opacity-10 transform group-hover:scale-110 transition-transform duration-700" />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-transparent to-transparent opacity-80"></div>
                            </div>
                        </div>

                        <div className="order-1 lg:order-2">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#d1e9ea] rounded-full mb-6 border border-[#b3d9db]">
                                <span className="text-[#1E3A5F] font-bold text-sm tracking-wide uppercase">Benefits</span>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 font-['Playfair_Display'] mb-8">
                                Why Mediation <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1E3A5F] to-[#5B2C6F]">Works</span>
                            </h2>
                            <p className="text-slate-600 text-lg mb-12">
                                Mediation offers a constructive path forward, allowing all parties to find common ground without the adversity of a courtroom.
                            </p>

                            <div className="grid gap-6">
                                {whyChoose.map((item, index) => (
                                    <div
                                        key={index}
                                        className="bg-white rounded-xl p-6 hover:-translate-y-1 shadow-sm border border-slate-100 transition-transform duration-300 group flex items-start gap-5"
                                    >
                                        <div className="w-12 h-12 bg-gradient-to-br from-[#1E3A5F] to-[#5B2C6F] rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                                            <item.icon size={24} className="text-white" />
                                        </div>
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

        </div>
    );
};

export default MediationServices;
