'use client';

import { useState, useEffect, useRef } from 'react';
import { WebGLShader } from '@/components/ui/web-gl-shader';
import { LiquidGlassButton } from '@/components/ui/liquid-glass-button';

// ─── Data ────────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: 'Hizmetler',       href: '#hizmetler' },
  { label: 'Çalışma Yapımız', href: '#calisma-yapimiz' },
  { label: 'Projeler',        href: '#projeler' },
  { label: 'Referanslar',     href: '#referanslar' },
  { label: 'Başvuru',         href: '#basvuru' },
];

const SERVICES = [
  { num: '01', title: 'Marka Stratejisi ve Konumlandırma',
    desc: 'Markanın pazardaki yerini, mesajını ve algı yönünü netleştiririz.' },
  { num: '02', title: 'Reklam Yönetimi ve Funnel',
    desc: 'Meta, Google ve yeniden pazarlama yapısını yalnızca trafik için değil, talep üretmek için kurgularız.' },
  { num: '03', title: 'Kreatif ve İçerik Sistemi',
    desc: 'Görsel, video, reklam metni ve kampanya içeriklerini markanın algı hedefiyle uyumlu üretiriz.' },
  { num: '04', title: 'Web Sitesi ve Landing Page',
    desc: 'Markanın güven veren dijital vitrinini ve dönüşüm odaklı sayfalarını kurarız.' },
  { num: '05', title: 'Lead Takibi ve Otomasyon',
    desc: 'Başvuru, form, WhatsApp, CRM ve takip süreçlerini daha kontrollü hale getiririz.' },
  { num: '06', title: 'Raporlama ve Gelişim',
    desc: 'Veriyi yalnızca tablo olarak değil, karar sistemi olarak kullanırız.' },
];

const STEPS = [
  { title: 'Durumu Anlarız',
    desc: 'Markanın mevcut algısını, hedef kitlesini, teklifini, reklam geçmişini ve dijital varlıklarını inceleriz.' },
  { title: 'Stratejiyi Netleştiririz',
    desc: 'Markanın ne söylemesi gerektiğini, hangi kanallarda nasıl görünmesi gerektiğini ve hangi teklif yapısıyla ilerleyeceğini belirleriz.' },
  { title: 'Sistemi Kurarız',
    desc: 'Reklam, içerik, web, funnel ve lead takip altyapısını aynı hedefe bağlı şekilde yapılandırırız.' },
  { title: 'Geliştiririz',
    desc: 'Sonuçları izler, veriye göre mesajı, kreatifi, reklam kurgusunu ve dönüşüm akışını düzenli olarak iyileştiririz.' },
];

const APPROACH_LEFT = [
  'Markanın mevcut dijital görünümünü inceleriz',
  'Hedef kitlenin karar sürecini değerlendiririz',
  'Web, reklam ve içerik tarafındaki eksikleri netleştiririz',
  'Gelen taleplerin nasıl takip edildiğine bakarız',
];

const APPROACH_RIGHT = [
  'Marka mesajını daha anlaşılır hale getiririz',
  'Web ve landing page yapısını güçlendiririz',
  'Reklam ve funnel akışını planlarız',
  'Form, WhatsApp ve lead takip sürecini düzenleriz',
];

const PROJECTS = [
  {
    title: 'Turizm Markası İçin Talep Sistemi',
    desc: 'Tur, otel ve tatil seçenekleri için reklam, kreatif, landing page ve WhatsApp yönlendirme yapısını birlikte kurgulayan talep akışı.',
    tags: ['Reklam Yönetimi', 'Kreatif Sistem', 'WhatsApp Akışı'],
  },
  {
    title: 'Yerel Hizmet Markası İçin Güven Odaklı Web Yapısı',
    desc: 'SEO temelli sayfa yapısı, hizmet anlatımı, bölgesel görünürlük ve başvuru formu ile çalışan kurumsal web sistemi.',
    tags: ['Web Sitesi', 'SEO Temeli', 'Başvuru Formu'],
  },
  {
    title: 'E-ticaret Markası İçin Funnel ve Retargeting',
    desc: 'Ürün kreatifleri, reklam testleri, yeniden pazarlama ve karar destek içerikleriyle desteklenen dönüşüm sistemi.',
    tags: ['Funnel', 'Meta Ads', 'Retargeting'],
  },
];

const PROCESS_STEPS = [
  'Formu inceleriz.',
  'Markanızın mevcut durumunu değerlendiririz.',
  'Kısa bir görüşme planlarız.',
  'Çalışma modelini birlikte netleştiririz.',
];

const NEED_OPTIONS = [
  'Marka stratejisi',
  'Reklam yönetimi',
  'İçerik ve kreatif üretim',
  'Web sitesi / landing page',
  'Funnel ve lead takibi',
  'Genel değerlendirme',
];

const BUDGET_OPTIONS = [
  'Henüz net değil',
  '15.000 TL – 30.000 TL',
  '30.000 TL – 60.000 TL',
  '60.000 TL ve üzeri',
];

const REFERENCES = [
  { name: 'Cave Arts',             logo: '/eek_referans/cavearts_logo.svg' },
  { name: 'Coffy',                 logo: '/eek_referans/coffy_logo.svg' },
  { name: 'Foramak Makine',        logo: '/eek_referans/foramak_makina_logo.svg' },
  { name: 'Made in Turan',         logo: '/eek_referans/made_in_turan_logo.svg' },
  { name: 'Mebe Turizm',           logo: '/eek_referans/mebe_logo.svg' },
  { name: 'NAS Çevre Danışmanlık', logo: '/eek_referans/nas_cevre_danismanlik_logo.svg' },
  { name: "R'vize",                logo: "/eek_referans/r'vize_logo.svg" },
];

