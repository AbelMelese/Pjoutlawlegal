import { Link } from 'react-router-dom';
import {
  ArrowRight,
  CalendarClock,
  FileCheck2,
  Gavel,
  MessagesSquare,
  Scale,
  ShieldCheck,
  Users,
} from 'lucide-react';
import PageHero from '../components/PageHero';
import SectionHeading from '../components/SectionHeading';
import booksImage from '../assets/books image.jpg';
import cityImage from '../assets/image 2.jpg';
import officeImage from '../assets/image1.jpg';

const services = [
  {
    icon: Users,
    title: 'Family and divorce mediation',
    description:
      'Support for separation, co-parenting, settlement terms, support questions, and post-divorce issues.',
    points: ['Custody and parenting plans', 'Support discussions', 'Property and agreement terms'],
  },
  {
    icon: Scale,
    title: 'Court-referred matters',
    description:
      'A structured process aligned with legal standards and practical documentation needs.',
    points: ['Court-aware process', 'Clear issue framing', 'Document-ready outcomes'],
  },
  {
    icon: Gavel,
    title: 'Business and workplace conflicts',
    description:
      'Neutral facilitation for disputes involving employers, partners, teams, and contracts.',
    points: ['Relationship preservation', 'Faster resolution', 'Lower litigation pressure'],
  },
  {
    icon: ShieldCheck,
    title: 'Child-focused mediation',
    description:
      'Decision-making centered on workable routines and the best interests of the child.',
    points: ['Balanced schedules', 'Communication protocols', 'Reduced parenting friction'],
  },
];

const steps = [
  {
    icon: MessagesSquare,
    title: 'Initial consultation',
    description:
      'We identify the dispute, the people involved, and whether mediation is the right process.',
  },
  {
    icon: FileCheck2,
    title: 'Document review',
    description:
      'Relevant records and issue summaries are gathered before productive work begins.',
  },
  {
    icon: CalendarClock,
    title: 'Guided sessions',
    description:
      'Sessions are scheduled around real availability and focused on the decisions that matter.',
  },
  {
    icon: Scale,
    title: 'Drafted outcomes',
    description:
      'Agreements or summaries are documented clearly so the next step is usable, not vague.',
  },
];

const benefits = [
  'Confidential conversation instead of courtroom escalation',
  'Lower cost than fully litigated disputes',
  'More control over the outcome',
  'A process designed to preserve relationships where possible',
];

const MediationServices = () => {
  return (
    <div>
      <PageHero
        eyebrow="Mediation services"
        title="A process built to lower friction and increase clarity."
        description="Mediation works best when the structure is calm, direct, and responsive. The process is designed to help people move from conflict toward workable decisions."
        slides={[
          { title: 'Mediation table', image: officeImage },
          { title: 'Planning materials', image: booksImage },
          { title: 'Professional district', image: cityImage },
        ]}
        rotatingPrefix="Designed for"
        rotatingWords={['clarity', 'momentum', 'privacy', 'resolution']}
        actions={[
          { label: 'Schedule intake', to: '/contact' },
          { label: 'Call now', href: 'tel:+12025482999', icon: 'phone' },
        ]}
      />

      <section className="page-section">
        <div className="section-shell">
          <SectionHeading
            eyebrow="Service lanes"
            title="Different disputes, one disciplined process."
            align="center"
          />

          <div className="grid-cards-2 mt-10">
            {services.map((service) => (
              <article key={service.title} className="content-card">
                <service.icon size={28} />
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <ul>
                  {service.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section soft-band">
        <div className="section-shell split-layout">
          <div>
            <SectionHeading
              eyebrow="How mediation unfolds"
              title="Clear sequence, fewer surprises."
              description="Clients should know what happens next. The process is structured to stay understandable from intake through agreement."
            />

            <div className="timeline-grid mt-10">
              {steps.map((step, index) => (
                <article key={step.title} className="timeline-item">
                  <strong>{String(index + 1).padStart(2, '0')}</strong>
                  <step.icon size={22} />
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="content-card">
            <p className="eyebrow">Why clients choose mediation</p>
            <h3>Private, efficient, and more workable than a prolonged fight.</h3>
            <ul>
              {benefits.map((benefit) => (
                <li key={benefit}>{benefit}</li>
              ))}
            </ul>
            <Link to="/contact" className="primary-button">
              <span>Start the conversation</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MediationServices;
