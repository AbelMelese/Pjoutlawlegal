import { useState } from 'react';
import {
    Phone,
    Mail,
    MapPin,
    Upload,
    CheckCircle,
    Loader2,
    Send
} from 'lucide-react';

const Contact = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: '',
        file: null
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsSubmitting(false);
        setSubmitted(true);
        setFormData({ firstName: '', lastName: '', email: '', phone: '', message: '', file: null });
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'file') {
            setFormData(prev => ({ ...prev, file: files[0] }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    return (
        <div className="overflow-hidden bg-[#f8fafc]">
            {/* Hero Section */}
            <section className="relative py-32 bg-[#0f172a] overflow-hidden">
                <div className="absolute inset-0">
                    <div className="blob bg-amber-500/20 w-[600px] h-[600px] top-[-100px] right-[-100px] rounded-full blur-3xl"></div>
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-enter">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full mb-8 border border-white/10 backdrop-blur-md">
                        <Mail size={18} className="text-amber-400" />
                        <span className="text-white font-medium text-sm tracking-wide uppercase">Get In Touch</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold text-white font-['Playfair_Display'] mb-8">
                        Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">Us</span>
                    </h1>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                        Let's start with a conversation. We will respond within one business day.
                    </p>
                </div>
            </section>

            <section className="py-24 relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-16">

                        {/* Contact Details */}
                        <div className="space-y-10 order-2 lg:order-1">
                            <div>
                                <h2 className="text-3xl font-bold text-slate-900 font-['Playfair_Display'] mb-4">
                                    Prefer to Talk Live?
                                </h2>
                                <p className="text-lg text-slate-500 mb-8">
                                    We are available Monday–Friday, 9:00 AM – 5:30 PM (Eastern Time).
                                    Call us today for a free 15-minute consultation.
                                </p>

                                <div className="space-y-6">
                                    {[
                                        { icon: Phone, title: 'Phone', value: '(202) 548-2999', href: 'tel:+12025482999', color: 'text-slate-900' },
                                        { icon: Phone, title: 'Fax', value: '(202) 548-8114', href: 'tel:+12025488114', color: 'text-slate-900' },
                                        { icon: Mail, title: 'Email', value: 'lawfirm@pjoutlawlegal.com', href: 'mailto:lawfirm@pjoutlawlegal.com', color: 'text-amber-600' }
                                    ].map((item, i) => (
                                        <a key={i} href={item.href} className="flex items-center gap-6 p-6 bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg transition-all group">
                                            <div className="w-14 h-14 bg-slate-50 rounded-xl flex items-center justify-center group-hover:bg-amber-500 transition-colors">
                                                <item.icon size={24} className="text-slate-400 group-hover:text-white transition-colors" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">{item.title}</p>
                                                <p className={`text-xl font-bold ${item.color}`}>{item.value}</p>
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-slate-900 rounded-[2rem] p-8 text-white relative overflow-hidden">
                                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                                <div className="relative z-10 flex gap-4 items-start">
                                    <MapPin size={24} className="text-amber-400 mt-1 flex-shrink-0" />
                                    <div>
                                        <h4 className="font-bold text-lg mb-2">Office Location</h4>
                                        <p className="text-slate-400 leading-relaxed">
                                            412 H Street, NE<br />
                                            Washington, DC 20002
                                        </p>
                                        <p className="text-slate-400 leading-relaxed mt-4 text-sm opacity-80">
                                            Our offices are located on Capitol Hill in the commercial district designated as an enterprise hub zone. We are conveniently located near the financial and business districts of the city, as well as to the federal and local courts in the District of Columbia and Maryland.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="order-1 lg:order-2">
                            <div className="bg-white rounded-[2.5rem] p-10 shadow-2xl border border-slate-100 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl"></div>

                                <h2 className="text-3xl font-bold text-slate-900 font-['Playfair_Display'] mb-2 relative z-10">
                                    Send Us a Message
                                </h2>
                                <p className="text-slate-500 mb-8 relative z-10">
                                    Complete the form below and we will respond shortly.
                                </p>

                                {submitted ? (
                                    <div className="py-20 text-center animate-enter">
                                        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                            <CheckCircle size={48} className="text-green-600" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-slate-900 mb-2">Message Sent!</h3>
                                        <button onClick={() => setSubmitted(false)} className="mt-8 text-amber-600 font-bold hover:underline">Send Another</button>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">First Name</label>
                                                <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required
                                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:bg-white transition-all font-medium" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Last Name</label>
                                                <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required
                                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:bg-white transition-all font-medium" />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Email Address</label>
                                            <input type="email" name="email" value={formData.email} onChange={handleChange} required
                                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:bg-white transition-all font-medium" />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Message</label>
                                            <textarea name="message" rows={4} value={formData.message} onChange={handleChange} required
                                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:bg-white transition-all font-medium resize-none" ></textarea>
                                        </div>

                                        <div className="pt-4">
                                            <button type="submit" disabled={isSubmitting} className="btn-glow w-full py-4 bg-slate-900 text-white rounded-xl font-bold text-lg shadow-lg flex items-center justify-center gap-2">
                                                {isSubmitting ? <Loader2 className="animate-spin" /> : <> <span>Send Message</span> <Send size={18} /> </>}
                                            </button>
                                        </div>
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact;
