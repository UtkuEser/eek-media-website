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
  {
    num: '01', title: 'Marka Stratejisi ve Konumlandırma',
    desc: 'Markanın pazardaki yerini, mesajını ve algı yönünü netleştiririz.',
    detail: 'Markanın pazarda nasıl algılandığını, hangi mesajla öne çıkacağını ve hedef kitlenin zihninde nasıl bir yer edinmesi gerektiğini netleştiririz. Bu çalışma, reklamdan web sitesine kadar tüm dijital iletişimin daha tutarlı ve güven veren bir zemine oturmasını sağlar.',
    bullets: [
      'Marka algısı ve mevcut dijital görünüm analizi',
      'Hedef kitle, karar süreci ve güven bariyerlerinin incelenmesi',
      'Rakip ve kategori konumlandırması',
      'Ana mesaj, ton ve iletişim yönünün netleştirilmesi',
    ],
    goal: 'Markanın yalnızca görünür olmasını değil, doğru şekilde anlaşılmasını sağlamak.',
  },
  {
    num: '02', title: 'Reklam Yönetimi ve Funnel',
    desc: 'Meta, Google ve yeniden pazarlama yapısını yalnızca trafik için değil, talep üretmek için kurgularız.',
    detail: 'Reklam yapısını yalnızca trafik almak için değil, nitelikli talep üretmek için kurgularız. Meta, Google ve yeniden pazarlama akışlarını markanın hedeflerine göre yapılandırır; kullanıcıyı ilk temas noktasından görüşme talebine kadar kontrollü bir akış içinde ilerletiriz.',
    bullets: [
      'Meta Ads ve Google Ads kampanya mimarisi',
      'Soğuk kitle, sıcak kitle ve yeniden pazarlama akışları',
      'Reklam metni, kreatif ve hedefleme uyumu',
      'Dönüşüm, form, WhatsApp ve lead takip bağlantıları',
    ],
    goal: 'Reklam bütçesini sadece görünürlük için değil, ölçülebilir talep üretimi için kullanmak.',
  },
  {
    num: '03', title: 'Kreatif ve İçerik Sistemi',
    desc: 'Görsel, video, reklam metni ve kampanya içeriklerini markanın algı hedefiyle uyumlu üretiriz.',
    detail: 'Markanın dijitalde nasıl göründüğü, kullanıcıların markaya duyduğu güveni doğrudan etkiler. Bu nedenle içerikleri yalnızca paylaşım yapmak için değil; algı oluşturmak, güven üretmek ve reklam performansını desteklemek için tasarlarız.',
    bullets: [
      'Reklam kreatifleri ve kampanya görselleri',
      'Reels, post ve story içerik kurguları',
      'Marka diliyle uyumlu reklam metinleri',
      'Görsel bütünlük, mesaj hiyerarşisi ve içerik planı',
    ],
    goal: 'Markanın her temas noktasında aynı kalite ve güven hissini vermesini sağlamak.',
  },
  {
    num: '04', title: 'Web Sitesi ve Landing Page',
    desc: 'Markanın güven veren dijital vitrinini ve dönüşüm odaklı sayfalarını kurarız.',
    detail: 'Web sitesi, markanın dijitaldeki güven merkezidir. Bu yapıyı yalnızca estetik bir vitrin olarak değil; kullanıcıyı bilgilendiren, ikna eden ve doğru aksiyona yönlendiren bir sistem olarak ele alırız.',
    bullets: [
      'Kurumsal web sitesi veya landing page yapısı',
      'Hizmet, teklif ve güven unsurlarının doğru sunumu',
      'Form, WhatsApp ve iletişim yönlendirmeleri',
      'Mobil uyum, hız, SEO temel yapısı ve dönüşüm akışı',
    ],
    goal: 'Markanın dijital vitrinini daha güvenilir, anlaşılır ve aksiyon alınabilir hale getirmek.',
  },
  {
    num: '05', title: 'Lead Takibi ve Otomasyon',
    desc: 'Başvuru, form, WhatsApp, CRM ve takip süreçlerini daha kontrollü hale getiririz.',
    detail: 'Reklamdan gelen talebin değer kazanması için doğru şekilde takip edilmesi gerekir. Form, WhatsApp, CRM ve bildirim akışlarını düzenleyerek gelen taleplerin kaybolmasını engeller ve satış sürecini daha kontrollü hale getiririz.',
    bullets: [
      'Form ve WhatsApp talep akışlarının düzenlenmesi',
      'CRM veya tablo bazlı lead takip sistemi',
      'Otomatik bildirim ve yönlendirme yapıları',
      'Talep kaynağı, durum ve dönüşüm takibi',
    ],
    goal: 'Gelen her müşteri talebinin daha düzenli, ölçülebilir ve takip edilebilir hale gelmesini sağlamak.',
  },
  {
    num: '06', title: 'Raporlama ve Gelişim',
    desc: 'Veriyi yalnızca tablo olarak değil, karar sistemi olarak kullanırız.',
    detail: 'Dijital pazarlama tek seferlik bir kurulum değil, düzenli gelişen bir sistemdir. Reklam, içerik, web ve lead verilerini birlikte okuyarak hangi alanların güçlendirilmesi gerektiğini belirleriz.',
    bullets: [
      'Haftalık veya aylık performans değerlendirmesi',
      'Reklam, içerik ve dönüşüm verilerinin analizi',
      'Kreatif, hedefleme ve funnel optimizasyon önerileri',
      'Yeni test alanları ve gelişim aksiyonları',
    ],
    goal: 'Veriyi yalnızca raporlamak değil, markanın dijital sistemini daha iyi kararlarla geliştirmek.',
  },
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
  'text-[0.875rem] text-[#0F1B2D] placeholder:text-[#9aabb8]',
  'focus:border-[#2F6BFF]/60 focus:outline-none focus:shadow-[0_0_0_3px_rgba(47,107,255,0.10)]',
  'transition-[border-color,box-shadow] duration-200',
].join(' ');

