import { useEffect, useState } from 'react';

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const AnimatedWords = ({ words, className = '' }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeWord = words?.[activeIndex];

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
    <span className={`word-stage ${className}`.trim()} aria-live="polite">
      <span key={activeWord} className="word-token is-active">
        {activeWord}
      </span>
    </span>
  );
};

export default AnimatedWords;
