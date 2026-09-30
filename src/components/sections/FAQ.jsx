// src/components/sections/FAQ.jsx
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { faqs } from '../../data/faqs.js';
import SectionTitle from '../ui/SectionTitle';
import Reveal from '../ui/Reveal';

export default function FAQ() {
  const [openId, setOpenId] = useState(faqs[0]?.id ?? null);

  const toggle = (id) => setOpenId((current) => (current === id ? null : id));

  return (
    <section id="faq" className="py-20 sm:py-24">
      <div className="container-x">
        <SectionTitle
          eyebrow="FAQ"
          title="Questions patients ask us most"
          subtitle="Can't find what you're looking for? Our team is always happy to help — just give us a call."
        />

        <div className="mx-auto mt-14 max-w-3xl space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openId === faq.id;

            return (
              <Reveal key={faq.id} delay={index * 60}>
                <div
                  className={[
                    'overflow-hidden rounded-2xl border bg-white transition-all duration-300',
                    isOpen
                      ? 'border-primary-200 shadow-card'
                      : 'border-slate-100 shadow-soft hover:border-primary-100',
                  ].join(' ')}
                >
                  <h3>
                    <button
                      type="button"
                      onClick={() => toggle(faq.id)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-panel-${faq.id}`}
                      id={`faq-button-${faq.id}`}
                      className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left focus-visible:ring-2 focus-visible:ring-primary-500 sm:px-6"
                    >
                      <span className="text-sm font-bold text-slate-900 sm:text-base">
                        {faq.question}
                      </span>
                      <span
                        className={[
                          'inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-300',
                          isOpen
                            ? 'rotate-180 bg-primary-600 text-white'
                            : 'bg-primary-50 text-primary-600',
                        ].join(' ')}
                      >
                        <ChevronDown className="h-4 w-4" aria-hidden="true" />
                      </span>
                    </button>
                  </h3>

                  <div
                    id={`faq-panel-${faq.id}`}
                    role="region"
                    aria-labelledby={`faq-button-${faq.id}`}
                    className={[ 'grid transition-all duration-300 ease-out',
                      isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
                    ].join(' ')}
                  >
                    <div className="overflow-hidden">
                      <p className="px-5 pb-5 text-sm leading-relaxed text-slate-600 sm:px-6">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}