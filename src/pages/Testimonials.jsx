import PageHero from '../components/PageHero';
import officeShot110 from '../assets/office-shoot-110.jpg';

const testimonials = [
  {
    quote:
      "I am very pleased and satisfied with the firm's work. They keep me fully informed both in person and with a written copy of all details. The attorneys have been competent, thorough and timely in their legal work.",
    author: 'Terrance Howell',
    role: 'Prince Georges County, Maryland',
  },
  {
    quote:
      'Phyllis J. Outlaw & Associates are highly skilled in their approach to personnel matters. The attorneys are very professional and courteous with their clients and treat them with the utmost respect.',
    author: 'Quinsola N. McCray',
    role: 'Washington, D.C.',
  },
  {
    quote:
      'Phyllis J. Outlaw & Associates provides exceptional legal services and always represents our best interest. The attorneys are accessible and highly responsive to our requests.',
    author: 'Dr. Mary Quinn',
    role: 'Council of Women Ministers & Male Support Division, Inc.',
  },
  {
    quote:
      "Phyllis J. Outlaw and Associates' managerial-employee training programs are highly effective and would be an asset to any organization.",
    author: 'Ann Brown',
    role: 'Mary Kay Cosmetics, Charlotte, North Carolina',
  },
];

const Testimonials = () => {
  return (
    <div>
      <PageHero
        compact
        allowImageMotion={false}
        slides={[
          {
            title: 'Testimonials',
            subtitle:
              'Comments from clients and organizations served by Phyllis J. Outlaw & Associates.',
            image: officeShot110,
            fit: 'contain',
            background: '#dde3e6',
          },
        ]}
        eyebrow="Testimonials"
      />

      <section className="page-section page-section--white">
        <div className="section-shell">
          <p className="section-script">Client Comments</p>
          <h2 className="section-title">A Record of Professional Service</h2>
          <div className="section-divider">✦</div>

          <div className="testimonial-grid">
            {testimonials.map((item) => (
              <article key={item.author} className="testimonial-card panel">
                <p className="body-copy" style={{ marginBottom: '1rem' }}>
                  &ldquo;{item.quote}&rdquo;
                </p>
                <h3 style={{ marginBottom: '0.15rem' }}>{item.author}</h3>
                <p>{item.role}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Testimonials;
