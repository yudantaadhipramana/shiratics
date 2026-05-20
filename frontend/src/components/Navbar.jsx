import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const LOGO_URL = 'https://customer-assets.emergentagent.com/job_data-core-sphere/artifacts/i30zm9vo_LensaData%20Logo%2002%20-%20Positive%20White.png';

export default function Navbar() {
  const { language, toggleLanguage, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { label: t.nav.services, href: '#services' },
    { label: t.nav.caseStudies, href: '#case-studies' },
    { label: t.nav.about, href: '#founder' },
    { label: t.nav.contact, href: '#contact' },
  ];

  const scrollTo = (href) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <nav
        data-testid="navbar"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'glass-strong shadow-lg shadow-black/30' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-6 py-4 flex items-center justify-between">
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            data-testid="navbar-logo-link"
          >
            <img src={LOGO_URL} alt="LensaData" className="h-10 w-auto" data-testid="navbar-logo" />
          </a>

          <div className="hidden md:flex items-center gap-8" data-testid="desktop-nav">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="text-white/60 hover:text-white text-sm font-plex tracking-wide transition-colors duration-200"
                data-testid={`nav-link-${link.href.replace('#', '')}`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button
              data-testid="language-toggle"
              onClick={toggleLanguage}
              className="flex items-center gap-1 text-sm font-outfit border border-white/20 rounded-full px-3 py-1.5 hover:border-[#00D1E9]/60 transition-all duration-200"
            >
              <span className={language === 'en' ? 'text-[#00D1E9] font-semibold' : 'text-white/40'}>EN</span>
              <span className="text-white/20 mx-0.5">|</span>
              <span className={language === 'id' ? 'text-[#00D1E9] font-semibold' : 'text-white/40'}>ID</span>
            </button>

            <button
              onClick={() => scrollTo('#contact')}
              data-testid="navbar-cta"
              className="hidden md:inline-flex items-center bg-[#00D1E9] text-[#040914] text-sm font-semibold font-outfit px-5 py-2.5 rounded-lg hover:bg-white transition-all duration-200 hover:shadow-lg hover:shadow-[#00D1E9]/25"
            >
              {t.nav.getStarted}
            </button>

            <button
              data-testid="mobile-menu-toggle"
              className="md:hidden text-white/70 hover:text-white"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            data-testid="mobile-menu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[72px] left-0 right-0 z-40 glass-strong border-b border-white/10 px-5 sm:px-6 py-6 md:hidden"
          >
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className="text-white/80 hover:text-white text-base text-left py-2.5 border-b border-white/5 font-plex"
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => scrollTo('#contact')}
                className="mt-2 w-full bg-[#00D1E9] text-[#040914] font-semibold font-outfit py-3 rounded-lg text-sm"
              >
                {t.nav.getStarted}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
