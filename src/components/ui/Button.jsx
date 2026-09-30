// src/components/ui/Button.jsx
/**
 * Reusable button. Renders an <a> when `href` is supplied, otherwise a <button>.
 */
const VARIANTS = {
  primary: 'bg-primary-600 text-white shadow-soft hover:bg-primary-700 hover:shadow-card',
  accent: 'bg-accent-500 text-white shadow-soft hover:bg-accent-600 hover:shadow-card',
  outline: 'border-2 border-primary-600 text-primary-700 hover:bg-primary-50',
  white: 'bg-white text-primary-700 shadow-soft hover:bg-primary-50',
  ghost: 'text-primary-700 hover:bg-primary-50',
};

const SIZES = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-sm',
  lg: 'px-7 py-3.5 text-base',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  icon: IconComponent,
  iconRight = false,
  className = '',
  ...rest
}) {
  const classes = [
    'inline-flex items-center justify-center gap-2 rounded-full font-semibold',
    'transition-all duration-300 active:scale-[0.98]',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
    'disabled:cursor-not-allowed disabled:opacity-60',
    VARIANTS[variant] || VARIANTS.primary,
    SIZES[size] || SIZES.md,
    className,
  ].join(' ');

  const content = (
    <>
      {IconComponent && !iconRight && <IconComponent className="h-4 w-4" aria-hidden="true" />}
      <span>{children}</span>
      {IconComponent && iconRight && <IconComponent className="h-4 w-4" aria-hidden="true" />}
    </>
  );

  if (href) {
    return (
      <a href={href} className={classes} {...rest}>
        {content}
      </a>
    );
  }

  return (
    <button className={classes} {...rest}>
      {content}
    </button>
  );
}