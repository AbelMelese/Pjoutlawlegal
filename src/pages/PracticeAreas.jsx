import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Phone, Quote } from 'lucide-react';
import content from '../data/practiceAreas.json';
import personalInjury from '../assets/practice-areas/0300.png';
import corporateGovernance from '../assets/practice-areas/corporate-governance.webp';
import employmentLabor from '../assets/practice-areas/employment-labor.webp';
import construction from '../assets/practice-areas/construction.webp';

const photographs = {
  'personal-injury': {
    src: personalInjury,
    alt: 'Woman speaking on a phone beside two damaged cars after an automobile collision',
    width: 1280,
    height: 853,
  },
  'corporate-governance': {
    src: corporateGovernance,
    alt: 'Illustration of a diverse business team with a man leading a meeting',
  },
  'employment-labor': {
    src: employmentLabor,
    alt: 'Illustration of employees peacefully protesting outside a business',
  },
  construction: {
    src: construction,
    alt: 'Illustration of workers renovating the interior of a home',
  },
};

const PracticeAreas = () => (
  <div className="bg-white">
    <title>{`${content.title} | Phyllis J. Outlaw & Associates`}</title>
    <section className="bg-[#1E3A5F] text-white py-14 md:py-20">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <p className="text-[#E4C76C] text-sm font-semibold tracking-widest uppercase mb-5">
          Phyllis J. Outlaw &amp; Associates
        </p>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-['Playfair_Display'] leading-tight max-w-4xl">
          {content.title}
        </h1>
      </div>
    </section>

    <section className="py-12 md:py-16" aria-label="Our litigation practice">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <p className="text-lg text-slate-700 leading-relaxed">{content.introduction}</p>
      </div>
    </section>

    {content.areas.map((area, index) => (
      <Fragment key={area.id}>
        <section
          id={area.id}
          aria-labelledby={`${area.id}-title`}
          className={`py-12 md:py-16 scroll-mt-8 ${index % 2 === 0 ? 'bg-slate-50' : 'bg-white'}`}
        >
          <div className="max-w-6xl mx-auto px-5 sm:px-8 grid lg:grid-cols-2 gap-9 lg:gap-14 items-start">
            <div>
              <h2 id={`${area.id}-title`} className="text-3xl md:text-4xl font-bold text-[#1E3A5F] font-['Playfair_Display'] leading-tight mb-6">
                {area.title}
              </h2>
              <p className="text-lg text-slate-700 leading-relaxed">{area.description}</p>
              <div className="mt-8 border-l-4 border-[#C5A03A] bg-[#f7f4ec] p-6">
                <h3 className="text-sm font-bold uppercase tracking-widest text-[#1E3A5F] mb-3">Case Highlight</h3>
                <p className="text-slate-700 leading-relaxed">{area.caseHighlight}</p>
              </div>
            </div>
            <div className={index % 2 === 1 ? 'lg:order-first' : ''}>
              <img
                src={photographs[area.id].src}
                alt={photographs[area.id].alt}
                width={photographs[area.id].width ?? 1536}
                height={photographs[area.id].height ?? 1024}
                loading="lazy"
                decoding="async"
                className="w-full h-auto rounded-xl shadow-md"
              />
              {index === 0 ? (
                <a
                  href="tel:+12025482999"
                  className="mt-5 flex items-center justify-center gap-3 rounded-xl bg-[#3a4381] px-5 py-5 text-white text-center font-semibold hover:bg-[#30386c] transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#3a4381]"
                >
                  <Phone size={22} className="shrink-0" aria-hidden="true" />
                  <span>{content.consultation}</span>
                </a>
              ) : null}
            </div>
          </div>
        </section>
        {index === 1 ? (
          <section className="bg-[#1E3A5F] py-12 md:py-16 text-white" aria-labelledby="client-testimonial-title">
            <div className="max-w-4xl mx-auto px-5 sm:px-8 text-center">
              <Quote className="mx-auto mb-5 text-[#E4C76C]" size={36} aria-hidden="true" />
              <h2 id="client-testimonial-title" className="text-sm font-bold tracking-widest uppercase text-[#E4C76C] mb-6">
                {content.testimonial.title}
              </h2>
              <blockquote>
                <p className="text-2xl md:text-3xl text-white font-['Playfair_Display'] leading-relaxed">{content.testimonial.quote}</p>
                <footer className="mt-6 text-white/85 font-medium">{content.testimonial.attribution}</footer>
              </blockquote>
            </div>
          </section>
        ) : null}
      </Fragment>
    ))}

    <div className="py-10 text-center border-t border-slate-200">
      <Link to="/contact" className="primary-button">
        Contact Our Office <ArrowRight size={18} aria-hidden="true" />
      </Link>
    </div>
  </div>
);

export default PracticeAreas;
