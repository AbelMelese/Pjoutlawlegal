import { Link } from 'react-router-dom';
import {
    GraduationCap,
    Award,
    Scale,
    Briefcase,
    Building2,
    Gavel,
    BadgeCheck,
    Users
} from 'lucide-react';
import PageHero from '../components/PageHero';
import attorneyPortrait from "../assets/use this picture in PJO's resume.jpg";
import attorneysReading from "../assets/image 2.jpg";
import image1 from "../assets/image1.jpg";

const MeetAttorneys = () => {
    const attorneys = [
        {
            name: 'Phyllis J Outlaw, J.D.',
            role: 'Principal & Founding Member',
            image: attorneyPortrait,
            bio: [
                'Phyllis J Outlaw, J.D., is the principal and founding member of Phyllis J Outlaw Mediation Service. With over 30 years of experience practicing law, she has now focused her career on alternative dispute resolution.',
                'She has served as a Magistrate, an Administrative Law Judge, the former Chairperson of the Attorney Grievance Commission, and a member of the Michigan Gaming Control Board. Additionally, she is a former president of Michigan Malpractice Mediators, Inc. and a court-approved mediator.',
                'Her extensive background as a business owner, an advocate and a judicial officer provides her with a well-rounded perspective. As a neutral mediator, she does not represent either party but instead facilitates discussions to help couples reach fair, balanced agreements.',
            ],
            credentials: [
                { icon: Scale, text: 'Court Approved Mediator' },
                { icon: Gavel, text: 'Former Administrative Law Judge' },
                { icon: Building2, text: 'Member State Bar of Michigan' },
                { icon: Users, text: 'Member OCBA' },
                { icon: Award, text: 'Michigan State Bar Foundation Fellow' },
            ],
            education: [
                'Juris Doctor Degree',
                '30+ Years Legal Experience',
            ],
        },
        {
            name: 'Asa Smith, J.D.',
            role: 'Co-Founding Member',
            image: attorneysReading,
            bio: [
                'Asa Smith, Esq., is a co-founding member of Smith Workforce Management Consulting Group. He is a member of the state bars of California, New York, Michigan, and Maryland.',
                'Mr. Smith focuses his work in multiple areas of employment law, with a focus on workplace management and advising. Specifically, Mr. Smith has experience creating employee handbooks and updating policies and procedures on an annual basis.',
                'Mr. Smith resolves issues such as pre-litigation workplace disputes and has experience at every stage of the employment lifecycle, from hiring to termination. His years advising business entities has given him the ability to mediate business issues with clarity of purpose for all parties.',
            ],
            credentials: [
                { icon: Building2, text: 'Member New York State Bar' },
                { icon: Building2, text: 'Member California State Bar' },
                { icon: Building2, text: 'Member Michigan State Bar' },
                { icon: Building2, text: 'Member Maryland State Bar' },
            ],
            education: [
                'University of Michigan Law School, J.D.',
                'Michigan State University, M.A. Ed',
                'University of Michigan, B.A.',
            ],
        },
    ];

    const heroSlides = [
        {
            title: "Experienced Attorneys & Mediators",
            subtitle: "Led by Phyllis J Outlaw and Asa Smith, our team combines over 30 years of legal, judicial, and mediation experience to bring you peace of mind.",
            image: attorneyPortrait
        },
        {
            title: "Expert Mediation Services",
            subtitle: "Facilitating fair, balanced, and sustainable agreements for individuals and businesses.",
            image: attorneysReading
        },
        {
            title: "Committed to Excellence",
            subtitle: "Our multidisciplinary approach ensures comprehensive solutions to complex legal needs.",
            image: image1
        }
    ];

    return (
        <div className="overflow-hidden bg-[#f8fafc]">
            {/* Hero Section */}
            <PageHero slides={heroSlides} />

            {/* Profiles */}
            <section className="py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-32">
                    {attorneys.map((person, index) => (
                        <div key={index} className={`flex flex-col gap-16 items-start ${index === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}>
                            {/* Photo Side */}
                            <div className="w-full lg:w-5/12 relative">
                                <div className="absolute -inset-4 bg-gradient-to-tr from-purple-600/30 to-purple-500/30 rounded-[2.5rem] rotate-2 blur-xl"></div>
                                <div className="relative rounded-[2rem] overflow-hidden shadow-2xl">
                                    <img src={person.image} alt={person.name} className="w-full object-cover aspect-[3/4] hover:scale-105 transition-transform duration-700" />

                                    {/* Experience Badge */}
                                    {index === 0 && (
                                        <div className="absolute top-8 right-8 bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-lg animate-float">
                                            <p className="text-3xl font-bold text-slate-900 leading-none">30+</p>
                                            <p className="text-xs uppercase tracking-wide text-slate-500 mt-1">Years Exp.</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Content Side */}
                            <div className="w-full lg:w-7/12">
                                <h2 className="text-4xl md:text-5xl font-bold text-slate-900 font-['Playfair_Display'] mb-2">
                                    {person.name}
                                </h2>
                                <p className="text-xl text-rose-600 font-medium mb-8 font-serif italic">{person.role}</p>

                                <div className="space-y-6 text-lg text-slate-600 leading-relaxed mb-10">
                                    {person.bio.map((p, i) => <p key={i}>{p}</p>)}
                                </div>

                                <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
                                    <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                                        <BadgeCheck size={24} className="text-purple-600" />
                                        Credentials & Admissions
                                    </h3>
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        {person.credentials.map((c, i) => (
                                            <div key={i} className="flex items-center gap-3">
                                                <div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div>
                                                <span className="text-slate-700 text-sm font-medium">{c.text}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-white border-t border-slate-100">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold text-slate-900 font-['Playfair_Display'] mb-8">
                        One Conversation Can Change <span className="text-purple-600">Everything</span>
                    </h2>
                    <Link
                        to="/contact"
                        className="btn-premium px-10 py-5 bg-slate-900 text-white rounded-full font-bold text-xl shadow-2xl"
                    >
                        Speak With Our Team
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default MeetAttorneys;


