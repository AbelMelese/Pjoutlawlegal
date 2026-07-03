import { Scale, Gavel, Shield, BookOpen, Building2, PenTool, GraduationCap, Award } from 'lucide-react';
import portrait from "../assets/use this picture in PJO's resume.jpg";
import mediaLogosStrip from '../assets/media-logos-strip.png';
import aboutThePrincipalHero from '../assets/about the principal.png';

const highlights = [
  {
    icon: Scale,
    title: 'Admitted to Practice',
    items: [
      'United States Supreme Court',
      'Maryland Court of Appeals',
      'District of Columbia Court of Appeals',
      'United States Court of Appeals',
      'United States Court of Appeals for the Federal Circuit',
    ],
  },
  {
    icon: Building2,
    title: 'Bar Association Membership',
    items: [
      'Maryland Bar Association',
      'District of Columbia Bar Association',
    ],
  },
  {
    icon: Award,
    title: 'Certificates',
    items: [
      'Mediator Certificate',
      'Marital Property Mediator Certificate',
      'Child Custody and Visitation Certificate',
    ],
  },
  {
    icon: GraduationCap,
    title: 'Education',
    items: [
      'Juris. Doctorate Degree, Howard University School of Law',
      'Bachelor of Science Degree, Major Sociology, Minor Business',
    ],
  },
  {
    icon: BookOpen,
    title: 'Featured in',
    items: [
      'Ebony Magazine',
      'Jet Magazine',
    ],
  },
  {
    icon: PenTool,
    title: 'Article Writer',
    items: [
      'The National Bar Association Magazine',
      'Washington Living Magazine',
    ],
  },
];

const AboutPhyllis = () => {
  return (
    <div className="overflow-hidden bg-[#f8fafc]">
      <div className="w-full">
        <img
          src={aboutThePrincipalHero}
          alt="About the Principal"
          className="w-full h-auto block"
        />
      </div>

      {/* Portrait + Bio Section */}
      <section className="py-20 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Portrait on the left */}
            <div className="flex justify-center md:justify-start">
              <div className="relative max-w-[50%]">
                <div className="absolute -inset-4 bg-gradient-to-tr from-[#1E3A5F]/30 to-[#2A4F7A]/30 blur-xl"></div>
                <div className="framed-photo-container relative">
                  <img src={portrait} alt="Phyllis J. Outlaw portrait" />
                </div>
              </div>
            </div>

            {/* Text on the right */}
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 font-['Playfair_Display'] mb-2">
                Phyllis J. Outlaw, J.D.
              </h2>
              <p className="text-xl text-[#5B2C6F] font-medium mb-8 font-serif italic">
                Principal &amp; Founding Member
              </p>
              <p className="text-lg text-slate-600 leading-relaxed">
                Attorney Phyllis J. Outlaw has been in private practice in the State of Maryland and the District of Columbia. Attorney Outlaw is an experienced and seasoned litigator who has represented clients in highly complex civil cases. She has extensive litigation before local and federal courts as well as administrative agencies. Attorney Outlaw possesses knowledge, skills and expertise in litigation, arbitration and mediation of disputes relating to Family Law to include divorce, marital property, child custody, visitation, child support; Personal Injury; Medical Malpractice; Probate; Consumer Law; Real Estate; Labor Law; Equal Employment Opportunity Law; and Discrimination Law.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6 Highlight Cards Grid */}
      <section className="py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {highlights.map((item) => (
              <article
                key={item.title}
                className="bg-white rounded-[2rem] p-8 shadow-lg border border-slate-100"
              >
                <div className="w-14 h-14 rounded-2xl bg-slate-900 text-white flex items-center justify-center mb-6">
                  <item.icon size={26} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 font-['Playfair_Display'] mb-4">
                  {item.title}
                </h3>
                <ul className="space-y-2">
                  {item.items.map((entry, i) => (
                    <li key={i} className="flex items-start gap-2 text-slate-600 leading-relaxed">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#1E3A5F] flex-shrink-0"></span>
                      <span>{entry}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Media Appearances */}
      <section className="page-section page-section--white">
        <div className="section-shell">
          <div className="portrait-panel" style={{ gridTemplateColumns: '1fr', textAlign: 'center' }}>
            <div className="body-copy">
              <p className="section-script" style={{ textAlign: 'center', marginBottom: '0.6rem' }}>
                Media Appearances
              </p>
              <p>
                Attorney Phyllis J. Outlaw has appeared as a guest on national and local television as well as radio broadcasts
              </p>
            </div>
          </div>

          <div className="media-marquee" style={{ marginTop: '1.5rem' }}>
            <div className="media-marquee__track">
              {[0, 1].map((index) => (
                <img
                  key={index}
                  src={mediaLogosStrip}
                  alt="Media appearances including CNN, C-SPAN, FOX News, WUSA 9, WYCB Podcast, WPFW, WHUT, JET, Ebony, Essence, and Bottomline"
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPhyllis;
