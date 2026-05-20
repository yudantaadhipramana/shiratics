import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Database, Brain, Monitor, TrendingUp, Zap, Globe2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const ICONS = [BarChart3, Database, Brain, Monitor, TrendingUp, Zap, Globe2];
const COLORS = ['#00D1E9', '#F76F2E', '#00D1E9', '#1F7D9F', '#F76F2E', '#00D1E9', '#1F7D9F'];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function ServicesSection() {
  const { t } = useLanguage();
  const services = t.services.items;

  return (
    <section id="services" className="relative py-28 bg-[#040914]" data-testid="services-section">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-2xl mb-16">
          <p className="text-[#00D1E9] text-xs font-outfit tracking-[0.2em] uppercase mb-4">
            WHAT WE DO
          </p>
          <h2 className="font-outfit font-bold text-4xl lg:text-5xl text-white tracking-tight mb-4">
            {t.services.title}
          </h2>
          <p className="text-[#8BA0B8] text-base font-plex leading-relaxed">
            {t.services.subtitle}
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          data-testid="services-grid"
        >
          {services.map((service, i) => {
            const Icon = ICONS[i];
            const color = COLORS[i];

            return (
              <motion.div
                key={i}
                variants={itemVariants}
                data-testid={`service-card-${i}`}
                className="group relative glass rounded-xl p-7 border border-white/5 transition-all duration-300 hover:-translate-y-1.5 cursor-default overflow-hidden"
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${color}45`; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'; }}
              >
                {/* Hover glow bg */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none rounded-xl"
                  style={{ background: `radial-gradient(ellipse at bottom left, ${color}08 0%, transparent 65%)` }}
                />

                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110 relative z-10"
                  style={{ background: `${color}12`, border: `1px solid ${color}28` }}
                >
                  <Icon size={22} color={color} />
                </div>

                <h3 className="font-outfit font-semibold text-white text-lg mb-2 relative z-10">
                  {service.title}
                </h3>
                <p className="text-[#8BA0B8] text-sm leading-relaxed font-plex relative z-10">
                  {service.desc}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
