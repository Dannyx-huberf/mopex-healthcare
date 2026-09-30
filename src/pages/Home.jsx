// src/pages/Home.jsx
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Services from '../components/sections/Services';
import WhyChooseUs from '../components/sections/WhyChooseUs';
import Testimonials from '../components/sections/Testimonials';
import Contact from '../components/sections/Contact';
import FAQ from '../components/sections/FAQ';

/**
 * Single-page layout composed of independent sections.
 * Swap this out for a router later if you need multiple pages.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <WhyChooseUs />
      <Testimonials />
      <Contact />
      <FAQ />
    </>
  );
}