// ─── Navbar ──────────────────────────────────────────────────────────────────

function Navbar() {
  const [open, setOpen]         = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        backgroundColor: scrolled ? 'rgba(8,18,37,0.94)' : 'rgba(5,11,24,0.18)',
        backdropFilter: scrolled ? 'blur(18px)' : 'blur(10px)',
        WebkitBackdropFilter: scrolled ? 'blur(18px)' : 'blur(10px)',
        borderBottom: scrolled
          ? '1px solid rgba(156,194,230,0.14)'
          : '1px solid rgba(255,255,255,0.06)',
        boxShadow: scrolled ? '0 12px 40px rgba(0,0,0,0.22)' : 'none',
        transition: 'background-color 300ms ease, backdrop-filter 300ms ease, -webkit-backdrop-filter 300ms ease, border-color 300ms ease, box-shadow 300ms ease',
      }}
    >
      <div className="flex items-center justify-between px-6 py-4 md:px-12">
        <a href="#" className="text-base font-semibold tracking-widest text-white/90 uppercase">
          EEK Media
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(l => (
            <a key={l.href} href={l.href}
               className="text-sm text-white/58 hover:text-white/90 transition-colors duration-200 tracking-wide">
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href="#basvuru"
          className="hidden md:inline-flex items-center rounded-full px-5 py-2 text-sm tracking-wide"
          style={{
            border: scrolled ? '1px solid rgba(156,194,230,0.22)' : '1px solid rgba(255,255,255,0.14)',
            color: scrolled ? 'rgba(255,255,255,0.78)' : 'rgba(255,255,255,0.60)',
            background: scrolled ? 'rgba(255,255,255,0.03)' : 'transparent',
            transition: 'border-color 300ms ease, color 300ms ease, background 300ms ease, box-shadow 200ms ease',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.92)';
            (e.currentTarget as HTMLAnchorElement).style.boxShadow = scrolled
              ? '0 0 0 1px rgba(156,194,230,0.25), 0 0 14px rgba(156,194,230,0.14)'
              : '0 0 0 1px rgba(255,255,255,0.18)';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLAnchorElement).style.color = scrolled ? 'rgba(255,255,255,0.78)' : 'rgba(255,255,255,0.60)';
            (e.currentTarget as HTMLAnchorElement).style.boxShadow = 'none';
          }}
        >
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
        <div
          className="md:hidden border-t border-white/[0.07]"
          style={{ backgroundColor: 'rgba(8,18,37,0.97)' }}
        >
          <nav className="flex flex-col px-6 py-3">
            {NAV_LINKS.map(l => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)}
                 className="py-3 text-sm text-white/62 hover:text-white/90 transition-colors border-b border-white/[0.04] last:border-0">
                {l.label}
              </a>
            ))}
            <a href="#basvuru" onClick={() => setOpen(false)}
               className="mt-3 pb-2 text-sm text-[#38C7FF]/72 hover:text-[#38C7FF] transition-colors">
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
    <section className="relative min-h-screen overflow-hidden bg-[#081225]">
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
        <p
          className="mb-6 text-[10px] font-medium tracking-[0.22em] text-[#38C7FF]/70 uppercase"
          style={{ animation: 'eek-hero-in 0.7s cubic-bezier(0.22,1,0.36,1) 200ms both' }}
        >
          Stratejik Dijital Pazarlama Stüdyosu
        </p>

        <h1
          className="mb-7 max-w-[56rem] text-[2rem] md:text-[3rem] lg:text-[4rem] font-semibold leading-[1.10] tracking-[-0.02em] text-white"
          style={{ animation: 'eek-hero-in 0.85s cubic-bezier(0.22,1,0.36,1) 460ms both' }}
        >
          <span className="block">Görünürlük başlangıçtır.</span>
          <span className="block text-[#bdd8f2]">Güven tercih sebebidir.</span>
        </h1>

        <p
          className="mb-7 max-w-[55rem] text-[1rem] md:text-[1.2rem] lg:text-[1.5rem] leading-[1.45] font-light text-white/66"
          style={{ animation: 'eek-hero-in 0.7s cubic-bezier(0.22,1,0.36,1) 800ms both' }}
        >
          EEK Media, markaların dijitalde daha doğru görünmesini, daha güvenilir
          algılanmasını ve daha nitelikli müşteri talepleri almasını sağlayan
          stratejik bir dijital pazarlama stüdyosudur.
        </p>

        <div
          className="mb-6 flex items-center justify-center gap-2 rounded-full border border-emerald-500/[0.16] bg-black/[0.24] px-6 py-3"
          style={{ animation: 'eek-hero-in 0.65s cubic-bezier(0.22,1,0.36,1) 1080ms both' }}
        >
          <span className="w-[6px] h-[6px] shrink-0 rounded-full bg-emerald-400/75 animate-pulse" />
          <p className="text-[0.875rem] md:text-[1rem] lg:text-[1.1rem] tracking-[0.04em] text-emerald-300/80">
            Stratejik markalar için sistem odaklı büyüme
          </p>
        </div>

        <div style={{ animation: 'eek-hero-in 0.65s cubic-bezier(0.22,1,0.36,1) 1320ms both' }}>
          <LiquidGlassButton>
            Markanızın Geleceğini Konuşalım
          </LiquidGlassButton>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-[100px] z-10 bg-gradient-to-t from-[#081225] to-transparent" />
    </section>
  );
}

// ─── Ne Yapıyoruz? ───────────────────────────────────────────────────────────

