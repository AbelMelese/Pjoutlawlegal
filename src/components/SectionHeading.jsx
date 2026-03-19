const SectionHeading = ({ eyebrow, title, description, align = 'left' }) => {
  const alignmentClass = align === 'center' ? 'section-heading-center' : 'section-heading-left';

  return (
    <div className={`section-heading ${alignmentClass}`}>
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2>{title}</h2>
      {description ? <p className="section-description">{description}</p> : null}
    </div>
  );
};

export default SectionHeading;
