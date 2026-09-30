// src/components/sections/Contact.jsx

import { useState } from 'react';
import {
  Clock3,
  Loader2,
  Mail,
  MapPin,
  Phone,
  Send,
  MessageCircle,
  ArrowUpRight,
  CalendarDays,
} from 'lucide-react';

import { siteInfo } from '../../data/siteInfo.js';
import { services } from '../../data/services.js';
import SectionTitle from '../ui/SectionTitle';
import Reveal from '../ui/Reveal';
import Button from '../ui/Button';

const INITIAL_FORM = {
  name: '',
  phone: '',
  email: '',
  service: '',
  date: '',
  message: '',
};

const FIELD_CLASS =
  'w-full rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-3.5 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition-all duration-300 focus:border-primary-500 focus:bg-white focus:ring-4 focus:ring-primary-500/10';

const LABEL_CLASS =
  'mb-2 block text-sm font-semibold text-slate-700';

function validate(form) {
  const errors = {};

  if (!form.name.trim()) {
    errors.name = 'Please enter your full name.';
  }

  if (!form.phone.trim()) {
    errors.phone = 'Please enter a phone number.';
  }

  if (!form.email.trim()) {
    errors.email = 'Please enter your email address.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'Please enter a valid email address.';
  }

  if (!form.service) {
    errors.service = 'Please choose a service.';
  }

  if (!form.date) {
    errors.date = 'Please choose a preferred date.';
  }

  return errors;
}

