import { useState } from 'react';
import { CheckCircle2, Mail, MapPin, PhoneCall, Send } from 'lucide-react';
import PageHero from '../components/PageHero';
import SectionHeading from '../components/SectionHeading';
import { contactDetails } from '../data/siteContent';
import booksImage from '../assets/books image.jpg';
import cityImage from '../assets/image 2.jpg';
import officeImage from '../assets/image1.jpg';

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      message: '',
    });
  };

  return (
    <div>
      <PageHero
        eyebrow="Contact"
        title="Start with a brief, direct conversation."
        description="Share the basics of the situation and the team can direct you toward the right next step."
        slides={[
          { title: 'Office', image: officeImage },
          { title: 'District', image: cityImage },
          { title: 'Books', image: booksImage },
        ]}
        actions={[
          { label: 'Call now', href: contactDetails.phoneHref, icon: 'phone' },
        ]}
      />

      <section className="page-section">
        <div className="section-shell split-layout">
          <div>
            <SectionHeading
              eyebrow="How to reach us"
              title="Phone, email, or use the form."
              description="If you already know the issue area, include that in your message so the initial response can be more focused."
            />

            <div className="grid-cards-2 mt-10">
              <article className="content-card">
                <PhoneCall size={24} />
                <h3>Phone</h3>
                <p>{contactDetails.phone}</p>
                <p>{contactDetails.officeHours}</p>
              </article>
              <article className="content-card">
                <Mail size={24} />
                <h3>Email</h3>
                <p>{contactDetails.email}</p>
                <p>Use email when you need to share background before the call.</p>
              </article>
              <article className="content-card">
                <MapPin size={24} />
                <h3>Office</h3>
                <p>{contactDetails.addressLines.join(', ')}</p>
                <p>{contactDetails.serviceArea}</p>
              </article>
            </div>
          </div>

          <div className="content-card">
            <p className="eyebrow">Consultation form</p>
            <h3>Tell us what is happening.</h3>

            {submitted ? (
              <div className="content-card">
                <CheckCircle2 size={30} />
                <h3>Message received.</h3>
                <p>
                  This demo form records the interaction locally for now. The UI
                  behavior is fixed; if you want a real backend handler next, that
                  would be a separate integration task.
                </p>
                <button
                  type="button"
                  className="primary-button"
                  onClick={() => setSubmitted(false)}
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="form-shell">
                <div className="field-grid">
                  <div className="field-group">
                    <label htmlFor="firstName">First name</label>
                    <input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="field-group">
                    <label htmlFor="lastName">Last name</label>
                    <input
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="field-grid">
                  <div className="field-group">
                    <label htmlFor="email">Email</label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="field-group">
                    <label htmlFor="phone">Phone</label>
                    <input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="field-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="6"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>

                <button type="submit" className="primary-button">
                  <Send size={18} />
                  <span>Submit request</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
