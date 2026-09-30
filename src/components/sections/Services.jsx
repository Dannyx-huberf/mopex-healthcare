// src/components/sections/Services.jsx
import { ArrowRight, PhoneCall } from 'lucide-react';
import { services } from '../../data/services.js';
import { siteInfo } from '../../data/siteInfo.js';
import SectionTitle from '../ui/SectionTitle';
import ServiceCard from '../ui/ServiceCard';
import Reveal from '../ui/Reveal';
import Button from '../ui/Button';

export default function Services() {
  return (
    <section
      id="services"
      className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50 to-white py-24 sm:py-28"
    >
      {/* Decorative background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          backgroundImage: 'radial-gradient(circle, rgb(203 213 225) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-40 top-10 h-96 w-96 rounded-full bg-primary-200/40 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -left-40 bottom-40 h-96 w-96 rounded-full bg-accent-200/40 blur-3xl"
        aria-hidden="true"
      />

      <div className="container-x relative">
        <SectionTitle
          eyebrow="Our Services"
          title="Complete diagnostic and medical services under one roof"
          subtitle="From routine laboratory investigations to imaging, fitness certification and specialist consultation — everything you need, delivered accurately and on time."
        />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <Reveal key={service.id} delay={(index % 4) * 90} className="h-full">
              <ServiceCard service={service} index={index} />
            </Reveal>
          ))}
        </div>

        {/* CTA band */}
        <Reveal delay={120}>
          <div className="relative mt-20 overflow-hidden rounded-[2rem] bg-gradient-to-br from-primary-800 via-primary-900 to-slate-900 px-8 py-12 shadow-card sm:px-12">
            <div
              className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 rounded-full bg-primary-500/30 blur-3xl"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute -bottom-20 left-10 h-64 w-64 rounded-full bg-accent-500/25 blur-3xl"
              aria-hidden="true"
            />

            <div className="relative flex flex-col items-center justify-between gap-8 text-center lg:flex-row lg:text-left">
              <div className="max-w-xl">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-accent-400" aria-hidden="true" />
                  Need guidance?
                </span>
                <h3 className="mt-4 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                  Not sure which test or scan you need?
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-primary-100 sm:text-base">
                  Talk to our team — we&apos;ll help you choose the right service for your situation.
                </p>
              </div>

              <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                <Button
                  href="#appointment"
                  variant="accent"
                  size="lg"
                  icon={ArrowRight}
                  iconRight
                  className="transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-accent-500/30"
                >
                  Book a Consultation
                </Button>
                <a
                  href={siteInfo.phoneHref}
                  className="group inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/20 focus-visible:ring-2 focus-visible:ring-primary-300"
                >
                  <PhoneCall
                    className="h-4 w-4 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110"
                    aria-hidden="true"
                  />
                  {siteInfo.phone}
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}