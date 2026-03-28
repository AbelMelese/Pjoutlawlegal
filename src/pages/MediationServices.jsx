import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import image2 from '../assets/image 2.jpg';
import image1 from '../assets/image1.jpg';

const mediationAreas = [
  {
    title: 'Family and Divorce Matters',
    body:
      'Support for custody, parenting plans, child support arrangements, and separation-related discussions that benefit from a structured neutral process.',
  },
  {
    title: 'Civil and Property Disputes',
    body:
      'Court-referred and private mediation for property and civil issues where informed facilitation can help parties reach a practical agreement.',
  },
  {
    title: 'Agreement Preparation',
    body:
      'Preparation of legal separation, property, custody, parenting plan, and child support agreements when parties are ready to define clear terms.',
  },
];

const processSteps = [
  'Initial consultation to determine whether mediation is appropriate for the matter.',
  'Collection and review of the documents and background information needed for the mediation.',
  'Contact with all affected parties to confirm interest and readiness to participate.',
  'Scheduling of the mediation session at a mutually workable time.',
  'Neutral facilitation of the conversation with attention to confidentiality and problem solving.',
  'Preparation of a written summary or draft agreement reflecting any terms reached.',
];

const MediationServices = () => {
  return (
    <div>
      <PageHero
        compact
        slides={[
          {
            title: 'The Path From Conflict to Resolution',
            subtitle:
              'Court-appointed mediation services for clients who need an experienced, knowledgeable, and balanced process.',
            image: image2,
          },
        ]}
        eyebrow="Mediation Services"
        actions={[
          { label: 'Contact Our Office', to: '/contact' },
          { label: 'Call (202) 548-2999', href: 'tel:+12025482999' },
        ]}
      />

      <section className="page-section page-section--white">
        <div className="section-shell">
          <div className="two-column">
            <div className="image-frame">
              <img src={image1} alt="Mediation consultation" />
            </div>

            <div className="body-copy">
              <p className="section-script" style={{ textAlign: 'left', marginBottom: '0.6rem' }}>
                Mediation Overview
              </p>
              <p>
                As a court-appointed mediator, Phyllis J. Outlaw has conducted mediation for civil
                cases to include property issues and family law matters involving marital property,
                business assets, custody, parenting plans, and child support issues.
              </p>
              <p>
                Our office also prepares legal separation, property, custody, parenting plan, and
                child support agreements for clients who need carefully drafted terms and a clear
                path forward.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="page-section page-section--soft">
        <div className="section-shell">
          <h2 className="section-title">Mediation Areas</h2>
          <div className="section-divider">✦</div>

          <div className="card-grid">
            {mediationAreas.map((area) => (
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
          <p className="section-script">The Process</p>
          <h2 className="section-title">A Clear and Structured Mediation Process</h2>
          <div className="section-divider">✦</div>

          <div className="service-list">
            {processSteps.map((step, index) => (
              <div key={step} className="service-row">
                <div className="service-row__title">{String(index + 1).padStart(2, '0')}</div>
                <div className="body-copy">
                  <p>{step}</p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '1.75rem', textAlign: 'center' }}>
            <Link className="primary-button" to="/contact">
              Request Mediation Information
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MediationServices;
