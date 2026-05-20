import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Grid3X3, GitBranch, BarChart2, TrendingUp,
  FileSpreadsheet, Database, Cloud, Smartphone, AlertTriangle,
  Filter, Boxes, CheckCircle2, Sparkles, ArrowRight
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const STAGE_ICONS = [Grid3X3, GitBranch, BarChart2, TrendingUp];
const STAGE_COLORS = ['#F76F2E', '#1F7D9F', '#00D1E9', '#0D3A70'];
const STAGE_BG = [
  'rgba(247,111,46,0.07)',
  'rgba(31,125,159,0.07)',
  'rgba(0,209,233,0.07)',
  'rgba(13,58,112,0.12)',
];

/* ──────────────────────────────────────────────────────────────
   STAGE 0 — CHAOS: Scattered, disconnected data sources
   Real-world data consulting pain: Excel files, POS exports,
   ERP dumps, manual reports — all unconnected, error-prone.
   ────────────────────────────────────────────────────────────── */
function ChaosVisual() {
  const sources = [
    { label: 'Excel.xlsx',  icon: FileSpreadsheet, x: 4,   y: 8,   rot: -6, color: '#22C55E' },
    { label: 'POS Export',  icon: Database,        x: 56,  y: 4,   rot: 7,  color: '#F76F2E' },
    { label: 'SFA Mobile',  icon: Smartphone,      x: 78,  y: 48,  rot: -4, color: '#3B82F6' },
    { label: 'ERP Dump',    icon: Database,        x: 8,   y: 58,  rot: 5,  color: '#A855F7' },
    { label: 'Manual CSV',  icon: FileSpreadsheet, x: 38,  y: 70,  rot: -8, color: '#EAB308' },
    { label: 'Email Rpt',   icon: Cloud,           x: 38,  y: 28,  rot: 3,  color: '#06B6D4' },
  ];
  return (
    <div className="relative w-full h-full max-w-[420px] max-h-[300px] mx-auto" data-testid="visual-chaos">
      {sources.map((s, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 6, rotate: 0 }}
          animate={{
            opacity: 1,
            y: [0, Math.sin(i) * 4, 0],
            rotate: s.rot,
          }}
          transition={{
            opacity: { duration: 0.3, delay: i * 0.06 },
            y: { duration: 3 + i * 0.4, repeat: Infinity, ease: 'easeInOut' },
          }}
          className="absolute glass rounded-lg px-3 py-2 flex items-center gap-2 shadow-lg"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            background: `${s.color}10`,
            border: `1px solid ${s.color}30`,
          }}
        >
          <s.icon size={14} color={s.color} strokeWidth={2} />
          <span className="text-[10px] font-plex text-white/85 whitespace-nowrap">{s.label}</span>
        </motion.div>
      ))}

      {/* Broken/disconnected indicators */}
      {[{x:32,y:22},{x:62,y:46},{x:22,y:50}].map((p, i) => (
        <motion.div
          key={`err-${i}`}
          animate={{ opacity: [0.35, 1, 0.35] }}
          transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.3 }}
          className="absolute"
          style={{ left: `${p.x}%`, top: `${p.y}%` }}
        >
          <AlertTriangle size={12} color="#EF4444" fill="rgba(239,68,68,0.18)" />
        </motion.div>
      ))}

      {/* Broken dashed lines suggesting failed connections */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.18 }}>
        <line x1="18%" y1="18%" x2="58%" y2="14%" stroke="#EF4444" strokeWidth="1" strokeDasharray="3 4" />
        <line x1="60%" y1="14%" x2="80%" y2="56%" stroke="#EF4444" strokeWidth="1" strokeDasharray="3 4" />
        <line x1="18%" y1="65%" x2="42%" y2="76%" stroke="#EF4444" strokeWidth="1" strokeDasharray="3 4" />
      </svg>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   STAGE 1 — INTEGRATION: ETL Pipeline
   Sources → Transform → Warehouse, with animated data flowing.
   ────────────────────────────────────────────────────────────── */
