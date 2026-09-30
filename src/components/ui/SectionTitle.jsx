// src/components/ui/SectionTitle.jsx
/**
 * Consistent section heading with optional eyebrow label and subtitle.
 *
 * @param {'left'|'center'} align
 * @param {boolean} light - use light text (for dark backgrounds)
 */
export default function SectionTitle({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  light = false,
  className = '',
}) {
  const isLeft = align === 'left';

  return (
    <div
      className={[
        'flex max-w-3xl flex-col',
        isLeft ? 'items-start text-left' : 'mx-auto items-center text-center',
        className,
      ].join(' ')}
    >
      {eyebrow && (
        <span
          className={[
            'mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em]',
            light ? 'text-accent-300' : 'text-primary-600',
          ].join(' ')}
        >
          <span className={['h-px w-6', light ? 'bg-accent-300' : 'bg-primary-400'].join(' ')} />
          {eyebrow}
        </span>
      )}

      <h2
        className={[
          'text-balance text-3xl font-extrabold tracking-tight sm:text-4xl',
          light ? 'text-white' : 'text-slate-900',
        ].join(' ')}
      >
        {title}
      </h2>

      {subtitle && (
        <p
          className={[
            'mt-4 text-base leading-relaxed',
            light ? 'text-primary-100/85' : 'text-slate-600',
          ].join(' ')}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}