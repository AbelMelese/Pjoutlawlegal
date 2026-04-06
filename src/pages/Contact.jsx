import {
    Phone,
    Mail,
    Clock
} from 'lucide-react';
import PageHero from '../components/PageHero';
import image1 from '../assets/image1.jpg';
import image2 from '../assets/image 2.jpg';
import booksImage from '../assets/books image.jpg';

const Contact = () => {
    const heroSlides = [
        {
            title: "Contact Us",
            subtitle: "Let's start with a conversation. We are here to listen and provide the guidance you need.",
            image: image1
        },
        {
            title: "Visit Our Office",
            subtitle: "Located on Capitol Hill in the commercial district of Washington, DC.",
            image: image2
        },
        {
            title: "Start the Conversation",
            subtitle: "Our legal and mediation team is ready to help you move forward with clarity.",
            image: booksImage
        }
    ];

    return (
        <div className="overflow-hidden bg-[#f8fafc]">
            {/* Hero Section */}
            <PageHero slides={heroSlides} noSlide />

            <section className="py-24 relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid gap-16">

                        {/* Contact Details */}
                        <div className="space-y-10 max-w-4xl mx-auto w-full">
                            <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl border border-slate-100 relative overflow-hidden text-center">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-[#3D6B6E]/10 rounded-full blur-3xl"></div>

                                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 font-['Playfair_Display'] mb-4 relative z-10">
                                    Contact Our Office.
                                </h2>
                                <p className="text-lg text-slate-500 mb-8 max-w-2xl mx-auto relative z-10">
                                    We only accept phone calls for new inquiries. Please call our office during business hours and our team will assist you directly.
                                </p>

                                <div className="grid md:grid-cols-2 gap-6 text-left relative z-10">
                                    <div className="flex items-center gap-6 p-6 bg-slate-50 rounded-2xl shadow-sm border border-slate-100 group">
                                        <div className="w-14 h-14 bg-slate-50 rounded-xl flex items-center justify-center group-hover:bg-[#3D6B6E] transition-colors">
                                            <Clock size={24} className="text-slate-400 group-hover:text-white transition-colors" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">Office Hours</p>
                                            <p className="text-xl font-bold text-slate-900">Monday to Friday, 9 PM - 5 AM EST</p>
                                        </div>
                                    </div>

                                    {[
                                        { icon: Phone, title: 'Phone', value: '(202) 548-2999', href: 'tel:+12025482999', color: 'text-slate-900' },
                                        { icon: Phone, title: 'Fax', value: '(202) 548-8114', href: 'tel:+12025488114', color: 'text-slate-900' },
                                        { icon: Mail, title: 'Email', value: 'lawfirm@pjoutlawlegal.com', href: 'mailto:lawfirm@pjoutlawlegal.com', color: 'text-[#9B2335]' }
                                    ].map((item, i) => (
                                        <a key={i} href={item.href} className="flex items-center gap-6 p-6 bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg transition-all group">
                                            <div className="w-14 h-14 bg-slate-50 rounded-xl flex items-center justify-center group-hover:bg-[#3D6B6E] transition-colors">
                                                <item.icon size={24} className="text-slate-400 group-hover:text-white transition-colors" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">{item.title}</p>
                                                <p className={`text-xl font-bold ${item.color}`}>{item.value}</p>
                                            </div>
                                        </a>
                                    ))}
                                </div>

                                <div className="mt-10 relative z-10">
                                    <a href="tel:+12025482999" className="btn-premium inline-flex items-center justify-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-full font-bold text-lg shadow-lg">
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
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#3D6B6E]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 font-['Playfair_Display'] leading-tight">
                                Serving Maryland &<br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3D6B6E] to-[#9B2335]">Washington, DC</span>
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