function ServiceDetailPanel({ svc }: { svc: (typeof SERVICES)[number] }) {
  return (
    <div style={{ animation: 'eek-panel-in 0.28s ease-out both' }}>
      {/* Main content row */}
      <div className="grid md:grid-cols-[1fr_280px] gap-8 lg:gap-12 items-start">

        {/* Left: number, title, description */}
        <div>
          <p className="mb-2 text-[10px] font-medium tracking-[0.18em] text-[#5C8DFF] uppercase">
            {svc.num}
          </p>
          <h3 className="mb-4 text-[1rem] font-semibold leading-[1.38] tracking-[-0.01em] text-[#0F1B2D]">
            {svc.title}
          </h3>
          <p className="text-[0.875rem] leading-[1.82] text-[#526277]">{svc.detail}</p>
        </div>

        {/* Right: coverage list */}
        <div>
          <p className="mb-3.5 text-[10px] font-semibold tracking-[0.14em] text-[#0F1B2D]/55 uppercase">
            Bu çalışma neleri kapsar?
          </p>
          <ul className="space-y-3">
            {svc.bullets.map((b, j) => (
              <li
                key={b}
                className="flex items-start gap-3"
                style={{ animation: `eek-item-in 0.3s ease-out ${90 + j * 60}ms both` }}
              >
                <span className="mt-[6px] w-[5px] h-[5px] shrink-0 rounded-full border border-[#5C8DFF]/45 bg-[#5C8DFF]/10" />
                <span className="text-[0.83rem] leading-[1.65] text-[#526277]">{b}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* Goal line */}
      <div
        className="mt-7 pt-5 border-t border-[#C4CFD9] flex items-start gap-2"
        style={{ animation: 'eek-item-in 0.3s ease-out 330ms both' }}
      >
        <span className="shrink-0 text-[10px] font-semibold tracking-[0.12em] text-[#5C8DFF]/80 uppercase mt-[1px]">
          Amaç
        </span>
        <span className="text-[0.83rem] leading-[1.65] text-[#526277]">{svc.goal}</span>
      </div>
    </div>
  );
}

function WhatWeDo() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const COLS = 3;

  function toggle(idx: number) {
    setOpenIdx(prev => prev === idx ? null : idx);
  }

  return (
    <section
      id="hizmetler"
      className="scroll-mt-20 bg-[#D6DEE8] py-24 md:py-32 px-6 md:px-12 lg:px-20"
      style={{ backgroundImage: 'radial-gradient(ellipse 70% 20% at 50% 0%, rgba(92,141,255,0.052) 0%, transparent 100%)' }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="reveal mb-16">
          <p className="mb-3 text-[10px] font-medium tracking-[0.22em] text-[#5C8DFF] uppercase">
            Hizmetler
          </p>
          <h2 className="mb-4 text-[1.8rem] md:text-[2.3rem] font-semibold leading-[1.14] tracking-[-0.02em] text-[#0F1B2D]">
            Ne Yapıyoruz?
          </h2>
          <p className="text-[0.9rem] leading-[1.80] text-[#526277] max-w-[44rem]">
            Markaların yalnızca görünür olmasını değil; doğru algılanmasını, güven üretmesini
            ve nitelikli müşteri talebi oluşturmasını sağlayan dijital yapılar kuruyoruz.
          </p>
        </div>

        <div className="space-y-5">
          {[0, 1].map(rowIdx => {
            const rowStart  = rowIdx * COLS;
            const rowCards  = SERVICES.slice(rowStart, rowStart + COLS);
            const rowActive = openIdx !== null && Math.floor(openIdx / COLS) === rowIdx;

            return (
              <div key={rowIdx}>

                {/* Card row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {rowCards.map((svc, i) => {
                    const idx    = rowStart + i;
                    const isOpen = openIdx === idx;

                    return (
                      <div key={svc.num}>

                        {/* Card */}
                        <div
                          className="reveal"
                          style={{ transitionDelay: `${idx * 70}ms` }}
                        >
                          <div
                            role="button"
                            tabIndex={0}
                            aria-expanded={isOpen}
                            onClick={() => toggle(idx)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                toggle(idx);
                              }
                            }}
                            onMouseMove={(e) => {
                              const r = e.currentTarget.getBoundingClientRect();
                              e.currentTarget.style.setProperty('--mx', `${((e.clientX - r.left) / r.width * 100).toFixed(1)}%`);
                              e.currentTarget.style.setProperty('--my', `${((e.clientY - r.top) / r.height * 100).toFixed(1)}%`);
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.removeProperty('--mx');
                              e.currentTarget.style.removeProperty('--my');
                            }}
                            className={[
                              'group relative overflow-hidden rounded-xl border bg-[#E7EDF4] cursor-pointer select-none',
                              'transition-[border-color,box-shadow,transform,background-color] duration-300 ease-out',
                              'hover:-translate-y-1.5 hover:bg-[#EEF3F9]',
                              'outline-none focus-visible:ring-2 focus-visible:ring-[#5C8DFF]/40 focus-visible:ring-offset-2',
                              isOpen
                                ? 'border-[#5C8DFF]/55 shadow-[0_4px_20px_rgba(92,141,255,0.13)]'
                                : 'border-[#B8C6D8] hover:border-[#8FAAC8] hover:shadow-[0_6px_20px_rgba(92,141,255,0.11)]',
                            ].join(' ')}
                          >
                            {/* Mouse-tracking radial glow */}
                            <div
                              className={[
                                'absolute inset-0 pointer-events-none transition-opacity duration-300',
                                isOpen ? 'opacity-100' : 'opacity-0 group-hover:opacity-100',
                              ].join(' ')}
                              style={{ background: 'radial-gradient(circle at var(--mx,50%) var(--my,50%), rgba(92,141,255,0.11) 0%, transparent 62%)' }}
                            />

                            <div className="relative p-7">
                              {/* Accent line */}
                              <div className={[
                                'mb-5 h-[1.5px] transition-all duration-300',
                                isOpen
                                  ? 'w-12 bg-[#5C8DFF]/60'
                                  : 'w-7 bg-[#5C8DFF]/35 group-hover:w-12 group-hover:bg-[#5C8DFF]/60',
                              ].join(' ')} />

                              {/* Number */}
                              <p className={[
                                'mb-1.5 text-[10px] font-medium tracking-[0.18em] uppercase transition-colors duration-300',
                                isOpen ? 'text-[#5C8DFF]' : 'text-[#5C8DFF]/55 group-hover:text-[#5C8DFF]',
                              ].join(' ')}>
                                {svc.num}
                              </p>

                              {/* Title + chevron */}
                              <div className="flex items-start justify-between gap-2 mb-3">
                                <h3 className="text-[0.9rem] font-semibold leading-[1.45] text-[#0F1B2D]">
                                  {svc.title}
                                </h3>
                                <svg
                                  width="13" height="13" viewBox="0 0 13 13" fill="none"
                                  aria-hidden="true"
                                  className={[
                                    'mt-[3px] shrink-0 transition-all duration-300',
                                    isOpen
                                      ? 'rotate-180 text-[#5C8DFF]/70'
                                      : 'text-[#5C8DFF]/40 group-hover:text-[#5C8DFF]/65 group-hover:translate-y-0.5',
                                  ].join(' ')}
                                >
                                  <path d="M2 4.5l4.5 4.5 4.5-4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                              </div>

                              {/* Description */}
                              <p className="text-[0.83rem] leading-[1.72] text-[#526277]">
                                {svc.desc}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Mobile accordion panel — hidden on lg+ */}
                        <div
                          className="grid lg:hidden"
                          style={{
                            gridTemplateRows: isOpen ? '1fr' : '0fr',
                            transition: 'grid-template-rows 300ms ease-out',
                          }}
                        >
                          <div className="overflow-hidden min-h-0">
                            <div className="pt-2.5">
                              <div className="rounded-xl border border-[#B8C6D8] bg-white overflow-hidden shadow-[0_2px_16px_rgba(7,20,38,0.08)]">
                                <div className="h-[2px] bg-gradient-to-r from-[#5C8DFF] to-[#38C7FF]" />
                                <div className="px-6 py-7">
                                  {isOpen && <ServiceDetailPanel key={idx} svc={svc} />}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                      </div>
                    );
                  })}
                </div>

                {/* Desktop full-width row panel — hidden below lg */}
                <div
                  className="hidden lg:grid"
                  style={{
                    gridTemplateRows: rowActive ? '1fr' : '0fr',
                    transition: 'grid-template-rows 300ms ease-out',
                  }}
                >
                  <div className="overflow-hidden min-h-0">
                    <div className="pt-3">
                      {rowActive && openIdx !== null && (
                        <div className="rounded-xl border border-[#B8C6D8] bg-white overflow-hidden shadow-[0_4px_22px_rgba(7,20,38,0.09)]">
                          <div className="h-[2px] bg-gradient-to-r from-[#5C8DFF] to-[#38C7FF]" />
                          <div className="px-8 py-8 lg:px-10 lg:py-9">
                            <ServiceDetailPanel key={openIdx} svc={SERVICES[openIdx]} />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── Nasıl Çalışıyoruz? ──────────────────────────────────────────────────────

const BURST_PARTICLES = [
  // ── Ring 1 — inner core (r 10.5-12, radius ~75px) ─────
  { tx:  75,  ty:   0,  delay:  0, r: 12.0, color: '#2563EB' },
  { tx:  53,  ty: -53,  delay: 10, r: 11.5, color: '#6EDCFF' },
  { tx:   0,  ty: -75,  delay:  6, r: 11.0, color: '#3B82F6' },
  { tx: -53,  ty: -53,  delay: 14, r: 10.5, color: '#4F8FFF' },
  { tx: -75,  ty:   0,  delay: 18, r: 10.5, color: '#2563EB' },
  { tx: -53,  ty:  53,  delay: 22, r: 10.5, color: '#4F8FFF' },
  { tx:   0,  ty:  75,  delay:  6, r: 11.0, color: '#3B82F6' },
  { tx:  53,  ty:  53,  delay: 10, r: 11.5, color: '#6EDCFF' },
  // ── Ring 2 — middle (r 6-7.5, radius ~115px) ──────────
  { tx: 115,  ty:   0,  delay: 14, r:  7.5, color: '#93C5FD' },
  { tx:  99,  ty: -57,  delay: 26, r:  7.0, color: '#6EDCFF' },
  { tx:  57,  ty: -99,  delay: 18, r:  6.5, color: '#3B82F6' },
  { tx:   0,  ty:-115,  delay: 30, r:  7.0, color: '#93C5FD' },
  { tx: -57,  ty: -99,  delay: 22, r:  6.5, color: '#4F8FFF' },
  { tx: -99,  ty: -57,  delay: 34, r:  6.0, color: '#6EDCFF' },
  { tx:-115,  ty:   0,  delay: 26, r:  6.5, color: '#93C5FD' },
  { tx: -99,  ty:  57,  delay: 38, r:  6.0, color: '#4F8FFF' },
  { tx: -57,  ty:  99,  delay: 30, r:  6.5, color: '#3B82F6' },
  { tx:   0,  ty: 115,  delay: 18, r:  7.0, color: '#93C5FD' },
  { tx:  57,  ty:  99,  delay: 26, r:  7.5, color: '#6EDCFF' },
  { tx:  99,  ty:  57,  delay: 14, r:  7.0, color: '#3B82F6' },
  // ── Ring 3 — outer sparse (r 3.5-4.5, radius ~162px) ──
  { tx: 150,  ty: -62,  delay: 36, r:  4.5, color: '#BFDBFE' },
  { tx:  62,  ty:-150,  delay: 48, r:  4.0, color: '#93C5FD' },
  { tx: -62,  ty:-150,  delay: 42, r:  4.0, color: '#BAE6FD' },
  { tx:-150,  ty: -62,  delay: 56, r:  3.5, color: '#93C5FD' },
  { tx:-150,  ty:  62,  delay: 52, r:  3.5, color: '#BAE6FD' },
  { tx: -62,  ty: 150,  delay: 44, r:  4.0, color: '#93C5FD' },
  { tx:  62,  ty: 150,  delay: 40, r:  4.0, color: '#BFDBFE' },
  { tx: 150,  ty:  62,  delay: 32, r:  4.5, color: '#93C5FD' },
  // ── Micro sparks ───────────────────────────────────────
  { tx:  42,  ty:-138,  delay: 22, r:  2.2, color: '#E0F2FE' },
  { tx:-108,  ty: -88,  delay: 34, r:  2.0, color: '#BFDBFE' },
  { tx:-138,  ty:  42,  delay: 26, r:  1.8, color: '#93C5FD' },
  { tx: -88,  ty: 108,  delay: 40, r:  2.0, color: '#BAE6FD' },
  { tx:  42,  ty: 108,  delay: 30, r:  2.0, color: '#E0F2FE' },
  { tx: 108,  ty:  88,  delay: 18, r:  2.2, color: '#BFDBFE' },
  { tx:  88,  ty:-108,  delay: 38, r:  1.8, color: '#93C5FD' },
  { tx: 145,  ty: -42,  delay: 14, r:  2.2, color: '#E0F2FE' },
];

function BurstParticles({ x, y }: { x: number; y: number }) {
  return (
    <>
      {/* Sustained energy core — "tamamlandı" glow that lingers */}
      <div style={{
        position: 'absolute', top: `${y}px`, left: `${x}px`,
        width: '56px', height: '56px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,255,255,0.88) 0%, rgba(110,220,255,0.72) 28%, rgba(36,91,255,0.38) 62%, transparent 100%)',
        boxShadow: '0 0 32px 14px rgba(110,220,255,0.55), 0 0 80px 32px rgba(36,91,255,0.30)',
        animation: 'eek-energy-core 1.75s ease-out both',
        pointerEvents: 'none',
        zIndex: 5,
      } as React.CSSProperties} />
      {/* Ring flash — quick outer pop */}
      <div style={{
        position: 'absolute', top: `${y}px`, left: `${x}px`,
        width: '30px', height: '30px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(220,240,255,0.95) 0%, rgba(110,220,255,0.60) 44%, transparent 74%)',
        boxShadow: '0 0 22px 8px rgba(110,220,255,0.52), 0 0 52px 20px rgba(36,91,255,0.28)',
        animation: 'eek-burst-flash 0.65s ease-out both',
        pointerEvents: 'none',
        zIndex: 5,
      } as React.CSSProperties} />
      {BURST_PARTICLES.map((p, i) => (
        <div key={i} style={{
          position: 'absolute', top: `${y}px`, left: `${x}px`,
          width: `${p.r * 2}px`, height: `${p.r * 2}px`,
          borderRadius: '50%', background: p.color,
          boxShadow: `0 0 ${Math.round(p.r * 3.0)}px ${Math.round(p.r * 1.5)}px ${p.color}cc`,
          ['--ptx' as string]: `${p.tx}px`,
          ['--pty' as string]: `${p.ty}px`,
          animation: `eek-particle-fly 1.85s ease-out ${p.delay}ms forwards`,
          pointerEvents: 'none',
        } as React.CSSProperties} />
      ))}
    </>
  );
}

function DigitalModule({ rolling }: { rolling: boolean }) {
  return (
    <div style={{
      width: 30, height: 19, borderRadius: 5,
      background: 'linear-gradient(135deg, rgba(92,141,255,0.97) 0%, rgba(29,78,216,0.97) 100%)',
      border: '1px solid rgba(110,220,255,0.58)',
      boxShadow: '0 0 14px rgba(92,141,255,0.68), 0 2px 10px rgba(36,91,255,0.50), inset 0 1px 0 rgba(255,255,255,0.28)',
      position: 'relative', overflow: 'hidden',
      animation: rolling ? 'eek-cargo-roll 0.5s linear infinite' : 'none',
    }}>
      <div style={{ position: 'absolute', top: 4, left: 4, right: 4, height: 1, background: 'rgba(255,255,255,0.44)', borderRadius: 1 }} />
      <div style={{ position: 'absolute', bottom: 4, left: 6, right: 6, height: 1, background: 'rgba(110,220,255,0.40)', borderRadius: 1 }} />
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 4, height: 4, borderRadius: '50%', background: 'rgba(255,255,255,0.82)' }} />
    </div>
  );
}

const SVG_CY   = 22;   // vertical center in SVG coords (aligns with circle centers)
const WAVE_AMP = 11;
const WAVE_CYCLES = 2.5;
const CONV_MS  = 820;  // 02→03 conveyor travel
const ROLL_MS  = 820;  // 03→04 rolling travel
const FINAL_MS = 660;  // 04→end terminal dash (slightly faster, more energetic)

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

    // Cargo departs 02 — line starts filling toward 03 simultaneously
    t += 280;
    after(() => { setCargoAt(2); setReachedStep(2); }, t);

    // Cargo arrives at 03 — pulse confirms
    t += CONV_MS;
    after(() => { setPulsing(2); }, t);

    // Rolling departure 03→04: cargo and line fill start together
    t += 480;
    after(() => { setPulsing(-1); setCargoAt(3); setIsRolling(true); setReachedStep(3); }, t);

    // Cargo arrives at 04 — pulse confirms
    t += ROLL_MS;
    after(() => { setPulsing(3); setIsRolling(false); }, t);

    // Exits toward end — fast terminal dash
    t += 520;
    after(() => { setPulsing(-1); setCargoAt(4); setIsRolling(true); }, t);

    // Cargo arrives at endX — stop rolling
    t += FINAL_MS;
    after(() => { setIsRolling(false); }, t);

    // Ring visible briefly → burst fires
    t += 180;
    after(() => { setShowParticles(true); }, t);

    // Particles done — 1.85s animation + 56ms max delay + margin
    t += 2200;
    after(() => { setShowParticles(false); }, t);

    // Loop
    after(runSequence, t + 1800);
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

  const cargoTrans = cargoAt === 4
    ? `left ${FINAL_MS}ms cubic-bezier(0.22,0,0.28,1), opacity 0.28s ease`
    : cargoAt >= 0
    ? `left ${CONV_MS}ms cubic-bezier(0.4,0,0.2,1), opacity 0.32s ease`
    : 'opacity 0.12s ease';

  // Active straight-line fill — 02→04, then extends to endX when cargo exits
  const activeLineX = stepXs[1] ?? 0;
  const activeLineW = reachedStep >= 1 && stepXs.length === 4
    ? cargoAt === 4
      ? endX - activeLineX
      : Math.max(0, (stepXs[Math.min(reachedStep, 3)] ?? activeLineX) - activeLineX)
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
          <p className="mb-3 text-[10px] font-medium tracking-[0.22em] text-[#2F6BFF] uppercase">
            Çalışma Modeli
          </p>
          <h2 className="mb-4 text-[1.8rem] md:text-[2.3rem] font-semibold leading-[1.14] tracking-[-0.02em] text-[#0F1B2D]">
            Nasıl Çalışıyoruz?
          </h2>
          <p className="text-[0.9rem] leading-[1.80] text-[#526277] max-w-[44rem]">
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

                  {/* Active fill — 02→04, then extends to endX when cargo exits */}
                  {reachedStep >= 1 && (
                    <rect
                      x={activeLineX}
                      y={SVG_CY - 1}
                      height={2}
                      rx={1}
                      fill="url(#eek-active-grad)"
                      style={{
                        width: `${activeLineW}px`,
                        transition: cargoAt === 4
                          ? `width ${FINAL_MS}ms cubic-bezier(0.22,0,0.28,1) 35ms`
                          : `width ${CONV_MS}ms cubic-bezier(0.4,0,0.2,1) 35ms`,
                      }}
                    />
                  )}

                  {/* Glow dot at current step circle */}
                  {reachedStep >= 0 && cargoAt < 4 && (
                    <circle
                      cx={stepXs[reachedStep] ?? stepXs[0]}
                      cy={SVG_CY}
                      r={4}
                      fill="#6EDCFF"
                      style={{ filter: 'drop-shadow(0 0 5px rgba(110,220,255,0.9))' }}
                    />
                  )}

                </svg>

                {/* Cargo package + terminal ring */}
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
                  <div style={{ position: 'relative', transform: 'translate(-50%, -50%)' }}>
                    {/* Target ring — appears when cargo arrives, centered on cargo */}
                    {cargoAt === 4 && !isRolling && !showParticles && (
                      <div
                        aria-hidden
                        style={{
                          position: 'absolute',
                          top: '50%', left: '50%',
                          transform: 'translate(-50%, -50%)',
                          width: '44px', height: '44px', borderRadius: '50%',
                          border: '1.5px solid rgba(110,220,255,0.75)',
                          boxShadow: '0 0 14px rgba(110,220,255,0.50), 0 0 28px rgba(36,91,255,0.26)',
                          background: 'radial-gradient(circle, rgba(110,220,255,0.09) 0%, transparent 68%)',
                          animation: 'eek-ring-in 0.30s ease-out both',
                          pointerEvents: 'none',
                          zIndex: 3,
                        }}
                      />
                    )}
                    <DigitalModule rolling={isRolling} />
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

                <h3 className="mb-3 text-[0.9rem] font-semibold text-[#0F1B2D]">
                  {stepData.title}
                </h3>
                <p className="text-[0.83rem] leading-[1.72] text-[#526277]">
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
    <section id="uygunluk" className="scroll-mt-20 bg-[#F5F7FA] py-24 md:py-32 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <div className="reveal mb-14">
          <p className="mb-3 text-[10px] font-medium tracking-[0.22em] text-[#2F6BFF] uppercase">
            Yaklaşımımız
          </p>
          <h2 className="mb-4 text-[1.8rem] md:text-[2.3rem] font-semibold leading-[1.14] tracking-[-0.02em] text-[#0F1B2D] max-w-[38rem]">
            Doğru Yapıyı Birlikte Kurarız
          </h2>
          <p className="text-[0.9rem] leading-[1.80] text-[#526277] max-w-[44rem]">
            Her markanın ihtiyacı aynı değildir. Bu yüzden önce markanın mevcut durumunu,
            hedeflerini ve dijitalde hangi noktada güçlenmesi gerektiğini anlarız.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          <div className="reveal group rounded-xl border border-[#2F6BFF]/22 bg-white p-8 md:p-10 transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1.5 hover:border-[#2F6BFF]/40 hover:shadow-[0_8px_28px_rgba(47,107,255,0.10)]">
            <div className="mb-7 flex items-center gap-3">
              <div className="w-[3px] h-5 rounded-full bg-[#2F6BFF]/55 transition-all duration-300 group-hover:h-7 group-hover:bg-[#2F6BFF] group-hover:shadow-[0_0_8px_rgba(47,107,255,0.45)]" />
              <h3 className="text-[0.78rem] font-semibold tracking-[0.18em] text-[#2F6BFF] uppercase">
                Önce Anlarız
              </h3>
            </div>
            <ul className="space-y-4">
              {APPROACH_LEFT.map(item => (
                <li key={item} className="flex items-start gap-3.5">
                  <span className="mt-[7px] w-[5px] h-[5px] shrink-0 rounded-full bg-[#2F6BFF]/40 transition-colors duration-200 group-hover:bg-[#2F6BFF]/65" />
                  <span className="text-[0.875rem] leading-[1.70] text-[#526277] transition-transform duration-200 group-hover:translate-x-[2px]">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div
            className="reveal group rounded-xl border border-[#d1d9e0] bg-white p-8 md:p-10 transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1.5 hover:border-[#5C8DFF]/28 hover:shadow-[0_8px_28px_rgba(47,107,255,0.08)]"
            style={{ transitionDelay: '90ms' }}
          >
            <div className="mb-7 flex items-center gap-3">
              <div className="w-[3px] h-5 rounded-full bg-[#4B5563]/40 transition-all duration-300 group-hover:h-7 group-hover:bg-[#5C8DFF]/65" />
              <h3 className="text-[0.78rem] font-semibold tracking-[0.18em] text-[#4B5563] uppercase">
                Sonra Yapıyı Kurarız
              </h3>
            </div>
            <ul className="space-y-4">
              {APPROACH_RIGHT.map(item => (
                <li key={item} className="flex items-start gap-3.5">
                  <span className="mt-[7px] w-[5px] h-[5px] shrink-0 rounded-full bg-[#4B5563]/30 transition-colors duration-200 group-hover:bg-[#5C8DFF]/45" />
                  <span className="text-[0.875rem] leading-[1.70] text-[#526277] transition-transform duration-200 group-hover:translate-x-[2px]">{item}</span>
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
    <section id="projeler" className="scroll-mt-20 bg-[#F7F9FC] py-24 md:py-32 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <div className="reveal mb-16">
          <p className="mb-3 text-[10px] font-medium tracking-[0.22em] text-[#2F6BFF] uppercase">
            Projeler
          </p>
          <h2 className="mb-4 text-[1.8rem] md:text-[2.3rem] font-semibold leading-[1.14] tracking-[-0.02em] text-[#0F1B2D]">
            Kurulan Sistemler
          </h2>
          <p className="text-[0.9rem] leading-[1.80] text-[#526277] max-w-[44rem]">
            Her çalışma; markanın algısını, reklam performansını, içerik yapısını ve talep
            takip sürecini birlikte ele alan bir sistem olarak tasarlanır.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {PROJECTS.map((project, i) => (
            <div
              key={i}
              className="reveal group relative flex flex-col rounded-xl border border-[#e2e8ef] bg-white p-7 hover:border-[#2F6BFF]/35 hover:shadow-[0_8px_28px_rgba(47,107,255,0.09)] hover:-translate-y-1.5 transition-all duration-300"
              style={{ transitionDelay: `${i * 80}ms` }}
              onMouseMove={(e) => {
                const r = e.currentTarget.getBoundingClientRect();
                e.currentTarget.style.setProperty('--mx', `${((e.clientX - r.left) / r.width * 100).toFixed(1)}%`);
                e.currentTarget.style.setProperty('--my', `${((e.clientY - r.top) / r.height * 100).toFixed(1)}%`);
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.removeProperty('--mx');
                e.currentTarget.style.removeProperty('--my');
              }}
            >
              {/* Mouse glow */}
              <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300"
                style={{ background: 'radial-gradient(circle at var(--mx,50%) var(--my,50%), rgba(47,107,255,0.06) 0%, transparent 65%)' }} />
              {/* Gradient top bar */}
              <div className="relative mb-7 h-[1.5px] w-full overflow-hidden rounded-full">
                <div className="absolute inset-0 bg-[#e2e8ef]" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#5C8DFF] to-[#38C7FF] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <div className="relative flex-1">
                <h3 className="mb-3 text-[0.9rem] font-semibold leading-[1.50] text-[#0F1B2D]">
                  {project.title}
                </h3>
                <p className="text-[0.83rem] leading-[1.72] text-[#526277]">
                  {project.desc}
                </p>
              </div>
              <div className="relative mt-7 flex flex-wrap gap-2">
                {project.tags.map(tag => (
                  <span
                    key={tag}
                    className="text-[9.5px] tracking-[0.08em] text-[#2F6BFF] border border-[#2F6BFF]/25 px-2.5 py-[3px] rounded-full group-hover:border-[#2F6BFF]/45 group-hover:bg-[#2F6BFF]/[0.04] transition-colors duration-300"
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
    <section id="referanslar" className="scroll-mt-20 bg-[#EEF3F8] py-20 md:py-28 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">

        {/* Header: left title + right trust note */}
        <div className="reveal mb-10 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div>
            <p className="mb-3 text-[10px] font-medium tracking-[0.22em] text-[#2F6BFF] uppercase">
              Referanslar
            </p>
            <h2 className="mb-4 text-[1.8rem] md:text-[2.3rem] font-semibold leading-[1.14] tracking-[-0.02em] text-[#0F1B2D]">
              Birlikte Çalıştığımız Markalar
            </h2>
            <p className="text-[0.9rem] leading-[1.80] text-[#526277] max-w-[40rem]">
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
                className="group relative flex items-center justify-center h-[110px] px-8 hover:bg-[#f0f4f8] transition-colors duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{ background: 'radial-gradient(circle at 50% 50%, rgba(92,141,255,0.08) 0%, transparent 70%)' }} />
                <img
                  src={ref.logo}
                  alt={ref.name}
                  className="relative max-h-[60px] max-w-[150px] w-auto object-contain opacity-80 group-hover:opacity-100 transition-all duration-300 ease-out group-hover:scale-[1.07]"
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
                className="group relative flex items-center justify-center h-[110px] px-8 w-1/4 hover:bg-[#f0f4f8] transition-colors duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{ background: 'radial-gradient(circle at 50% 50%, rgba(92,141,255,0.08) 0%, transparent 70%)' }} />
                <img
                  src={ref.logo}
                  alt={ref.name}
                  className="relative max-h-[60px] max-w-[150px] w-auto object-contain opacity-80 group-hover:opacity-100 transition-all duration-300 ease-out group-hover:scale-[1.07]"
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
          <p className="mb-3 text-[10px] font-medium tracking-[0.22em] text-[#2F6BFF] uppercase">
            İletişim
          </p>
          <h2 className="mb-4 text-[1.8rem] md:text-[2.3rem] font-semibold leading-[1.14] tracking-[-0.02em] text-[#0F1B2D] max-w-[36rem]">
            Markanızın Geleceğini Konuşalım
          </h2>
          <p className="text-[0.9rem] leading-[1.80] text-[#526277] max-w-[44rem]">
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
              <p className="text-[0.9rem] text-[#526277] leading-[1.80] max-w-[22rem]">
                Talebiniz alındı. En kısa sürede görüşme için geri döneceğiz.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="mb-1.5 block text-[10px] font-medium tracking-[0.12em] text-[#526277] uppercase">
                  Ad Soyad
                </label>
                <input type="text" name="name" value={fields.name} onChange={handleChange}
                  placeholder="Adınız Soyadınız" className={INPUT_CLS} required />
              </div>

              <div>
                <label className="mb-1.5 block text-[10px] font-medium tracking-[0.12em] text-[#526277] uppercase">
                  Marka / İşletme Adı
                </label>
                <input type="text" name="brand" value={fields.brand} onChange={handleChange}
                  placeholder="Marka adınız" className={INPUT_CLS} required />
              </div>

              <div>
                <label className="mb-1.5 block text-[10px] font-medium tracking-[0.12em] text-[#526277] uppercase">
                  Web Sitesi veya Instagram
                </label>
                <input type="text" name="website" value={fields.website} onChange={handleChange}
                  placeholder="instagram.com/markaniz" className={INPUT_CLS} />
              </div>

              <div>
                <label className="mb-1.5 block text-[10px] font-medium tracking-[0.12em] text-[#526277] uppercase">
                  Sektör
                </label>
                <input type="text" name="sector" value={fields.sector} onChange={handleChange}
                  placeholder="Örn: e-ticaret, turizm, hizmet" className={INPUT_CLS} />
              </div>

              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-[10px] font-medium tracking-[0.12em] text-[#526277] uppercase">
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
                <label className="mb-1.5 block text-[10px] font-medium tracking-[0.12em] text-[#526277] uppercase">
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
                <label className="mb-1.5 block text-[10px] font-medium tracking-[0.12em] text-[#526277] uppercase">
                  Mesaj
                </label>
                <textarea name="message" value={fields.message} onChange={handleChange} rows={4}
                  placeholder="Markanız hakkında kısaca bilgi verin..."
                  className={INPUT_CLS + ' resize-none'} />
              </div>

              <div className="sm:col-span-2 pt-1">
                <button
                  type="submit"
                  className="rounded-full bg-[#23324A] px-8 py-3.5 text-[0.82rem] font-semibold tracking-[0.04em] text-white transition-all duration-300 hover:bg-[#2a3d5a] hover:shadow-[0_4px_20px_rgba(35,50,74,0.40)] hover:scale-[1.01] active:scale-[0.98] cursor-pointer"
                  style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.07)' }}
                >
                  Görüşme Talebi Gönder
                </button>
              </div>
            </form>
          )}

          {/* Sidebar */}
          <div className="rounded-xl border border-[#e2e8ef] bg-white p-7 h-fit">
            <h3 className="mb-6 text-[0.82rem] font-semibold text-[#0F1B2D]">
              Süreç Nasıl İlerler?
            </h3>
            <div className="space-y-0">
              {PROCESS_STEPS.map((step, i) => (
                <div key={i} className="relative flex gap-3.5 pb-5 last:pb-0">
                  {/* Connector line */}
                  {i < PROCESS_STEPS.length - 1 && (
                    <div className="absolute left-[9px] top-[22px] w-px h-[calc(100%-10px)] bg-[#2F6BFF]/12" />
                  )}
                  <span className="mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full border border-[#2F6BFF]/28 bg-[#2F6BFF]/[0.07] text-[9px] font-semibold text-[#2F6BFF]">
                    {i + 1}
                  </span>
                  <p className="text-[0.83rem] leading-[1.70] text-[#526277]">{step}</p>
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
    <footer className="relative bg-[#050B18] px-6 py-16 md:px-12 lg:px-20">
      {/* Gradient top line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent 0%, #5C8DFF 35%, #15D372 65%, transparent 100%)' }}
      />
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10 mb-12">
          <div className="max-w-[22rem]">
            <a href="#" className="block mb-3 text-[0.92rem] font-semibold tracking-widest text-white/85 uppercase">
              EEK Media
            </a>
            <p className="text-[0.8rem] leading-[1.75] text-white/32 tracking-wide">
              Strateji, algı ve dijital sistemler için tasarlandı.
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-8 gap-y-3">
            {NAV_LINKS.map(l => (
              <a key={l.href} href={l.href}
                 className="relative text-[0.875rem] text-white/36 hover:text-white/70 transition-colors duration-200 after:absolute after:bottom-[-2px] after:left-0 after:h-px after:w-0 after:bg-white/30 hover:after:w-full after:transition-all after:duration-300">
                {l.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="border-t border-white/[0.04] pt-8 flex items-center justify-between gap-4">
          <p className="text-[11px] text-white/18 tracking-wide">
            © 2026 EEK Media. Tüm hakları saklıdır.
          </p>
          <a
            href="/by-eek"
            className="text-[10px] tracking-[0.18em] text-white/16 hover:text-white/38 transition-colors duration-300 uppercase shrink-0"
          >
            by EEK
          </a>
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
        <div
          aria-hidden
          className="h-px"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(92,141,255,0.35) 35%, rgba(125,220,255,0.45) 50%, rgba(92,141,255,0.35) 65%, transparent 100%)',
          }}
        />
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
