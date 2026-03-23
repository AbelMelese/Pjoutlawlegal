import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Phone } from 'lucide-react';
import AnimatedWords from './AnimatedWords';

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const ActionLink = ({ action, primary }) => {
  const className = primary ? 'primary-button' : 'secondary-button';

  if (action.href) {
    return (
      <a href={action.href} className={className}>
        {action.icon === 'phone' ? <Phone size={18} /> : null}
        <span>{action.label}</span>
      </a>
    );
  }

  return (
    <Link to={action.to} className={className}>
      <span>{action.label}</span>
      {primary ? <ArrowRight size={18} /> : null}
    </Link>
  );
};

const PageHero = ({
  eyebrow,
  title,
  description,
  slides = [],
  actions = [],
  rotatingPrefix,
  rotatingWords = [],
  children,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeSlide = slides[activeIndex] ?? {};
  const resolvedTitle = title ?? activeSlide.title;
  const resolvedDescription =
    description ?? activeSlide.subtitle ?? activeSlide.description;

  useEffect(() => {
    if (!slides.length || prefersReducedMotion()) {
      return undefined;
    }

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, 5200);

    return () => window.clearInterval(interval);
  }, [slides]);

  return (
    <section className="hero-shell">
      <div className="hero-background">
        {slides.map((slide, index) => (
          <div
            key={`${slide.title ?? 'slide'}-${index}`}
            className={`hero-slide ${index === activeIndex ? 'is-active' : ''}`}
          >
            <img src={slide.image} alt={slide.title || title} />
          </div>
        ))}
        <div className="hero-overlay" />
      </div>

      <div className="section-shell hero-content">
          <div className="hero-copy">
          {eyebrow ? <p className="hero-eyebrow">{eyebrow}</p> : null}
          {resolvedTitle ? <h1 className="hero-title">{resolvedTitle}</h1> : null}

          {rotatingWords.length ? (
            <p className="hero-rotating-line">
              <span>{rotatingPrefix}</span>
              <AnimatedWords words={rotatingWords} />
            </p>
          ) : null}

          {resolvedDescription ? (
            <p className="hero-description">{resolvedDescription}</p>
          ) : null}

          {actions.length ? (
            <div className="hero-actions">
              {actions.map((action, index) => (
                <ActionLink
                  key={`${action.label}-${index}`}
                  action={action}
                  primary={index === 0}
                />
              ))}
            </div>
          ) : null}

          {children}
        </div>
      </div>

      {slides.length ? (
        <div className="hero-dots section-shell">
          {slides.map((slide, index) => (
            <button
              key={`${slide.title ?? 'dot'}-${index}`}
              type="button"
              className={`hero-dot ${index === activeIndex ? 'is-active' : ''}`}
              onClick={() => setActiveIndex(index)}
              aria-label={`Show slide ${index + 1}`}
            />
          ))}
        </div>
      ) : null}
    </section>
  );
};

export default PageHero;
