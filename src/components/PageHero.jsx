import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const slideVariants = [
  'zoom-in',
  'zoom-out',
  'pan-left',
  'pan-right',
  'drift-up',
  'drift-down',
  'diagonal-left',
  'diagonal-right',
];

const PageHero = ({
  slides = [],
  eyebrow,
  title,
  description,
  actions = [],
  compact = false,
  allowImageMotion = true,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeSlide = slides[activeIndex] ?? {};

  useEffect(() => {
    if (slides.length < 2) {
      return undefined;
    }

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, 6000);

    return () => window.clearInterval(interval);
  }, [slides.length]);

  const resolvedTitle = title ?? activeSlide.title;
  const resolvedDescription = description ?? activeSlide.subtitle ?? activeSlide.description;

  return (
    <section className={`page-hero ${compact ? 'page-hero--compact' : ''}`}>
      <div className="page-hero__media">
        {slides.map((slide, index) => {
          const motionClass =
            allowImageMotion && slide.animate !== false
              ? `page-hero__slide--${slideVariants[index % slideVariants.length]}`
              : 'page-hero__slide--static';

          return (
            <div
              key={`${slide.title ?? 'slide'}-${index}`}
              className={`page-hero__slide ${motionClass} ${index === activeIndex ? 'is-active' : ''}`}
              style={{ backgroundColor: slide.background ?? 'transparent' }}
            >
              <img
                src={slide.image}
                alt={slide.title ?? resolvedTitle}
                style={{
                  objectPosition: slide.position ?? 'center center',
                  objectFit: slide.fit ?? 'cover',
                }}
              />
            </div>
          );
        })}
        <div className="page-hero__overlay" />
      </div>

      <div className="section-shell page-hero__content">
        <div className="page-hero__copy">
          {eyebrow ? <p className="page-hero__eyebrow">{eyebrow}</p> : null}
          <h1>{resolvedTitle}</h1>
          {resolvedDescription ? <p>{resolvedDescription}</p> : null}

          {actions.length ? (
            <div className="hero-actions">
              {actions.map((action, index) =>
                action.href ? (
                  <a
                    key={`${action.label}-${index}`}
                    href={action.href}
                    className={index === 0 ? 'primary-button' : 'secondary-button'}
                  >
                    {action.label}
                  </a>
                ) : (
                  <Link
                    key={`${action.label}-${index}`}
                    to={action.to}
                    className={index === 0 ? 'primary-button' : 'secondary-button'}
                  >
                    {action.label}
                  </Link>
                ),
              )}
            </div>
          ) : null}
        </div>
      </div>

      {slides.length > 1 ? (
        <div className="section-shell hero-dots">
          {slides.map((slide, index) => (
            <button
              key={`${slide.title ?? 'dot'}-${index}`}
              type="button"
              className={index === activeIndex ? 'is-active' : ''}
              aria-label={`Show slide ${index + 1}`}
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>
      ) : null}
    </section>
  );
};

export default PageHero;