function IntegrationVisual() {
  const sources = [
    { icon: Database,        label: 'ERP',   y: 12 },
    { icon: FileSpreadsheet, label: 'Excel', y: 42 },
    { icon: Smartphone,      label: 'SFA',   y: 72 },
  ];
  return (
    <div className="relative w-full h-full max-w-[460px] max-h-[280px] mx-auto" data-testid="visual-integration">
      {/* Source nodes (left) */}
      {sources.map((s, i) => (
        <div
          key={i}
          className="absolute flex items-center gap-2 glass rounded-lg px-3 py-2"
          style={{
            left: 0,
            top: `${s.y}%`,
            background: 'rgba(31,125,159,0.08)',
            border: '1px solid rgba(31,125,159,0.3)',
          }}
        >
          <s.icon size={14} color="#1F7D9F" strokeWidth={2} />
          <span className="text-[10px] font-plex text-white/85">{s.label}</span>
        </div>
      ))}

      {/* Pipes from sources to ETL box (SVG) */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none" viewBox="0 0 100 100">
        {[18, 48, 78].map((sy, i) => (
          <g key={i}>
            <path
              d={`M 16 ${sy} C 30 ${sy}, 35 50, 46 50`}
              stroke="rgba(31,125,159,0.35)"
              strokeWidth="0.5"
              fill="none"
            />
          </g>
        ))}
        {/* ETL → Warehouse pipe */}
        <path d="M 60 50 L 84 50" stroke="rgba(0,209,233,0.45)" strokeWidth="0.6" fill="none" />

        {/* Flowing data dots */}
        {[0, 0.33, 0.66].map((delay, i) => (
          <circle key={`d1-${i}`} r="0.9" fill="#00D1E9">
            <animateMotion dur="2.2s" repeatCount="indefinite" begin={`${delay * 2.2}s`}
              path="M 16 18 C 30 18, 35 50, 46 50" />
          </circle>
        ))}
        {[0.15, 0.48, 0.82].map((delay, i) => (
          <circle key={`d2-${i}`} r="0.9" fill="#00D1E9">
            <animateMotion dur="2.2s" repeatCount="indefinite" begin={`${delay * 2.2}s`}
              path="M 16 48 C 30 48, 35 50, 46 50" />
          </circle>
        ))}
        {[0.05, 0.4, 0.75].map((delay, i) => (
          <circle key={`d3-${i}`} r="0.9" fill="#00D1E9">
            <animateMotion dur="2.2s" repeatCount="indefinite" begin={`${delay * 2.2}s`}
              path="M 16 78 C 30 78, 35 50, 46 50" />
          </circle>
        ))}
        {[0.1, 0.5, 0.9].map((delay, i) => (
          <circle key={`out-${i}`} r="1.1" fill="#00D1E9">
            <animateMotion dur="1.6s" repeatCount="indefinite" begin={`${delay * 1.6}s`}
              path="M 60 50 L 84 50" />
          </circle>
        ))}
      </svg>

      {/* ETL Transform box (center) */}
      <motion.div
        animate={{ boxShadow: ['0 0 0px rgba(0,209,233,0.0)', '0 0 24px rgba(0,209,233,0.35)', '0 0 0px rgba(0,209,233,0.0)'] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute glass rounded-xl px-3 py-2.5 flex flex-col items-center gap-1"
        style={{
          left: '38%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'rgba(0,209,233,0.10)',
          border: '1px solid rgba(0,209,233,0.5)',
          minWidth: 86,
        }}
      >
        <Filter size={16} color="#00D1E9" strokeWidth={2} />
        <span className="text-[9px] font-outfit tracking-[0.15em] text-[#00D1E9] font-semibold">ETL</span>
        <span className="text-[8px] text-white/45 font-plex">Clean · Map · Load</span>
      </motion.div>

      {/* Warehouse cube (right) */}
      <div
        className="absolute flex flex-col items-center gap-1.5 glass rounded-xl px-3 py-3"
        style={{
          right: 0,
          top: '50%',
          transform: 'translateY(-50%)',
          background: 'rgba(0,209,233,0.08)',
          border: '1px solid rgba(0,209,233,0.4)',
          minWidth: 78,
        }}
      >
        <Boxes size={20} color="#00D1E9" strokeWidth={1.8} />
        <span className="text-[9px] font-outfit tracking-[0.1em] text-[#00D1E9] font-semibold">DATA WAREHOUSE</span>
        <div className="flex gap-0.5 mt-0.5">
          {[0,1,2].map(i => (
            <span key={i} className="w-1 h-1 rounded-full bg-[#00D1E9]" style={{ opacity: 0.4 + i * 0.2 }} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   STAGE 2 — INTELLIGENCE: Live Dashboard mockup
   Realistic KPI cards + trend chart + bar chart (BI feel).
   ────────────────────────────────────────────────────────────── */
function IntelligenceVisual() {
  const sparkPath = 'M0 38 L18 32 L36 34 L54 24 L72 26 L90 16 L108 18 L126 8 L144 12 L162 4';
  const bars = [42, 58, 38, 64, 48, 72, 54];
  return (
    <div className="relative w-full max-w-[440px] mx-auto glass rounded-xl p-3.5 sm:p-4 border border-[#00D1E9]/25"
      style={{ background: 'rgba(4,9,20,0.65)' }}
      data-testid="visual-intelligence"
    >
      {/* Header bar */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse" />
          <span className="text-[9px] font-outfit tracking-[0.18em] text-white/55 uppercase">Executive Dashboard · Live</span>
        </div>
        <span className="text-[9px] font-plex text-white/30">Q4 · 2025</span>
      </div>

      {/* 3 KPI Cards */}
      <div className="grid grid-cols-3 gap-2 mb-3">
        {[
          { label: 'Revenue',  value: 'Rp 2.4B',  delta: '+24%', color: '#00D1E9' },
          { label: 'Outlets',  value: '117K',     delta: '+12%', color: '#F76F2E' },
          { label: 'Conv.',    value: '68.4%',    delta: '+5.2%',color: '#22C55E' },
        ].map((k, i) => (
          <div key={i} className="rounded-lg px-2 py-1.5"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
          >
            <div className="text-[8px] font-outfit tracking-wider text-white/40 uppercase">{k.label}</div>
            <div className="text-sm font-outfit font-bold mt-0.5" style={{ color: k.color }}>{k.value}</div>
            <div className="text-[8px] font-plex" style={{ color: '#22C55E' }}>▲ {k.delta}</div>
          </div>
        ))}
      </div>

      {/* Trend line chart */}
      <div className="relative mb-3 rounded-lg p-2"
        style={{ background: 'rgba(0,209,233,0.04)', border: '1px solid rgba(0,209,233,0.12)' }}
      >
        <div className="flex items-center justify-between mb-1">
          <span className="text-[8px] font-outfit text-white/40 tracking-wider uppercase">Sales Trend · Weekly</span>
          <span className="text-[9px] font-outfit font-bold text-[#00D1E9]">+18.6%</span>
        </div>
        <svg viewBox="0 0 162 44" className="w-full h-12" preserveAspectRatio="none">
          {/* grid */}
          {[10, 22, 34].map(y => (
            <line key={y} x1="0" y1={y} x2="162" y2={y} stroke="rgba(255,255,255,0.04)" strokeWidth="0.4" />
          ))}
          {/* area */}
          <path d={`${sparkPath} L162 44 L0 44 Z`} fill="rgba(0,209,233,0.14)" />
          {/* line */}
          <motion.path
            d={sparkPath}
            stroke="#00D1E9"
            strokeWidth="1.4"
            fill="none"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          />
          {/* end point */}
          <circle cx="162" cy="4" r="2" fill="#00D1E9">
            <animate attributeName="r" values="2;3;2" dur="1.6s" repeatCount="indefinite" />
          </circle>
        </svg>
      </div>

      {/* Bar chart by branch */}
      <div className="flex items-end gap-1 h-10">
        {bars.map((h, i) => (
          <div key={i} className="flex-1 flex flex-col items-center justify-end gap-0.5">
            <div className="w-full rounded-sm"
              style={{
                height: `${h}%`,
                background: i === 5 ? '#00D1E9' : 'rgba(0,209,233,0.4)',
              }}
            />
            <span className="text-[7px] font-plex text-white/30">B{i + 1}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   STAGE 3 — DECISION: Executive action, AI recommendation, profit lift
   ────────────────────────────────────────────────────────────── */
function DecisionVisual() {
  const forecastPath = 'M0 42 L20 38 L40 30 L60 26 L80 20 L100 10 L120 6';
  return (
    <div className="relative w-full max-w-[440px] mx-auto" data-testid="visual-decision">
      {/* Profit forecast card */}
      <div className="glass rounded-xl p-4 border border-[#F76F2E]/25"
        style={{ background: 'rgba(4,9,20,0.7)' }}
      >
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="text-[9px] font-outfit tracking-wider uppercase text-white/40">Profit Forecast · Q1</div>
            <div className="text-2xl font-outfit font-bold mt-0.5" style={{ color: '#F76F2E' }}>+47.3%</div>
          </div>
          <div className="flex flex-col items-end gap-1">
            <span className="text-[8px] font-outfit tracking-wider uppercase text-[#22C55E]">Confidence</span>
            <div className="flex items-center gap-1">
              <div className="w-12 h-1 rounded-full bg-white/10">
                <div className="h-full rounded-full bg-[#22C55E]" style={{ width: '92%' }} />
              </div>
              <span className="text-[9px] font-outfit text-[#22C55E] font-bold">92%</span>
            </div>
          </div>
        </div>

        {/* Forecast line + annotations */}
        <div className="relative h-14 mb-3">
          <svg viewBox="0 0 120 48" className="w-full h-full" preserveAspectRatio="none">
            <line x1="0" y1="36" x2="120" y2="36" stroke="rgba(255,255,255,0.07)" strokeWidth="0.4" strokeDasharray="2 2" />
            <line x1="0" y1="22" x2="120" y2="22" stroke="rgba(255,255,255,0.05)" strokeWidth="0.4" strokeDasharray="2 2" />
            <path d={`${forecastPath} L120 48 L0 48 Z`} fill="rgba(247,111,46,0.18)" />
            <motion.path
              d={forecastPath}
              stroke="#F76F2E"
              strokeWidth="1.6"
              fill="none"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.4, ease: 'easeOut' }}
            />
            {[[20,38],[60,26],[100,10],[120,6]].map(([x,y], i) => (
              <circle key={i} cx={x} cy={y} r="1.4" fill="#F76F2E" />
            ))}
          </svg>
          {/* Optimal action badge */}
          <div className="absolute" style={{ left: '52%', top: '8%' }}>
            <div className="flex items-center gap-1 rounded-full px-1.5 py-0.5"
              style={{ background: 'rgba(34,197,94,0.18)', border: '1px solid rgba(34,197,94,0.5)' }}
            >
              <CheckCircle2 size={8} color="#22C55E" />
              <span className="text-[7px] font-outfit font-bold tracking-wider text-[#22C55E]">OPTIMAL Q4</span>
            </div>
          </div>
        </div>

        {/* AI Recommendation row */}
        <div className="rounded-lg p-2.5 flex items-start gap-2"
          style={{ background: 'rgba(0,209,233,0.06)', border: '1px solid rgba(0,209,233,0.22)' }}
        >
          <motion.div
            animate={{ rotate: [0, 12, 0, -12, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="mt-0.5 flex-shrink-0"
          >
            <Sparkles size={14} color="#00D1E9" />
          </motion.div>
          <div className="flex-1 min-w-0">
            <div className="text-[8px] font-outfit tracking-[0.15em] uppercase text-[#00D1E9] font-semibold mb-0.5">AI Recommendation</div>
            <div className="text-[10px] font-plex text-white/80 leading-snug">
              Reallocate SKU‑A to East region — projected Rp 380M uplift.
            </div>
          </div>
          <ArrowRight size={12} className="mt-1 text-[#00D1E9] flex-shrink-0" />
        </div>
      </div>

      {/* Decision stamp */}
      <motion.div
        initial={{ scale: 0.6, opacity: 0, rotate: -15 }}
        animate={{ scale: 1, opacity: 1, rotate: -8 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="absolute -top-2 -right-2 rounded-full px-2.5 py-1"
        style={{
          background: 'rgba(34,197,94,0.18)',
          border: '1.5px solid #22C55E',
          backdropFilter: 'blur(6px)',
        }}
      >
        <div className="flex items-center gap-1">
          <CheckCircle2 size={10} color="#22C55E" />
          <span className="text-[8px] font-outfit font-bold tracking-[0.15em] uppercase text-[#22C55E]">Approved</span>
        </div>
      </motion.div>
    </div>
  );
}

function StageVisual({ index }) {
  if (index === 0) return <ChaosVisual />;
  if (index === 1) return <IntegrationVisual />;
  if (index === 2) return <IntelligenceVisual />;
  return <DecisionVisual />;
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
      setActiveStage(Math.min(3, Math.floor(p * 3.6)));
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const { stages } = t.story;

  return (
    <section ref={containerRef} style={{ height: '260vh' }} data-testid="scroll-story">
      <div
        className="sticky top-0 h-screen flex items-center overflow-hidden"
        style={{ background: '#040914' }}
      >
        <div
          className="absolute inset-0 transition-all duration-1000"
          style={{ background: `radial-gradient(ellipse at center, ${STAGE_BG[activeStage]} 0%, transparent 70%)` }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 w-full py-6">
          <div className="text-center mb-6 sm:mb-8">
            <p className="text-[#00D1E9] text-xs font-outfit tracking-[0.2em] uppercase mb-3">
              {t.story.subtitle}
            </p>
            <h2 className="font-outfit font-bold text-2xl sm:text-3xl lg:text-5xl text-white tracking-tight">
              {t.story.title}
            </h2>
          </div>

          {/* Stage Progress */}
          <div
            className="flex items-center justify-center mb-10 sm:mb-12"
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-center">
            <div className="space-y-4 min-h-[180px] relative">
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

            {/* Visual area — larger, fills space */}
            <div className="relative h-[260px] sm:h-[300px] lg:h-[340px] flex items-center justify-center">
              {stages.map((stage, i) => (
                <motion.div
                  key={i}
                  animate={{ opacity: i === activeStage ? 1 : 0, scale: i === activeStage ? 1 : 0.92 }}
                  transition={{ duration: 0.5 }}
                  className={`absolute inset-0 flex items-center justify-center ${i !== activeStage ? 'pointer-events-none' : ''}`}
                >
                  <StageVisual index={i} />
                </motion.div>
              ))}
            </div>
          </div>

          <div className="text-center mt-6 sm:mt-8">
            <p className="text-white/15 text-[10px] font-outfit tracking-[0.3em] uppercase">
              SCROLL TO CONTINUE
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
