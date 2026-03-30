import { useEffect, useRef } from 'react';

/**
 * Custom hook that adds scroll-triggered "fade up from below" animation.
 * Elements start invisible and translated down, then animate into view
 * when they enter the viewport.
 *
 * @param {Object} options
 * @param {number} options.threshold - How much of the element must be visible (0-1)
 * @param {string} options.rootMargin - Margin around the root
 * @param {boolean} options.staggerChildren - Whether to stagger child animations
 * @param {number} options.staggerDelay - Delay between each child (ms)
 */
export function useScrollReveal({
    threshold = 0.15,
    rootMargin = '0px 0px -60px 0px',
    staggerChildren = false,
    staggerDelay = 120,
} = {}) {
    const ref = useRef(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        if (staggerChildren) {
                            const children = el.querySelectorAll('.scroll-reveal-child');
                            children.forEach((child, i) => {
                                child.style.transitionDelay = `${i * staggerDelay}ms`;
                                child.classList.add('scroll-revealed');
                            });
                        }
                        el.classList.add('scroll-revealed');
                        observer.unobserve(el);
                    }
                });
            },
            { threshold, rootMargin }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [threshold, rootMargin, staggerChildren, staggerDelay]);

    return ref;
}

/**
 * Standalone initializer — call once in App or layout to auto-animate
 * any element with data-scroll-reveal attribute.
 */
export function initScrollReveal() {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const el = entry.target;

                    // Handle staggered children
                    const children = el.querySelectorAll('.scroll-reveal-child');
                    const delay = parseInt(el.dataset.staggerDelay || '120', 10);
                    children.forEach((child, i) => {
                        child.style.transitionDelay = `${i * delay}ms`;
                        child.classList.add('scroll-revealed');
                    });

                    el.classList.add('scroll-revealed');
                    observer.unobserve(el);
                }
            });
        },
        { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    );

    document.querySelectorAll('[data-scroll-reveal]').forEach((el) => {
        observer.observe(el);
    });

    return () => observer.disconnect();
}
