import { Link } from 'react-router-dom';
import {
    Users,
    Heart,
    Briefcase,
    ArrowRight,
    Phone,
    CheckCircle,
    MessageCircle,
    Target,
    Compass,
    Lightbulb,
    Shield,
    Video,
    GraduationCap,
    Presentation
} from 'lucide-react';
import phyllisImage from '../assets/phyllis_outlaw.png';
import workshopMeeting from '../assets/workshop_meeting.jpg';
import familyCoachingImg from '../assets/family_coaching.png';
import divorceCoachingImg from '../assets/divorce_coaching.png';
import businessCoachingImg from '../assets/business_coaching.png';

const Coaching = () => {
    const coachingServices = [
        {
            id: 'family',
            icon: Users,
            title: 'Family Coaching',
            subtitle: 'Strengthen Relationships. Rebuild Trust.',
            description: 'Families are complex. Even when love is strong, misunderstandings, boundaries, and life changes can create deep rifts. Our Family Coaching service is designed to help you reconnect.',
            benefits: [
                'Improve parent-child communication',
                'Address co-parenting challenges',
                'Set healthy family boundaries',
                'Reduce generational tensions',
                'Strengthen relationships',
            ],
            note: 'Unlike therapy, family coaching is forward-facing.',
            color: 'from-purple-500 to-purple-600',
            bgColor: 'bg-purple-50',
            accent: 'text-purple-600',
            border: 'border-purple-100',
            image: familyCoachingImg
        },
        {
            id: 'divorce',
            icon: Heart,
            title: 'Divorce Coaching',
            subtitle: 'Clarity & Confidence During Transition',
            description: 'Divorce can be overwhelming. As certified divorce coaches, we help you stay grounded, clear-headed, and empowered through each stage of your journey.',
            benefits: [
                'Understand the divorce process',
                'Prepare for mediation',
                'Navigate high-stress conversations',
                'Manage emotions like anger & grief',
                'Focus on your well-being',
                'Create post-divorce goals',
            ],
            note: 'Your coach becomes your thinking partner.',
            color: 'from-rose-500 to-rose-600',
            bgColor: 'bg-rose-50',
            accent: 'text-rose-600',
            border: 'border-rose-100',
            image: divorceCoachingImg
        },
        {
            id: 'business',
            icon: Briefcase,
            title: 'Business Coaching',
            subtitle: 'Unlock Clarity & Strategy',
            description: 'Behind every successful business is a person managing uncertainty. Our business coaching focuses on helping entrepreneurs align values with vision.',
            benefits: [
                'Define business goals and vision',
                'Navigate team dynamics',
                'Set boundaries',
                'Improve leadership presence',
                'Handle transitions with clarity',
                'Reconnect business with purpose',
            ],
            note: 'We blend practical business insight with coaching.',
            color: 'from-[#c4a052] to-[#a88c3d]',
            bgColor: 'bg-[#c4a052]/10',
            accent: 'text-[#a88c3d]',
            border: 'border-[#c4a052]/30',
            image: businessCoachingImg
        },
    ];

    const differentiators = [
        { icon: Target, title: 'Tailored', description: 'Built around your unique situation, goals, and strengths.' },
        { icon: Heart, title: 'Compassionate', description: 'Growth comes from support, not pressure.' },
        { icon: Shield, title: 'Confidential', description: 'Your personal and professional challenges stay private.' },
        { icon: Video, title: 'Flexible', description: 'Sessions are virtual and accessible from anywhere.' },
        { icon: Lightbulb, title: 'Real', description: 'Grounded human guidance that works.' },
        { icon: Compass, title: 'Forward-Focused', description: 'Act on what is truly right for you.' },
    ];

    return (
        <div className="overflow-hidden bg-[#f8fafc]">
            {/* Hero Section */}
            <section className="relative py-20 md:py-32 bg-[#0f172a] overflow-hidden">
                <div className="absolute inset-0">
                    <div className="blob bg-purple-500/30 w-[600px] h-[600px] top-[-100px] right-[-100px] blur-3xl rounded-full"></div>
                    <div className="blob bg-rose-500/30 w-[500px] h-[500px] bottom-[-100px] left-[-100px] blur-3xl rounded-full"></div>
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-enter">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full mb-8 backdrop-blur-md border border-white/10">
                        <MessageCircle size={18} className="text-[#c4a052]" />
                        <span className="text-white font-medium text-sm tracking-wide uppercase">Personal & Professional Growth</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold text-white font-['Playfair_Display'] mb-8 leading-tight">
                        Life, Family & <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-rose-400">Business Coaching</span>
                    </h1>

                    <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-12">
                        Real-Life Guidance for Real-Life Transitions. Move forward with clarity, calm, and practical steps.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/contact"
                            className="btn-glow px-8 py-4 bg-gradient-to-r from-purple-600 to-rose-600 text-white rounded-full font-bold text-lg shadow-xl"
                        >
                            Book a Session
                        </Link>
                    </div>
                </div>
            </section>

            {/* Services Grid */}
            <section className="py-16 md:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-3 gap-8 mb-24">
                        {coachingServices.map((service) => (
                            <a
                                key={service.id}
                                href={`#${service.id}`}
                                className="group bg-white rounded-[2rem] p-8 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-slate-100 flex flex-col items-center text-center relative overflow-hidden"
                            >
                                <div className={`absolute top-0 w-full h-2 bg-gradient-to-r ${service.color}`}></div>
                                <div className={`w-20 h-20 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-500 text-white`}>
                                    <service.icon size={32} />
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900 mb-3 font-['Playfair_Display']">
                                    {service.title}
                                </h3>
                                <p className="text-slate-500 mb-6">
                                    {service.subtitle}
                                </p>
                                <span className={`inline-flex items-center gap-2 ${service.accent} font-bold mt-auto group-hover:gap-3 transition-all`}>
                                    Learn More <ArrowRight size={18} />
                                </span>
                            </a>
                        ))}
                    </div>

                    {/* Detailed Sections */}
                    <div className="space-y-32">
                        {coachingServices.map((service, index) => (
                            <div key={service.id} id={service.id} className={`flex flex-col gap-16 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}>
                                <div className="flex-1 space-y-8">
                                    <h2 className="text-4xl font-bold text-slate-900 font-['Playfair_Display']">
                                        {service.subtitle}
                                    </h2>
                                    <p className="text-lg text-slate-600 leading-relaxed">
                                        {service.description}
                                    </p>

                                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                                        <h4 className={`text-lg font-bold ${service.accent} mb-4`}>{service.title} Helps You:</h4>
                                        <div className="grid gap-3">
                                            {service.benefits.map((b, i) => (
                                                <div key={i} className="flex items-start gap-3">
                                                    <CheckCircle size={18} className={`flex-shrink-0 mt-1 ${service.accent}`} />
                                                    <span className="text-slate-600 text-sm font-medium">{b}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <Link
                                        to="/contact"
                                        className={`btn-glow inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r ${service.color} text-white rounded-full font-bold shadow-lg`}
                                    >
                                        <span>Start {service.title}</span>
                                        <ArrowRight size={18} />
                                    </Link>
                                </div>

                                <div className="flex-1 w-full">
                                    <div className={`relative bg-gradient-to-br ${service.color} rounded-[3rem] p-1 shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-700`}>
                                        <div className="rounded-[2.8rem] overflow-hidden">
                                            <img
                                                src={service.image}
                                                alt={service.title}
                                                className="w-full h-[400px] object-cover hover:scale-105 transition-transform duration-700"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Differentiators */}
            <section className="py-20 md:py-32 bg-slate-900 relative mt-16 md:mt-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl font-bold text-white font-['Playfair_Display'] mb-4">
                            What Makes Our Coaching <span className="text-[#c4a052]">Different</span>
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {differentiators.map((item, index) => (
                            <div
                                key={index}
                                className="glass-dark p-8 rounded-2xl border border-white/5 hover:bg-white/5 transition-colors"
                            >
                                <item.icon size={32} className="text-[#c4a052] mb-6" />
                                <h3 className="text-xl font-bold text-white mb-3 font-['Playfair_Display']">
                                    {item.title}
                                </h3>
                                <p className="text-slate-400 leading-relaxed">
                                    {item.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Seminars & Training Section */}
            <section className="py-16 md:py-24 bg-slate-50 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 rounded-full mb-6">
                                <GraduationCap size={18} className="text-[#c4a052]" />
                                <span className="text-white font-medium text-sm tracking-wide uppercase">Professional Development</span>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 font-['Playfair_Display'] mb-6">
                                Seminars & <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c4a052] to-[#a88c3d]">Training</span>
                            </h2>
                            <p className="text-xl text-slate-600 italic mb-8">
                                "Tired of viewing the same in-house training video? Need an innovative solution for your professional development training needs?"
                            </p>
                            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                                Phyllis J. Outlaw & Associates offers effective workplace training programs for both the government and private sector. Having provided legal and training services for the past 30 years, our facilitators are equipped to bring value-added results to you and your organization.
                            </p>

                            <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 mb-8">
                                <h4 className="font-bold text-lg text-slate-900 mb-4 flex items-center gap-2">
                                    <Presentation className="text-[#c4a052]" />
                                    Training Topics Include:
                                </h4>
                                <div className="grid sm:grid-cols-2 gap-3">
                                    {[
                                        'Diversity Awareness',
                                        'EEO/Sexual Harassment',
                                        'Customer Service Training',
                                        'Leadership & Coaching',
                                        'Conflict Management',
                                        'Effective Communication',
                                        'Problem-Solving',
                                        'Senior Executive Development'
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 bg-[#c4a052] rounded-full"></div>
                                            <span className="text-slate-700 text-sm font-medium">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <p className="text-slate-600 font-medium">
                                Our training is designed to deliver innovative approaches to issues effecting individuals and businesses! Private seminars are also available tailored to meet your needs.
                            </p>
                        </div>

                        <div className="relative">
                            <div className="absolute -inset-4 bg-[#c4a052]/20 rounded-[2.5rem] rotate-3 blur-md"></div>
                            <div className="relative rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl">
                                <img
                                    src={workshopMeeting}
                                    alt="Professional Training Session"
                                    className="w-full object-cover"
                                />
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900 to-transparent p-8 pt-24">
                                    <p className="text-white font-['Playfair_Display'] text-2xl font-bold">Professional Development</p>
                                    <p className="text-[#c4a052] font-medium">Workshops & Training Sessions</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 md:py-24 bg-white">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold text-slate-900 font-['Playfair_Display'] mb-8">
                        Your Next Chapter Begins With <br /><span className="text-[#c4a052]">One Conversation</span>
                    </h2>
                    <Link
                        to="/contact"
                        className="btn-glow px-10 py-5 bg-slate-900 text-white rounded-full font-bold text-xl shadow-xl"
                    >
                        Book a Coaching Session
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Coaching;


