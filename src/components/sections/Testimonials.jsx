// src/components/sections/Testimonials.jsx
import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';
import { testimonials } from '../../data/testimonials';
import SectionTitle from '../ui/SectionTitle';
import Reveal from '../ui/Reveal';

/**
 * Responsive testimonial slider: 1 card on mobile, 2 on tablet, 3 on desktop.
 * Auto-advances every 6s and pauses on hover.
 */
export default function Testimonials() {
  const [perView, setPerView] = useState(1);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  // Keep perView in sync with the viewport
  useEffect(() => {
    const update = () => {
      const width = window.innerWidth;
      setPerView(width >= 1024 ? 3 : width >= 640 ? 2 : 1);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const maxIndex = Math.max(0, testimonials.length - perView);

  // Clamp the index whenever perView changes
  useEffect(() => {
    setIndex((current) => Math.min(current, maxIndex));
  }, [maxIndex]);

  // Autoplay
  useEffect(() => {
    if (paused) return undefined;
    const timer = setInterval(() => {
      setIndex((current) => (current >= maxIndex ? 0 : current + 1));
    }, 6000);
    return () => clearInterval(timer);
  }, [paused, maxIndex]);

  const goTo = (next) => setIndex(Math.min(Math.max(next, 0), maxIndex));

  const prev = () => setIndex((current) => (current <= 0 ? maxIndex : current - 1));
  const next = () => setIndex((current) => (current >= maxIndex ? 0 : current + 1));

  return (
    <section id="testimonials" className="py-20 sm:py-24">
      <div className="container-x">
        <SectionTitle
          eyebrow="Testimonials"
          title="Trusted by patients, families and referring doctors"
          subtitle="Real feedback from people who have used our laboratory, imaging and medical check services."
        />

        <Reveal delay={100}>
          <div
            className="mt-14"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocusCapture={() => setPaused(true)}
            onBlurCapture={() => setPaused(false)}
          >
            {/* Slider viewport */}
            <div className="overflow-hidden py-2">
              <div
                className="flex transition-transform duration-700 ease-out"
                style={{ transform: `translateX(-${index * (100 / perView)}%)` }}
              >
                {testimonials.map((item) => (
                  <div key={item.id} className="w-full shrink-0 px-3 sm:w-1/2 lg:w-1/3">
                    <article className="flex h-full flex-col rounded-2xl border border-slate-100 bg-white p-6 shadow-soft transition-shadow duration-300 hover:shadow-card">
                      <Quote className="h-7 w-7 text-primary-200" aria-hidden="true" />

                      <div className="mt-4 flex items-center gap-1" aria-label={`${item.rating} out of 5 stars`}>
                        {Array.from({ length: 5 }).map((_, starIndex) => (
                          <Star
                            key={starIndex}
                            className={
                              starIndex < item.rating
                                ? 'h-4 w-4 fill-accent-400 text-accent-400'
                                : 'h-4 w-4 text-slate-300'
                            }
                            aria-hidden="true"
                          />
                        ))}
                      </div>

                      <p className="mt-4 flex-1 text-sm leading-relaxed text-slate-600">
                        &ldquo;{item.quote}&rdquo;
                      </p>

                      <footer className="mt-6 flex items-center gap-3 border-t border-slate-100 pt-5">
                        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 text-sm font-bold text-primary-700">
                          {item.name
                            .replace(/^Dr\.\s*|^Mrs\.\s*/, '')
                            .split(' ')
                            .map((part) => part[0])
                            .slice(0, 2)
                            .join('')}
                        </span>
                        <span className="flex flex-col leading-tight">
                          <span className="text-sm font-bold text-slate-900">{item.name}</span>
                          <span className="text-xs text-slate-500">{item.role}</span>
                        </span>
                      </footer>
                    </article>
                  </div>
                ))}
              </div>
            </div>

            {/* Controls */}
            <div className="mt-9 flex items-center justify-center gap-4">
              <button
                type="button"
                onClick={prev}
                aria-label="Previous testimonials"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-primary-700 shadow-soft transition-all hover:-translate-y-0.5 hover:border-primary-200 hover:bg-primary-50 focus-visible:ring-2 focus-visible:ring-primary-500"
              >
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
              </button>

              <div className="flex items-center gap-2">
                {Array.from({ length: maxIndex + 1 }).map((_, dotIndex) => (
                  <button
                    key={dotIndex}
                    type="button"
                    onClick={() => goTo(dotIndex)}
                    aria-label={`Go to testimonial slide ${dotIndex + 1}`}
                    aria-current={dotIndex === index}
                    className={[
                      'h-2.5 rounded-full transition-all duration-300 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
                      dotIndex === index ? 'w-7 bg-primary-600' : 'w-2.5 bg-slate-300 hover:bg-slate-400',
                    ].join(' ')}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={next}
                aria-label="Next testimonials"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-primary-700 shadow-soft transition-all hover:-translate-y-0.5 hover:border-primary-200 hover:bg-primary-50 focus-visible:ring-2 focus-visible:ring-primary-500"
              >
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}