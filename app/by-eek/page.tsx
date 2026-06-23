'use client';

import { useEffect, useRef, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

const EEK_HREF = 'https://eek-media.com/';

// ─── CTA button ───────────────────────────────────────────────────────────────

function CtaButton({ href }: { href: string }) {
  const ref = useRef<HTMLAnchorElement>(null);

  const BASE_SHADOW = [
    'inset 0 1px 0 rgba(255,255,255,0.10)',
    'inset 0 0 0 1px rgba(255,255,255,0.08)',
    '0 4px 32px rgba(0,0,0,0.38)',
  ].join(', ');

  const HOVER_SHADOW = [
    'inset 0 1px 0 rgba(255,255,255,0.14)',
    'inset 0 0 0 1px rgba(92,141,255,0.30)',
    'inset 0 0 32px rgba(92,141,255,0.08)',
    '0 0 0 1px rgba(92,141,255,0.14)',
    '0 0 40px rgba(36,91,255,0.18)',
    '0 4px 32px rgba(0,0,0,0.38)',
  ].join(', ');

  function onMove(e: React.MouseEvent<HTMLAnchorElement>) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${((e.clientX - r.left) / r.width * 100).toFixed(1)}%`);
    el.style.setProperty('--my', `${((e.clientY - r.top) / r.height * 100).toFixed(1)}%`);
  }

  function onLeave(e: React.MouseEvent<HTMLAnchorElement>) {
    const el = ref.current;
    if (!el) return;
    el.style.removeProperty('--mx');
    el.style.removeProperty('--my');
    (e.currentTarget as HTMLAnchorElement).style.boxShadow = BASE_SHADOW;
  }

  return (
    <a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={onMove}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.boxShadow = HOVER_SHADOW;
      }}
      onMouseLeave={onLeave}
      className={[
        'group relative inline-flex items-center justify-center gap-[10px]',
        'w-full sm:w-auto',
        'rounded-full px-8 sm:px-10 py-[17px]',
        'min-h-[56px]',
        'border border-white/[0.14] bg-white/[0.07] backdrop-blur-sm',
        'text-[0.95rem] sm:text-[0.98rem] font-medium tracking-[0.04em] text-white/75',
        'select-none cursor-pointer',
        'hover:border-white/[0.22] hover:bg-white/[0.11] hover:text-white',
        'hover:scale-[1.02] active:scale-[0.97]',
        '[background-image:radial-gradient(circle_at_var(--mx,50%)_var(--my,50%),rgba(140,190,255,0.10)_0%,transparent_58%)]',
      ].join(' ')}
      style={{
        boxShadow: BASE_SHADOW,
        transition: 'all 300ms ease, box-shadow 300ms ease',
      }}
    >
      <span>Siteye Devam Et</span>
      <svg
        width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden
        className="opacity-45 group-hover:opacity-75 transition-all duration-300 group-hover:translate-x-[3px]"
      >
        <path
          d="M2.5 7h9M8 4l3.5 3L8 10"
          stroke="currentColor" strokeWidth="1.35"
          strokeLinecap="round" strokeLinejoin="round"
        />
      </svg>
    </a>
  );
}

// ─── Page content ─────────────────────────────────────────────────────────────

function ByEekContent() {
  const searchParams = useSearchParams();
  const from = searchParams.get('from');
  const pageRef = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 50, y: 40 });

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

  return (
    <div
      ref={pageRef}
      className="relative min-h-[100dvh] flex flex-col overflow-hidden"
      style={{ background: '#040810' }}
    >
      {/* Noise grain */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.68' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          opacity: 0.022,
          mixBlendMode: 'screen' as React.CSSProperties['mixBlendMode'],
        }}
      />

      {/* Orb 1 — upper-left, deep navy */}
      <div
        aria-hidden
        className="absolute pointer-events-none z-[2]"
        style={{
          top: '-18%', left: '-10%',
          width: 'min(92vw, 700px)', height: 'min(92vw, 700px)',
          borderRadius: '50%',
          background: 'radial-gradient(circle at center, rgba(28,72,196,0.22) 0%, transparent 68%)',
          filter: 'blur(80px)',
          animation: 'eek-breathe-a 28s ease-in-out infinite',
          willChange: 'transform',
        }}
      />

      {/* Orb 2 — lower-right, muted cyan */}
      <div
        aria-hidden
        className="absolute pointer-events-none z-[2]"
        style={{
          bottom: '-14%', right: '-8%',
          width: 'min(78vw, 580px)', height: 'min(78vw, 580px)',
          borderRadius: '50%',
          background: 'radial-gradient(circle at center, rgba(56,199,255,0.10) 0%, transparent 68%)',
          filter: 'blur(72px)',
          animation: 'eek-breathe-b 36s ease-in-out infinite',
          willChange: 'transform',
        }}
      />

      {/* Orb 3 — centered, fills dead middle on mobile */}
      <div
        aria-hidden
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-[2]"
      >
        <div
          style={{
            width: 'min(74vw, 480px)', height: 'min(74vw, 480px)',
            borderRadius: '50%',
            background: 'radial-gradient(circle at center, rgba(36,91,255,0.12) 0%, transparent 70%)',
            filter: 'blur(90px)',
            animation: 'eek-breathe-c 22s ease-in-out infinite',
            willChange: 'transform',
            marginTop: '-10vh',
          }}
        />
      </div>

      {/* Mouse / pointer ambient — stays centered on touch devices */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none z-[3]"
        style={{
          background: `radial-gradient(ellipse 56vw 56vw at ${mouse.x}% ${mouse.y}%, rgba(36,91,255,0.050) 0%, transparent 65%)`,
          transition: 'background 100ms linear',
        }}
      />

      {/* ── Main content ── */}
      <div
        className="relative z-10 flex-1 flex flex-col items-center justify-center text-center w-full"
        style={{
          paddingTop: 'max(env(safe-area-inset-top), 52px)',
          paddingBottom: 'max(env(safe-area-inset-bottom), 52px)',
        }}
      >
        <div className="flex flex-col items-center px-6 sm:px-8 w-full max-w-[min(560px,92vw)] mx-auto">

          {/* EEK overline */}
          <p
            className="mb-4 sm:mb-5 text-[9px] font-semibold tracking-[0.38em] text-white/[0.20] uppercase"
            style={{ animation: 'eek-hero-in 0.6s cubic-bezier(0.22,1,0.36,1) 80ms both' }}
          >
            EEK MEDIA
          </p>

          {/* Headline */}
          <h1
            className="mb-5 sm:mb-6 text-[1.95rem] sm:text-[2.65rem] md:text-[3.25rem] lg:text-[3.75rem] font-semibold leading-[1.09] tracking-[-0.024em] text-white"
            style={{ animation: 'eek-hero-in 0.85s cubic-bezier(0.22,1,0.36,1) 240ms both' }}
          >
            Referanslarımız en iyi reklamımızdır.
          </h1>

          {/* Separator */}
          <div
            className="mb-5 sm:mb-7 h-px w-14 sm:w-16"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(92,141,255,0.34), transparent)',
              animation: 'eek-hero-in 0.5s cubic-bezier(0.22,1,0.36,1) 460ms both',
            }}
          />

          {/* Body text */}
          <p
            className="mb-8 sm:mb-10 text-[0.875rem] sm:text-[0.93rem] leading-[1.78] text-white/[0.38] max-w-[min(400px,88vw)]"
            style={{ animation: 'eek-hero-in 0.7s cubic-bezier(0.22,1,0.36,1) 560ms both' }}
          >
            Her projede yalnızca bir site değil, markayı daha güçlü gösteren bir dijital yapı kuruyoruz.
          </p>

          {/* CTA */}
          <div
            className="w-full sm:w-auto"
            style={{ animation: 'eek-hero-in 0.65s cubic-bezier(0.22,1,0.36,1) 740ms both' }}
          >
            <CtaButton href={EEK_HREF} />
          </div>

          {/* Back link — only when navigating from a project */}
          {from && (
            <div
              className="mt-7"
              style={{ animation: 'eek-hero-in 0.55s cubic-bezier(0.22,1,0.36,1) 960ms both' }}
            >
              <button
                onClick={() => window.history.back()}
                className="group inline-flex items-center gap-2 text-[0.73rem] font-medium tracking-[0.06em] text-white/[0.18] hover:text-white/40 transition-colors duration-300 cursor-pointer"
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
      </div>

      {/* Copyright */}
      <div
        aria-hidden
        className="relative z-10 flex justify-center"
        style={{
          paddingBottom: 'max(env(safe-area-inset-bottom), 20px)',
          animation: 'eek-hero-in 0.5s cubic-bezier(0.22,1,0.36,1) 1180ms both',
        }}
      >
        <p className="text-[7.5px] tracking-[0.26em] text-white/[0.08] uppercase select-none pointer-events-none">
          © 2026 EEK Media
        </p>
      </div>
    </div>
  );
}

// ─── Page export ──────────────────────────────────────────────────────────────

export default function ByEekPage() {
  return (
    <Suspense fallback={<div style={{ background: '#040810', minHeight: '100dvh' }} />}>
      <ByEekContent />
    </Suspense>
  );
}
