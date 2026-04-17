import { Link } from 'react-router-dom';
import { Award, Building2, Scale, Users } from 'lucide-react';
import PageHero from '../components/PageHero';
import portrait from "../assets/use this picture in PJO's resume.jpg";
import mediaLogosStrip from '../assets/media-logos-strip.png';
import aboutThePrincipalImg from '../assets/about the principal.jpg';

const highlights = [
  {
    icon: Scale,
    title: 'Legal and Mediation Practice',
    description:
      'A long-established practice serving legal, mediation, coaching, and professional development needs.',
  },
  {
    icon: Award,
    title: 'Judicial and Administrative Experience',
    description:
      'Experience handling matters that call for both strong legal judgment and practical decision-making.',
  },
  {
    icon: Users,
    title: 'Service to Individuals and Organizations',
    description:
      'Work with individuals, businesses, and nonprofit organizations requiring serious and professional representation.',
  },
  {
    icon: Building2,
    title: 'Results Grounded in Preparation',
    description:
      'A professional process built around preparation, clarity, and respect for the seriousness of each matter.',
  },
];

const AboutPhyllis = () => {
  return (
    <div className="overflow-hidden bg-[#f8fafc]">
      <div className="hero-shell w-full relative">
        <img
          src={aboutThePrincipalImg}
          alt="About the Principal"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
      </div>

      <section className="py-20 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 font-['Playfair_Display'] mb-6">
              Professional Leadership
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed mb-6">
              Phyllis J. Outlaw leads a practice focused on legal services, mediation, coaching,
              and professional development. Her work reflects decades of experience handling
              matters that call for both strong judgment and careful communication.
            </p>
            <p className="text-lg text-slate-600 leading-relaxed">
              Clients come to the firm for reliable counsel, respect for the seriousness of their
              legal matters, and a professional process that stays focused on results rather than
              unnecessary complication.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
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
                <p className="text-slate-600 leading-relaxed">{item.description}</p>
              </article>
            ))}
          </div>

        </div>
      </section>

      {/* Media Appearances */}
      <section className="page-section page-section--white">
        <div className="section-shell">
          <div className="portrait-panel">
            <img src={portrait} alt="Phyllis J. Outlaw portrait" />
            <div className="body-copy">
              <p className="section-script" style={{ textAlign: 'left', marginBottom: '0.6rem' }}>
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
