// src/data/services.js
/**
 * The 8 clinic services.
 * `icon` maps to a key in components/ui/Icon.jsx
 */
export const services = [
  {
    id: 'medical-lab',
    icon: 'flask',
    title: 'Comprehensive Medical Laboratory Investigation',
    description:
      'Haematology, biochemistry, microbiology and pathology panels processed on calibrated automated analysers, with same-day results for most routine tests.',
  },
  {
    id: 'immunoassay-fertility',
    icon: 'baby',
    title: 'Immunoassay / Fertility',
    description:
      'Hormonal assays, fertility profiles, antenatal screening and tumour markers run on precision immunoassay systems for reliable clinical decisions.',
  },
  {
    id: 'ultrasound',
    icon: 'scan',
    title: 'Ultrasound Scan Investigation',
    description:
      'Abdominal, pelvic, obstetric, thyroid, breast and soft-tissue scanning performed by experienced sonographers in a private, comfortable suite.',
  },
  {
    id: 'digital-xray',
    icon: 'bone',
    title: 'Digital X-Ray Radiology',
    description:
      'Low-dose digital radiography producing sharper chest, bone and joint images with faster reporting and less waiting around.',
  },
  {
    id: 'pre-school-check',
    icon: 'graduation',
    title: 'Pre-School Check',
    description:
      'Complete paediatric screening, growth assessment and medical fitness certification for children entering or returning to school.',
  },
  {
    id: 'medical-fitness',
    icon: 'activity',
    title: 'Medical Fitness',
    description:
      'Pre-employment, driver, sport and general fitness assessments, issued with certified medical reports accepted by employers and agencies.',
  },
  {
    id: 'pre-overseas-check',
    icon: 'plane',
    title: 'Pre-Overseas Check',
    description:
      'Travel, study and visa medical examinations, vaccination records and documentation prepared to meet destination-country requirements.',
  },
  {
    id: 'medical-consultancy',
    icon: 'stethoscope',
    title: 'Medical Consultancy',
    description:
      'One-on-one consultations with qualified doctors for diagnosis review, second opinions, chronic care planning and health counselling.',
  },
];

export default services;