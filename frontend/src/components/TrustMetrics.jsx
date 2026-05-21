import React, { useState, useEffect, useRef } from 'react';
import { Building2, Users2, Network, Database } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const METRIC_ICONS = [Building2, Users2, Network, Database];
const METRIC_GLOW = [
  'rgba(0,209,233,0.55)',
  'rgba(247,111,46,0.55)',
  'rgba(31,125,159,0.55)',
  'rgba(0,209,233,0.55)',
];

function useCountUp(targetStr, isActive, duration = 2200) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!isActive) return;
    const numeric = parseInt(targetStr.replace(/[^0-9]/g, ''), 10) || 0;
    if (numeric === 0) return;

    let rafId;
    let startTime;

    const animate = (time) => {
      if (!startTime) startTime = time;
      const progress = Math.min((time - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCurrent(Math.floor(eased * numeric));
      if (progress < 1) {
        rafId = requestAnimationFrame(animate);
      } else {
        setCurrent(numeric);
      }
    };
    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [isActive, targetStr, duration]);

  return current;
}

function MetricItem({ rawValue, label, desc, isActive, index }) {
  const suffix = rawValue.replace(/[0-9.]/g, '');
  const count = useCountUp(rawValue, isActive, 2000);
  const Icon = METRIC_ICONS[index] || Building2;
  const glow = METRIC_GLOW[index] || 'rgba(0,209,233,0.55)';

  return (
    <div
      className="group relative flex flex-col items-center text-center px-3 sm:px-5 py-7 sm:py-9 transition-all duration-300"
      data-testid={`metric-card-${index}`}
    >
      {/* Hover pulse ring */}
      <span
        className="pointer-events-none absolute inset-x-6 top-3 h-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: glow, filter: 'blur(10px)' }}
      />

      <div
        className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center mb-3 transition-all duration-300 group-hover:scale-110"
        style={{
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(0,209,233,0.22)',
        }}
      >
        <Icon size={16} color="#00D1E9" strokeWidth={1.8} />
      </div>

      <span
        className="font-outfit font-bold text-4xl sm:text-5xl lg:text-[3.4rem] leading-none mb-2 gradient-text-cyan transition-all duration-300 group-hover:tracking-tight"
        data-testid={`metric-value-${index}`}
        style={{
          textShadow: `0 0 28px ${glow}, 0 0 60px ${glow}`,
          filter: 'drop-shadow(0 0 12px rgba(0,209,233,0.25))',
        }}
      >
        {isActive ? `${count}${suffix}` : `0${suffix}`}
      </span>

      <span className="text-white text-xs sm:text-sm font-outfit font-semibold tracking-tight leading-snug mb-1 px-1">
        {label}
      </span>

      <span className="text-[#8BA0B8] text-[10px] sm:text-xs font-plex leading-relaxed max-w-[200px] hidden sm:block">
        {desc}
      </span>
    </div>
  );
}

export default function TrustMetrics() {
  const { t } = useLanguage();
  const sectionRef = useRef();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const metrics = Object.values(t.metrics);

  return (
    <section
      id="metrics"
      ref={sectionRef}
      className="relative py-4 overflow-hidden"
      data-testid="trust-metrics"
    >
      <div className="absolute inset-0 section-gradient" />
      <div className="absolute top-0 left-0 right-0 h-px shimmer-border" />
      <div className="absolute bottom-0 left-0 right-0 h-px shimmer-border" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-white/8">
          {metrics.map((metric, i) => (
            <MetricItem
              key={i}
              index={i}
              rawValue={metric.value}
              label={metric.label}
              desc={metric.desc}
              isActive={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
