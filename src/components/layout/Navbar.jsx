// src/components/layout/Navbar.jsx
import { useEffect, useState } from 'react';
import { Menu, Phone, X } from 'lucide-react';
import { navLinks } from '../../data/navlinks.js';
import { siteInfo } from '../../data/siteInfo.js';
import Button from '../ui/Button';
import logo from '../../assets/logo.svg';

/**
 * Fixed navigation bar styled to sit over the dark hero slideshow.
 * Transparent at the top, frosted dark glass once scrolled.
 */
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const closeMenu = () => setOpen(false);

  return (
    <header
      className={[
        'fixed inset-x-0 top-0 z-50 border-b transition-all duration-500',
        scrolled || open
          ? 'border-white/10 bg-slate-900/80 shadow-lg shadow-slate-950/20 backdrop-blur-xl'
          : 'border-transparent bg-gradient-to-b from-slate-950/50 to-transparent',
      ].join(' ')}
    >
      <nav
        className={[
          'container-x flex items-center justify-between transition-all duration-500',
          scrolled ? 'h-16' : 'h-20',
        ].join(' ')}
        aria-label="Main navigation"
      >
        {/* Brand */}
        <a
          href="#home"
          onClick={closeMenu}
          className="group flex items-center gap-2.5 rounded-lg focus-visible:ring-2 focus-visible:ring-primary-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
        >
          <img
            src={logo}
            alt=""
            className="h-10 w-10 transition-transform duration-500 ease-out group-hover:rotate-[8deg] group-hover:scale-110"
          />
          <span className="flex flex-col leading-none">
            <span className="text-lg font-extrabold text-white transition-colors group-hover:text-primary-200">
              {siteInfo.brandTop}
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent-400 transition-all duration-300 group-hover:tracking-[0.26em]">
              {siteInfo.brandBottom}
            </span>
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="relative block rounded-full px-4 py-2 text-sm font-semibold text-slate-200 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/10 hover:text-white focus-visible:ring-2 focus-visible:ring-primary-300 after:absolute after:bottom-1 after:left-1/2 after:h-0.5 after:w-0 after:-translate-x-1/2 after:rounded-full after:bg-accent-400 after:transition-all after:duration-300 hover:after:w-5"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop actions */}
        <div className="hidden items-center gap-5 lg:flex">
          <a
            href={siteInfo.phoneHref}
            className="group inline-flex items-center gap-2 rounded-full text-sm font-semibold text-white transition-colors hover:text-primary-200 focus-visible:ring-2 focus-visible:ring-primary-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
          >
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/10 transition-all duration-300 group-hover:rotate-12 group-hover:scale-110 group-hover:border-accent-400 group-hover:bg-accent-500 group-hover:text-white">
              <Phone className="h-4 w-4" aria-hidden="true" />
            </span>
            {siteInfo.phone}
          </a>
          <Button
            href="#appointment"
            size="sm"
            className="transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary-500/30 active:translate-y-0"
          >
            Book Appointment
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
          className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/20 bg-white/10 text-white backdrop-blur transition-all duration-300 hover:bg-white/20 active:scale-95 focus-visible:ring-2 focus-visible:ring-primary-300 lg:hidden"
        >
          <span className={`transition-transform duration-300 ${open ? 'rotate-90' : 'rotate-0'}`}>
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </span>
        </button>
      </nav>

      {/* Mobile panel */}
      <div
        id="mobile-menu"
        className={[
          'absolute inset-x-0 top-full origin-top border-t border-white/10 bg-slate-900/95 shadow-2xl backdrop-blur-xl transition-all duration-300 lg:hidden',
          open
            ? 'pointer-events-auto translate-y-0 opacity-100'
            : 'pointer-events-none -translate-y-3 opacity-0',
        ].join(' ')}
      >
        <ul className="container-x flex flex-col gap-1 py-5">
          {navLinks.map((link, i) => (
            <li
              key={link.href}
              className={`transition-all duration-500 ${
                open ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'
              }`}
              style={{ transitionDelay: open ? `${80 + i * 50}ms` : '0ms' }}
            >
              <a
                href={link.href}
                onClick={closeMenu}
                className="group flex items-center justify-between rounded-xl px-4 py-3 text-base font-semibold text-slate-200 transition-all duration-300 hover:bg-white/10 hover:pl-6 hover:text-white"
              >
                {link.label}
                <span className="h-0.5 w-0 rounded-full bg-accent-400 transition-all duration-300 group-hover:w-6" />
              </a>
            </li>
          ))}
        </ul>

        <div className="container-x flex flex-col gap-3 pb-6">
          <a
            href={siteInfo.phoneHref}
            className="inline-flex items-center gap-2 text-sm font-semibold text-white"
          >
            <Phone className="h-4 w-4 text-accent-400" aria-hidden="true" />
            {siteInfo.phone}
          </a>
          <Button href="#appointment" className="w-full" onClick={closeMenu}>
            Book Appointment
          </Button>
        </div>
      </div>
    </header>
  );
}