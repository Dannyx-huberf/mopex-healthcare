// src/components/ui/Reveal.jsx
import { useEffect, useRef, useState } from 'react';

/**
 * Fades + slides its children into view on scroll using IntersectionObserver.
 * Falls back to "always visible" if the API is unavailable.
 *
 * @param {number} delay - stagger delay in milliseconds
 * @param {string} as    - wrapper element tag (default "div")
 */
export default function Reveal({ children, delay = 0, className = '', as: Tag = 'div' }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={[
        'transition-all duration-700 ease-out will-change-transform',
        visible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0',
        className,
      ].join(' ')}
    >
      {children}
    </Tag>
  );
}