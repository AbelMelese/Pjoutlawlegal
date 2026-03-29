import { Link } from 'react-router-dom';
import { Award, Building2, Scale, Users } from 'lucide-react';
import PageHero from '../components/PageHero';
import portrait from "../assets/use this picture in PJO's resume.jpg";

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
      <PageHero
        slides={[
          {
            title: 'About Phyllis J. Outlaw',
            subtitle:
              'A long-established legal and mediation practice grounded in professionalism, preparation, and service.',
            image: portrait,
          },
        ]}
      />

      <section className="py-20 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[0.9fr,1.1fr] gap-14 items-center">
            <div className="relative">
              <div className="absolute -inset-4 bg-purple-600/10 rounded-[2rem] blur-xl"></div>
              <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border border-slate-100">
                <img
                  src={portrait}
                  alt="Phyllis J. Outlaw"
                  className="w-full h-[460px] object-cover object-top"
                />
              </div>
            </div>

            <div>
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

          <div className="text-center mt-14">
            <Link
              to="/testimonials"
              className="btn-premium inline-flex items-center justify-center px-10 py-4 bg-slate-900 text-white rounded-full font-bold text-lg shadow-xl"
            >
              Read Client Testimonials
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPhyllis;
