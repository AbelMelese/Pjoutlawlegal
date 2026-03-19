import { Link } from 'react-router-dom';
import { ArrowRight, BadgeCheck } from 'lucide-react';
import PageHero from '../components/PageHero';
import SectionHeading from '../components/SectionHeading';
import { teamMembers } from '../data/siteContent';
import booksImage from '../assets/books image.jpg';
import cityImage from '../assets/image 2.jpg';
import portraitImage from "../assets/use this picture in PJO's resume.jpg";

const MeetAttorneys = () => {
  return (
    <div>
      <PageHero
        eyebrow="Our team"
        title="Experience that spans mediation, law, advising, and public service."
        description="Clients work with a team that brings legal depth, mediation discipline, and practical advisory experience."
        slides={[
          { title: 'Portrait', image: portraitImage },
          { title: 'City', image: cityImage },
          { title: 'Books', image: booksImage },
        ]}
        actions={[{ label: 'Contact the team', to: '/contact' }]}
      />

      <section className="page-section">
        <div className="section-shell">
          <SectionHeading
            eyebrow="Leadership"
            title="Two complementary backgrounds, one clear client-facing standard."
            align="center"
          />

          <div className="grid-cards-2 mt-10">
            {teamMembers.map((member) => (
              <article key={member.name} className="content-card">
                <div className="media-frame min-h-[18rem]">
                  <img src={member.image} alt={member.name} />
                </div>
                <p className="eyebrow">{member.role}</p>
                <h3>{member.name}</h3>
                <p>{member.summary}</p>
                {member.bio.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                <div className="content-card">
                  <BadgeCheck size={24} />
                  <h3>Credentials</h3>
                  <ul>
                    {member.credentials.map((credential) => (
                      <li key={credential}>{credential}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section soft-band">
        <div className="section-shell">
          <div className="cta-panel">
            <p className="eyebrow">Next step</p>
            <h2>Speak with the team about the issue in front of you.</h2>
            <div className="hero-actions">
              <Link to="/contact" className="primary-button">
                <span>Request consultation</span>
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MeetAttorneys;
