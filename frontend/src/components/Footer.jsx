import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const LOGO_URL = process.env.PUBLIC_URL + '/logo-negative.png';

export default function Footer() {
  const { t } = useLanguage();

  const scrollTo = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const links = [
    { label: t.footer.links.services, href: '#services' },
    { label: t.footer.links.caseStudies, href: '#case-studies' },
    { label: t.footer.links.about, href: '#founder' },
    { label: t.footer.links.contact, href: '#contact' },
  ];

  return (
    <footer className="relative bg-[#040914] border-t border-white/8" data-testid="footer">
      <div className="absolute top-0 left-0 right-0 h-px shimmer-border" />

      <div className="max-w-7xl mx-auto px-5 sm:px-6 py-14 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div className="space-y-5">
            <img
              src={LOGO_URL}
              alt="Shiratics"
              className="h-12 w-auto"
              data-testid="footer-logo"
            />
            <p className="text-[#8BA0B8] text-sm leading-relaxed font-plex max-w-xs">
              Enterprise data intelligence for FMCG, retail, and multi-branch businesses across Indonesia.
            </p>
            <p className="text-[#00D1E9] text-xs font-outfit italic opacity-60">
              {t.footer.tagline}
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <p className="text-white text-xs font-outfit font-medium uppercase tracking-[0.15em] mb-5">
              Navigation
            </p>
            <div className="flex flex-col gap-3">
              {links.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className="text-[#8BA0B8] hover:text-white text-sm transition-colors duration-200 text-left font-plex"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <p className="text-white text-xs font-outfit font-medium uppercase tracking-[0.15em] mb-5">
              Contact
            </p>
            <div className="flex flex-col gap-3">
              <a
                href="https://wa.me/+628****7655"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#8BA0B8] hover:text-[#25D366] text-sm transition-colors duration-200 font-plex"
                data-testid="footer-whatsapp"
              >
                +62 822 5990 7655
              </a>
              <a
                href="mailto:mail@shiratics.com"
                className="text-[#8BA0B8] hover:text-[#00D1E9] text-sm transition-colors duration-200 font-plex"
                data-testid="footer-email"
              >
                mail@shiratics.com
              </a>
              <a
                href="https://www.instagram.com/shiratics/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#8BA0B8] hover:text-[#E1306C] text-sm transition-colors duration-200 font-plex"
                data-testid="footer-instagram"
              >
                @shiratics
              </a>
              <a
                href="#"
                className="text-[#8BA0B8] hover:text-[#F76F2E] text-sm transition-colors duration-200 font-plex"
                data-testid="footer-booking"
              >
                Book Consultation
              </a>
            </div>
          </div>

          {/* Address & Map */}
          <div className="space-y-4">
            <p className="text-white text-xs font-outfit font-medium uppercase tracking-[0.15em] mb-5">
              Office Address
            </p>
            <div className="space-y-2">
              <p className="text-[#8BA0B8] text-xs leading-relaxed font-plex">
                SOHO Building, 30rd Floor<br />
                Jl. Let. Jend. MT Haryono Kav. 2<br />
                Pancoran<br />
                Jakarta Selatan - Indonesia
              </p>
              <a
                href="https://maps.app.goo.gl/e2kZ7Y7SRLnJkmnt6"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#00D1E9] hover:text-white text-xs font-outfit transition-colors duration-200 inline-flex items-center gap-1"
                data-testid="footer-maps"
              >
                View on Maps ↗
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/8 pt-8 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-[#8BA0B8] text-xs font-plex">{t.footer.rights}</p>
          <p className="text-[#8BA0B8] text-xs font-plex">{t.footer.parent}</p>
        </div>
      </div>
    </footer>
  );
}
