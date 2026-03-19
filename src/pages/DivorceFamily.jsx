import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Baby,
  FileText,
  Heart,
  Home,
  MapPin,
  Scale,
} from 'lucide-react';
import PageHero from '../components/PageHero';
import SectionHeading from '../components/SectionHeading';
import booksImage from '../assets/books image.jpg';
import cityImage from '../assets/image 2.jpg';
import officeImage from '../assets/image1.jpg';

const practiceAreas = [
  {
    icon: Scale,
    title: 'Divorce and legal separation',
    description:
      'Support for contested and uncontested divorce matters with a focus on practical strategy and stable outcomes.',
  },
  {
    icon: Baby,
    title: 'Custody and parenting time',
    description:
      'Workable parenting structures, parenting-time plans, and custody advocacy grounded in the child’s needs.',
  },
  {
    icon: Heart,
    title: 'Support issues',
    description:
      'Guidance around child support, spousal support, and the financial realities that shape post-separation life.',
  },
  {
    icon: Home,
    title: 'Post-judgment modifications',
    description:
      'When life changes, orders often need to change with it. Modifications need structure and evidence, not guesswork.',
  },
  {
    icon: MapPin,
    title: 'Relocation and domicile changes',
    description:
      'Strategic handling of moves that affect custody, parenting schedules, and parental rights.',
  },
  {
    icon: FileText,
    title: 'Prenuptial and postnuptial agreements',
    description:
      'Clear agreements that protect assets, clarify expectations, and reduce future conflict.',
  },
];

const principles = [
  'Compassion without loss of rigor',
  'Clear communication around next steps',
  'Planning that accounts for both legal and family realities',
  'A presentation that now reads cleanly on every screen size',
];

const DivorceFamily = () => {
  return (
    <div>
      <PageHero
        eyebrow="Divorce and family law"
        title="Careful strategy for high-stakes family decisions."
        description="The UI now supports the tone the service needs: readable, calm, and direct, without the visual noise that previously undercut trust."
        slides={[
          { title: 'Office interior', image: booksImage },
          { title: 'District view', image: cityImage },
          { title: 'Consultation setup', image: officeImage },
        ]}
        rotatingPrefix="Support for"
        rotatingWords={['custody', 'support', 'agreements', 'transitions']}
        actions={[
          { label: 'Request consultation', to: '/contact' },
          { label: 'Call now', href: 'tel:+12025482999', icon: 'phone' },
        ]}
      />

      <section className="page-section">
        <div className="section-shell">
          <SectionHeading
            eyebrow="Practice areas"
            title="Representation across the family law issues that change daily life."
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

      <section className="page-section soft-band">
        <div className="section-shell split-layout">
          <div className="media-frame">
            <img src={officeImage} alt="Family law consultation" />
            <div className="media-overlay">
              <p className="eyebrow">Approach</p>
              <h3 className="text-3xl">Support the person. Clarify the case. Keep decisions usable.</h3>
            </div>
          </div>

          <div className="content-card">
            <p className="eyebrow">Approach</p>
            <h3>Steady representation for decisions that shape daily life.</h3>
            <ul>
              {principles.map((principle) => (
                <li key={principle}>{principle}</li>
              ))}
            </ul>
            <Link to="/contact" className="primary-button">
              <span>Talk to our team</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DivorceFamily;
