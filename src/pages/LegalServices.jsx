import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import booksImage from '../assets/books image.jpg';
import image1 from '../assets/image1.jpg';

const practiceAreas = [
  {
    title: 'Employment and Labor Law',
    body:
      'Representation in workplace and public-sector matters including discharge, unemployment compensation, discrimination, and retirement-related disputes.',
  },
  {
    title: 'Property Tax Liens',
    body:
      'Experienced guidance in commercial and residential tax lien matters requiring careful procedural and strategic handling.',
  },
  {
    title: 'Corporate Governance and Real Estate',
    body:
      'Counsel for business entities, nonprofit organizations, property transactions, financing, leasing, and related operational legal issues.',
  },
  {
    title: 'Construction, Administrative, and Injury Matters',
    body:
      'Support in construction disputes, administrative law proceedings, and selected personal injury matters where disciplined case analysis is essential.',
  },
];

const LegalServices = () => {
  return (
    <div>
      <PageHero
        compact
        allowImageMotion={false}
        slides={[
          {
            title: 'Legal Services',
            subtitle:
              'Experienced legal support for government, business, nonprofit, and individual client matters.',
            image: booksImage,
            fit: 'contain',
            background: '#dde3e6',
          },
        ]}
        eyebrow="Legal Services"
        actions={[
          { label: 'Schedule a Consultation', to: '/contact' },
          { label: 'View Testimonials', to: '/testimonials' },
        ]}
      />

      <section className="page-section page-section--white">
        <div className="section-shell">
          <div className="two-column">
            <div className="body-copy">
              <p className="section-script" style={{ textAlign: 'left', marginBottom: '0.6rem' }}>
                Counsel
              </p>
              <p>
                Our office provides legal services to government employees, businesses, nonprofit
                organizations, and individual clients who need experienced counsel and practical
                strategy. Matters are approached with careful preparation, direct communication, and
                a disciplined view of long-term client interests.
              </p>
              <p>
                The firm&apos;s legal services are presented with a broad view of client needs,
                recognizing that serious matters often require both technical legal analysis and
                practical judgment.
              </p>
            </div>

            <div className="image-frame">
              <img src={image1} alt="Legal consultation at the firm" />
            </div>
          </div>
        </div>
      </section>

      <section className="page-section page-section--soft">
        <div className="section-shell">
          <h2 className="section-title">Representative Practice Areas</h2>
          <div className="section-divider">✦</div>

          <div className="card-grid">
            {practiceAreas.map((area) => (
              <article key={area.title} className="info-card">
                <h3>{area.title}</h3>
                <p>{area.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section page-section--white">
        <div className="section-shell">
          <div className="quote-band">
            <p>
              Careful legal representation requires more than activity. It requires judgment,
              preparation, and a strategy suited to the matter at hand.
            </p>
          </div>

          <div style={{ marginTop: '1.75rem', textAlign: 'center' }}>
            <Link className="primary-button" to="/contact">
              Contact Our Office
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LegalServices;
