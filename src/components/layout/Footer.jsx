// src/components/layout/Footer.jsx
import { Mail, MapPin, Phone } from 'lucide-react';
import { siteInfo } from '../../data/siteInfo';
import { navLinks } from '../../data/navLinks';
import { services } from '../../data/services';
import logo from '../../assets/logo.svg';

/** Inline brand SVG paths — avoids depending on icon-library brand icons. */
const SOCIAL_PATHS = {
  facebook:
    'M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.45 2.89h-2.33v6.99A10 10 0 0 0 22 12z',
  instagram:
    'M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.64.07-4.85.07s-3.58-.01-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85C2.38 3.92 3.9 2.38 7.15 2.23 8.42 2.17 8.8 2.16 12 2.16zm0 3.68a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.41-11.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z',
  linkedin:
    'M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM10 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.4c0-1.29-.02-2.95-1.8-2.95-1.8 0-2.08 1.4-2.08 2.85V21h-4z',
  x: 'M18.9 2H22l-6.77 7.73L23.2 22h-6.2l-4.86-6.36L6.6 22H3.5l7.24-8.27L2.8 2h6.36l4.4 5.8L18.9 2zm-1.1 18h1.72L7.3 3.9H5.46L17.8 20z',
};

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 pt-16 text-slate-400">
      <div className="container-x">
        <div className="grid gap-10 pb-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* Brand */}
          <div>
            <a href="#home" className="flex items-center gap-2.5">
              <img src={logo} alt="" className="h-10 w-10" />
              <span className="flex flex-col leading-none">
                <span className="text-lg font-extrabold text-white">{siteInfo.brandTop}</span>
                <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent-400">
                  {siteInfo.brandBottom}
                </span>
              </span>
            </a>

            <p className="mt-5 text-sm leading-relaxed">
              Modern diagnostics and compassionate medical care — accurate results, delivered fast.
            </p>

            <ul className="mt-6 flex items-center gap-3">
              {siteInfo.socials.map((social) => (
                <li key={social.name}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={`${siteInfo.name} on ${social.name}`}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-slate-300 transition-colors duration-200 hover:bg-primary-600 hover:text-white focus-visible:ring-2 focus-visible:ring-primary-400"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="h-4 w-4"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d={SOCIAL_PATHS[social.icon]} />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick links */}
          <nav aria-label="Quick links">
            <h2 className="text-sm font-bold uppercase tracking-wider text-white">Quick Links</h2>
            <ul className="mt-5 space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm transition-colors duration-200 hover:text-primary-300 focus-visible:ring-2 focus-visible:ring-primary-400"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#appointment"
                  className="text-sm transition-colors duration-200 hover:text-primary-300 focus-visible:ring-2 focus-visible:ring-primary-400"
                >
                  Book Appointment
                </a>
              </li>
            </ul>
          </nav>

          {/* Services */}
          <nav aria-label="Our services">
            <h2 className="text-sm font-bold uppercase tracking-wider text-white">Our Services</h2>
            <ul className="mt-5 space-y-3">
              {services.map((service) => (
                <li key={service.id}>
                  <a
                    href="#services"
                    className="text-sm transition-colors duration-200 hover:text-primary-300 focus-visible:ring-2 focus-visible:ring-primary-400"
                  >
                    {service.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-white">Get In Touch</h2>
            <ul className="mt-5 space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary-400" aria-hidden="true" />
                <span className="text-sm leading-relaxed">
                  {siteInfo.addressLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary-400" aria-hidden="true" />
                <a
                  href={siteInfo.phoneHref}
                  className="text-sm transition-colors hover:text-primary-300"
                >
                  {siteInfo.phone}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary-400" aria-hidden="true" />
                <a
                  href={siteInfo.emailHref}
                  className="text-sm transition-colors hover:text-primary-300"
                >
                  {siteInfo.email}
                </a>
              </li>
            </ul>

            <div className="mt-6 rounded-2xl bg-white/5 p-4">
              <p className="text-xs font-bold uppercase tracking-wider text-primary-300">
                Opening hours
              </p>
              {siteInfo.hours.map((entry) => (
                <p key={entry.day} className="mt-2 text-xs leading-relaxed text-slate-400">
                  <span className="font-semibold text-slate-300">{entry.day}:</span> {entry.time}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 py-6 sm:flex-row">
          <p className="text-xs text-slate-500">
            © {year} {siteInfo.name}. All rights reserved.
          </p>
          <p className="text-xs text-slate-500">
            Registered diagnostic centre · Results are confidential and released only with consent.
          </p>
        </div>
      </div>
    </footer>
  );
}