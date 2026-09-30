// src/components/sections/Hero.jsx
import { useEffect, useState } from 'react';
import { CalendarDays, ArrowRight, CheckCircle2, Clock3, ShieldCheck } from 'lucide-react';
import { siteInfo } from '../../data/siteInfo';
import Button from '../ui/Button';
import Reveal from '../ui/Reveal';

const TRUST_POINTS = ['Certified laboratory', 'Same-day results', 'Experienced clinicians'];
const SLIDE_INTERVAL = 6000; // ms

// Add `heroSlides: [url1, url2, url3]` to siteInfo.images.
// Falls back to the single hero image if not provided.
const SLIDES = siteInfo.images.heroSlides?.length
  ? siteInfo.images.heroSlides
  : [siteInfo.images.hero];

export default function Hero() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  // Auto-advance (skipped for reduced-motion users or a single slide)
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (paused || reduce || SLIDES.length < 2) return;
    const id = setInterval(() => setActive((i) => (i + 1) % SLIDES.length), SLIDE_INTERVAL);
    return () => clearInterval(id);
  }, [paused]);

  // Preload all slides so crossfades never flash
  useEffect(() => {
    SLIDES.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  return (
    <section
      id="home"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-slate-900 pb-24 pt-32 lg:pt-40"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Background slideshow */}
      <div className="absolute inset-0 -z-20" aria-hidden="true">
        {SLIDES.map((src, i) => (
          <img
            key={src}
            src={src}
            alt=""
            loading={i === 0 ? 'eager' : 'lazy'}
            className={`absolute inset-0 h-full w-full object-cover transition-all duration-[1500ms] ease-out ${
              i === active ? 'scale-100 opacity-100' : 'scale-110 opacity-0'
            }`}
          />
        ))}
      </div>

      {/* Overlays for text legibility */}
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-r from-slate-950/85 via-slate-900/60 to-slate-900/20"
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-slate-950/60 to-transparent"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="container-x relative">
        <Reveal>
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-accent-400" aria-hidden="true" />
              Trusted diagnostic &amp; medical centre
            </span>

            <h1 className="text-balance mt-6 text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-[3.6rem]">
              Accurate diagnostics.{' '}
              <span className="text-primary-300">Compassionate</span> care.
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-200 sm:text-lg">
              {siteInfo.description}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button href="#appointment" size="lg" icon={CalendarDays}>
                Book Appointment
              </Button>
              <Button
                href="#services"
                variant="outline"
                size="lg"
                icon={ArrowRight}
                iconRight
                className="!border-white/40 !bg-white/10 !text-white backdrop-blur hover:!bg-white/20"
              >
                Our Services
              </Button>
            </div>

            <ul className="mt-9 flex flex-wrap gap-x-6 gap-y-3">
              {TRUST_POINTS.map((point) => (
                <li key={point} className="inline-flex items-center gap-2 text-sm font-semibold text-white">
                  <CheckCircle2 className="h-4 w-4 text-primary-300" aria-hidden="true" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>

      {/* Glass stat cards (desktop) */}
      <div className="absolute bottom-10 right-6 hidden items-stretch gap-4 lg:flex xl:right-12">
        <div className="flex items-center gap-3 rounded-2xl border border-white/20 bg-white/10 px-4 py-3 backdrop-blur-md">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 text-white">
            <ShieldCheck className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="flex flex-col leading-tight">
            <span className="text-sm font-bold text-white">99.4% accuracy</span>
            <span className="text-xs text-slate-300">Quality-controlled testing</span>
          </span>
        </div>
        <div className="flex items-center gap-3 rounded-2xl border border-white/20 bg-white/10 px-4 py-3 backdrop-blur-md">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 text-white">
            <Clock3 className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="flex flex-col leading-tight">
            <span className="text-sm font-bold text-white">Same-day results</span>
            <span className="text-xs text-slate-300">On most routine panels</span>
          </span>
        </div>
      </div>

      {/* Slide indicators */}
      {SLIDES.length > 1 && (
        <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 gap-2 lg:left-auto lg:translate-x-0 lg:[left:max(1.5rem,calc((100vw-80rem)/2+1.5rem))]">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Show slide ${i + 1}`}
              aria-current={i === active}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === active ? 'w-8 bg-white' : 'w-2 bg-white/50 hover:bg-white/80'
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
}