import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import portrait from "../assets/use this picture in PJO's resume.jpg";

const credentials = [
  'Principal and founding member of Phyllis J. Outlaw & Associates.',
  'Extensive legal, mediation, judicial, and administrative experience.',
  'Court-appointed mediation background across civil and family-related matters.',
  'Experience serving individuals, businesses, and nonprofit organizations.',
];

const AboutPhyllis = () => {
  return (
    <div>
      <PageHero
        compact
        slides={[
          {
            title: 'About Phyllis J. Outlaw',
            subtitle:
              'A long-established legal and mediation practice grounded in professionalism, preparation, and service.',
            image: portrait,
          },
        ]}
        eyebrow="About Phyllis J. Outlaw"
        actions={[{ label: 'Contact Our Office', to: '/contact' }]}
      />

      <section className="page-section page-section--white">
        <div className="section-shell">
          <div className="portrait-panel">
            <img src={portrait} alt="Phyllis J. Outlaw" />
            <div className="body-copy">
              <p>
                Phyllis J. Outlaw leads a practice focused on legal services, mediation, coaching,
                and professional development. Her work reflects decades of experience handling
                matters that call for both strong judgment and careful communication.
              </p>
              <p>
                Clients come to the firm for reliable counsel, respect for the seriousness of their
                legal matters, and a professional process that stays focused on results rather than
                unnecessary complication.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="page-section page-section--soft">
        <div className="section-shell">
          <h2 className="section-title">Professional Overview</h2>
          <div className="section-divider">✦</div>

          <div className="panel">
            <ul className="list-clean">
              {credentials.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="page-section page-section--white">
        <div className="section-shell" style={{ textAlign: 'center' }}>
          <Link className="primary-button" to="/testimonials">
            Read Client Testimonials
          </Link>
        </div>
      </section>
    </div>
  );
};

export default AboutPhyllis;
