import React from 'react';
import { motion } from 'framer-motion';
import { Award, Database, Users, Mic2, GitBranch } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const TEAM = [
  {
    name: 'Yudanta Adhipramana',
    role: 'Founder & Lead Architect',
    accent: '#F76F2E',
    img: 'https://customer-assets.emergentagent.com/job_data-core-sphere/artifacts/sh5f7uo6_Akselo%20Founder%20-%20DANTA%20%28Fin%29.jpg',
    testid: 'team-photo-danta',
  },
  {
    name: 'Zainuddin Fanani',
    role: 'Co-Founder',
    accent: '#00D1E9',
    img: 'https://customer-assets.emergentagent.com/job_data-core-sphere/artifacts/bi9y4y54_Akselo%20Founder%20-%20ZAYN%20%28Fin%29.jpg',
    testid: 'team-photo-zayn',
  },
  {
    name: 'Imron Rosyadi',
    role: 'AI Engineer',
    accent: '#22C55E',
    img: 'https://customer-assets.emergentagent.com/job_data-core-sphere/artifacts/xiytxpls_Akselo%20Founder%20-%20IMRON%20%28Fin%29.jpg',
    testid: 'team-photo-imron',
  },
];

const ACHIEVEMENT_ICONS = [Mic2, GitBranch, Database, Users, Award];

export default function FounderSection() {
  const { t } = useLanguage();
  const f = t.founder;

  return (
    <section id="founder" className="relative py-20 sm:py-28 bg-[#040914]" data-testid="founder-section">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#0A162B]/40 to-transparent" />
        <div className="absolute bottom-1/3 left-1/4 w-[400px] h-[400px] rounded-full bg-[#F76F2E]/3 blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <p className="text-[#F76F2E] text-xs font-outfit tracking-[0.2em] uppercase mb-4">
            {f.overline}
          </p>
          <h2 className="font-outfit font-bold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight max-w-2xl mx-auto">
            {f.title}
          </h2>
        </div>

        {/* Team photos row (3 members) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-14 sm:mb-16"
        >
          <p className="text-xs font-outfit tracking-[0.2em] uppercase text-white/40 text-center mb-7">
            {f.sectionTitle}
          </p>
          <div className="grid grid-cols-3 gap-3 sm:gap-5 max-w-4xl mx-auto">
            {TEAM.map((m, i) => (
              <div
                key={m.testid}
                className="relative group"
                data-testid={m.testid}
                style={{ marginTop: i === 1 ? '24px' : i === 2 ? '12px' : 0 }}
              >
                <div className="relative overflow-hidden rounded-2xl aspect-[3/4]">
                  <img
                    src={m.img}
                    alt={m.name}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#040914]/95 via-[#040914]/25 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-5">
                    <div className="text-white font-outfit font-semibold text-xs sm:text-sm md:text-base leading-tight">
                      {m.name}
                    </div>
                    <div className="text-[10px] sm:text-xs font-plex mt-0.5" style={{ color: m.accent }}>
                      {m.role}
                    </div>
                  </div>
                </div>
                <div
                  className="absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-md"
                  style={{ background: `linear-gradient(135deg, ${m.accent}40 0%, transparent 60%)` }}
                />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Shared bio + expertise + achievements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="grid lg:grid-cols-2 gap-10 lg:gap-14 max-w-5xl mx-auto"
        >
          {/* Bio */}
          <div>
            <p className="text-[#8BA0B8] text-base leading-relaxed font-plex">{f.bio}</p>

            <div className="mt-8">
              <p className="text-xs font-outfit tracking-[0.15em] uppercase text-white/30 mb-3">
                {f.industryLabel}
              </p>
              <div className="flex flex-wrap gap-2">
                {f.industries.map((ind, i) => (
                  <span
                    key={i}
                    className="text-xs font-outfit px-3 py-1.5 rounded-full"
                    style={{
                      color: '#00D1E9',
                      background: 'rgba(0,209,233,0.08)',
                      border: '1px solid rgba(0,209,233,0.28)',
                    }}
                  >
                    {ind}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Achievements */}
          <div>
            <p className="text-xs font-outfit tracking-[0.15em] uppercase text-white/30 mb-4">
              {f.achievementsLabel}
            </p>
            <div className="space-y-3">
              {f.achievements.map((ach, i) => {
                const Icon = ACHIEVEMENT_ICONS[i] || Award;
                return (
                  <div key={i} className="flex items-center gap-3 group/ach">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: 'rgba(247,111,46,0.1)', border: '1px solid rgba(247,111,46,0.18)' }}
                    >
                      <Icon size={13} color="#F76F2E" />
                    </div>
                    <span className="text-[#8BA0B8] text-sm font-plex group-hover/ach:text-white transition-colors duration-200">
                      {ach}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
