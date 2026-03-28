import PageHero from '../components/PageHero';
import booksImage from '../assets/books image.jpg';

const OnlinePayment = () => {
  return (
    <div>
      <PageHero
        compact
        allowImageMotion={false}
        slides={[
          {
            title: 'Online Payment',
            subtitle:
              'For payment arrangements, please contact our office directly so we can provide the current instructions for your matter.',
            image: booksImage,
            fit: 'contain',
            background: '#dde3e6',
          },
        ]}
        eyebrow="Online Payment"
      />

      <section className="page-section page-section--white">
        <div className="section-shell two-column">
          <div className="panel">
            <h3>Payment Assistance</h3>
            <p className="body-copy">
              To make a payment on an existing matter, please contact our office for the current
              payment instructions associated with your file.
            </p>
          </div>

          <div className="panel">
            <h3>Office Contact</h3>
            <div className="contact-list">
              <a href="tel:+12025482999">(202) 548-2999</a>
              <a href="tel:+12025488114">(202) 548-8114</a>
              <a href="mailto:lawfirm@pjoutlawlegal.com">lawfirm@pjoutlawlegal.com</a>
              <p>412 H Street, NE, Washington, DC 20002</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OnlinePayment;
