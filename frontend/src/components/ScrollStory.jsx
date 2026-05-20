import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Grid3X3, GitBranch, BarChart2, TrendingUp } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const STAGE_ICONS = [Grid3X3, GitBranch, BarChart2, TrendingUp];
const STAGE_COLORS = ['#F76F2E', '#1F7D9F', '#00D1E9', '#0D3A70'];
const STAGE_BG = [
  'rgba(247,111,46,0.07)',
  'rgba(31,125,159,0.07)',
  'rgba(0,209,233,0.07)',
  'rgba(13,58,112,0.12)',
];

function StageVisual({ index }) {
  const color = STAGE_COLORS[index];

  if (index === 0) {
    return (
      <div className="grid grid-cols-4 gap-2 w-52">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="h-7 rounded"
            style={{
              background: `${color}${(15 + i * 10).toString(16)}`,
              transform: `rotate(${(i % 3 - 1) * 4}deg) translateY(${Math.sin(i * 1.2) * 5}px)`,
            }}
          />
        ))}
      </div>
    );
  }
  if (index === 1) {
    const pts = [0, 1, 2, 3, 4];
    return (
      <div className="relative w-52 h-52">
        {pts.map(i => {
          const a = (i / pts.length) * Math.PI * 2 - Math.PI / 2;
          const r = 80;
          const x = 104 + Math.cos(a) * r;
          const y = 104 + Math.sin(a) * r;
          return (
            <div key={i}>
              <div className="absolute w-3 h-3 rounded-full transition-all"
                style={{ left: x - 6, top: y - 6, background: color, boxShadow: `0 0 12px ${color}` }} />
            </div>
          );
        })}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-7 h-7 rounded-full"
          style={{ background: color, boxShadow: `0 0 24px ${color}` }} />
        <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.3 }}>
          {pts.map(i => {
            const a = (i / pts.length) * Math.PI * 2 - Math.PI / 2;
            const r = 80;
            const x = 104 + Math.cos(a) * r;
            const y = 104 + Math.sin(a) * r;
            return <line key={i} x1="104" y1="104" x2={x} y2={y} stroke={color} strokeWidth="1" />;
          })}
        </svg>
      </div>
    );
  }
  if (index === 2) {
    return (
      <div className="glass rounded-xl p-5 w-56">
        <div className="text-xs font-outfit tracking-wider mb-3" style={{ color: '#8BA0B8' }}>LIVE DASHBOARD</div>
        <div className="flex gap-2 mb-4">
          {[65, 85, 50].map((h, i) => (
            <div key={i} className="flex-1 rounded overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
              <div className="w-full rounded transition-all duration-700"
                style={{ height: `${h * 0.4}px`, background: color, opacity: 0.8 + i * 0.1 }} />
            </div>
          ))}
        </div>
        <div className="space-y-2">
          {[75, 92, 60].map((w, i) => (
            <div key={i} className="h-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }}>
              <div className="h-full rounded-full" style={{ width: `${w}%`, background: color }} />
            </div>
          ))}
        </div>
      </div>
    );
  }
  // index === 3
  return (
    <div className="glass rounded-xl p-5 w-56">
      <div className="text-xs font-outfit" style={{ color: '#8BA0B8' }}>Revenue Growth</div>
      <div className="text-2xl font-bold font-outfit mt-1 mb-4" style={{ color }}>+47.3%</div>
      <div className="flex items-end gap-1 h-14">
        {[25, 35, 28, 50, 42, 60, 55, 78, 70, 100].map((h, i) => (
          <div key={i} className="flex-1 rounded-t-sm transition-all"
            style={{ height: `${h}%`, background: i >= 7 ? color : `${color}35` }} />
        ))}
      </div>
    </div>
  );
}