const INPUT_CLS = [
  'w-full rounded-lg border border-[#d1d9e0] bg-white px-4 py-3',
  'text-[0.875rem] text-[#071426] placeholder:text-[#9aabb8]',
  'focus:border-[#3b7dbf]/50 focus:outline-none',
  'transition-colors duration-200',
].join(' ');

// ─── Navbar ──────────────────────────────────────────────────────────────────

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.06] bg-[#0a1628]/85 backdrop-blur-md">
      <div className="flex items-center justify-between px-6 py-4 md:px-12">
        <a href="#" className="text-base font-semibold tracking-widest text-white/90 uppercase">
          EEK Media
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(l => (
            <a key={l.href} href={l.href}
               className="text-sm text-white/55 hover:text-white/90 transition-colors duration-200 tracking-wide">
              {l.label}
            </a>
          ))}
        </nav>

        <a href="#basvuru"
           className="hidden md:inline-flex items-center rounded-full border border-white/[0.13] px-5 py-2 text-sm text-white/55 hover:text-white/85 hover:border-white/25 transition-all duration-200 tracking-wide">
          Görüşme Talebi
        </a>

        <button
          className="md:hidden flex flex-col gap-1.5 p-1"
          aria-label={open ? 'Menüyü kapat' : 'Menüyü aç'}
          onClick={() => setOpen(o => !o)}
        >
          {open ? (
            <>
              <span className="block w-5 h-px bg-white/70 rotate-45 translate-y-[3.5px]" />
              <span className="block w-5 h-px bg-white/70 -rotate-45 -translate-y-[3.5px]" />
            </>
          ) : (
            <>
              <span className="block w-5 h-px bg-white/60" />
              <span className="block w-5 h-px bg-white/60" />
              <span className="block w-3.5 h-px bg-white/60" />
            </>
          )}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-white/[0.06] bg-[#0a1628]/95">
          <nav className="flex flex-col px-6 py-3">
            {NAV_LINKS.map(l => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)}
                 className="py-3 text-sm text-white/62 hover:text-white/90 transition-colors border-b border-white/[0.04] last:border-0">
                {l.label}
              </a>
            ))}
            <a href="#basvuru" onClick={() => setOpen(false)}
               className="mt-3 pb-2 text-sm text-[#5b9bd5]/72 hover:text-[#5b9bd5] transition-colors">
              Görüşme Talebi
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

// ─── Hero ────────────────────────────────────────────────────────────────────
// Onaylandı — değiştirilmedi.

function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#0a1628]">
      <div className="absolute inset-0 z-0">
        <WebGLShader className="w-full h-full" />
      </div>

      <div
        className="absolute inset-0 z-[5] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 56% at 50% 34%, rgba(6,13,32,0.38) 0%, transparent 100%)',
        }}
      />

      <div className="relative z-10 flex flex-col items-center text-center px-6 pt-[17vh]">
        <p className="mb-6 text-[10px] font-medium tracking-[0.22em] text-[#5b9bd5]/70 uppercase">
          Stratejik Dijital Pazarlama Stüdyosu
        </p>

        <h1 className="mb-5 text-[2.4rem] md:text-[3.2rem] lg:text-[4.2rem] font-semibold leading-[1.13] tracking-[-0.022em] text-white">
          <span className="block">Görünürlük başlangıçtır.</span>
          <span className="block text-[#bdd8f2]">Güven tercih sebebidir.</span>
        </h1>

        <p className="mb-5 max-w-[30rem] text-[0.95rem] leading-[1.82] text-white/72">
          EEK Media, markaların dijitalde daha doğru görünmesini, daha güvenilir
          algılanmasını ve daha nitelikli müşteri talepleri almasını sağlayan
          stratejik bir dijital pazarlama stüdyosudur.
        </p>

        <div className="mb-6 flex items-center justify-center gap-2 rounded-full border border-emerald-500/[0.15] bg-black/[0.22] px-4 py-1.5">
          <span className="w-[5px] h-[5px] shrink-0 rounded-full bg-emerald-400/80 animate-pulse" />
          <p className="text-[10px] tracking-[0.06em] text-emerald-300/82">
            Stratejik markalar için sistem odaklı büyüme
          </p>
        </div>

        <LiquidGlassButton>
          Markanızın Geleceğini Konuşalım
        </LiquidGlassButton>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-28 z-10 bg-gradient-to-t from-[#0a1628] to-transparent" />
    </section>
  );
}

// ─── Ne Yapıyoruz? ───────────────────────────────────────────────────────────

