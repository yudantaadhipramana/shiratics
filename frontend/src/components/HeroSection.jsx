import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import DataSphere from './DataSphere';

export default function HeroSection() {
  const { t } = useLanguage();

  const scrollTo = (id) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen hero-bg grid-bg flex items-center overflow-hidden"
      data-testid="hero-section"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 right-1/3 w-[500px] h-[500px] rounded-full bg-[#1F7D9F]/8 blur-[120px]" />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 rounded-full bg-[#0D3A70]/15 blur-[80px]" />
        <div className="absolute top-1/4 left-1/2 w-48 h-48 rounded-full bg-[#F76F2E]/4 blur-[60px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 pt-24 sm:pt-28 pb-14 sm:pb-16 w-full">
        <div className="grid lg:grid-cols-2 gap-10 xl:gap-20 items-center lg:min-h-[80vh]">

          {/* Left: Text Content */}
          <div className="flex flex-col gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3"
            >
              <div className="h-px w-8 bg-[#00D1E9]" />
              <span className="text-[#00D1E9] text-xs font-outfit font-medium tracking-[0.2em] uppercase">
                {t.hero.tagline}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-outfit font-bold tracking-tight"
            >
              <span className="text-4xl sm:text-5xl lg:text-6xl text-white block leading-[1.08]">
                {t.hero.headline1}
              </span>
              <span className="text-4xl sm:text-5xl lg:text-6xl block leading-[1.08] gradient-text">
                {t.hero.headline2}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-[#8BA0B8] text-base lg:text-lg leading-relaxed max-w-xl font-plex"
            >
              {t.hero.subheadline}
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="text-white/35 text-sm font-plex"
            >
              {t.hero.built}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="flex flex-wrap gap-4 pt-2"
            >
              <button
                data-testid="hero-cta-primary"
                onClick={() => scrollTo('#contact')}
                className="group flex items-center gap-2 bg-[#00D1E9] text-[#040914] font-semibold font-outfit px-7 py-3.5 rounded-lg hover:bg-white transition-all duration-200 hover:shadow-xl hover:shadow-[#00D1E9]/25 text-sm"
              >
                {t.hero.cta1}
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
              </button>
              <button
                data-testid="hero-cta-secondary"
                onClick={() => scrollTo('#case-studies')}
                className="flex items-center gap-2 border border-white/20 text-white font-outfit px-7 py-3.5 rounded-lg hover:border-[#00D1E9]/50 hover:text-[#00D1E9] transition-all duration-200 text-sm"
              >
                {t.hero.cta2}
              </button>
            </motion.div>

            {/* Hero mini stats strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="grid grid-cols-4 gap-3 sm:flex sm:items-center sm:gap-8 pt-4 border-t border-white/8"
              data-testid="hero-stats"
            >
              {t.heroStats.map(({ value, label }) => (
                <div key={label} className="flex flex-col">
                  <span className="text-[#00D1E9] font-outfit font-bold text-lg sm:text-xl leading-tight">{value}</span>
                  <span className="text-white/35 text-[10px] sm:text-xs font-plex">{label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: 3D Sphere (now visible on mobile too, smaller) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative h-[340px] sm:h-[420px] lg:h-[580px] mt-4 lg:mt-0"
            data-testid="hero-datasphere"
          >
            <DataSphere />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-white/25 hidden sm:flex"
        >
          <span className="text-[10px] font-outfit tracking-[0.3em] uppercase">Scroll</span>
          <ChevronDown size={14} className="animate-bounce" />
        </motion.div>
      </div>
    </section>
  );
}
