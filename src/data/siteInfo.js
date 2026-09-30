// src/data/siteInfo.js
/**
 * Global clinic information. Edit this file to rebrand the site.
 */
export const siteInfo = {
  name: 'Mopex Healthcare',
  brandTop: 'Mopex',
  brandBottom: 'Healthcare',
  tagline: 'Accurate diagnostics. Compassionate care.',
  description:
    'Mopex Healthcare is a modern diagnostic and medical consultancy centre delivering accurate laboratory, imaging and fitness assessments — with fast turnaround times and a team that treats you like family.',

  phone: '+234 801 234 5678',
  phoneHref: 'tel:+2348012345678',
  whatsapp: '+234 801 234 5678',
  email: 'hello@mopexhealthcare.com',
  emailHref: 'mailto:hello@mopexhealthcare.com',
  address: '12 Wellness Avenue, Ikeja, Lagos, Nigeria',
  addressLines: ['12 Wellness Avenue,', 'Ikeja, Lagos, Nigeria'],

  hours: [
    { day: 'Monday – Friday', time: '8:00 AM – 7:00 PM' },
    { day: 'Saturday', time: '9:00 AM – 5:00 PM' },
    { day: 'Sunday', time: 'Closed (emergency line open)' },
  ],

  socials: [
    { name: 'Facebook', href: 'https://facebook.com', icon: 'facebook' },
    { name: 'Instagram', href: 'https://instagram.com', icon: 'instagram' },
    { name: 'LinkedIn', href: 'https://linkedin.com', icon: 'linkedin' },
    { name: 'X', href: 'https://x.com', icon: 'x' },
  ],

  images: {
    hero: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80',
    about:
      'https://images.unsplash.com/photo-1582719471384-894fbb16e074?auto=format&fit=crop&w=1200&q=80',
  },
};

export default siteInfo;