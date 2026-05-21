import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, BarChart3, LayoutDashboard, Bot, Map, Workflow } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

// Per-card visual metadata (icon + accent color + ambient glow tint)
const CASE_META = [
  { icon: BarChart3,       color: '#00D1E9', accent: 'rgba(0,209,233,0.10)' },
  { icon: LayoutDashboard, color: '#00D1E9', accent: 'rgba(0,209,233,0.10)' },
  { icon: Bot,             color: '#F76F2E', accent: 'rgba(247,111,46,0.10)' },
  { icon: Map,             color: '#0D3A70', accent: 'rgba(13,58,112,0.18)' },
  { icon: Workflow,        color: '#00D1E9', accent: 'rgba(0,209,233,0.10)' },
];

// Optional per-tag color overrides for cards that need stronger contrast.
// Index 3 = Market Intelligence System (per spec).
const TAG_COLOR_OVERRIDES = {
  3: [
    { bg: 'rgba(0,255,255,0.15)',   text: '#00F5FF', border: '#00F5FF', shadow: 'rgba(0,245,255,0.35)' },
    { bg: 'rgba(138,43,226,0.18)',  text: '#C084FC', border: '#A855F7', shadow: 'rgba(168,85,247,0.35)' },
    { bg: 'rgba(255,140,0,0.18)',   text: '#FFB347', border: '#FF8C00', shadow: 'rgba(255,140,0,0.35)' },
  ],
};

function CaseStudyCard({ study, meta, index }) {
  const Icon = meta.icon;
  const tagOverrides = TAG_COLOR_OVERRIDES[index];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
      data-testid={`case-study-card-${index}`}
      className="group relative overflow-hidden rounded-2xl border border-white/8 bg-white/[0.025] hover:border-white/16 hover:bg-white/[0.04] transition-all duration-400 p-6 sm:p-7 h-full flex flex-col"
    >
      <div
        className="absolute -top-16 -right-16 w-48 h-48 rounded-full blur-3xl opacity-60 group-hover:opacity-90 transition-opacity duration-500 pointer-events-none"
        style={{ background: meta.accent }}
      />

      <div
        className="relative w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
        style={{ background: `${meta.color}14`, border: `1px solid ${meta.color}30` }}
      >
        <Icon size={22} color={meta.color} strokeWidth={1.8} />
      </div>

      <div className="relative flex flex-wrap gap-1.5 mb-4">
        {study.tags.map((tag, i) => {
          const ov = tagOverrides && tagOverrides[i];
          const tagStyle = ov
            ? {
                background: ov.bg,
                color: ov.text,
                border: `1px solid ${ov.border}`,
                boxShadow: `0 0 12px ${ov.shadow}, inset 0 0 6px ${ov.shadow}`,
                fontWeight: 600,
              }
            : {
                background: `${meta.color}12`,
                color: meta.color,
                border: `1px solid ${meta.color}22`,
              };
          return (
            <span
              key={i}
              className="text-[9px] font-outfit uppercase tracking-wider px-2.5 py-1 rounded-full"
              style={tagStyle}
            >
              {tag}
            </span>
          );
        })}
      </div>

      <h3 className="relative font-outfit font-semibold text-white text-lg sm:text-xl leading-snug mb-3 group-hover:text-[#00D1E9] transition-colors duration-300">
        {study.title}
      </h3>

      <p className="relative text-[#8BA0B8] text-sm leading-relaxed font-plex flex-1">
        {study.desc}
      </p>

      <div
        className="relative flex items-center gap-1.5 mt-5 pt-4 border-t border-white/5 text-xs font-outfit transition-colors duration-300"
        style={{ color: meta.color }}
      >
        <span>View Details</span>
        <ArrowUpRight size={12} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </div>
    </motion.div>
  );
}

export default function CaseStudies() {
  const { t } = useLanguage();
  const studies = t.caseStudies.items;

  return (
    <section id="case-studies" className="relative py-20 sm:py-28 section-gradient" data-testid="case-studies-section">
      <div className="max-w-7xl mx-auto px-5 sm:px-6">
        <div className="max-w-2xl mb-12 sm:mb-16">
          <p className="text-[#F76F2E] text-xs font-outfit tracking-[0.2em] uppercase mb-4">
            CASE STUDIES
          </p>
          <h2 className="font-outfit font-bold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight mb-4">
            {t.caseStudies.title}
          </h2>
          <p className="text-[#8BA0B8] text-base font-plex leading-relaxed">
            {t.caseStudies.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mb-4 sm:mb-5">
          {studies.slice(0, 3).map((study, i) => (
            <CaseStudyCard key={i} study={study} meta={CASE_META[i]} index={i} />
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {studies.slice(3, 5).map((study, i) => (
            <CaseStudyCard key={i + 3} study={study} meta={CASE_META[i + 3]} index={i + 3} />
          ))}
        </div>
      </div>
    </section>
  );
}
