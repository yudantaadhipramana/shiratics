import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Lenis from 'lenis';
import { LanguageProvider } from './context/LanguageContext';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ScrollStory from './components/ScrollStory';
import TrustMetrics from './components/TrustMetrics';
import ServicesSection from './components/ServicesSection';
import CaseStudies from './components/CaseStudies';
import FounderSection from './components/FounderSection';
import ContactSection from './components/ContactSection';
import FloatingActions from './components/FloatingActions';
import Footer from './components/Footer';
import TrustedBySection from './components/TrustedBySection';

function LandingPage() {
  useEffect(() => {
    let lenis;
    try {
      lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });

      let rafId;
      function raf(time) {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      }
      rafId = requestAnimationFrame(raf);

      return () => {
        cancelAnimationFrame(rafId);
        lenis.destroy();
      };
    } catch (e) {
      console.warn('Lenis smooth scroll unavailable:', e);
    }
  }, []);

  return (
    <div className="bg-[#040914] text-white overflow-x-hidden font-plex">
      <Navbar />
      <main>
        <HeroSection />
        <ScrollStory />
        <TrustMetrics />
        <TrustedBySection />
        <ServicesSection />
        <CaseStudies />
        <FounderSection />
        <ContactSection />
      </main>
      <Footer />
      <FloatingActions />
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <LandingPage />
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
