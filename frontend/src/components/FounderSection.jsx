import React from 'react';
import { motion } from 'framer-motion';
import { Award, Database, Users, Mic2, GitBranch } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const FOUNDER_IMG = 'https://customer-assets.emergentagent.com/job_data-core-sphere/artifacts/sh5f7uo6_Akselo%20Founder%20-%20DANTA%20%28Fin%29.jpg';
const COFOUNDER_IMG = 'https://customer-assets.emergentagent.com/job_data-core-sphere/artifacts/bi9y4y54_Akselo%20Founder%20-%20ZAYN%20%28Fin%29.jpg';

const ACHIEVEMENT_ICONS = [Mic2, GitBranch, Database, Users, Award];

export default function FounderSection() {
  const { t } = useLanguage();
  const f = t.founder;

  return (
    <section id="founder" className="relative py-28 bg-[#040914]" data-testid="founder-section">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#0A162B]/40 to-transparent" />
        <div className="absolute bottom-1/3 left-1/4 w-[400px] h-[400px] rounded-full bg-[#F76F2E]/3 blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-[#F76F2E] text-xs font-outfit tracking-[0.2em] uppercase mb-4">
            {f.overline}
          </p>
          <h2 className="font-outfit font-bold text-4xl lg:text-5xl text-white tracking-tight max-w-2xl mx-auto">
            {f.title}
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* Left: Photos */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex gap-5"
          >
            {/* Founder (Danta) - Primary */}
            <div className="flex-1 relative group" data-testid="founder-photo-danta">
              <div className="relative overflow-hidden rounded-2xl">
                <img
                  src={FOUNDER_IMG}
                  alt={f.name}
                  className="w-full h-[340px] object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#040914]/90 via-[#040914]/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <div className="text-white font-outfit font-semibold text-base">{f.name}</div>
                  <div className="text-[#F76F2E] text-xs font-plex mt-0.5">{f.role}</div>
                </div>
              </div>
              {/* Orange glow on hover */}
              <div className="absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-md"
                style={{ background: 'linear-gradient(135deg, rgba(247,111,46,0.25) 0%, transparent 60%)' }} />
            </div>

            {/* Co-Founder (Zayn) - Secondary, offset down */}
            <div className="flex-1 relative group mt-12" data-testid="founder-photo-zayn">
              <div className="relative overflow-hidden rounded-2xl">
                <img
                  src={COFOUNDER_IMG}
                  alt={f.cofounder.name}
                  className="w-full h-[340px] object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#040914]/90 via-[#040914]/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <div className="text-white font-outfit font-semibold text-base">{f.cofounder.name}</div>
                  <div className="text-[#00D1E9] text-xs font-plex mt-0.5">{f.cofounder.role}</div>
                </div>
              </div>
              {/* Cyan glow on hover */}
              <div className="absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-md"
                style={{ background: 'linear-gradient(135deg, rgba(0,209,233,0.2) 0%, transparent 60%)' }} />
            </div>
          </motion.div>

          {/* Right: Bio + Achievements */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="space-y-8 pt-2"
          >
            <div>
              <h3 className="font-outfit font-bold text-2xl text-white mb-4">{f.name}</h3>
              <p className="text-[#8BA0B8] text-base leading-relaxed font-plex">{f.bio}</p>
            </div>

            {/* Industry tags */}
            <div>
              <p className="text-xs font-outfit tracking-[0.15em] uppercase text-white/30 mb-3">
                INDUSTRY EXPERTISE
              </p>
              <div className="flex flex-wrap gap-2">
                {f.industries.map((ind, i) => (
                  <span
                    key={i}
                    className="text-xs font-outfit px-3 py-1.5 rounded-full"
                    style={{
                      borderColor: 'rgba(0,209,233,0.28)',
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

            {/* Achievements */}
            <div>
              <p className="text-xs font-outfit tracking-[0.15em] uppercase text-white/30 mb-4">
                KEY ACHIEVEMENTS
              </p>
              <div className="space-y-3">
                {f.achievements.map((ach, i) => {
                  const Icon = ACHIEVEMENT_ICONS[i] || Award;
                  return (
                    <div key={i} className="flex items-center gap-3 group/ach">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors duration-200"
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
      </div>
    </section>
  );
}
