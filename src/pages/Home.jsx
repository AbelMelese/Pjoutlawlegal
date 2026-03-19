import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Briefcase,
  CalendarDays,
  HeartHandshake,
  MessageSquareQuote,
  Scale,
  ShieldCheck,
} from 'lucide-react';
import PageHero from '../components/PageHero';
import SectionHeading from '../components/SectionHeading';
import {
  blogPosts,
  heroMediaCards,
  mediaAppearances,
  testimonials,
} from '../data/siteContent';
import booksImage from '../assets/books image.jpg';
import cityImage from '../assets/image 2.jpg';
import officeImage from '../assets/image1.jpg';

const homeServices = [
  {
    icon: Scale,
    title: 'Mediation services',
    description:
      'Structured conflict resolution for divorce, family, workplace, and court-referred matters.',
  },
  {
    icon: HeartHandshake,
    title: 'Coaching support',
    description:
      'Decision support and communication coaching for difficult transitions and high-pressure conversations.',
  },
  {
    icon: Briefcase,
    title: 'Business advising',
    description:
      'Leadership guidance, nonprofit advisory, and early intervention before conflict becomes litigation.',
  },
  {
    icon: ShieldCheck,
    title: 'Family law counsel',
    description:
      'Clear strategy around custody, support, agreements, modifications, and separation planning.',
  },
];

const process = [
  {
    step: '01',
    title: 'Start with a consultation',
    description:
      'We get clear on the situation, the pressure points, and the outcome you actually need.',
  },
  {
    step: '02',
    title: 'Build the right path',
    description:
      'Not every matter needs the same structure. We tailor the process to the legal and human realities.',
  },
  {
    step: '03',
    title: 'Work the issues directly',
    description:
      'Sessions stay focused on decisions, not drift. Communication is guided and documented clearly.',
  },
  {
    step: '04',
    title: 'Leave with momentum',
    description:
      'You move forward with an agreement, an action plan, or a sharper legal strategy.',
  },
];

const metrics = [
  { value: '30+', label: 'years of legal and mediation experience' },
  { value: 'DC + MD', label: 'primary service footprint' },
  { value: 'Private', label: 'confidential and structured sessions' },
  { value: 'Virtual', label: 'remote-friendly delivery for busy clients' },
];

const Home = () => {
  const featuredArticles = blogPosts.slice(0, 3);

  return (
    <div>
      <PageHero
        eyebrow="Practical conflict resolution"
        title="Move hard conversations toward real decisions."
        description="Phyllis J. Outlaw & Associates helps clients resolve disputes, navigate transitions, and make progress with more clarity and less friction."
        slides={[
          { title: 'Office exterior', image: officeImage },
          { title: 'Team at work', image: cityImage },
          { title: 'Conference table', image: booksImage },
        ]}
        rotatingPrefix="Resolution for"
        rotatingWords={['families', 'leaders', 'partners', 'workplaces']}
        actions={[
          { label: 'Book a consultation', to: '/contact' },
          { label: 'Call now', href: 'tel:+12025482999', icon: 'phone' },
        ]}
        stats={[
          { value: 'Court-approved', label: 'mediation experience' },
          { value: 'Family to business', label: 'cross-sector support' },
        ]}
        mediaCard={heroMediaCards.home}
      />

      <section className="page-section page-section--compact">
        <div className="section-shell metrics-grid">
          {metrics.map((metric) => (
            <div key={metric.label} className="metric-card">
              <strong>{metric.value}</strong>
              <span>{metric.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="page-section">
        <div className="section-shell">
          <SectionHeading
            eyebrow="What we do"
            title="One firm, several ways to create movement."
            description="Whether the pressure is personal, legal, or organizational, the goal is the same: make the next decision clearer and more workable."
            align="center"
          />

          <div className="grid-cards-4 mt-10">
            {homeServices.map((service) => (
              <article key={service.title} className="content-card">
                <service.icon size={28} />
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section soft-band">
        <div className="section-shell split-layout">
          <div>
            <SectionHeading
              eyebrow="How the work moves"
              title="A calmer process with sharper structure."
              description="The site now mirrors the service itself: fewer distractions, clearer hierarchy, and a direct path from issue to action."
            />
            <div className="timeline-grid mt-10">
              {process.map((item) => (
                <article key={item.step} className="timeline-item">
                  <strong>{item.step}</strong>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="media-frame">
            <img src={cityImage} alt="Consultation setting" />
            <div className="media-overlay">
              <p className="eyebrow">Responsive by design</p>
              <h3 className="text-3xl">Built to read clearly on phones, tablets, and desktop screens.</h3>
            </div>
          </div>
        </div>
      </section>

      <section className="page-section dark-band">
        <div className="section-shell">
          <SectionHeading
            eyebrow="Media appearances"
            title="Public appearances and interviews."
            description="Phyllis J. Outlaw has contributed to television, radio, and public affairs conversations on conflict, leadership, and legal strategy."
          />

          <div className="media-reel mt-10">
            {mediaAppearances.map((appearance) => (
              <article key={appearance.title} className="media-reel-card">
                <span>{appearance.type}</span>
                <h3>{appearance.title}</h3>
                <p>{appearance.summary}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="section-shell">
          <SectionHeading
            eyebrow="Client perspective"
            title="What people value when the process is handled well."
            align="center"
          />

          <div className="grid-cards-3 mt-10">
            {testimonials.map((testimonial) => (
              <article key={testimonial.author} className="content-card">
                <MessageSquareQuote size={28} />
                <p>{testimonial.quote}</p>
                <strong>{testimonial.author}</strong>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section soft-band">
        <div className="section-shell">
          <SectionHeading
            eyebrow="Insights"
            title="Useful reading before your next conversation."
            align="center"
          />

          <div className="article-grid mt-10">
            {featuredArticles.map((post) => (
              <article key={post.id} className="article-card">
                <div className="article-card-image">
                  <img src={post.image} alt={post.title} />
                </div>
                <div className="article-card-body">
                  <div className="article-meta">
                    <span>{post.category}</span>
                    <span>{post.readTime}</span>
                    <span>{post.date}</span>
                  </div>
                  <h3>{post.title}</h3>
                  <p>{post.excerpt}</p>
                  <Link to={`/blog/${post.id}`} className="primary-button">
                    <span>Read article</span>
                    <ArrowRight size={18} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="section-shell">
          <div className="cta-panel">
            <p className="eyebrow">Next step</p>
            <h2>Start with one clear conversation.</h2>
            <p>
              If the current situation is draining time, energy, or trust, the
              first useful move is to get structured guidance.
            </p>
            <div className="hero-actions">
              <Link to="/contact" className="primary-button">
                <span>Request consultation</span>
                <ArrowRight size={18} />
              </Link>
              <Link to="/mediation-services" className="secondary-button">
                <CalendarDays size={18} />
                <span>Explore services</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
