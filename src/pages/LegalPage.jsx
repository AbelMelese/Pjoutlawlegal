import { useContent } from '../content';

/** Privacy Policy / Terms of Use. Text comes from the CMS (content keys "privacy" and "terms"). */
const LegalPage = ({ contentKey }) => {
  const content = useContent(contentKey);
  const settings = useContent('settings');
  return (
    <div className="bg-white">
      <section className="bg-[#1E3A5F] text-white py-14 md:py-20">
        <div className="max-w-4xl mx-auto px-5 sm:px-8">
          <p className="text-[#E4C76C] text-sm font-semibold tracking-widest uppercase mb-5">{settings.businessName}</p>
          <h1 className="text-4xl sm:text-5xl font-bold font-['Playfair_Display'] leading-tight">{content.title}</h1>
          <p className="mt-4 text-white/80">{content.lastUpdated}</p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-5 sm:px-8 py-12 md:py-16">
        {content.intro ? <p className="text-lg text-slate-700 leading-relaxed mb-10">{content.intro}</p> : null}
        {(content.sections ?? []).map((section) => (
          <section key={section.heading} className="mb-10" aria-labelledby={`${contentKey}-${section.heading}`}>
            <h2 id={`${contentKey}-${section.heading}`} className="text-2xl font-bold text-[#1E3A5F] font-['Playfair_Display'] mb-4">
              {section.heading}
            </h2>
            {String(section.body ?? '')
              .split(/\n\s*\n/)
              .filter((paragraph) => paragraph.trim())
              .map((paragraph, index) => (
                <p key={index} className="text-slate-700 leading-relaxed mb-4">
                  {paragraph.trim()}
                </p>
              ))}
          </section>
        ))}
      </div>
    </div>
  );
};

export default LegalPage;
