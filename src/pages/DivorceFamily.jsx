import { Link } from 'react-router-dom';
import {
    Scale,
    Users,
    Baby,
    DollarSign,
    Home,
    FileText,
    Heart,
    MapPin,
    ArrowRight,
    Phone,
    CheckCircle,
    Shield,
    MessageSquare
} from 'lucide-react';

const DivorceFamily = () => {
    const services = [
        {
            icon: Scale,
            title: 'Divorce, Legal Separation & Annulment',
            description: 'Skilled representation in contested and uncontested divorces. We help clients pursue the most suitable legal option for their circumstances.',
            items: ['Contested divorce', 'Uncontested divorce', 'Legal separation', 'Annulment eligibility'],
        },
        {
            icon: Baby,
            title: 'Child Custody & Parenting Time',
            description: 'Your children come first. We help parents create clear, enforceable custody arrangements that support their child\'s best interests.',
            items: ['Legal and physical custody', 'Parenting schedules', 'Custody litigation', 'Order modifications'],
        },
        {
            icon: DollarSign,
            title: 'Child Support',
            description: 'We help parents understand their rights and obligations ensuring calculations are accurate and comply with state guidelines.',
            items: ['New support orders', 'Modifications', 'Enforcement', 'Calculation accuracy'],
        },
        {
            icon: Heart,
            title: 'Alimony & Spousal Support',
            description: 'Financial stability after divorce is a major concern. We advocate for fair spousal support arrangements.',
            items: ['Temporary support', 'Rehabilitative support', 'Long-term alimony', 'Modifications'],
        },
        {
            icon: MapPin,
            title: 'Change of Domicile',
            description: 'If you wish to move out of state with your child, or want to prevent a relocation, we can help protect your parental rights.',
            items: ['Relocation petitions', 'Objections to relocation', 'Negotiated agreements', 'Contested moves'],
        },
        {
            icon: Users,
            title: 'Paternity',
            description: 'Establishing paternity is essential for securing custody, support, and parental rights. We support both mothers and fathers.',
            items: ['Paternity testing', 'Custody for unmarried', 'Child support orders', 'Parentage acknowledgment'],
        },
        {
            icon: FileText,
            title: 'Prenuptial Agreements',
            description: 'Planning ahead protects your assets and minimizes future conflict. We draft, review, and negotiate agreements.',
            items: ['Prenuptial agreements', 'Postnuptial agreements', 'Asset protection', 'Financial planning'],
        },
        {
            icon: Home,
            title: 'Post-Judgment Modifications',
            description: 'Life changes and your court orders may need to change with it. We help clients pursue or defend modifications.',
            items: ['Custody modifications', 'Support modifications', 'Relocation orders', 'Parenting time changes'],
        },
    ];

    return (
        <div className="overflow-hidden bg-[#f8fafc]">
            {/* Hero Section */}
            <section className="relative py-32 bg-[#0f172a] overflow-hidden">
                <div className="absolute inset-0">
                    <div className="blob blob-gold w-[600px] h-[600px] top-[-100px] right-[-100px] opacity-20"></div>
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="animate-enter">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full mb-6 border border-white/10 backdrop-blur-md">
                                <Scale size={18} className="text-amber-400" />
                                <span className="text-white font-medium text-sm tracking-wide uppercase">Legal Representation</span>
                            </div>

                            <h1 className="text-5xl md:text-7xl font-bold text-white font-['Playfair_Display'] mb-8 leading-tight">
                                Divorce & <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">Family Law</span>
                            </h1>

                            <p className="text-xl text-slate-400 mb-12 leading-relaxed">
                                Strategic, compassionate, and results-driven representation for individuals
                                facing complex family law matters. We protect your rights every step of the way.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link
                                    to="/contact"
                                    className="btn-glow flex items-center justify-center gap-2 px-8 py-4 bg-amber-500 text-white rounded-full font-bold text-lg hover:bg-amber-600"
                                >
                                    <span>Get Legal Help</span>
                                    <ArrowRight size={20} />
                                </Link>
                                <a
                                    href="tel:+12025482999"
                                    className="flex items-center justify-center gap-2 px-8 py-4 border border-white/20 text-white rounded-full font-semibold text-lg hover:bg-white/5 transition-all"
                                >
                                    <Phone size={20} />
                                    <span>(202) 548-2999</span>
                                </a>
                            </div>
                        </div>

                        <div className="hidden lg:block relative animate-float-delayed">
                            <div className="absolute -inset-4 bg-gradient-to-br from-amber-500/30 to-blue-600/30 rounded-[2.5rem] blur-2xl"></div>
                            <div className="glass-dark rounded-[2rem] p-10 border border-white/10 relative">
                                <h3 className="text-3xl font-bold text-white font-['Playfair_Display'] mb-8">
                                    Why Choose Us?
                                </h3>
                                <div className="space-y-6">
                                    {[
                                        { icon: CheckCircle, text: 'Experienced divorce and family law attorney' },
                                        { icon: Heart, text: 'Personalized, compassionate representation' },
                                        { icon: Shield, text: 'Aggressive advocacy when it matters most' },
                                        { icon: MessageSquare, text: 'Clear communication and responsive support' }
                                    ].map((feature, index) => (
                                        <div key={index} className="flex items-center gap-4 group">
                                            <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center group-hover:bg-amber-500 transition-colors duration-300">
                                                <feature.icon size={24} className="text-amber-400 group-hover:text-white transition-colors" />
                                            </div>
                                            <span className="text-slate-300 text-lg group-hover:text-white transition-colors">{feature.text}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Grid */}
            <section className="py-32 relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-20 animate-enter">
                        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 font-['Playfair_Display'] mb-6">
                            Comprehensive Family Law Services
                        </h2>
                        <p className="text-xl text-slate-500 max-w-3xl mx-auto">
                            We offer a full range of family law services tailored to your unique needs and goals.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {services.map((service, index) => (
                            <div
                                key={index}
                                className="group bg-white rounded-[2rem] p-10 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-slate-100 relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110 duration-500">
                                    <service.icon size={120} />
                                </div>

                                <div className="flex items-start gap-8 relative z-10">
                                    <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center flex-shrink-0 text-amber-500 shadow-lg group-hover:rotate-6 transition-transform duration-300">
                                        <service.icon size={32} />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-2xl font-bold text-slate-900 mb-4 font-['Playfair_Display'] group-hover:text-amber-600 transition-colors">
                                            {service.title}
                                        </h3>
                                        <p className="text-slate-500 mb-6 leading-relaxed">
                                            {service.description}
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            {service.items.map((item, i) => (
                                                <span
                                                    key={i}
                                                    className="px-4 py-1.5 bg-slate-100 text-slate-600 rounded-full text-sm font-semibold group-hover:bg-amber-50 group-hover:text-amber-700 transition-colors"
                                                >
                                                    {item}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Approach Section */}
            <section className="py-32 bg-slate-50 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-20 items-center">
                        <div>
                            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 font-['Playfair_Display'] mb-8">
                                A Strategic Approach Focused on{' '}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-600">Your Goals</span>
                            </h2>
                            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                                Ending a marriage is never easy. At Phyllis J Outlaw Mediation Service, we understand the
                                emotional weight and complexity of family law matters. Our approach combines
                                legal expertise with compassionate support.
                            </p>

                            <div className="grid sm:grid-cols-2 gap-6">
                                {[
                                    'Personalized attention',
                                    'Strategic advocacy',
                                    'Responsive communication',
                                    'Results-driven approach',
                                    'Court experience',
                                    'Settlement negotiation',
                                ].map((item, index) => (
                                    <div key={index} className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                                        <CheckCircle size={20} className="text-amber-500" />
                                        <span className="text-slate-700 font-medium">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="relative">
                            <div className="absolute -inset-4 bg-gradient-to-tr from-slate-900 to-slate-700 rounded-[2.5rem] rotate-2 opacity-10"></div>
                            <img
                                src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                                alt="Legal consultation"
                                className="relative rounded-[2rem] shadow-2xl w-full object-cover aspect-[4/3] transform hover:scale-[1.02] transition-transform duration-700"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-white">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-4xl md:text-6xl font-bold text-slate-900 font-['Playfair_Display'] mb-8">
                        Speak With Our Team <span className="text-amber-500">Today</span>
                    </h2>
                    <div className="flex justify-center gap-6">
                        <Link
                            to="/contact"
                            className="btn-glow px-10 py-5 bg-slate-900 text-white rounded-full font-bold text-xl shadow-xl"
                        >
                            Request Consultation
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default DivorceFamily;