function WhatWeDo() {
  return (
    <section id="hizmetler" className="scroll-mt-20 bg-[#F7F8FA] py-24 md:py-32 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <div className="reveal mb-16">
          <p className="mb-3 text-[10px] font-medium tracking-[0.22em] text-[#3b7dbf] uppercase">
            Hizmetler
          </p>
          <h2 className="mb-4 text-[1.8rem] md:text-[2.3rem] font-semibold leading-[1.14] tracking-[-0.02em] text-[#071426]">
            Ne Yapıyoruz?
          </h2>
          <p className="text-[0.9rem] leading-[1.80] text-[#5F6B7A] max-w-[44rem]">
            Markaların yalnızca görünür olmasını değil; doğru algılanmasını, güven üretmesini
            ve nitelikli müşteri talebi oluşturmasını sağlayan dijital yapılar kuruyoruz.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map((svc, i) => (
            <div
              key={svc.num}
              className="reveal group rounded-xl border border-[#e2e8ef] bg-white p-7 hover:border-[#3b7dbf]/35 hover:shadow-sm transition-all duration-300"
              style={{ transitionDelay: `${i * 70}ms` }}
            >
              <div className="mb-5 h-[1.5px] w-7 bg-[#3b7dbf]/30 group-hover:w-12 group-hover:bg-[#3b7dbf]/60 transition-all duration-300" />
              <p className="mb-1.5 text-[10px] font-medium tracking-[0.18em] text-[#3b7dbf] uppercase">
                {svc.num}
              </p>
              <h3 className="mb-3 text-[0.9rem] font-semibold leading-[1.45] text-[#071426]">
                {svc.title}
              </h3>
              <p className="text-[0.83rem] leading-[1.72] text-[#5F6B7A]">
                {svc.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Nasıl Çalışıyoruz? ──────────────────────────────────────────────────────

const BURST_PARTICLES = [
  // Large anchor particles
  { tx:  85, ty: -52, delay:   0, r: 9.0, color: '#245BFF' },
  { tx: 145, ty: -18, delay:  28, r: 7.0, color: '#6EDCFF' },
  { tx: 115, ty:  38, delay:  18, r: 8.0, color: '#1D4ED8' },
  { tx:  62, ty:  72, delay:  55, r: 6.5, color: '#3B82F6' },
  { tx: 175, ty: -48, delay:  42, r: 7.5, color: '#245BFF' },
  { tx: 210, ty:  12, delay:  52, r: 6.0, color: '#6EDCFF' },
  // Medium particles
  { tx:  95, ty: -85, delay:  14, r: 5.0, color: '#93C5FD' },
  { tx: 160, ty:  58, delay:  68, r: 4.5, color: '#1D4ED8' },
  { tx:  48, ty: -68, delay:  38, r: 5.0, color: '#BFDBFE' },
  { tx: 230, ty: -28, delay:  78, r: 4.5, color: '#245BFF' },
  { tx: 135, ty:  80, delay:  32, r: 4.0, color: '#6EDCFF' },
  { tx:  78, ty:  58, delay:  88, r: 4.5, color: '#3B82F6' },
  { tx: 190, ty: -62, delay:  44, r: 4.0, color: '#93C5FD' },
  { tx:  30, ty:  85, delay: 105, r: 3.5, color: '#6EDCFF' },
  // Small fast particles
  { tx: 105, ty: -42, delay:   8, r: 3.5, color: '#6EDCFF' },
  { tx: 185, ty:  42, delay:  22, r: 3.5, color: '#245BFF' },
  { tx:  58, ty: -95, delay:  48, r: 3.0, color: '#93C5FD' },
  { tx: 250, ty:   6, delay:  62, r: 3.0, color: '#BFDBFE' },
  { tx: 165, ty: -72, delay:  36, r: 3.0, color: '#1D4ED8' },
  { tx: 200, ty: -38, delay:  72, r: 2.5, color: '#6EDCFF' },
  { tx: 120, ty:  95, delay:  58, r: 2.5, color: '#3B82F6' },
  { tx:  72, ty: -80, delay:  26, r: 2.5, color: '#BFDBFE' },
  { tx: 260, ty: -12, delay:  82, r: 2.5, color: '#6EDCFF' },
  { tx: 142, ty: -90, delay:  16, r: 2.0, color: '#93C5FD' },
];

function BurstParticles({ x, y }: { x: number; y: number }) {
  return (
    <>
      {BURST_PARTICLES.map((p, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            top: `${y}px`,
            left: `${x}px`,
            width: `${p.r * 2}px`,
            height: `${p.r * 2}px`,
            borderRadius: '50%',
            background: p.color,
            boxShadow: `0 0 ${Math.round(p.r * 2.5)}px ${Math.round(p.r * 1.2)}px ${p.color}99`,
            ['--ptx' as string]: `${p.tx}px`,
            ['--pty' as string]: `${p.ty}px`,
            animation: `eek-particle-fly 1.55s ease-out ${p.delay}ms forwards`,
            pointerEvents: 'none',
          } as React.CSSProperties}
        />
      ))}
    </>
  );
}

function CargoBox({ rolling }: { rolling: boolean }) {
  return (
    <div style={{
      width: 22, height: 17, borderRadius: 3,
      background: 'linear-gradient(150deg, #3B82F6 0%, #1D4ED8 100%)',
      border: '1.5px solid #1a3ab8',
      boxShadow: '0 2px 12px rgba(36,91,255,0.5), inset 0 1px 0 rgba(255,255,255,0.22)',
      position: 'relative', overflow: 'hidden',
      animation: rolling ? 'eek-cargo-roll 0.46s linear infinite' : 'none',
    }}>
      <div style={{
        position: 'absolute', top: 6, left: 0, right: 0,
        height: 1.5, background: 'rgba(255,255,255,0.28)',
      }} />
      <div style={{
        position: 'absolute', top: 0, bottom: 0, left: '40%', right: '40%',
        background: 'rgba(255,255,255,0.14)',
      }} />
      <div style={{
        position: 'absolute', top: 1, left: 2,
        width: 7, height: 2, borderRadius: 1,
        background: 'rgba(255,255,255,0.3)',
      }} />
    </div>
  );
}

const SVG_CY   = 22;   // vertical center in SVG coords (aligns with circle centers)
const WAVE_AMP = 11;
const WAVE_CYCLES = 2.5;
const CONV_MS  = 820;  // 02→03 conveyor travel
const ROLL_MS  = 820;  // 03→04 rolling travel

function makeWavePath(x0: number, x1: number, cy: number, amp: number, cycles: number): string {
  if (x1 <= x0) return `M ${x0} ${cy}`;
  const halfLen = (x1 - x0) / (cycles * 2);
  let d = `M ${x0} ${cy}`;
  let dir = -1;
  for (let i = 0; i < Math.ceil(cycles * 2); i++) {
    const sx  = x0 + i * halfLen;
    const ex  = Math.min(sx + halfLen, x1);
    const py  = cy + dir * amp;
    d += ` C ${sx + halfLen * 0.37} ${py} ${ex - halfLen * 0.37} ${py} ${ex} ${cy}`;
    dir = -dir;
  }
  return d;
}

function HowWeWork() {
  const [reachedStep,   setReachedStep]   = useState(-1);
  const [pulsing,       setPulsing]       = useState(-1);
  const [waveActive,    setWaveActive]    = useState(false);
  const [cargoAt,       setCargoAt]       = useState(-1);
  const [isRolling,     setIsRolling]     = useState(false);
  const [showParticles, setShowParticles] = useState(false);
  const [stepXs,        setStepXs]        = useState<number[]>([]);
  const [lineWidth,     setLineWidth]     = useState(0);
  const [hoveredStep,   setHoveredStep]   = useState<number | null>(null);

  const sectionRef = useRef<HTMLElement>(null);
  const lineRef    = useRef<HTMLDivElement>(null);
  const circleRefs = useRef<(HTMLDivElement | null)[]>([null, null, null, null]);
  const hasStarted = useRef(false);
  const timers     = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clear = () => { timers.current.forEach(clearTimeout); timers.current = []; };
  const after = (fn: () => void, ms: number) => { timers.current.push(setTimeout(fn, ms)); };

  const measure = () => {
    if (!lineRef.current) return;
    const lineRect = lineRef.current.getBoundingClientRect();
    const xs = circleRefs.current.map(el => {
      if (!el) return 0;
      const r = el.getBoundingClientRect();
      return r.left + r.width / 2 - lineRect.left;
    });
    setStepXs(xs);
    setLineWidth(lineRef.current.offsetWidth);
  };

  function runSequence() {
    clear();
    setReachedStep(-1); setPulsing(-1);
    setWaveActive(false);
    setCargoAt(-1); setIsRolling(false); setShowParticles(false);

    let t = 0;

    // Step 01 activates
    t += 400;
    after(() => { setReachedStep(0); setPulsing(0); }, t);

    // Pulse done → wave starts revealing + flowing
    t += 560;
    after(() => { setPulsing(-1); setWaveActive(true); }, t);

    // Wave reveal complete → step 02 activates
    t += 1000;
    after(() => { setReachedStep(1); setPulsing(1); }, t);

    // Cargo appears at node 02
    t += 460;
    after(() => { setPulsing(-1); setCargoAt(1); }, t);

    // Cargo departs toward 03 (steady conveyor, no rolling)
    t += 280;
    after(() => { setCargoAt(2); }, t);

    // Cargo arrives at 03
    t += CONV_MS;
    after(() => { setReachedStep(2); setPulsing(2); }, t);

    // Rolling departure toward 04
    t += 480;
    after(() => { setPulsing(-1); setCargoAt(3); setIsRolling(true); }, t);

    // Cargo arrives at 04
    t += ROLL_MS;
    after(() => { setReachedStep(3); setPulsing(3); setIsRolling(false); }, t);

    // Exits to end with a roll
    t += 520;
    after(() => { setPulsing(-1); setCargoAt(4); setIsRolling(true); }, t);

    // Particle burst
    t += 580;
    after(() => { setShowParticles(true); }, t);

    // Particles done
    t += 1900;
    after(() => { setShowParticles(false); setIsRolling(false); }, t);

    // Loop
    after(runSequence, t + 2000);
  }

  useEffect(() => {
    measure();
    const ro = new ResizeObserver(measure);
    if (lineRef.current) ro.observe(lineRef.current);
    return () => { ro.disconnect(); clear(); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const obs = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || hasStarted.current) return;
      hasStarted.current = true;
      if (reduced) { setReachedStep(3); return; }
      runSequence();
    }, { threshold: 0.28 });
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const endX = lineWidth > 0 ? lineWidth - 8 : 0;

  // Cargo horizontal position — changes trigger CSS left-transition
  const cargoXpx =
    stepXs.length < 4 ? 0
    : cargoAt < 0     ? stepXs[1]   // hidden; pre-positioned at node 02
    : cargoAt === 1   ? stepXs[1]   // at node 02
    : cargoAt === 2   ? stepXs[2]   // traveling to / at node 03
    : cargoAt === 3   ? stepXs[3]   // traveling to / at node 04
    :                   endX;

  const cargoTrans = cargoAt >= 0
    ? `left ${CONV_MS}ms cubic-bezier(0.4,0,0.2,1), opacity 0.32s ease`
    : 'opacity 0.12s ease';

  // Active straight-line fill for the 02→04 segment
  const activeLineX = stepXs[1] ?? 0;
  const activeLineW = reachedStep >= 1 && stepXs.length === 4
    ? Math.max(0, (stepXs[Math.min(reachedStep, 3)] ?? activeLineX) - activeLineX)
    : 0;

  const wavePath = stepXs.length >= 2
    ? makeWavePath(stepXs[0], stepXs[1], SVG_CY, WAVE_AMP, WAVE_CYCLES)
    : '';
  const waveRevealW = stepXs.length >= 2 ? stepXs[1] - stepXs[0] : 0;

  return (
    <section
      ref={sectionRef}
      id="calisma-yapimiz"
      className="scroll-mt-20 bg-[#EEF3F8] py-24 md:py-32 px-6 md:px-12 lg:px-20"
    >
      <div className="max-w-7xl mx-auto">
        <div className="reveal mb-16">
          <p className="mb-3 text-[10px] font-medium tracking-[0.22em] text-[#3b7dbf] uppercase">
            Çalışma Modeli
          </p>
          <h2 className="mb-4 text-[1.8rem] md:text-[2.3rem] font-semibold leading-[1.14] tracking-[-0.02em] text-[#071426]">
            Nasıl Çalışıyoruz?
          </h2>
          <p className="text-[0.9rem] leading-[1.80] text-[#5F6B7A] max-w-[44rem]">
            Her markaya aynı paketi sunmak yerine, mevcut durumu analiz eden ve sistemi
            markanın hedeflerine göre kuran kontrollü bir çalışma modeli izliyoruz.
          </p>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">

          {/* ── SVG animation layer — desktop only ────────────────────── */}
          <div
            ref={lineRef}
            className="hidden lg:block absolute inset-x-0 pointer-events-none"
            style={{ top: '0px', height: `${SVG_CY * 2}px`, overflow: 'visible' }}
          >
            {stepXs.length === 4 && lineWidth > 0 && (
              <>
                <svg
                  width={lineWidth}
                  height={SVG_CY * 2}
                  style={{ position: 'absolute', top: 0, left: 0, overflow: 'visible' }}
                  aria-hidden
                >
                  <defs>
                    <linearGradient id="eek-active-grad" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#1D4ED8" />
                      <stop offset="100%" stopColor="#3B82F6" />
                    </linearGradient>
                    <linearGradient
                      id="eek-wave-grad"
                      gradientUnits="userSpaceOnUse"
                      x1={stepXs[0]}
                      y1={0}
                      x2={stepXs[1]}
                      y2={0}
                    >
                      <stop offset="0%" stopColor="#1D4ED8" />
                      <stop offset="100%" stopColor="#6EDCFF" />
                    </linearGradient>
                    <clipPath id="eek-wave-clip">
                      <rect
                        x={stepXs[0]}
                        y={0}
                        height={SVG_CY * 2}
                        style={{
                          width: `${waveActive ? waveRevealW : 0}px`,
                          transition: waveActive
                            ? 'width 1s cubic-bezier(0.4,0,0.2,1)'
                            : 'none',
                        }}
                      />
                    </clipPath>
                  </defs>

                  {/* Base track */}
                  <line
                    x1={0} y1={SVG_CY}
                    x2={lineWidth} y2={SVG_CY}
                    stroke="#cdd8e6" strokeWidth={2} strokeLinecap="round"
                  />

                  {/* Wave — 01→02: revealed by growing clip, then flows */}
                  {wavePath && (
                    <path
                      d={wavePath}
                      fill="none"
                      stroke="url(#eek-wave-grad)"
                      strokeWidth={2.5}
                      strokeLinecap="round"
                      clipPath="url(#eek-wave-clip)"
                      strokeDasharray="14 6"
                      style={{
                        animation: waveActive
                          ? 'eek-wave-flow 1.4s linear infinite'
                          : 'none',
                      }}
                    />
                  )}

                  {/* Active fill — 02→04 straight segment */}
                  {reachedStep >= 1 && (
                    <rect
                      x={activeLineX}
                      y={SVG_CY - 1}
                      height={2}
                      rx={1}
                      fill="url(#eek-active-grad)"
                      style={{
                        width: `${activeLineW}px`,
                        transition: 'width 0.78s cubic-bezier(0.4,0,0.2,1)',
                      }}
                    />
                  )}

                  {/* Glow dot at current step circle */}
                  {reachedStep >= 0 && (
                    <circle
                      cx={stepXs[reachedStep] ?? stepXs[0]}
                      cy={SVG_CY}
                      r={4}
                      fill="#6EDCFF"
                      style={{ filter: 'drop-shadow(0 0 5px rgba(110,220,255,0.9))' }}
                    />
                  )}
                </svg>

                {/* Cargo package */}
                <div
                  style={{
                    position: 'absolute',
                    top: SVG_CY,
                    left: cargoXpx,
                    opacity: cargoAt >= 0 ? 1 : 0,
                    transition: cargoTrans,
                    zIndex: 4,
                  }}
                >
                  <div style={{ transform: 'translate(-50%, -50%)' }}>
                    <CargoBox rolling={isRolling} />
                  </div>
                </div>

                {/* Particle burst at end of line */}
                {showParticles && (
                  <BurstParticles x={endX} y={SVG_CY} />
                )}
              </>
            )}
          </div>

          {/* ── Step items ─────────────────────────────────────────────── */}
          {STEPS.map((stepData, i) => {
            const isActive  = reachedStep >= i;
            const isHovered = hoveredStep === i;

            return (
              <div
                key={i}
                className="reveal relative"
                style={{ transitionDelay: `${i * 90}ms` }}
                onMouseEnter={() => setHoveredStep(i)}
                onMouseLeave={() => setHoveredStep(null)}
              >
                <div className="relative z-10 mb-6 inline-flex">
                  {pulsing === i && (
                    <div
                      style={{
                        position: 'absolute', top: '50%', left: '50%',
                        width: 44, height: 44, borderRadius: '50%',
                        border: '2px solid rgba(36,91,255,0.62)',
                        animation: 'eek-pulse-ring 0.9s ease-out forwards',
                        pointerEvents: 'none',
                      }}
                    />
                  )}
                  <div
                    ref={(el: HTMLDivElement | null) => { circleRefs.current[i] = el; }}
                    className="flex h-11 w-11 items-center justify-center rounded-full"
                    style={{
                      border: `1.5px solid ${isActive ? '#245BFF' : 'rgba(59,125,191,0.22)'}`,
                      background: isActive ? 'rgba(219,234,254,0.5)' : '#EEF3F8',
                      transform: isHovered ? 'scale(1.12)' : isActive ? 'scale(1.05)' : 'scale(1)',
                      boxShadow: isActive
                        ? '0 0 0 4px rgba(36,91,255,0.1), 0 2px 12px rgba(36,91,255,0.2)'
                        : isHovered ? '0 0 0 3px rgba(36,91,255,0.07)' : 'none',
                      transition: 'transform 0.35s ease, border-color 0.5s ease, box-shadow 0.5s ease, background 0.5s ease',
                    }}
                  >
                    <span
                      style={{
                        fontSize: '11px', fontWeight: 600,
                        color: isActive ? '#1D4ED8' : 'rgba(59,125,191,0.4)',
                        transition: 'color 0.45s ease',
                      }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                </div>

                <h3 className="mb-3 text-[0.9rem] font-semibold text-[#071426]">
                  {stepData.title}
                </h3>
                <p className="text-[0.83rem] leading-[1.72] text-[#5F6B7A]">
                  {stepData.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── Nasıl Yaklaşıyoruz? ─────────────────────────────────────────────────────

function WhoWeWorkWith() {
  return (
    <section id="uygunluk" className="scroll-mt-20 bg-[#F5F2EC] py-24 md:py-32 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <div className="reveal mb-14">
          <p className="mb-3 text-[10px] font-medium tracking-[0.22em] text-[#3b7dbf] uppercase">
            Yaklaşımımız
          </p>
          <h2 className="mb-4 text-[1.8rem] md:text-[2.3rem] font-semibold leading-[1.14] tracking-[-0.02em] text-[#071426] max-w-[38rem]">
            Doğru Yapıyı Birlikte Kurarız
          </h2>
          <p className="text-[0.9rem] leading-[1.80] text-[#5F6B7A] max-w-[44rem]">
            Her markanın ihtiyacı aynı değildir. Bu yüzden önce markanın mevcut durumunu,
            hedeflerini ve dijitalde hangi noktada güçlenmesi gerektiğini anlarız.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          <div className="reveal rounded-xl border border-[#3b7dbf]/22 bg-white p-8 md:p-10">
            <div className="mb-7 flex items-center gap-3">
              <div className="w-[3px] h-5 rounded-full bg-[#3b7dbf]/55" />
              <h3 className="text-[0.78rem] font-semibold tracking-[0.18em] text-[#3b7dbf] uppercase">
                Önce Anlarız
              </h3>
            </div>
            <ul className="space-y-4">
              {APPROACH_LEFT.map(item => (
                <li key={item} className="flex items-start gap-3.5">
                  <span className="mt-[7px] w-[5px] h-[5px] shrink-0 rounded-full bg-[#3b7dbf]/40" />
                  <span className="text-[0.875rem] leading-[1.70] text-[#5F6B7A]">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div
            className="reveal rounded-xl border border-[#d1d9e0] bg-white p-8 md:p-10"
            style={{ transitionDelay: '90ms' }}
          >
            <div className="mb-7 flex items-center gap-3">
              <div className="w-[3px] h-5 rounded-full bg-[#4B5563]/40" />
              <h3 className="text-[0.78rem] font-semibold tracking-[0.18em] text-[#4B5563] uppercase">
                Sonra Yapıyı Kurarız
              </h3>
            </div>
            <ul className="space-y-4">
              {APPROACH_RIGHT.map(item => (
                <li key={item} className="flex items-start gap-3.5">
                  <span className="mt-[7px] w-[5px] h-[5px] shrink-0 rounded-full bg-[#4B5563]/30" />
                  <span className="text-[0.875rem] leading-[1.70] text-[#5F6B7A]">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Kurulan Sistemler ────────────────────────────────────────────────────────

function Projects() {
  return (
    <section id="projeler" className="scroll-mt-20 bg-[#F7F8FA] py-24 md:py-32 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <div className="reveal mb-16">
          <p className="mb-3 text-[10px] font-medium tracking-[0.22em] text-[#3b7dbf] uppercase">
            Projeler
          </p>
          <h2 className="mb-4 text-[1.8rem] md:text-[2.3rem] font-semibold leading-[1.14] tracking-[-0.02em] text-[#071426]">
            Kurulan Sistemler
          </h2>
          <p className="text-[0.9rem] leading-[1.80] text-[#5F6B7A] max-w-[44rem]">
            Her çalışma; markanın algısını, reklam performansını, içerik yapısını ve talep
            takip sürecini birlikte ele alan bir sistem olarak tasarlanır.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {PROJECTS.map((project, i) => (
            <div
              key={i}
              className="reveal group flex flex-col rounded-xl border border-[#e2e8ef] bg-white p-7 hover:border-[#3b7dbf]/35 hover:shadow-sm transition-all duration-300"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="mb-7 h-px w-full bg-[#e2e8ef] group-hover:bg-[#3b7dbf]/30 transition-colors duration-500" />
              <div className="flex-1">
                <h3 className="mb-3 text-[0.9rem] font-semibold leading-[1.50] text-[#071426]">
                  {project.title}
                </h3>
                <p className="text-[0.83rem] leading-[1.72] text-[#5F6B7A]">
                  {project.desc}
                </p>
              </div>
              <div className="mt-7 flex flex-wrap gap-2">
                {project.tags.map(tag => (
                  <span
                    key={tag}
                    className="text-[9.5px] tracking-[0.08em] text-[#3b7dbf] border border-[#3b7dbf]/25 px-2.5 py-[3px] rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Referanslar ─────────────────────────────────────────────────────────────

function References() {
  const row1 = REFERENCES.slice(0, 4);
  const row2 = REFERENCES.slice(4);

  return (
    <section id="referanslar" className="scroll-mt-20 bg-[#F5F2EC] py-20 md:py-28 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">

        {/* Header: left title + right trust note */}
        <div className="reveal mb-10 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div>
            <p className="mb-3 text-[10px] font-medium tracking-[0.22em] text-[#3b7dbf] uppercase">
              Referanslar
            </p>
            <h2 className="mb-4 text-[1.8rem] md:text-[2.3rem] font-semibold leading-[1.14] tracking-[-0.02em] text-[#071426]">
              Birlikte Çalıştığımız Markalar
            </h2>
            <p className="text-[0.9rem] leading-[1.80] text-[#5F6B7A] max-w-[40rem]">
              Farklı sektörlerde, farklı ihtiyaçlarla çalışıyoruz. Ortak nokta; daha düzenli,
              daha güven veren ve daha ölçülebilir bir dijital yapı kurmak.
            </p>
          </div>
          <p className="shrink-0 max-w-[17rem] text-[0.78rem] leading-[1.80] text-[#9aabb8] lg:text-right">
            Her marka için ayrı süreç. Referanslarımız yapılan işleri değil, kurulan sistemleri temsil eder.
          </p>
        </div>

        {/* Reference panel — white surface, clean grid */}
        <div
          className="reveal rounded-2xl border border-[#e2e8ef] overflow-hidden bg-white"
          style={{
            transitionDelay: '100ms',
            boxShadow: '0 2px 16px rgba(7,20,38,0.06)',
          }}
        >
          {/* Desktop — Row 1: 4 logos */}
          <div className="hidden lg:grid lg:grid-cols-4 divide-x divide-[#eaecf0]">
            {row1.map((ref) => (
              <div
                key={ref.name}
                className="flex items-center justify-center h-[110px] px-8 hover:bg-[#f5f7fa] transition-colors duration-300"
              >
                <img
                  src={ref.logo}
                  alt={ref.name}
                  className="max-h-[60px] max-w-[150px] w-auto object-contain transition-transform duration-300 ease-out hover:scale-[1.18]"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
              </div>
            ))}
          </div>

          {/* Desktop — row separator */}
          <div className="hidden lg:block h-px bg-[#eaecf0]" />

          {/* Desktop — Row 2: 3 logos, centered */}
          <div className="hidden lg:flex justify-center divide-x divide-[#eaecf0]">
            {row2.map((ref) => (
              <div
                key={ref.name}
                className="flex items-center justify-center h-[110px] px-8 w-1/4 hover:bg-[#f5f7fa] transition-colors duration-300"
              >
                <img
                  src={ref.logo}
                  alt={ref.name}
                  className="max-h-[60px] max-w-[150px] w-auto object-contain transition-transform duration-300 ease-out hover:scale-[1.18]"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
              </div>
            ))}
          </div>

          {/* Mobile/tablet — 2-col grid */}
          <div className="lg:hidden grid grid-cols-2">
            {REFERENCES.map((ref, i) => {
              const isRight = i % 2 === 1;
              const notFirstRow = i >= 2;
              const isLastLone =
                REFERENCES.length % 2 !== 0 && i === REFERENCES.length - 1;
              return (
                <div
                  key={`mob-${ref.name}`}
                  className={[
                    'flex items-center justify-center h-[88px] px-5',
                    'hover:bg-[#f5f7fa] transition-colors duration-300',
                    isRight ? 'border-l border-[#eaecf0]' : '',
                    notFirstRow ? 'border-t border-[#eaecf0]' : '',
                    isLastLone ? 'col-span-2' : '',
                  ].filter(Boolean).join(' ')}
                >
                  <img
                    src={ref.logo}
                    alt={ref.name}
                    className="max-h-[52px] max-w-[130px] w-auto object-contain transition-transform duration-300 ease-out hover:scale-[1.15]"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                  />
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}

// ─── Başvuru ──────────────────────────────────────────────────────────────────

function Contact() {
  const [fields, setFields] = useState({
    name: '', brand: '', website: '', sector: '', need: '', budget: '', message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setFields(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <section id="basvuru" className="scroll-mt-20 bg-[#EEF3F8] py-24 md:py-32 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <div className="reveal mb-14">
          <p className="mb-3 text-[10px] font-medium tracking-[0.22em] text-[#3b7dbf] uppercase">
            İletişim
          </p>
          <h2 className="mb-4 text-[1.8rem] md:text-[2.3rem] font-semibold leading-[1.14] tracking-[-0.02em] text-[#071426] max-w-[36rem]">
            Markanızın Geleceğini Konuşalım
          </h2>
          <p className="text-[0.9rem] leading-[1.80] text-[#5F6B7A] max-w-[44rem]">
            Markanızın mevcut dijital yapısını, hedeflerini ve büyüme ihtiyaçlarını birlikte
            değerlendirelim. Size en doğru web, reklam, funnel ve lead takip yapısını konuşalım.
          </p>
        </div>

        <div
          className="reveal grid lg:grid-cols-[1fr_288px] gap-6 xl:gap-10"
          style={{ transitionDelay: '80ms' }}
        >
          {/* Form */}
          {submitted ? (
            <div className="flex flex-col items-center justify-center rounded-xl border border-emerald-200 bg-emerald-50 px-8 py-16 text-center">
              <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-full border border-emerald-300 bg-emerald-100">
                <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
                  <path d="M1 6l4.5 4.5L15 1" stroke="#059669" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <p className="text-[0.9rem] text-[#5F6B7A] leading-[1.80] max-w-[22rem]">
                Talebiniz alındı. En kısa sürede görüşme için geri döneceğiz.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="mb-1.5 block text-[10px] font-medium tracking-[0.12em] text-[#5F6B7A] uppercase">
                  Ad Soyad
                </label>
                <input type="text" name="name" value={fields.name} onChange={handleChange}
                  placeholder="Adınız Soyadınız" className={INPUT_CLS} required />
              </div>

              <div>
                <label className="mb-1.5 block text-[10px] font-medium tracking-[0.12em] text-[#5F6B7A] uppercase">
                  Marka / İşletme Adı
                </label>
                <input type="text" name="brand" value={fields.brand} onChange={handleChange}
                  placeholder="Marka adınız" className={INPUT_CLS} required />
              </div>

              <div>
                <label className="mb-1.5 block text-[10px] font-medium tracking-[0.12em] text-[#5F6B7A] uppercase">
                  Web Sitesi veya Instagram
                </label>
                <input type="text" name="website" value={fields.website} onChange={handleChange}
                  placeholder="instagram.com/markaniz" className={INPUT_CLS} />
              </div>

              <div>
                <label className="mb-1.5 block text-[10px] font-medium tracking-[0.12em] text-[#5F6B7A] uppercase">
                  Sektör
                </label>
                <input type="text" name="sector" value={fields.sector} onChange={handleChange}
                  placeholder="Örn: e-ticaret, turizm, hizmet" className={INPUT_CLS} />
              </div>

              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-[10px] font-medium tracking-[0.12em] text-[#5F6B7A] uppercase">
                  Şu an en büyük ihtiyacınız nedir?
                </label>
                <div className="relative">
                  <select name="need" value={fields.need} onChange={handleChange}
                    className={INPUT_CLS + ' appearance-none cursor-pointer pr-10'}>
                    <option value="" disabled>Seçiniz</option>
                    {NEED_OPTIONS.map(o => <option key={o}>{o}</option>)}
                  </select>
                  <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#9aabb8]">
                    <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                      <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-[10px] font-medium tracking-[0.12em] text-[#5F6B7A] uppercase">
                  Aylık pazarlama bütçesi aralığı
                </label>
                <div className="relative">
                  <select name="budget" value={fields.budget} onChange={handleChange}
                    className={INPUT_CLS + ' appearance-none cursor-pointer pr-10'}>
                    <option value="" disabled>Seçiniz</option>
                    {BUDGET_OPTIONS.map(o => <option key={o}>{o}</option>)}
                  </select>
                  <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#9aabb8]">
                    <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                      <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-[10px] font-medium tracking-[0.12em] text-[#5F6B7A] uppercase">
                  Mesaj
                </label>
                <textarea name="message" value={fields.message} onChange={handleChange} rows={4}
                  placeholder="Markanız hakkında kısaca bilgi verin..."
                  className={INPUT_CLS + ' resize-none'} />
              </div>

              <div className="sm:col-span-2 pt-1">
                <button
                  type="submit"
                  className="rounded-full bg-[#071426] px-8 py-3.5 text-[0.82rem] font-semibold tracking-[0.04em] text-white transition-all duration-300 hover:bg-[#0d1f3c] hover:shadow-md active:scale-[0.98] cursor-pointer"
                >
                  Görüşme Talebi Gönder
                </button>
              </div>
            </form>
          )}

          {/* Sidebar */}
          <div className="rounded-xl border border-[#e2e8ef] bg-white p-7 h-fit">
            <h3 className="mb-6 text-[0.82rem] font-semibold text-[#071426]">
              Süreç Nasıl İlerler?
            </h3>
            <div className="space-y-5">
              {PROCESS_STEPS.map((step, i) => (
                <div key={i} className="flex gap-3.5">
                  <span className="mt-0.5 w-3.5 shrink-0 text-[10px] font-medium text-[#3b7dbf]">
                    {i + 1}.
                  </span>
                  <p className="text-[0.83rem] leading-[1.70] text-[#5F6B7A]">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ──────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="border-t border-white/[0.05] bg-[#040810] px-6 py-16 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10 mb-12">
          <div className="max-w-[22rem]">
            <a href="#" className="block mb-4 text-[0.92rem] font-semibold tracking-widest text-white/80 uppercase">
              EEK Media
            </a>
            <p className="text-[0.875rem] leading-[1.75] text-white/35">
              Marka, reklam, funnel, web ve lead takip sistemlerini birlikte ele alan
              stratejik dijital pazarlama stüdyosu.
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-8 gap-y-3">
            {NAV_LINKS.map(l => (
              <a key={l.href} href={l.href}
                 className="text-[0.875rem] text-white/38 hover:text-white/72 transition-colors duration-200">
                {l.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="border-t border-white/[0.04] pt-8">
          <p className="text-[11px] text-white/20 tracking-wide">
            © 2026 EEK Media. Tüm hakları saklıdır.
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function Home() {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) e.target.classList.add('visible');
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -32px 0px' }
    );

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <WhatWeDo />
        <HowWeWork />
        <WhoWeWorkWith />
        <Projects />
        <References />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
