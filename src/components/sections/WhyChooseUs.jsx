// src/components/sections/WhyChooseUs.jsx
import { whyChooseUs } from '../../data/whyChooseUs';
import SectionTitle from '../ui/SectionTitle';
import Reveal from '../ui/Reveal';
import Icon from '../ui/Icon';

export default function WhyChooseUs() {
  return (
    <section id="why-us" className="relative overflow-hidden bg-primary-900 py-20 sm:py-24">
      {/* Subtle dot pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)',
          backgroundSize: '28px 28px',
        }}
        aria-hidden="true"
      />

      <div className="container-x relative">
        <SectionTitle
          light
          eyebrow="Why Choose Us"
          title="Healthcare you can measure — and trust"
          subtitle="Six reasons thousands of patients and referring physicians keep choosing Mopex Healthcare."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {whyChooseUs.map((item, index) => (
            <Reveal key={item.id} delay={(index % 3) * 100} className="h-full">
              <article className="h-full rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-accent-400/40 hover:bg-white/10">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent-500/15 text-accent-300">
                  <Icon name={item.icon} className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-lg font-bold text-white">{item.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-primary-100/80">
                  {item.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}