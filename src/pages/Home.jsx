import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import pjoPortrait from "../assets/use this picture in PJO's resume.jpg";
import mediaLogosStrip from '../assets/media-logos-strip.png';
import goldWomanScales from '../assets/gold-woman-scales.jpg';
import officeShoot264 from '../assets/office-shoot-264.jpg';
import officeShoot044 from '../assets/office-shoot-044.jpg';
import officeShoot110 from '../assets/office-shoot-110.jpg';
import dcStreetStock from '../assets/dc-street-stock.jpg';

const heroSlides = [
  {
    title: 'Phyllis J. Outlaw & Associates',
    subtitle:
      'Maintains the highest standard of excellence on behalf of our clients.',
    image: goldWomanScales,
    fit: 'contain',
    position: '72% center',
    background: '#d6d1c6',
  },
  {
    title: 'A Court-Appointed Mediator',
    subtitle:
      'Who possesses knowledge, skills and expertise in mediation of disputes.',
    image: officeShoot264,
    position: 'center 28%',
  },
  {
    title: 'Our Legal Team Employs Innovative Methods',
    subtitle:
      'To help clients pursue a successful outcome for important legal matters.',
    image: officeShoot044,
    position: 'center 48%',
  },
  {
    title: 'Over Four Decades of Experience',
    subtitle: 'In mediation, arbitration, and civil litigation.',
    image: officeShoot110,
    position: 'center 26%',
  },
];

const previewTestimonials = [
  {
    quote:
      "I am very pleased and satisfied with the firm's work. They keep me fully informed and are competent, thorough and timely.",
    author: 'Terrance Howell',
    role: 'Prince Georges County, Maryland',
  },
  {
    quote:
      'Phyllis J. Outlaw & Associates are highly skilled in their approach to personnel matters and treat clients with respect.',
    author: 'Quinsola N. McCray',
    role: 'Washington, D.C.',
  },
];

const homeServices = [
  {
    title: 'Mediation Services',
    body:
      'Court-appointed mediation support for civil, property, family, custody, parenting, and child support matters.',
    link: '/mediation-services',
  },
  {
    title: 'Legal Services',
    body:
      'Experienced counsel for government, business, nonprofit, and individual legal matters with careful case analysis.',
    link: '/legal-services',
  },
  {
    title: 'Coaching',
    body:
      'Guidance for families, divorcing clients, business leaders, seminars, and professional development programs.',
    link: '/coaching',
  },
];

const Home = () => {
  return (
    <div>
      <PageHero
        slides={heroSlides}
        eyebrow="Washington, D.C. Legal and Mediation Practice"
        actions={[
          { label: 'Contact Us', to: '/contact' },
          { label: 'Learn About Services', to: '/mediation-services' },
        ]}
      />

      <section className="page-section page-section--white">
        <div className="section-shell">
          <p className="section-script">Welcome</p>
          <h2 className="section-title">Experienced Guidance for Individuals, Families, and Organizations</h2>
          <div className="section-divider">✦</div>
          <p className="intro-quote">
            Dedicated counsel, respected mediation experience, and a clear commitment to helping
            clients move difficult matters toward resolution.
          </p>

          <div className="two-column body-copy">
            <div>
              <p>
                Phyllis J. Outlaw &amp; Associates has provided legal services to residents and local
                businesses in Maryland and Washington, D.C. Our offices are located in the commercial
                district and remain convenient to the city&apos;s business corridor, public
                transportation, and both federal and local courts.
              </p>
              <p>
                The firm&apos;s work spans mediation, civil matters, coaching, seminars, and
                strategic legal services for clients who need experienced representation with a
                disciplined, professional approach.
              </p>
            </div>

            <div>
              <p>
                The practice emphasizes professionalism, preparation, and direct service to clients
                who need practical help navigating difficult legal and mediation matters.
              </p>
              <p>
                Whether the matter involves mediation, civil issues, coaching, or organizational
                guidance, the focus remains the same: careful attention, sound judgment, and
                respect for the client&apos;s goals.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="page-section page-section--soft">
        <div className="section-shell">
          <div className="two-column section-block">
            <div className="image-frame image-frame--tall">
              <img src={dcStreetStock} alt="Washington D.C. business district street" />
            </div>

            <div className="body-copy">
              <p className="section-script" style={{ textAlign: 'left', marginBottom: '0.6rem' }}>
                Washington, D.C. Offices
              </p>
              <p>
                Phyllis J. Outlaw &amp; Associates has provided legal services to residents and local
                businesses in Maryland and Washington, D.C. Our offices are located in the
                commercial district which is known for its resurgence and emerging small
                businesses.
              </p>
              <p>
                Our offices are convenient to the financial and business districts of the city,
                public transportation, as well as to the federal and local courts located in the
                District of Columbia and Maryland.
              </p>
            </div>
          </div>

          <div style={{ height: '2rem' }} />

          <h2 className="section-title">Core Areas of Service</h2>
          <div className="section-divider">✦</div>

          <div className="feature-grid">
            {homeServices.map((service) => (
              <article key={service.title} className="feature-card">
                <h3>{service.title}</h3>
                <p>{service.body}</p>
                <div style={{ marginTop: '1rem' }}>
                  <Link className="primary-button" to={service.link}>
                    Learn More
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section page-section--white">
        <div className="section-shell">
          <div className="portrait-panel">
            <img src={pjoPortrait} alt="Phyllis J. Outlaw portrait" />
            <div className="body-copy">
              <p className="section-script" style={{ textAlign: 'left', marginBottom: '0.6rem' }}>
                Media Appearances
              </p>
              <p>
                Phyllis J. Outlaw has appeared as a guest on radio as well as local and national
                television programs. This section highlights those appearances in a more formal
                recognition presentation.
              </p>
            </div>
          </div>

          <div className="media-marquee" style={{ marginTop: '1.5rem' }}>
            <div className="media-marquee__track">
              {[0, 1].map((index) => (
                <img
                  key={index}
                  src={mediaLogosStrip}
                  alt="Media appearances including CNN, C-SPAN, FOX News, WUSA 9, WYCB Podcast, WPFW, WHUT, JET, Ebony, Essence, and Bottomline"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="page-section page-section--soft">
        <div className="section-shell">
          <p className="section-script">Testimonials</p>
          <h2 className="section-title">What Clients Have Said</h2>
          <div className="section-divider">✦</div>

          <div className="testimonial-grid">
            {previewTestimonials.map((item) => (
              <article key={item.author} className="testimonial-card panel">
                <p className="body-copy" style={{ marginBottom: '1rem' }}>
                  &ldquo;{item.quote}&rdquo;
                </p>
                <h3 style={{ marginBottom: '0.15rem' }}>{item.author}</h3>
                <p>{item.role}</p>
              </article>
            ))}
          </div>

          <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
            <Link className="primary-button" to="/testimonials">
              View Additional Testimonials
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
