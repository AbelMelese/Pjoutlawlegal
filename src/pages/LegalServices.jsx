import { Link } from 'react-router-dom';
import { Building2, Landmark, Scale, Stethoscope } from 'lucide-react';
import PageHero from '../components/PageHero';
import booksImage from '../assets/books image.jpg';
import officeImage from '../assets/image1.jpg';

const practiceAreas = [
  {
    icon: Scale,
    title: 'Employment and Labor Law',
    description:
      'Representation in workplace and public-sector matters including discharge, unemployment compensation, discrimination, and retirement-related disputes.',
  },
  {
    icon: Landmark,
    title: 'Property Tax Liens',
    description:
      'Experienced guidance in commercial and residential tax lien matters requiring careful procedural and strategic handling.',
  },
  {
    icon: Building2,
    title: 'Corporate Governance and Real Estate',
    description:
      'Counsel for business entities, nonprofit organizations, property transactions, financing, leasing, and related operational legal issues.',
  },
  {
    icon: Stethoscope,
    title: 'Construction, Administrative, and Injury Matters',
    description:
      'Support in construction disputes, administrative law proceedings, and selected personal injury matters where disciplined case analysis is essential.',
  },
];

const LegalServices = () => {
  return (
    <div className="overflow-hidden bg-[#f8fafc]">
      <PageHero
        slides={[
          {
            title: 'Legal Services',
            subtitle:
              'Experienced legal support for government, business, nonprofit, and individual client matters.',
            image: booksImage,
          },
        ]}
      />

      <section className="py-20 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 font-['Playfair_Display'] mb-6">
                Practical Legal Counsel
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed mb-6">
                Our office provides legal services to government employees, businesses, nonprofit
                organizations, and individual clients who need experienced counsel and practical
                strategy. Matters are approached with careful preparation, direct communication, and
                a disciplined view of long-term client interests.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed">
                Serious legal matters require more than activity. They require judgment, planning,
                and an approach suited to the issue in front of you.
              </p>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 bg-slate-900/10 rounded-[2rem] rotate-2 blur-xl"></div>
              <div className="relative rounded-[2rem] overflow-hidden border border-slate-200 shadow-2xl">
                <img
                  src={officeImage}
                  alt="Legal consultation at the firm"
                  className="w-full h-[420px] object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 font-['Playfair_Display'] mb-4">
              Representative Practice Areas
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {practiceAreas.map((area) => (
              <article
                key={area.title}
                className="bg-white rounded-[2rem] p-8 shadow-lg border border-slate-100"
              >
                <div className="w-14 h-14 rounded-2xl bg-slate-900 text-white flex items-center justify-center mb-6">
                  <area.icon size={26} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 font-['Playfair_Display'] mb-4">
                  {area.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">{area.description}</p>
              </article>
            ))}
          </div>

          <div className="text-center mt-14">
            <Link
              to="/contact"
              className="btn-premium inline-flex items-center justify-center px-10 py-4 bg-slate-900 text-white rounded-full font-bold text-lg shadow-xl"
            >
              Contact Our Office
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LegalServices;
