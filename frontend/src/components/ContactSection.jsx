import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Mail, Instagram, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function ContactSection() {
  const { t } = useLanguage();
  const c = t.contact;

  const cards = [
    {
      icon: MessageCircle,
      color: '#25D366',
      title: c.whatsapp,
      desc: c.whatsappDesc,
      cta: 'Chat on WhatsApp',
      href: 'https://wa.me/+6282259907655',
      testid: 'contact-whatsapp',
    },
    {
      icon: Mail,
      color: '#00D1E9',
      title: c.email,
      desc: c.emailDesc,
      cta: 'mail@shiratics.com',
      href: 'mailto:mail@shiratics.com',
      testid: 'contact-email',
    },
    {
      icon: Instagram,
      color: '#E1306C',
      title: 'Instagram',
      desc: 'Follow our journey, dashboards, and case studies on Instagram.',
      cta: '@shiratics',
      href: '#',
      testid: 'contact-instagram',
    },
  ];

  return (
    <section id="contact" className="relative py-20 sm:py-28 section-gradient" data-testid="contact-section">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full blur-[120px]"
          style={{ background: 'rgba(13,58,112,0.2)' }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <p className="text-[#00D1E9] text-xs font-outfit tracking-[0.2em] uppercase mb-4">
            {c.overline}
          </p>
          <h2 className="font-outfit font-bold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight mb-5">
            {c.title}
          </h2>
          <p className="text-[#8BA0B8] text-base font-plex max-w-xl mx-auto leading-relaxed">
            {c.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12 sm:mb-14">
          {cards.map((card, i) => (
            <motion.a
              key={i}
              href={card.href}
              target={card.href.startsWith('mailto') ? '_self' : '_blank'}
              rel="noopener noreferrer"
              data-testid={card.testid}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="group glass rounded-xl p-7 sm:p-8 border border-white/5 transition-all duration-300 hover:-translate-y-1.5 block"
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${card.color}35`; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'; }}
            >
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110"
                style={{ background: `${card.color}12`, border: `1px solid ${card.color}28` }}
              >
                <card.icon size={24} color={card.color} />
              </div>
              <h3 className="font-outfit font-semibold text-white text-xl mb-2">{card.title}</h3>
              <p className="text-[#8BA0B8] text-sm leading-relaxed font-plex mb-6">{card.desc}</p>
              <div
                className="inline-flex items-center gap-2 text-sm font-outfit font-medium transition-all duration-200 group-hover:gap-3"
                style={{ color: card.color }}
              >
                <span className="truncate max-w-[220px]">{card.cta}</span>
                <ArrowRight size={14} className="flex-shrink-0" />
              </div>
            </motion.a>
          ))}
        </div>

        <div className="text-center">
          <a
            href="https://wa.me/+6282259907655"
            target="_blank"
            rel="noopener noreferrer"
            data-testid="contact-main-cta"
            className="inline-flex items-center gap-3 bg-[#00D1E9] text-[#040914] font-bold font-outfit px-8 sm:px-10 py-4 rounded-xl text-base hover:bg-white transition-all duration-200 hover:shadow-2xl hover:shadow-[#00D1E9]/25"
          >
            {c.cta}
            <ArrowRight size={18} />
          </a>
          <p className="text-white/20 text-xs font-plex mt-4">
            Free consultation, no commitment required.
          </p>
        </div>
      </div>
    </section>
  );
}
