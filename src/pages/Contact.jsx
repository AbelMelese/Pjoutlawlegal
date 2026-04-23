import {
    Phone,
    Mail,
    Clock
} from 'lucide-react';
import contactHero from '../assets/Contact Us.png';

const Contact = () => {
    return (
        <div className="overflow-hidden bg-[#f8fafc]">
            {/* Hero Section */}
            <div className="w-full">
                <img
                    src={contactHero}
                    alt="Contact Us"
                    className="w-full h-auto block"
                />
            </div>

            <section className="py-24 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #1E3A5F 0%, #C5A03A 50%, #5B2C6F 100%)' }}>
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none"></div>
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid gap-16">

                        {/* Contact Details */}
                        <div className="space-y-10 max-w-4xl mx-auto w-full">
                            <div className="bg-white/10 backdrop-blur-md rounded-[2.5rem] p-8 md:p-12 shadow-2xl border border-white/20 relative overflow-hidden text-center">

                                <h2 className="text-3xl md:text-4xl font-bold text-white font-['Playfair_Display'] mb-8 relative z-10">
                                    Contact Our Office.
                                </h2>

                                <div className="grid md:grid-cols-2 gap-6 text-left relative z-10">
                                    <div className="flex items-center gap-6 p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/15 group">
                                        <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center group-hover:bg-white/20 transition-colors flex-shrink-0">
                                            <Clock size={24} className="text-white/80 group-hover:text-white transition-colors" />
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-sm font-bold text-white/60 uppercase tracking-wider mb-1">Office Hours</p>
                                            <p className="text-[0.85rem] sm:text-base md:text-[0.85rem] lg:text-[0.95rem] xl:text-lg font-bold text-white whitespace-nowrap tracking-tight">Monday to Friday, 9 PM - 5 AM EST</p>
                                        </div>
                                    </div>

                                    {[
                                        { icon: Phone, title: 'Phone', value: '(202) 548-2999', href: 'tel:+12025482999' },
                                        { icon: Phone, title: 'Fax', value: '(202) 548-8114', href: 'tel:+12025488114' },
                                        { icon: Mail, title: 'Email', value: 'lawfirm@pjoutlawlegal.com', href: 'mailto:lawfirm@pjoutlawlegal.com' }
                                    ].map((item, i) => (
                                        <a key={i} href={item.href} className="flex items-center gap-6 p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/15 hover:bg-white/20 transition-all group">
                                            <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center group-hover:bg-white/20 transition-colors flex-shrink-0">
                                                <item.icon size={24} className="text-white/80 group-hover:text-white transition-colors" />
                                            </div>
                                            <div className="min-w-0">
                                                <p className="text-sm font-bold text-white/60 uppercase tracking-wider mb-1">{item.title}</p>
                                                <p className="text-[0.9rem] sm:text-lg md:text-sm lg:text-base xl:text-xl font-bold text-white truncate">{item.value}</p>
                                            </div>
                                        </a>
                                    ))}
                                </div>

                                <div className="mt-10 relative z-10">
                                    <a href="tel:+12025482999" className="btn-premium inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-[#1E3A5F] rounded-full font-bold text-lg shadow-lg hover:shadow-2xl">
                                        <Phone size={20} />
                                        <span>Call Our Office</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* DC Office Location Section */}
            <section className="py-14 md:py-20 bg-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#1E3A5F]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 font-['Playfair_Display'] leading-tight">
                                Serving Maryland &<br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1E3A5F] to-[#5B2C6F]">Washington, DC</span>
                            </h2>
                            <p className="text-base md:text-lg text-slate-600 leading-relaxed">
                                Phyllis J. Outlaw & Associates have provided legal services to residents and local businesses in Maryland and Washington, DC. Our offices are located in the commercial district which is known for it resurgence and emerging small businesses. Our offices are convenient to the financial and business districts of the city, public transportation, as well as to the federal and local courts located in the District of Columbia and Maryland. Our office is located at:
                            </p>
                            <div className="mt-2">
                                <p className="text-lg font-bold text-slate-900 font-['Playfair_Display']">412 H Street, NE</p>
                                <p className="text-lg font-medium text-slate-700">Washington, DC</p>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="framed-photo-container h-[260px] md:h-[340px]">
                                <img
                                    src="https://media.istockphoto.com/photos/aerial-view-of-washington-dc-xxxl-picture-id183367435?k=20&m=183367435&s=612x612&w=0&h=1poAuHDFu4WELeMGIwBHYbAMg294fNdQLsV3HKPbLdI="
                                    alt="Aerial view of Washington DC skyline"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact;
