// src/components/ui/ServiceCard.jsx
import { ArrowUpRight } from 'lucide-react';

/**
 * Assumes each service looks like:
 * { id, title, description, icon }   // icon = a lucide-react component
 * (`name` is also accepted in place of `title`)
 */
export default function ServiceCard({ service, index = 0 }) {
  const Icon = service.icon && typeof service.icon !== 'string' ? service.icon : null;
  const title = service.title ?? service.name;

  // Cursor-following spotlight
  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`);
  };

  return (
    <article
      onMouseMove={handleMove}
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-7 shadow-soft transition-all duration-500 hover:-translate-y-2 hover:border-primary-200 hover:shadow-card"
    >
      {/* Spotlight */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(260px circle at var(--mx, 50%) var(--my, 0%), rgb(186 230 253 / 0.45), transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* Big index number */}
      <span
        className="pointer-events-none absolute right-5 top-3 select-none text-6xl font-black leading-none text-slate-100 transition-all duration-500 group-hover:-translate-y-1 group-hover:text-primary-100"
        aria-hidden="true"
      >
        {String(index + 1).padStart(2, '0')}
      </span>

      {/* Icon */}
      <span className="relative inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-50 to-primary-100 text-primary-600 shadow-soft transition-all duration-500 group-hover:rotate-6 group-hover:scale-110 group-hover:from-primary-500 group-hover:to-primary-700 group-hover:text-white">
        {Icon && <Icon className="h-7 w-7" aria-hidden="true" />}
      </span>

      <h3 className="relative mt-6 text-lg font-bold leading-snug text-slate-900 transition-colors duration-300 group-hover:text-primary-800">
        {title}
      </h3>

      {service.description && (
        <p className="relative mt-3 flex-1 text-sm leading-relaxed text-slate-600">
          {service.description}
        </p>
      )}

      <a
        href="#appointment"
        className="relative mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-700 focus-visible:ring-2 focus-visible:ring-primary-500"
      >
        <span className="bg-gradient-to-r from-accent-500 to-accent-500 bg-[length:0%_2px] bg-left-bottom bg-no-repeat pb-0.5 transition-all duration-500 group-hover:bg-[length:100%_2px]">
          Book this service
        </span>
        <ArrowUpRight
          className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-1"
          aria-hidden="true"
        />
      </a>

      {/* Bottom accent bar */}
      <span
        className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-primary-500 to-accent-500 transition-transform duration-500 group-hover:scale-x-100"
        aria-hidden="true"
      />
    </article>
  );
}