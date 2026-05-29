import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const LOGO_URL = 'https://customer-assets.emergentagent.com/job_data-core-sphere/artifacts/i30zm9vo_LensaData%20Logo%2002%20-%20Positive%20White.png';

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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">

          {/* Brand */}
          <div className="space-y-5">
            <img
              src={LOGO_URL}
              alt="LensaData"
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
                href="https://wa.me/6285117577707"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#8BA0B8] hover:text-[#25D366] text-sm transition-colors duration-200 font-plex"
                data-testid="footer-whatsapp"
              >
                +62 851 1757 7707
              </a>
              <a
                href="mailto:mail@lensadata.my.id"
                className="text-[#8BA0B8] hover:text-[#00D1E9] text-sm transition-colors duration-200 font-plex"
                data-testid="footer-email"
              >
                mail@lensadata.my.id
              </a>
              <a
                href="https://www.instagram.com/lensa_data.id"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#8BA0B8] hover:text-[#E1306C] text-sm transition-colors duration-200 font-plex"
                data-testid="footer-instagram"
              >
                @lensa_data.id
              </a>
              <a
                href="https://s.id/konsultasi-data"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#8BA0B8] hover:text-[#F76F2E] text-sm transition-colors duration-200 font-plex"
                data-testid="footer-booking"
              >
                Book Consultation
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
