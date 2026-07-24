import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Phone } from 'lucide-react';
import AnimatedWords from './AnimatedWords';

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const ActionLink = ({ action, primary }) => {
  // Phone actions always use the gradient primary style
  const isPhone = action.icon === 'phone';
  const className = (primary || isPhone) ? 'primary-button' : 'secondary-button';

  if (action.href) {
    return (
      <a href={action.href} className={className}>
        {isPhone ? <Phone size={18} /> : null}
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
  textBackdrop = 'none',
  noSlide = false,
  children,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState(-1);
  const activeSlide = slides[activeIndex] ?? {};
  const resolvedTitle = title ?? activeSlide.title;
  const resolvedDescription =
    description ?? activeSlide.subtitle ?? activeSlide.description;
  const heroPalette = {
    '--hero-eyebrow-color': activeSlide.eyebrowColor ?? '#214b63',
    '--hero-title-color': activeSlide.titleColor ?? '#13293d',
    '--hero-rotating-color': activeSlide.rotatingColor ?? 'rgba(19, 41, 61, 0.86)',
    '--hero-description-color': activeSlide.descriptionColor ?? 'rgba(19, 41, 61, 0.8)',
    '--hero-text-shadow': activeSlide.textShadow ?? '0 2px 10px rgba(255, 255, 255, 0.35)',
    '--hero-secondary-color': activeSlide.secondaryColor ?? '#13293d',
    '--hero-secondary-bg': activeSlide.secondaryBackground ?? 'rgba(255, 255, 255, 0.7)',
    '--hero-secondary-border': activeSlide.secondaryBorder ?? 'rgba(19, 41, 61, 0.18)',
  };

  useEffect(() => {
    if (!slides.length || noSlide || prefersReducedMotion()) {
      return undefined;
    }

    const interval = window.setInterval(() => {
      setActiveIndex((current) => {
        setPreviousIndex(current);
        return (current + 1) % slides.length;
      });
    }, 4500);

    return () => window.clearInterval(interval);
  }, [slides, noSlide]);

  return (
    <section
      className={`hero-shell ${textBackdrop === 'blur-left' ? 'hero-shell--text-backdrop' : ''}`}
      style={{
        ...heroPalette,
      }}
    >
      <div className="hero-background">
        {slides.map((slide, index) => (
          <div
            key={`${slide.title ?? 'slide'}-${index}`}
            className={`hero-slide ${index === activeIndex ? 'is-active' : ''} ${index === previousIndex ? 'is-previous' : ''}`}
            data-transition={slide.transition ?? 'wipe-left'}
            style={slide.background ? { backgroundColor: slide.background } : undefined}
          >
            <img
              src={slide.image}
              alt={slide.title || title}
              style={{
                objectFit: slide.fit,
                objectPosition: slide.position,
                inset: slide.imageInset,
              }}
            />
          </div>
        ))}
        <div className="hero-overlay" />
      </div>

      <div className="section-shell hero-content">
        <div className="hero-copy">
          {eyebrow ? (
            <p className="hero-eyebrow">
              <span className="hero-inline-backdrop">{eyebrow}</span>
            </p>
          ) : null}
          {resolvedTitle ? (
            <h1
              className="hero-title"
              style={activeSlide.titleSize ? { fontSize: activeSlide.titleSize } : undefined}
            >
              <span className="hero-inline-backdrop">{resolvedTitle}</span>
            </h1>
          ) : null}

          {rotatingWords.length ? (
            <p className="hero-rotating-line">
              <span className="hero-inline-backdrop hero-inline-backdrop--row">
                <span>{rotatingPrefix}</span>
                <AnimatedWords words={rotatingWords} />
              </span>
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

      {slides.length && !noSlide ? (
        <div className="hero-dots section-shell">
          {slides.map((slide, index) => (
            <button
              key={`${slide.title ?? 'dot'}-${index}`}
              type="button"
              className={`hero-dot ${index === activeIndex ? 'is-active' : ''}`}
              onClick={() => {
                if (index === activeIndex) {
                  return;
                }

                setPreviousIndex(activeIndex);
                setActiveIndex(index);
              }}
              aria-label={`Show slide ${index + 1}`}
            />
          ))}
        </div>
      ) : null}
    </section>
  );
};

export default PageHero;
