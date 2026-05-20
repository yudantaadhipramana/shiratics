import React from 'react';

const CLIENTS = [
  {
    url: 'https://customer-assets.emergentagent.com/job_data-core-sphere/artifacts/fjrqhcpn_LOGO%20DIM%20teks%20hitam.png',
    name: 'Dwikarya Indonesia Mandiri',
  },
  {
    url: 'https://customer-assets.emergentagent.com/job_data-core-sphere/artifacts/y98vargm_Logo%20PT%20Fast%20square.png',
    name: 'PT FAST',
  },
  {
    url: 'https://customer-assets.emergentagent.com/job_data-core-sphere/artifacts/nr3n4fy6_LOGO%20SAS.png',
    name: 'PT. Sarianugerah Semesta',
  },
  {
    url: 'https://customer-assets.emergentagent.com/job_data-core-sphere/artifacts/5ouksd8d_CV%20SEJAHTERA.PNG',
    name: 'CV. Sejahtera',
  },
  {
    url: 'https://customer-assets.emergentagent.com/job_data-core-sphere/artifacts/mp95ippq_LOGO%20CPS%20PUTIH.png',
    name: 'Celebes Putera Sejahtera',
  },
];

// Tripled for seamless infinite scroll
const MARQUEE_LOGOS = [...CLIENTS, ...CLIENTS, ...CLIENTS];

export default function TrustedBySection() {
  return (
    <section
      className="relative py-14 overflow-hidden"
      data-testid="trusted-by-section"
      style={{ background: 'linear-gradient(180deg, #040914 0%, #0A162B 50%, #040914 100%)' }}
    >
      <div className="absolute top-0 left-0 right-0 h-px shimmer-border" />
      <div className="absolute bottom-0 left-0 right-0 h-px shimmer-border" />

      {/* Label */}
      <div className="text-center mb-10">
        <p
          className="text-xs font-outfit tracking-[0.28em] uppercase"
          style={{ color: 'rgba(139,160,184,0.5)' }}
          data-testid="trusted-by-label"
        >
          TRUSTED BY LEADING INDONESIAN ENTERPRISES
        </p>
      </div>

      {/* Marquee track */}
      <div className="relative">
        {/* Left fade */}
        <div
          className="absolute left-0 top-0 bottom-0 w-36 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, #040914, transparent)' }}
        />
        {/* Right fade */}
        <div
          className="absolute right-0 top-0 bottom-0 w-36 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, #040914, transparent)' }}
        />

        {/* Scrolling logos */}
        <div
          className="flex items-center gap-5"
          style={{
            width: 'max-content',
            animation: 'marqueeScroll 22s linear infinite',
          }}
          data-testid="trusted-by-marquee"
        >
          {MARQUEE_LOGOS.map((client, i) => (
            <div
              key={i}
              className="flex-shrink-0 flex items-center justify-center rounded-xl transition-all duration-400 group cursor-default"
              style={{
                width: 168,
                height: 84,
                padding: '12px 18px',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.07)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
                e.currentTarget.style.borderColor = 'rgba(0,209,233,0.25)';
                const img = e.currentTarget.querySelector('img');
                if (img) img.style.filter = 'grayscale(0) brightness(1.15) opacity(1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
                const img = e.currentTarget.querySelector('img');
                if (img) img.style.filter = 'grayscale(1) brightness(2.2) opacity(0.62)';
              }}
            >
              <img
                src={client.url}
                alt={client.name}
                loading="lazy"
                style={{
                  height: '48px',
                  width: 'auto',
                  maxWidth: '130px',
                  objectFit: 'contain',
                  mixBlendMode: 'screen',
                  filter: 'grayscale(1) brightness(2.2) opacity(0.62)',
                  transition: 'filter 0.35s ease',
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
