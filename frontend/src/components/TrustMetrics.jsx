import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';

function useCountUp(targetStr, isActive, duration = 2200) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!isActive) return;
    const numeric = parseInt(targetStr.replace(/[^0-9]/g, '')) || 0;
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

function MetricItem({ rawValue, label, isActive, delay }) {
  const suffix = rawValue.replace(/[0-9.]/g, '');
  const count = useCountUp(rawValue, isActive, 2000);
  const isNational = rawValue === 'National' || rawValue === 'Nasional';

  return (
    <div
      className="flex flex-col items-center text-center py-10 px-4 group"
      style={{ animationDelay: `${delay}ms` }}
    >
      <span
        className="font-outfit font-bold text-3xl sm:text-4xl lg:text-5xl counter-text leading-none mb-2 gradient-text-cyan"
        data-testid={`metric-value-${label.toLowerCase().replace(/\s+/g, '-')}`}
      >
        {isNational ? rawValue : (isActive ? `${count}${suffix}` : `0${suffix}`)}
      </span>
      <span className="text-[#8BA0B8] text-sm font-plex leading-snug">{label}</span>
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
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 divide-x divide-white/8">
          {metrics.map((metric, i) => (
            <MetricItem
              key={i}
              rawValue={metric.value}
              label={metric.label}
              isActive={isVisible}
              delay={i * 120}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
