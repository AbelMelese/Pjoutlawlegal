import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Briefcase,
  Building2,
  Compass,
  Landmark,
  Scale,
  Stethoscope,
  Users,
} from 'lucide-react';
import PageHero from '../components/PageHero';
import SectionHeading from '../components/SectionHeading';
import booksImage from '../assets/books image.jpg';
import cityImage from '../assets/image 2.jpg';
import officeImage from '../assets/image1.jpg';

const strategyAreas = [
  {
    icon: Briefcase,
    title: 'Strategic business advising',
    description:
      'Support for leadership alignment, communication breakdowns, growth planning, and internal decision-making.',
  },
  {
    icon: Building2,
    title: 'Nonprofit and governance support',
    description:
      'Guidance on formation, tax-exempt positioning, bylaws, governance, and organizational stability.',
  },
  {
    icon: Users,
    title: 'Workplace conflict prevention',
    description:
      'Early intervention for disputes involving roles, authority, communication, and performance friction.',
  },
];

const practiceAreas = [
  {
    icon: Scale,
    title: 'Employment and labor matters',
    description:
      'Experience with employee discipline, compensation, discrimination, retirement benefits, and agency-facing issues.',
  },
  {
    icon: Landmark,
    title: 'Property tax and administrative issues',
    description:
      'Representation involving tax lien pressure, agency process, and adjudicatory hearings.',
  },
  {
    icon: Stethoscope,
    title: 'Personal injury and related litigation',
    description:
      'Representation in injury matters requiring strong documentation, negotiation, and case management.',
  },
];

const process = [
  'Discovery around goals, risk, and communication gaps',
  'Strategy design for decisions, governance, or conflict handling',
  'Support during rollout so the changes actually stick',
];

const BusinessServices = () => {
  return (
    <div>
      <PageHero
        eyebrow="Business services"
        title="Advising for organizations that need stability and direction."
        description="From leadership alignment to nonprofit governance, the work is designed to reduce confusion and strengthen decision-making."
        slides={[
          { title: 'Business district', image: cityImage },
          { title: 'Conference setting', image: officeImage },
          { title: 'Books and materials', image: booksImage },
        ]}
        rotatingPrefix="Support for"
        rotatingWords={['leaders', 'nonprofits', 'teams', 'organizations']}
        actions={[
          { label: 'Start a conversation', to: '/contact' },
          { label: 'Call now', href: 'tel:+12025482999', icon: 'phone' },
        ]}
      />

      <section className="page-section">
        <div className="section-shell">
          <SectionHeading
            eyebrow="Core offers"
            title="Advising that helps organizations operate with less confusion."
            align="center"
          />

          <div className="grid-cards-3 mt-10">
            {strategyAreas.map((area) => (
              <article key={area.title} className="content-card">
                <area.icon size={28} />
                <h3>{area.title}</h3>
                <p>{area.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section soft-band">
        <div className="section-shell split-layout">
          <div className="content-card">
            <p className="eyebrow">Advisory process</p>
            <h3>Designed to move from diagnosis to operational change.</h3>
            <ul>
              {process.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <Link to="/contact" className="primary-button">
              <Compass size={18} />
              <span>Discuss your situation</span>
            </Link>
          </div>

          <div className="media-frame">
            <img src={cityImage} alt="Business services" />
            <div className="media-overlay">
              <p className="eyebrow">Operational clarity</p>
              <h3 className="text-3xl">When roles, systems, and communication sharpen, conflict drops.</h3>
            </div>
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="section-shell">
          <SectionHeading
            eyebrow="Practice depth"
            title="Additional experience across legal and organizational issues."
            align="center"
          />

          <div className="grid-cards-3 mt-10">
            {practiceAreas.map((area) => (
              <article key={area.title} className="content-card">
                <area.icon size={28} />
                <h3>{area.title}</h3>
                <p>{area.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default BusinessServices;
