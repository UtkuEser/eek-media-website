'use client';

import { useEffect, useRef, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

// ─── Glass anchor button ──────────────────────────────────────────────────────

function GlassLink({ href, children }: { href: string; children: React.ReactNode }) {
  const ref = useRef<HTMLAnchorElement>(null);

  function onMove(e: React.MouseEvent<HTMLAnchorElement>) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${((e.clientX - r.left) / r.width * 100).toFixed(1)}%`);
    el.style.setProperty('--my', `${((e.clientY - r.top) / r.height * 100).toFixed(1)}%`);
  }

  function onLeave() {
    const el = ref.current;
    if (!el) return;
    el.style.removeProperty('--mx');
    el.style.removeProperty('--my');
  }

  return (
    <a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={onMove}
      className={[
        'group relative inline-flex items-center gap-3 rounded-full px-9 py-[18px]',
        'border border-white/[0.13] bg-white/[0.06] backdrop-blur-md',
        'text-[0.92rem] md:text-[1rem] font-medium tracking-[0.05em] text-white/72',
        'transition-all duration-300 select-none cursor-pointer',
        'hover:border-white/[0.24] hover:bg-white/[0.10] hover:text-white',
        'hover:scale-[1.03] active:scale-[0.98]',
        '[background-image:radial-gradient(circle_at_var(--mx,50%)_var(--my,50%),rgba(140,190,255,0.09)_0%,transparent_60%)]',
      ].join(' ')}
      style={{
        boxShadow: [
          'inset 0 1px 0 rgba(255,255,255,0.09)',
          '0 4px 24px rgba(0,0,0,0.32)',
        ].join(', '),
        transition: 'all 300ms ease, box-shadow 300ms ease',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.boxShadow = [
          'inset 0 1px 0 rgba(255,255,255,0.12)',
          '0 0 0 1px rgba(92,141,255,0.20)',
          '0 0 36px rgba(36,91,255,0.18)',
          '0 4px 24px rgba(0,0,0,0.32)',
        ].join(', ');
      }}
      onMouseLeave={(e) => {
        onLeave();
        (e.currentTarget as HTMLAnchorElement).style.boxShadow = [
          'inset 0 1px 0 rgba(255,255,255,0.09)',
          '0 4px 24px rgba(0,0,0,0.32)',
        ].join(', ');
      }}
    >
      <span>Siteye Devam Et</span>
      <svg
        width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden
        className="opacity-50 group-hover:opacity-80 transition-all duration-300 group-hover:translate-x-0.5"
      >
        <path d="M3.5 7.5h8M9 4.5l3 3-3 3" stroke="currentColor" strokeWidth="1.45" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </a>
  );
}

// ─── Page content ─────────────────────────────────────────────────────────────

function ByEekContent() {
  const searchParams = useSearchParams();
  const from = searchParams.get('from');

  const pageRef = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 50, y: 42 });

  useEffect(() => {
    const el = pageRef.current;
    if (!el) return;
    const handle = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      setMouse({
        x: ((e.clientX - r.left) / r.width) * 100,
        y: ((e.clientY - r.top) / r.height) * 100,
      });
    };
    el.addEventListener('mousemove', handle, { passive: true });
    return () => el.removeEventListener('mousemove', handle);
  }, []);

  const EEK_HREF = 'https://eekmedia.com.tr';

  return (
    <div
      ref={pageRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: '#04080F' }}
    >
      {/* Noise grain — very subtle texture */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.68' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          opacity: 0.025,
          mixBlendMode: 'screen' as React.CSSProperties['mixBlendMode'],
        }}
      />

      {/* Glow orb 1 — upper-left */}
      <div
        aria-hidden
        className="absolute pointer-events-none z-[2]"
        style={{
          top: '-15%',
          left: '-8%',
          width: 'min(65vw, 720px)',
          height: 'min(65vw, 720px)',
          borderRadius: '50%',
          background: 'radial-gradient(circle at center, rgba(36,91,255,0.13) 0%, transparent 68%)',
          filter: 'blur(72px)',
          animation: 'eek-sig-glow-1 32s ease-in-out infinite',
        }}
      />

      {/* Glow orb 2 — lower-right */}
      <div
        aria-hidden
        className="absolute pointer-events-none z-[2]"
        style={{
          bottom: '-12%',
          right: '-6%',
          width: 'min(55vw, 620px)',
          height: 'min(55vw, 620px)',
          borderRadius: '50%',
          background: 'radial-gradient(circle at center, rgba(56,199,255,0.08) 0%, transparent 68%)',
          filter: 'blur(72px)',
          animation: 'eek-sig-glow-2 40s ease-in-out infinite',
        }}
      />

      {/* Mouse-tracking ambient light */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none z-[3]"
        style={{
          background: `radial-gradient(ellipse 52vw 52vw at ${mouse.x}% ${mouse.y}%, rgba(36,91,255,0.058) 0%, transparent 65%)`,
          transition: 'background 80ms linear',
        }}
      />

      {/* ── Main content ── */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 md:px-12 max-w-[640px] w-full mx-auto">

        {/* EEK eyebrow */}
        <p
          className="mb-14 text-[8.5px] font-semibold tracking-[0.42em] text-white/16 uppercase"
          style={{ animation: 'eek-hero-in 0.65s cubic-bezier(0.22,1,0.36,1) 120ms both' }}
        >
          EEK MEDIA
        </p>

        {/* Main headline */}
        <h1
          className="mb-5 text-[2rem] sm:text-[2.6rem] md:text-[3.2rem] lg:text-[3.75rem] font-semibold leading-[1.07] tracking-[-0.025em] text-white"
          style={{ animation: 'eek-hero-in 0.9s cubic-bezier(0.22,1,0.36,1) 320ms both' }}
        >
          Referanslarımız en iyi reklamımızdır.
        </h1>

        {/* Thin separator */}
        <div
          className="mb-9 h-px w-14"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(92,141,255,0.30), transparent)',
            animation: 'eek-hero-in 0.55s cubic-bezier(0.22,1,0.36,1) 560ms both',
          }}
        />

        {/* Support text */}
        <p
          className="mb-14 text-[0.875rem] sm:text-[0.95rem] md:text-[1rem] leading-[1.82] text-white/32 max-w-[460px]"
          style={{ animation: 'eek-hero-in 0.75s cubic-bezier(0.22,1,0.36,1) 680ms both' }}
        >
          Her projede yalnızca bir site değil, markayı daha güçlü gösteren bir dijital yapı kuruyoruz.
        </p>

        {/* Glass CTA */}
        <div style={{ animation: 'eek-hero-in 0.7s cubic-bezier(0.22,1,0.36,1) 880ms both' }}>
          <GlassLink href={EEK_HREF}>
            Siteye Devam Et
          </GlassLink>
        </div>

        {/* Back link — only when `from` param is present */}
        {from && (
          <div
            className="mt-9"
            style={{ animation: 'eek-hero-in 0.6s cubic-bezier(0.22,1,0.36,1) 1100ms both' }}
          >
            <button
              onClick={() => window.history.back()}
              className="group inline-flex items-center gap-2 text-[0.73rem] font-medium tracking-[0.07em] text-white/16 hover:text-white/42 transition-colors duration-300 cursor-pointer"
            >
              <svg
                width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden
                className="transition-transform duration-300 group-hover:-translate-x-0.5"
              >
                <path d="M8.5 5.5H2.5M4.5 3l-2.5 2.5 2.5 2.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Projeye Geri Dön
            </button>
          </div>
        )}
      </div>

      {/* Bottom copyright */}
      <div
        className="absolute bottom-8 left-0 right-0 flex justify-center pointer-events-none z-10"
        style={{ animation: 'eek-hero-in 0.55s cubic-bezier(0.22,1,0.36,1) 1360ms both' }}
      >
        <p className="text-[8px] tracking-[0.30em] text-white/9 uppercase select-none">
          © 2026 EEK Media
        </p>
      </div>
    </div>
  );
}

// ─── Page export ──────────────────────────────────────────────────────────────

export default function ByEekPage() {
  return (
    <Suspense fallback={<div style={{ background: '#04080F', minHeight: '100vh' }} />}>
      <ByEekContent />
    </Suspense>
  );
}
