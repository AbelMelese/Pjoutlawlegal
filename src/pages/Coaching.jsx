import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import coachingPhoto from '../assets/use this image in coaching page.jpg';
import trainingPhoto from '../assets/use this image in seminars and training.jpg';

const coachingAreas = [
  {
    title: 'Family Coaching',
    body:
      'Support for family communication, boundaries, transitions, and co-parenting conversations that need structure and guidance.',
  },
  {
    title: 'Divorce Coaching',
    body:
      'Practical assistance for clients preparing for mediation, managing difficult conversations, and organizing next steps with clarity.',
  },
  {
    title: 'Business Coaching',
    body:
      'Guidance for leadership, workplace communication, team alignment, and professional transitions that affect performance and decision making.',
  },
];

const trainingTopics = [
  'Diversity awareness',
  'EEO and sexual harassment',
  'Customer service training',
  'Leadership and management coaching',
  'Conflict management',
  'Effective communication',
  'Problem-solving and decision-making',
  'Senior executive development',
];

const Coaching = () => {
  return (
    <div>
      <PageHero
        compact
        slides={[
          {
            title: 'Coaching',
            subtitle:
              'Family, divorce, business, and professional development guidance grounded in real-world experience.',
            image: coachingPhoto,
          },
        ]}
        eyebrow="Coaching"
        actions={[{ label: 'Contact Our Office', to: '/contact' }]}
      />

      <section className="page-section page-section--white">
        <div className="section-shell">
          <div className="card-grid">
            {coachingAreas.map((area) => (
              <article key={area.title} className="info-card">
                <h3>{area.title}</h3>
                <p>{area.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section page-section--soft">
        <div className="section-shell">
          <div className="two-column">
            <div className="image-frame">
              <img src={trainingPhoto} alt="Seminars and training session" />
            </div>

            <div className="body-copy">
              <p className="section-script" style={{ textAlign: 'left', marginBottom: '0.6rem' }}>
                Seminars and Training
              </p>
              <p>
                The firm also provides seminars and professional development programs for
                organizations seeking practical, effective training delivered with legal and
                workplace experience in mind.
              </p>
              <ul className="list-clean">
                {trainingTopics.map((topic) => (
                  <li key={topic}>{topic}</li>
                ))}
              </ul>
            </div>
          </div>

          <div style={{ marginTop: '1.75rem', textAlign: 'center' }}>
            <Link className="primary-button" to="/contact">
              Inquire About Coaching or Training
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Coaching;
