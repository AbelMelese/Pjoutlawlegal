import { useEffect, useState } from 'react';

const AnimatedWords = ({ words, className = '' }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!words?.length) {
      return undefined;
    }

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % words.length);
    }, 2200);

    return () => window.clearInterval(interval);
  }, [words]);

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
