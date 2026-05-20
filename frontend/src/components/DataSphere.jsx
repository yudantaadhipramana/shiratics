import React, { useRef, useState, useEffect, useCallback } from 'react';

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return [r, g, b];
}

export default function DataSphere() {
  const canvasRef = useRef();
  const containerRef = useRef();
  const mouseRef = useRef({ x: 0, y: 0 });
  const targetMouseRef = useRef({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    targetMouseRef.current = { x, y };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let time = 0;

    const particles = Array.from({ length: 65 }, () => ({
      angle: Math.random() * Math.PI * 2,
      radius: 0.55 + Math.random() * 0.7,
      speed: 0.0008 + Math.random() * 0.0015,
      size: Math.random() * 1.8 + 0.4,
      opacity: Math.random() * 0.4 + 0.08,
      phase: Math.random() * Math.PI * 2,
    }));

    const nodes = [
      { radius: 0.68, speed: 0.38, offset: 0, tilt: 0.28, color: '#00D1E9', size: 6 },
      { radius: 0.62, speed: 0.32, offset: 2.1, tilt: 0.5, color: '#F76F2E', size: 5 },
      { radius: 0.76, speed: 0.48, offset: 4.2, tilt: 0.18, color: '#1F7D9F', size: 5.5 },
      { radius: 0.65, speed: 0.28, offset: 1.05, tilt: 0.22, color: '#00D1E9', size: 4.5 },
      { radius: 0.72, speed: 0.44, offset: 3.15, tilt: 0.42, color: '#F76F2E', size: 5 },
      { radius: 0.58, speed: 0.54, offset: 5.25, tilt: 0.12, color: '#1F7D9F', size: 6 },
    ];

    function resize() {
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.scale(dpr, dpr);
    }
    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    function lerp(a, b, t) { return a + (b - a) * t; }

    function drawFrame() {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      if (!w || !h) { animId = requestAnimationFrame(drawFrame); return; }

      const cx = w * 0.5;
      const cy = h * 0.5;
      const r = Math.min(w, h) * 0.27;

      // Smooth mouse interpolation
      mouseRef.current.x = lerp(mouseRef.current.x, targetMouseRef.current.x, 0.06);
      mouseRef.current.y = lerp(mouseRef.current.y, targetMouseRef.current.y, 0.06);
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const tiltX = mx * 18;
      const tiltY = my * 12;

      ctx.clearRect(0, 0, w, h);

      // ── OUTER AMBIENT GLOW ──
      const outerGlow = ctx.createRadialGradient(cx, cy, r * 0.4, cx, cy, r * 2.8);
      outerGlow.addColorStop(0, 'rgba(0,209,233,0.07)');
      outerGlow.addColorStop(0.5, 'rgba(13,58,112,0.04)');
      outerGlow.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.beginPath();
      ctx.arc(cx, cy, r * 2.8, 0, Math.PI * 2);
      ctx.fillStyle = outerGlow;
      ctx.fill();

      // ── ORBITAL RINGS ──
      const rings = [
        { scaleX: 1.44, scaleY: 0.32, rot: time * 0.2, color: '#00D1E9', op: 0.42, lw: 1.6 },
        { scaleX: 1.7, scaleY: 0.38, rot: -time * 0.28, color: '#F76F2E', op: 0.28, lw: 1 },
        { scaleX: 1.95, scaleY: 0.22, rot: time * 0.14, color: '#1F7D9F', op: 0.18, lw: 0.8 },
      ];
      rings.forEach(ring => {
        ctx.save();
        ctx.translate(cx + tiltX * 0.5, cy + tiltY * 0.4);
        ctx.rotate(ring.rot + mx * 0.1);
        ctx.beginPath();
        ctx.ellipse(0, 0, r * ring.scaleX, r * ring.scaleY + my * r * 0.1, 0, 0, Math.PI * 2);
        ctx.strokeStyle = ring.color;
        ctx.globalAlpha = ring.op;
        ctx.lineWidth = ring.lw;
        ctx.stroke();
        ctx.restore();
        ctx.globalAlpha = 1;
      });

      // ── PARTICLES ──
      const pulseFactor = 1 + Math.sin(time * 0.7) * 0.025;
      particles.forEach(p => {
        p.angle += p.speed;
        const pr = r * p.radius * pulseFactor;
        const px = cx + Math.cos(p.angle) * pr + tiltX * 0.3;
        const py = cy + Math.sin(p.angle) * pr * 0.3 + tiltY * 0.2;
        const twinkle = Math.sin(time * 2.5 + p.phase) * 0.35 + 0.65;
        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,209,233,${p.opacity * twinkle})`;
        ctx.fill();
      });

      // ── ORBITING DATA NODES ──
      nodes.forEach(node => {
        const angle = time * node.speed + node.offset;
        const nx = cx + Math.cos(angle) * r * node.radius * 1.6 + tiltX * 0.7;
        const ny = cy + Math.sin(angle) * r * node.radius * Math.sin(node.tilt) + tiltY * 0.5;
        const [nr, ng, nb] = hexToRgb(node.color);

        // Node glow halo
        const grd = ctx.createRadialGradient(nx, ny, 0, nx, ny, node.size * 4.5);
        grd.addColorStop(0, `rgba(${nr},${ng},${nb},0.35)`);
        grd.addColorStop(1, `rgba(${nr},${ng},${nb},0)`);
        ctx.beginPath();
        ctx.arc(nx, ny, node.size * 4.5, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();

        // Node core
        ctx.beginPath();
        ctx.arc(nx, ny, node.size, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.shadowColor = node.color;
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // ── MAIN SPHERE ──
      const sr = r * pulseFactor;
      const scx = cx + tiltX * 0.6;
      const scy = cy + tiltY * 0.5;

      // Sphere body gradient
      const sphereGrad = ctx.createRadialGradient(
        scx - sr * 0.28 + tiltX * 0.4,
        scy - sr * 0.32 + tiltY * 0.3,
        sr * 0.06,
        scx, scy, sr
      );
      sphereGrad.addColorStop(0, 'rgba(31,125,159,0.55)');
      sphereGrad.addColorStop(0.3, 'rgba(13,58,112,0.38)');
      sphereGrad.addColorStop(0.7, 'rgba(10,22,43,0.28)');
      sphereGrad.addColorStop(1, 'rgba(4,9,20,0.08)');
      ctx.beginPath();
      ctx.arc(scx, scy, sr, 0, Math.PI * 2);
      ctx.fillStyle = sphereGrad;
      ctx.fill();

      // Sphere outline
      ctx.beginPath();
      ctx.arc(scx, scy, sr, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(0,209,233,0.22)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Wireframe latitude lines
      [-0.5, 0, 0.5].forEach(lat => {
        const latR = sr * Math.sqrt(1 - lat * lat);
        const latY = scy + lat * sr;
        if (latR > 2) {
          ctx.beginPath();
          ctx.ellipse(scx, latY, latR, latR * 0.18, 0, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(0,209,233,0.05)';
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      });

      // Wireframe longitude lines
      for (let i = 0; i < 5; i++) {
        const a = (i / 5) * Math.PI;
        ctx.save();
        ctx.translate(scx, scy);
        ctx.beginPath();
        ctx.ellipse(0, 0, sr * Math.abs(Math.cos(a)) * 0.8, sr, a, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(0,209,233,0.04)';
        ctx.lineWidth = 0.8;
        ctx.stroke();
        ctx.restore();
      }

      // Inner core glow
      const coreGrad = ctx.createRadialGradient(scx, scy, 0, scx, scy, sr * 0.55);
      coreGrad.addColorStop(0, 'rgba(0,209,233,0.22)');
      coreGrad.addColorStop(1, 'rgba(0,209,233,0)');
      ctx.beginPath();
      ctx.arc(scx, scy, sr * 0.55, 0, Math.PI * 2);
      ctx.fillStyle = coreGrad;
      ctx.fill();

      // Bright center point
      ctx.beginPath();
      ctx.arc(scx, scy, sr * 0.075, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255,255,255,0.88)';
      ctx.shadowColor = '#00D1E9';
      ctx.shadowBlur = 18;
      ctx.fill();
      ctx.shadowBlur = 0;

      time += 0.016;
      animId = requestAnimationFrame(drawFrame);
    }

    drawFrame();

    return () => {
      cancelAnimationFrame(animId);
      resizeObserver.disconnect();
    };
  }, []);

  const kpiCards = [
    { label: 'Retail Outlets', value: '117,862+', position: { top: '4%', right: '2%' }, delay: '0s', color: '#00D1E9' },
    { label: 'Field Users', value: '750+', position: { top: '44%', left: '0%' }, delay: '0.5s', color: '#F76F2E' },
    { label: 'Branches', value: '23', position: { bottom: '22%', right: '0%' }, delay: '1s', color: '#1F7D9F' },
    { label: 'Rows Processed', value: '100M+', position: { bottom: '4%', left: '2%' }, delay: '1.5s', color: '#00D1E9' },
  ];

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full"
      onMouseMove={handleMouseMove}
      data-testid="datasphere-container"
    >
      <canvas
        ref={canvasRef}
        style={{ width: '100%', height: '100%', background: 'transparent', display: 'block' }}
        data-testid="datasphere-canvas"
      />

      {kpiCards.map((card, i) => (
        <div
          key={i}
          className="absolute glass rounded-lg px-3.5 py-2.5 pointer-events-none"
          style={{
            ...card.position,
            animation: `float ${3.5 + i * 0.6}s ease-in-out infinite`,
            animationDelay: card.delay,
          }}
          data-testid={`kpi-card-${i}`}
        >
          <div
            className="font-outfit font-bold text-base leading-none"
            style={{ color: card.color }}
          >
            {card.value}
          </div>
          <div className="text-[#8BA0B8] text-[10px] mt-1 font-plex">{card.label}</div>
        </div>
      ))}
    </div>
  );
}
