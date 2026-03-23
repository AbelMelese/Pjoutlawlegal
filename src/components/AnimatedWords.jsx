import { useEffect, useState } from 'react';

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const AnimatedWords = ({ words, className = '' }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!words?.length || prefersReducedMotion()) {
      return undefined;
    }

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % words.length);
    }, 2200);

    return () => window.clearInterval(interval);
  }, [words]);

  if (!words?.length) {
    return null;
  }

  return (
    <span className={`word-stage ${className}`.trim()}>
      {words.map((word, index) => (
        <span
          key={word}
          className={`word-token ${index === activeIndex ? 'is-active' : ''}`}
        >
          {word}
        </span>
      ))}
    </span>
  );
};

export default AnimatedWords;
