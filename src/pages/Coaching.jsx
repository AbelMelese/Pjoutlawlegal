import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Briefcase,
  Compass,
  Heart,
  Lightbulb,
  Presentation,
  Users,
} from 'lucide-react';
import PageHero from '../components/PageHero';
import SectionHeading from '../components/SectionHeading';
import { heroMediaCards } from '../data/siteContent';
import booksImage from '../assets/books image.jpg';
import coachingImage from '../assets/use this image in coaching page.jpg';
import seminarImage from '../assets/use this image in seminars and training.jpg';

const coachingTracks = [
  {
    icon: Users,
    title: 'Family coaching',
    description:
      'Help with boundaries, communication patterns, co-parenting pressure, and reconnecting through structure.',
  },
  {
    icon: Heart,
    title: 'Divorce coaching',
    description:
      'A strategic thinking partner for preparation, decision-making, emotional steadiness, and next-step planning.',
  },
  {
    icon: Briefcase,
    title: 'Business coaching',
    description:
      'Support for leaders navigating growth, team friction, role ambiguity, and difficult conversations.',
  },
];

const differentiators = [
  { icon: Compass, title: 'Forward-focused', description: 'Built around decisions, not drift.' },
  { icon: Lightbulb, title: 'Practical', description: 'Useful guidance instead of vague motivation.' },
  { icon: Heart, title: 'Human', description: 'Supportive without becoming soft or unclear.' },
];

const trainingTopics = [
  'Diversity and inclusion awareness',
  'EEO and harassment prevention',
  'Leadership and coaching skills',
  'Conflict management',
  'Communication and customer service',
  'Executive development sessions',
];

const Coaching = () => {
  return (
    <div>
      <PageHero
        eyebrow="Coaching and training"
        title="Coaching that turns overwhelm into usable next steps."
        description="Coaching provides structured support for people and teams who need clearer thinking, steadier communication, and better next steps."
        slides={[
          { title: 'Coaching session', image: coachingImage },
          { title: 'Training seminar', image: seminarImage },
          { title: 'Planning materials', image: booksImage },
        ]}
        rotatingPrefix="Built for"
        rotatingWords={['clarity', 'confidence', 'calm', 'direction']}
        actions={[
          { label: 'Book a session', to: '/contact' },
          { label: 'Call now', href: 'tel:+12025482999', icon: 'phone' },
        ]}
        mediaCard={heroMediaCards.coaching}
      />

      <section className="page-section">
        <div className="section-shell">
          <SectionHeading
            eyebrow="Coaching tracks"
            title="Different pressure points, the same disciplined support."
            align="center"
          />

          <div className="grid-cards-3 mt-10">
            {coachingTracks.map((track) => (
              <article key={track.title} className="content-card">
                <track.icon size={28} />
                <h3>{track.title}</h3>
                <p>{track.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section soft-band">
        <div className="section-shell split-layout">
          <div>
            <SectionHeading
              eyebrow="Why this works"
              title="Structured support without visual clutter."
              description="The coaching process is practical, human, and focused on decisions you can act on."
            />

            <div className="grid-cards-3 mt-10">
              {differentiators.map((item) => (
                <article key={item.title} className="content-card">
                  <item.icon size={26} />
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="media-frame">
            <img src={coachingImage} alt="Professional coaching" />
            <div className="media-overlay">
              <p className="eyebrow">Delivery model</p>
              <h3 className="text-3xl">Private sessions that can flex around real schedules.</h3>
            </div>
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="section-shell split-layout">
          <div className="media-frame">
            <img src={seminarImage} alt="Seminar and training session" />
            <div className="media-overlay">
              <p className="eyebrow">Seminars and training</p>
              <h3 className="text-3xl">A stronger media-style section replaces the old static block.</h3>
            </div>
          </div>

          <div className="content-card">
            <p className="eyebrow">Workshops</p>
            <h3>Training for agencies, teams, and mission-driven organizations.</h3>
            <p>
              The new layout treats training as a real offering, not a buried
              add-on. It uses a stronger media presentation and cleaner topic list.
            </p>
            <ul>
              {trainingTopics.map((topic) => (
                <li key={topic}>{topic}</li>
              ))}
            </ul>
            <Link to="/contact" className="primary-button">
              <Presentation size={18} />
              <span>Ask about training</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Coaching;
