import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Global scroll reveal component. Drop this once into the app layout
 * and it will automatically animate any <section> element (and elements
 * with data-scroll-reveal) using the IntersectionObserver API.
 *
 * Sections fade up from below as the user scrolls down. Grid children
 * within sections get staggered delays for a cascading effect.
 */
const ScrollReveal = () => {
    const location = useLocation();
    const observerRef = useRef(null);

    useEffect(() => {
        // Disconnect previous observer if it exists
        if (observerRef.current) {
            observerRef.current.disconnect();
        }

        // Delay to let the new page render
        const timer = setTimeout(() => {
            // Select ALL sections inside main, plus explicit data-scroll-reveal elements
            const elements = document.querySelectorAll(
                'main section, main [data-scroll-reveal]'
            );

            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            const el = entry.target;
                            el.classList.add('scroll-revealed');

                            // Auto-stagger scroll-reveal-child elements
                            const children = el.querySelectorAll('.scroll-reveal-child');
                            children.forEach((child, i) => {
                                child.style.transitionDelay = `${i * 120}ms`;
                                child.classList.add('scroll-revealed');
                            });

                            observer.unobserve(el);
                        }
                    });
                },
                {
                    threshold: 0.06,
                    rootMargin: '0px 0px -30px 0px',
                }
            );

            observerRef.current = observer;

            let isFirstSection = true;

            elements.forEach((el) => {
                // Skip explicitly excluded elements
                if (el.dataset.noReveal !== undefined) {
                    return;
                }

                // Skip the very first section on the page (it's the hero)
                if (isFirstSection && el.tagName === 'SECTION') {
                    isFirstSection = false;
                    return;
                }
                isFirstSection = false;

                // Add scroll-reveal class if not already present
                if (!el.classList.contains('scroll-reveal') &&
                    !el.classList.contains('scroll-reveal--left') &&
                    !el.classList.contains('scroll-reveal--right') &&
                    !el.classList.contains('scroll-reveal--scale')) {
                    el.classList.add('scroll-reveal');
                }

                observer.observe(el);
            });
        }, 150);

        return () => {
            clearTimeout(timer);
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    }, [location.pathname]); // Re-run when route changes

    return null;
};

export default ScrollReveal;
