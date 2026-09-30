// src/components/sections/About.jsx
import { useEffect, useRef, useState } from 'react';
import {
  Target,
  Eye,
  Microscope,
  ShieldCheck,
  Armchair,
  FileText,
  BadgeCheck,
} from 'lucide-react';
import { siteInfo } from '../../data/siteInfo';
import { stats } from '../../data/stats';
import SectionTitle from '../ui/SectionTitle';
import Reveal from '../ui/Reveal';

const HIGHLIGHTS = [
  { icon: Microscope, text: 'Qualified laboratory scientists, radiographers and physicians' },
  { icon: ShieldCheck, text: 'Strict internal quality control on every sample we process' },
  { icon: Armchair, text: 'Private consultation rooms and short waiting times' },
  { icon: FileText, text: 'Reports formatted for employers, schools and embassies' },
];

/** Counts up to the number inside a stat value (e.g. "15+", "10,000+", "99.4%") once visible. */
function CountUp({ value }) {
  const ref = useRef(null);
  const match = String(value).match(/^([^\d]*)([\d,.]+)(.*)$/);
  const prefix = match?.[1] ?? '';
  const raw = match?.[2] ?? '';
  const suffix = match?.[3] ?? '';
  const target = match ? parseFloat(raw.replace(/,/g, '')) : 0;
  const decimals = raw.includes('.') ? raw.split('.')[1].length : 0;
  const useComma = raw.includes(',');

  const format = (n) =>
    useComma
      ? n.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
      : n.toFixed(decimals);

  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!match) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setDisplay(target);
      return;
    }
    let frame;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const duration = 1800;
        const tick = (now) => {
          const p = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          setDisplay(target * eased);
          if (p < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);

  if (!match) return <span>{value}</span>;
  return (
    <span ref={ref}>
      {prefix}
      {format(display)}
      {suffix}
    </span>
  );
}

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-gradient-to-b from-white via-primary-50/50 to-white py-24 sm:py-28">
      {/* Decorative background */}
      <div
        className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-primary-200/40 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-32 bottom-1/3 h-80 w-80 rounded-full bg-accent-200/40 blur-3xl"
        aria-hidden="true"
      />

      <div className="container-x relative">
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
          {/* Image composition */}
          <Reveal className="relative">
            <div className="group relative mx-auto max-w-lg pb-8 pl-6 pt-6 lg:max-w-none">
              {/* Dotted pattern */}
              <div
                className="absolute left-0 top-0 h-40 w-40 opacity-60"
                style={{
                  backgroundImage: 'radial-gradient(circle, rgb(148 163 184) 1.5px, transparent 1.5px)',
                  backgroundSize: '16px 16px',
                }}
                aria-hidden="true"
              />

              {/* Tilted gradient frame */}
              <div
                className="absolute inset-0 left-3 top-3 rotate-3 rounded-[2.5rem] bg-gradient-to-tr from-primary-300/70 to-accent-300/60 transition-transform duration-700 group-hover:rotate-6"
                aria-hidden="true"
              />

              {/* Main image */}
              <div className="relative overflow-hidden rounded-[2.5rem] shadow-card ring-8 ring-white">
                <img
                  src={siteInfo.images.about}
                  alt="Mopex Healthcare laboratory scientist preparing samples for testing"
                  loading="lazy"
                  className="aspect-[4/5] w-full bg-primary-100 object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105 sm:aspect-[4/3] lg:aspect-[4/4.4]"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent"
                  aria-hidden="true"
                />
              </div>

              {/* Years badge */}
              <div className="absolute -bottom-2 -right-2 rounded-3xl bg-gradient-to-br from-primary-600 to-primary-800 px-7 py-6 text-white shadow-card ring-4 ring-white transition-transform duration-500 hover:-translate-y-1 sm:-right-6">
                <p className="text-4xl font-extrabold leading-none">15+</p>
                <p className="mt-2 max-w-[8rem] text-[11px] font-semibold uppercase leading-snug tracking-wider text-primary-100">
                  Years of trusted service
                </p>
              </div>

              {/* Floating certification chip */}
              <div className="absolute left-0 top-16 flex items-center gap-3 rounded-2xl border border-white/60 bg-white/85 px-4 py-3 shadow-card backdrop-blur-md transition-transform duration-500 hover:-translate-y-1 sm:-left-4">
                <span className="relative inline-flex h-10 w-10 items-center justify-center rounded-xl bg-accent-50 text-accent-600">
                  <BadgeCheck className="h-5 w-5" aria-hidden="true" />
                  <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 animate-pulse rounded-full bg-emerald-500 ring-2 ring-white" />
                </span>
                <span className="flex flex-col leading-tight">
                  <span className="text-sm font-bold text-slate-900">Certified lab</span>
                  <span className="text-xs text-slate-500">Quality assured</span>
                </span>
              </div>
            </div>
          </Reveal>

          {/* Copy */}
          <Reveal delay={120}>
            <SectionTitle
              align="left"
              eyebrow="About Us"
              title="Modern diagnostics, delivered with genuine human care"
            />

            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              Mopex Healthcare was founded on a simple belief: nobody should have to choose between
              affordability and quality when it comes to their health. We combine modern diagnostic
              technology with a team that takes the time to listen, explain and follow up.
            </p>

            {/* Highlights */}
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {HIGHLIGHTS.map(({ icon: Icon, text }) => (
                <li
                  key={text}
                  className="group flex items-start gap-3 rounded-2xl border border-slate-100 bg-white/80 p-4 shadow-soft backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-primary-200 hover:shadow-card"
                >
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-600 transition-all duration-300 group-hover:rotate-6 group-hover:bg-primary-600 group-hover:text-white">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="text-sm font-medium leading-snug text-slate-700">{text}</span>
                </li>
              ))}
            </ul>

            {/* Mission & Vision */}
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-700 to-primary-900 p-6 text-white shadow-card transition-transform duration-300 hover:-translate-y-1">
                <Target
                  className="absolute -right-4 -top-4 h-24 w-24 text-white/10 transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110"
                  aria-hidden="true"
                />
                <span className="relative inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 backdrop-blur">
                  <Target className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="relative mt-4 text-sm font-bold uppercase tracking-wider">Our Mission</h3>
                <p className="relative mt-2 text-sm leading-relaxed text-primary-100">
                  To make accurate, affordable diagnostic services accessible to every family we serve.
                </p>
              </div>

              <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-accent-500 to-accent-700 p-6 text-white shadow-card transition-transform duration-300 hover:-translate-y-1">
                <Eye
                  className="absolute -right-4 -top-4 h-24 w-24 text-white/10 transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110"
                  aria-hidden="true"
                />
                <span className="relative inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 backdrop-blur">
                  <Eye className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="relative mt-4 text-sm font-bold uppercase tracking-wider">Our Vision</h3>
                <p className="relative mt-2 text-sm leading-relaxed text-accent-50">
                  To be the most trusted diagnostic centre in the region — known for precision and kindness.
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Stats band */}
        <Reveal>
          <div className="relative mt-24 overflow-hidden rounded-[2rem] bg-gradient-to-br from-primary-800 via-primary-900 to-slate-900 px-6 py-12 shadow-card sm:px-10 sm:py-14">
            <div
              className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-primary-500/30 blur-3xl"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-accent-500/25 blur-3xl"
              aria-hidden="true"
            />

            <div className="relative grid grid-cols-2 gap-y-10 lg:grid-cols-4 lg:gap-y-0 lg:divide-x lg:divide-white/10">
              {stats.map((stat) => (
                <div key={stat.id} className="group px-4 text-center">
                  <p className="text-4xl font-extrabold tracking-tight text-white transition-transform duration-300 group-hover:scale-110 sm:text-5xl">
                    <CountUp value={stat.value} />
                  </p>
                  <span
                    className="mx-auto mt-3 block h-0.5 w-8 rounded-full bg-accent-400 transition-all duration-300 group-hover:w-14"
                    aria-hidden="true"
                  />
                  <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-primary-100 sm:text-sm">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}