export default function ScrollStory() {
  const { t } = useLanguage();
  const containerRef = useRef();
  const [activeStage, setActiveStage] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalHeight = containerRef.current.offsetHeight - window.innerHeight;
      const scrolled = -rect.top;
      const p = Math.max(0, Math.min(1, scrolled / totalHeight));
      // Stages distributed so stage 3 reaches near the end (p ≈ 0.83+),
      // minimising dead scroll after the final stage locks in.
      setActiveStage(Math.min(3, Math.floor(p * 3.6)));
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const { stages } = t.story;

  return (
    <section ref={containerRef} style={{ height: '240vh' }} data-testid="scroll-story">
      <div
        className="sticky top-0 h-screen flex items-center overflow-hidden"
        style={{ background: '#040914' }}
      >
        <div
          className="absolute inset-0 transition-all duration-1000"
          style={{ background: `radial-gradient(ellipse at center, ${STAGE_BG[activeStage]} 0%, transparent 70%)` }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 w-full">
          <div className="text-center mb-8 sm:mb-10">
            <p className="text-[#00D1E9] text-xs font-outfit tracking-[0.2em] uppercase mb-3">
              {t.story.subtitle}
            </p>
            <h2 className="font-outfit font-bold text-2xl sm:text-3xl lg:text-5xl text-white tracking-tight">
              {t.story.title}
            </h2>
          </div>

          {/* Stage Progress */}
          <div
            className="flex items-center justify-center mb-12"
            data-testid="story-progress"
          >
            {stages.map((stage, i) => (
              <React.Fragment key={i}>
                <div className={`flex flex-col items-center transition-transform duration-300 ${i === activeStage ? 'scale-110' : ''}`}>
                  <div
                    className="w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-500"
                    style={i <= activeStage
                      ? { background: STAGE_COLORS[i], borderColor: STAGE_COLORS[i], boxShadow: `0 0 20px ${STAGE_COLORS[i]}50` }
                      : { borderColor: 'rgba(255,255,255,0.15)', background: 'transparent' }
                    }
                  >
                    {React.createElement(STAGE_ICONS[i], {
                      size: 16,
                      color: i <= activeStage ? '#fff' : 'rgba(255,255,255,0.3)',
                    })}
                  </div>
                  <span
                    className="absolute mt-14 text-[9px] font-outfit tracking-widest font-medium whitespace-nowrap transition-colors duration-300 hidden sm:block"
                    style={{ color: i === activeStage ? '#fff' : 'rgba(255,255,255,0.25)' }}
                  >
                    {stage.label}
                  </span>
                </div>
                {i < stages.length - 1 && (
                  <div className="w-10 sm:w-24 h-px mx-1 relative overflow-hidden">
                    <div className="absolute inset-0 bg-white/8" />
                    <div
                      className="absolute inset-0 bg-[#00D1E9] origin-left transition-transform duration-700"
                      style={{ transform: `scaleX(${i < activeStage ? 1 : 0})` }}
                    />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center mt-6">
            <div className="space-y-4 min-h-[140px] relative">
              {stages.map((stage, i) => (
                <motion.div
                  key={i}
                  animate={{
                    opacity: i === activeStage ? 1 : 0,
                    x: i === activeStage ? 0 : -24,
                    height: i === activeStage ? 'auto' : 0,
                  }}
                  transition={{ duration: 0.4 }}
                  className={`overflow-hidden ${i !== activeStage ? 'pointer-events-none absolute' : ''}`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{
                        background: `${STAGE_COLORS[i]}15`,
                        border: `1px solid ${STAGE_COLORS[i]}35`,
                      }}
                    >
                      {React.createElement(STAGE_ICONS[i], { size: 22, color: STAGE_COLORS[i] })}
                    </div>
                    <div>
                      <div
                        className="text-xs font-outfit tracking-[0.15em] uppercase mb-1"
                        style={{ color: STAGE_COLORS[i] }}
                      >
                        {String(i + 1).padStart(2, '0')} / 04
                      </div>
                      <h3 className="text-xl sm:text-2xl lg:text-3xl font-outfit font-bold text-white mb-3">
                        {stage.title}
                      </h3>
                      <p className="text-[#8BA0B8] text-sm sm:text-base leading-relaxed">{stage.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="relative h-44 sm:h-56 flex items-center justify-center">
              {stages.map((stage, i) => (
                <motion.div
                  key={i}
                  animate={{ opacity: i === activeStage ? 1 : 0, scale: i === activeStage ? 1 : 0.88 }}
                  transition={{ duration: 0.5 }}
                  className={`absolute inset-0 flex items-center justify-center ${i !== activeStage ? 'pointer-events-none' : ''}`}
                >
                  <StageVisual index={i} />
                </motion.div>
              ))}
            </div>
          </div>

          <div className="text-center mt-10">
            <p className="text-white/15 text-[10px] font-outfit tracking-[0.3em] uppercase">
              SCROLL TO CONTINUE
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
