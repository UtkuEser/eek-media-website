'use client';

import { useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface LiquidGlassButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  className?: string;
}

export function LiquidGlassButton({
  children,
  onClick,
  variant = 'primary',
  className,
}: LiquidGlassButtonProps) {
  const btnRef = useRef<HTMLButtonElement>(null);
  const [ripple, setRipple] = useState<{ x: number; y: number } | null>(null);

  function handleMouseMove(e: React.MouseEvent<HTMLButtonElement>) {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    btnRef.current.style.setProperty('--mx', `${x}%`);
    btnRef.current.style.setProperty('--my', `${y}%`);
  }

  function handleMouseLeave() {
    if (!btnRef.current) return;
    btnRef.current.style.removeProperty('--mx');
    btnRef.current.style.removeProperty('--my');
    setRipple(null);
  }

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    setRipple({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setTimeout(() => setRipple(null), 600);
    onClick?.();
  }

  if (variant === 'primary') {
    return (
      <button
        ref={btnRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        className={cn(
          'relative overflow-hidden rounded-full px-7 py-3 text-[0.82rem] font-medium tracking-[0.06em] backdrop-blur-sm transition-all duration-300',
          'bg-white/[0.16] text-white border border-white/[0.22]',
          'hover:bg-white/[0.22] hover:border-white/[0.35] hover:text-white',
          'hover:shadow-[0_0_32px_rgba(120,168,255,0.20),inset_0_1px_0_rgba(255,255,255,0.18)]',
          'active:scale-[0.97]',
          '[background-image:radial-gradient(circle_at_var(--mx,50%)_var(--my,50%),rgba(140,190,255,0.14)_0%,transparent_60%)]',
          className
        )}
        style={{
          willChange: 'transform',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.14), inset 0 0 0 0.5px rgba(255,255,255,0.06), 0 2px 12px rgba(80,130,255,0.08)',
        }}
      >
        {ripple && (
          <span
            className="pointer-events-none absolute rounded-full bg-white/12 animate-ping"
            style={{
              left: ripple.x - 12,
              top: ripple.y - 12,
              width: 24,
              height: 24,
            }}
          />
        )}
        <span className="relative z-10">{children}</span>
      </button>
    );
  }

  // secondary
  return (
    <button
      ref={btnRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      className={cn(
        'relative overflow-hidden rounded-full px-7 py-3.5 text-sm font-medium tracking-wide transition-all duration-300',
        'bg-transparent text-white/70 border border-white/12',
        'hover:text-white hover:border-white/25 hover:bg-white/6',
        'active:scale-[0.97]',
        className
      )}
      style={{ willChange: 'transform' }}
    >
      <span className="relative z-10">{children}</span>
    </button>
  );
}