export default function Contact() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');

  const today = new Date().toISOString().split('T')[0];

  /*
   * WhatsApp number
   *
   * This removes spaces, brackets, + and dashes from your
   * existing phone number and creates a WhatsApp link.
   *
   * Example:
   * +234 800 000 0000
   * becomes:
   * 234800000000
   */
  const whatsappNumber = siteInfo.phone
    ?.replace(/\D/g, '')
    .replace(/^0/, '234');

  const whatsappMessage = encodeURIComponent(
    'Hello, I would like to make an appointment. Please provide more information.'
  );

  const whatsappHref = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));

    setErrors((current) => ({
      ...current,
      [name]: undefined,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const nextErrors = validate(form);

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) return;

    setStatus('loading');

    /*
     * IMPORTANT:
     * This is still only a visual/demo submission.
     *
     * To actually receive these appointment requests by email,
     * connect this to Resend, Formspree, EmailJS, or your own API.
     */

    await new Promise((resolve) => setTimeout(resolve, 900));

    setStatus('success');
    setForm(INITIAL_FORM);
  };

  const contactCards = [
    {
      id: 'phone',
      icon: Phone,
      label: 'Call us',
      value: siteInfo.phone,
      href: siteInfo.phoneHref,
    },
    {
      id: 'whatsapp',
      icon: MessageCircle,
      label: 'WhatsApp',
      value: 'Chat with our team',
      href: whatsappHref,
      special: true,
    },
    {
      id: 'email',
      icon: Mail,
      label: 'Email us',
      value: siteInfo.email,
      href: siteInfo.emailHref,
    },
    {
      id: 'address',
      icon: MapPin,
      label: 'Visit us',
      value: siteInfo.address,
      href: null,
    },
  ];

  return (
    <section
      id="appointment"
      className="relative overflow-hidden bg-slate-50 py-20 sm:py-24 lg:py-28"
    >
      {/* Background decoration */}
      <div className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-primary-100/40 blur-3xl" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-primary-50 blur-3xl" />

      <div className="container-x relative z-10">
        <SectionTitle
          eyebrow="Appointment"
          title="Let's get you taken care of"
          subtitle="Book an appointment with our team and we'll get back to you to confirm your preferred time."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-5 lg:items-stretch lg:gap-10">

          {/* =========================
              APPOINTMENT FORM
          ========================== */}
          <Reveal className="lg:col-span-3">
            <form
              onSubmit={handleSubmit}
              noValidate
              className="relative overflow-hidden rounded-[2rem] border border-white bg-white p-6 shadow-[0_20px_60px_-25px_rgba(15,23,42,0.2)] sm:p-8 lg:p-10"
            >
              {/* Form top accent */}
              <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-primary-700 via-primary-500 to-primary-300" />

              <div className="mb-8 flex items-start justify-between gap-5">
                <div>
                  <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-primary-50 text-primary-600">
                    <CalendarDays className="h-5 w-5" />
                  </div>

                  <h3 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
                    Request an appointment
                  </h3>

                  <p className="mt-2 max-w-md text-sm leading-relaxed text-slate-500">
                    Complete the form below and our team will contact you to confirm your appointment.
                  </p>
                </div>

                <span className="hidden rounded-full bg-primary-50 px-3 py-1.5 text-xs font-semibold text-primary-700 sm:inline-flex">
                  Quick & easy
                </span>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">

                {/* Name */}
                <div>
                  <label htmlFor="name" className={LABEL_CLASS}>
                    Full name <span className="text-accent-600">*</span>
                  </label>

                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="e.g. Adaeze Okafor"
                    value={form.name}
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.name)}
                    className={`${FIELD_CLASS} ${
                      errors.name
                        ? 'border-red-300 focus:border-red-400 focus:ring-red-500/10'
                        : ''
                    }`}
                  />

                  {errors.name && (
                    <p className="mt-1.5 text-xs font-medium text-red-600">
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className={LABEL_CLASS}>
                    Phone number <span className="text-accent-600">*</span>
                  </label>

                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="+234 800 000 0000"
                    value={form.phone}
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.phone)}
                    className={`${FIELD_CLASS} ${
                      errors.phone
                        ? 'border-red-300 focus:border-red-400 focus:ring-red-500/10'
                        : ''
                    }`}
                  />

                  {errors.phone && (
                    <p className="mt-1.5 text-xs font-medium text-red-600">
                      {errors.phone}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className={LABEL_CLASS}>
                    Email address <span className="text-accent-600">*</span>
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.email)}
                    className={`${FIELD_CLASS} ${
                      errors.email
                        ? 'border-red-300 focus:border-red-400 focus:ring-red-500/10'
                        : ''
                    }`}
                  />

                  {errors.email && (
                    <p className="mt-1.5 text-xs font-medium text-red-600">
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Service */}
                <div>
                  <label htmlFor="service" className={LABEL_CLASS}>
                    Service required <span className="text-accent-600">*</span>
                  </label>

                  <select
                    id="service"
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.service)}
                    className={`${FIELD_CLASS} ${
                      errors.service
                        ? 'border-red-300 focus:border-red-400 focus:ring-red-500/10'
                        : ''
                    }`}
                  >
                    <option value="">Select a service…</option>

                    {services.map((service) => (
                      <option key={service.id} value={service.title}>
                        {service.title}
                      </option>
                    ))}
                  </select>

                  {errors.service && (
                    <p className="mt-1.5 text-xs font-medium text-red-600">
                      {errors.service}
                    </p>
                  )}
                </div>

                {/* Date */}
                <div className="sm:col-span-2">
                  <label htmlFor="date" className={LABEL_CLASS}>
                    Preferred date <span className="text-accent-600">*</span>
                  </label>

                  <input
                    id="date"
                    name="date"
                    type="date"
                    min={today}
                    value={form.date}
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.date)}
                    className={`${FIELD_CLASS} ${
                      errors.date
                        ? 'border-red-300 focus:border-red-400 focus:ring-red-500/10'
                        : ''
                    }`}
                  />

                  {errors.date && (
                    <p className="mt-1.5 text-xs font-medium text-red-600">
                      {errors.date}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div className="sm:col-span-2">
                  <label htmlFor="message" className={LABEL_CLASS}>
                    Additional information
                    <span className="ml-1 font-normal text-slate-400">
                      (optional)
                    </span>
                  </label>

                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    placeholder="Tell us anything you'd like our team to know..."
                    value={form.message}
                    onChange={handleChange}
                    className={`${FIELD_CLASS} resize-none`}
                  />
                </div>
              </div>

              <div className="mt-8 border-t border-slate-100 pt-6">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                  <p className="max-w-sm text-xs leading-relaxed text-slate-500">
                    Your information is kept confidential and will only be used
                    to process your appointment request.
                  </p>

                  <Button
                    type="submit"
                    size="lg"
                    disabled={status === 'loading'}
                    icon={status === 'loading' ? Loader2 : Send}
                    className={`min-w-[190px] ${
                      status === 'loading'
                        ? '[&>svg]:animate-spin'
                        : ''
                    }`}
                  >
                    {status === 'loading'
                      ? 'Sending…'
                      : 'Request Appointment'}
                  </Button>
                </div>
              </div>

              {status === 'success' && (
                <div
                  role="status"
                  className="mt-6 flex items-start gap-3 rounded-2xl border border-primary-100 bg-primary-50 px-4 py-4"
                >
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary-600 text-white">
                    ✓
                  </span>

                  <div>
                    <p className="text-sm font-bold text-primary-900">
                      Appointment request received
                    </p>

                    <p className="mt-1 text-sm leading-relaxed text-primary-700">
                      Thank you. Our team will contact you shortly to confirm
                      your appointment.
                    </p>
                  </div>
                </div>
              )}
            </form>
          </Reveal>

          {/* =========================
              CONTACT INFORMATION
          ========================== */}
          <Reveal delay={140} className="lg:col-span-2">
            <div className="flex h-full flex-col gap-5">

              {/* Contact cards */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                {contactCards.map((card) => {
                  const CardIcon = card.icon;

                  const content = (
                    <>
                      <span
                        className={`inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${
                          card.special
                            ? 'bg-emerald-50 text-emerald-600'
                            : 'bg-primary-50 text-primary-600'
                        }`}
                      >
                        <CardIcon
                          className="h-5 w-5"
                          aria-hidden="true"
                        />
                      </span>

                      <span className="min-w-0 flex-1">
                        <span className="flex items-center justify-between gap-3">
                          <span className="text-xs font-bold uppercase tracking-[0.15em] text-slate-400">
                            {card.label}
                          </span>

                          {card.href && (
                            <ArrowUpRight className="h-4 w-4 text-slate-300 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary-500" />
                          )}
                        </span>

                        <span
                          className={`mt-1 block truncate text-sm font-semibold ${
                            card.special
                              ? 'text-emerald-700'
                              : 'text-slate-800'
                          }`}
                        >
                          {card.value}
                        </span>
                      </span>
                    </>
                  );

                  return card.href ? (
                    <a
                      key={card.id}
                      href={card.href}
                      target={card.id === 'whatsapp' ? '_blank' : undefined}
                      rel={
                        card.id === 'whatsapp'
                          ? 'noopener noreferrer'
                          : undefined
                      }
                      className={`group flex items-center gap-4 rounded-2xl border bg-white p-5 shadow-[0_10px_35px_-20px_rgba(15,23,42,0.3)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-20px_rgba(15,23,42,0.25)] ${
                        card.special
                          ? 'border-emerald-100 hover:border-emerald-200'
                          : 'border-slate-100 hover:border-primary-100'
                      }`}
                    >
                      {content}
                    </a>
                  ) : (
                    <div
                      key={card.id}
                      className="group flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-[0_10px_35px_-20px_rgba(15,23,42,0.3)]"
                    >
                      {content}
                    </div>
                  );
                })}
              </div>

              {/* Working hours */}
              <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-[0_10px_35px_-20px_rgba(15,23,42,0.3)]">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-primary-50 text-primary-600">
                    <Clock3 className="h-5 w-5" aria-hidden="true" />
                  </span>

                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.15em] text-slate-400">
                      Availability
                    </p>

                    <h3 className="mt-0.5 text-base font-bold text-slate-900">
                      Working hours
                    </h3>
                  </div>
                </div>

                <dl className="mt-6 space-y-3">
                  {siteInfo.hours.map((entry) => (
                    <div
                      key={entry.day}
                      className="flex items-center justify-between gap-4 border-b border-dashed border-slate-100 pb-3 last:border-0 last:pb-0"
                    >
                      <dt className="text-sm text-slate-500">
                        {entry.day}
                      </dt>

                      <dd className="text-sm font-semibold text-slate-900">
                        {entry.time}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              {/* WhatsApp CTA */}
              <div className="relative overflow-hidden rounded-3xl bg-primary-700 p-7 text-white shadow-[0_20px_50px_-20px_rgba(15,23,42,0.4)]">
                <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-white/10" />
                <div className="absolute -bottom-16 -left-10 h-40 w-40 rounded-full bg-white/5" />

                <div className="relative">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
                    <MessageCircle className="h-6 w-6" />
                  </div>

                  <h3 className="mt-5 text-xl font-bold">
                    Prefer WhatsApp?
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-primary-100">
                    Chat directly with our team for quick questions,
                    appointments and enquiries.
                  </p>

                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-primary-700 transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-50"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Chat on WhatsApp
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>
              </div>

            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

