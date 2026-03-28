import { useState } from 'react';
import PageHero from '../components/PageHero';
import booksImage from '../assets/books image.jpg';

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const subject = encodeURIComponent('Consultation Request');
    const body = encodeURIComponent(
      `First Name: ${formData.firstName}\nLast Name: ${formData.lastName}\nEmail: ${formData.email}\nPhone: ${formData.phone}\n\nMessage:\n${formData.message}`,
    );

    window.location.href = `mailto:lawfirm@pjoutlawlegal.com?subject=${subject}&body=${body}`;
  };

  return (
    <div>
      <PageHero
        compact
        allowImageMotion={false}
        slides={[
          {
            title: 'Contact Us',
            subtitle:
              'Call or email our office to discuss mediation, legal services, coaching, or training.',
            image: booksImage,
            fit: 'contain',
            background: '#dde3e6',
          },
        ]}
        eyebrow="Contact Us"
      />

      <section className="page-section page-section--white">
        <div className="section-shell two-column">
          <div className="panel">
            <h3>Office Information</h3>
            <div className="contact-list">
              <p>412 H Street, NE</p>
              <p>Washington, DC 20002</p>
              <a href="tel:+12025482999">(202) 548-2999</a>
              <a href="tel:+12025488114">(202) 548-8114</a>
              <a href="mailto:lawfirm@pjoutlawlegal.com">lawfirm@pjoutlawlegal.com</a>
            </div>
            <p className="fine-print">
              The consultation request form below opens your email client so the request can be
              sent directly to the office without implying a backend submission system that is not
              yet configured.
            </p>
          </div>

          <div className="form-card panel">
            <h3>Consultation Request</h3>
            <form className="simple-form" onSubmit={handleSubmit}>
              <div className="simple-form__row">
                <label>
                  First Name
                  <input name="firstName" value={formData.firstName} onChange={handleChange} required />
                </label>
                <label>
                  Last Name
                  <input name="lastName" value={formData.lastName} onChange={handleChange} required />
                </label>
              </div>

              <div className="simple-form__row">
                <label>
                  Email
                  <input name="email" type="email" value={formData.email} onChange={handleChange} required />
                </label>
                <label>
                  Phone
                  <input name="phone" value={formData.phone} onChange={handleChange} />
                </label>
              </div>

              <label>
                Message
                <textarea name="message" value={formData.message} onChange={handleChange} required />
              </label>

              <button type="submit" className="primary-button">
                Send Consultation Request
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
