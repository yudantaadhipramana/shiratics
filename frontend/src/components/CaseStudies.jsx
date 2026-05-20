import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const CASE_IMAGES = [
  'https://static.prod-images.emergentagent.com/jobs/5bc84ad8-9ec7-4070-b4fc-c2ae90e768b9/images/f4ee4873fa6977067286336b92842913b566f4f53ab7c268ab0ba22213e26b8e.png',
  'https://static.prod-images.emergentagent.com/jobs/5bc84ad8-9ec7-4070-b4fc-c2ae90e768b9/images/9413d9fa641e7f42429698626165ed1b83e48b9626aeb10f8a23df8c12cf09a5.png',
  'https://static.prod-images.emergentagent.com/jobs/5bc84ad8-9ec7-4070-b4fc-c2ae90e768b9/images/12f8cc7f33dc5346887bd3bcdad0dfc287b521b1a1b018bab54acf335e7b6958.png',
  'https://static.prod-images.emergentagent.com/jobs/5bc84ad8-9ec7-4070-b4fc-c2ae90e768b9/images/ccede91497f6d6db9e8e5747d01ee334cff2b528f916d92e6cfab7ebd3b04bc7.png',
  'https://static.prod-images.emergentagent.com/jobs/5bc84ad8-9ec7-4070-b4fc-c2ae90e768b9/images/0bc2dffc20b1e282dbc0d0c16305ecada9222788ed6b6c14461fed767b2c1e47.png',
];

function CaseStudyCard({ study, image, index, tall = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, delay: (index % 3) * 0.1 }}
      data-testid={`case-study-card-${index}`}
      className="group relative overflow-hidden rounded-xl border border-white/6 hover:border-white/14 transition-all duration-500 cursor-default"
    >
      {/* Image */}
      <div className={`overflow-hidden ${tall ? 'h-52' : 'h-44'}`}>
        <img
          src={image}
          alt={study.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
          style={{ transition: 'transform 0.7s ease' }}
        />
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#040914] via-[#040914]/65 to-transparent" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <div className="flex flex-wrap gap-1.5 mb-3">
          {study.tags.map((tag, i) => (
            <span
              key={i}
              className="text-[9px] font-outfit font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full"
              style={{
                background: 'rgba(0,209,233,0.12)',
                color: '#00D1E9',
                border: '1px solid rgba(0,209,233,0.2)',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
        <h3 className="font-outfit font-semibold text-white text-lg leading-snug mb-2 group-hover:text-[#00D1E9] transition-colors duration-300">
          {study.title}
        </h3>
        <p className="text-[#8BA0B8] text-sm leading-relaxed line-clamp-2 font-plex">{study.desc}</p>

        <div className="flex items-center gap-1 mt-4 text-[#00D1E9] text-xs font-outfit opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span>View Details</span>
          <ArrowUpRight size={11} />
        </div>
      </div>
    </motion.div>
  );
}

export default function CaseStudies() {
  const { t } = useLanguage();
  const studies = t.caseStudies.items;

  return (
    <section id="case-studies" className="relative py-28 section-gradient" data-testid="case-studies-section">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-2xl mb-16">
          <p className="text-[#F76F2E] text-xs font-outfit tracking-[0.2em] uppercase mb-4">
            CASE STUDIES
          </p>
          <h2 className="font-outfit font-bold text-4xl lg:text-5xl text-white tracking-tight mb-4">
            {t.caseStudies.title}
          </h2>
          <p className="text-[#8BA0B8] text-base font-plex leading-relaxed">
            {t.caseStudies.subtitle}
          </p>
        </div>

        {/* 3-column top row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-5">
          {studies.slice(0, 3).map((study, i) => (
            <CaseStudyCard key={i} study={study} image={CASE_IMAGES[i]} index={i} />
          ))}
        </div>

        {/* 2-column bottom row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {studies.slice(3, 5).map((study, i) => (
            <CaseStudyCard key={i + 3} study={study} image={CASE_IMAGES[i + 3]} index={i + 3} tall />
          ))}
        </div>
      </div>
    </section>
  );
}
