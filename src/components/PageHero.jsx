import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, PhoneCall } from 'lucide-react';
import AnimatedWords from './AnimatedWords';

const ActionLink = ({ action, primary }) => {
  const commonClass = primary ? 'primary-button' : 'secondary-button';

  if (action.href) {
    return (
      <a href={action.href} className={commonClass}>
        {action.icon === 'phone' ? <PhoneCall size={18} /> : null}
        <span>{action.label}</span>
      </a>
    );
  }

  return (
    <Link to={action.to} className={commonClass}>
      <span>{action.label}</span>
      {primary ? <ArrowRight size={18} /> : null}
    </Link>
  );
};

const PageHero = ({
  eyebrow,
  title,
  description,
  slides,
  actions = [],
  stats = [],
  rotatingPrefix,
  rotatingWords = [],
  mediaCard,
  children,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!slides?.length) {
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
            key={slide.title}
            className={`hero-slide ${index === activeIndex ? 'is-active' : ''}`}
          >
            <img src={slide.image} alt={slide.title} />
          </div>
        ))}
        <div className="hero-overlay" />
      </div>

      <div className="section-shell hero-content">
        <div className="hero-grid">
          <div className="hero-copy">
            {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
            <h1>{title}</h1>
            {rotatingWords.length ? (
              <p className="hero-rotating-line">
                <span>{rotatingPrefix}</span>{' '}
                <AnimatedWords words={rotatingWords} />
              </p>
            ) : null}
            <p className="hero-description">{description}</p>

            {actions.length ? (
              <div className="hero-actions">
                {actions.map((action, index) => (
                  <ActionLink
                    key={action.label}
                    action={action}
                    primary={index === 0}
                  />
                ))}
              </div>
            ) : null}

            {stats.length ? (
              <div className="hero-stats">
                {stats.map((stat) => (
                  <div key={stat.label} className="hero-stat">
                    <strong>{stat.value}</strong>
                    <span>{stat.label}</span>
                  </div>
                ))}
              </div>
            ) : null}

            {children}
          </div>

          {mediaCard ? (
            <aside className="hero-media-card surface-panel">
              {mediaCard.image ? (
                <div className="hero-media-image">
                  <img src={mediaCard.image} alt={mediaCard.title} />
                </div>
              ) : null}
              <div className="hero-media-body">
                <p className="eyebrow">{mediaCard.eyebrow}</p>
                <h2>{mediaCard.title}</h2>
                {mediaCard.list?.length ? (
                  <ul className="hero-media-list">
                    {mediaCard.list.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </aside>
          ) : null}
        </div>
      </div>

      <div className="hero-dots section-shell">
        {slides.map((slide, index) => (
          <button
            key={slide.title}
            type="button"
            className={`hero-dot ${index === activeIndex ? 'is-active' : ''}`}
            onClick={() => setActiveIndex(index)}
            aria-label={`Show slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default PageHero;
