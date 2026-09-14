import * as React from "react";

import { cn } from "@/lib/utils";

export function GlassCard({
  className,
  children,
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("glass rounded-3xl p-4", className)} {...rest}>
      {children}
    </div>
  );
}

export function Particles({ count = 14 }: { count?: number }) {
  const dots = React.useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        left: `${(i * 97) % 100}%`,
        delay: `${(i % 7) * 0.9}s`,
        size: 3 + (i % 4) * 2,
        duration: `${5 + (i % 5)}s`,
      })),
    [count],
  );

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {dots.map((dot, i) => (
        <span
          key={i}
          className="animate-float-up absolute bottom-0 rounded-full bg-primary/50 blur-[1px]"
          style={{
            left: dot.left,
            width: dot.size,
            height: dot.size,
            animationDelay: dot.delay,
            animationDuration: dot.duration,
          }}
        />
      ))}
    </div>
  );
}

export function SectionTitle({
  title,
  subtitle,
  icon,
}: {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
}) {
  return (
    <header className="mb-4 flex items-center gap-3">
      {icon ? (
        <span className="gold-gradient flex size-11 items-center justify-center rounded-2xl text-primary-foreground shadow-lg">
          {icon}
        </span>
      ) : null}
      <div>
        <h1 className="font-display text-2xl leading-tight">{title}</h1>
        {subtitle ? <p className="text-sm text-muted-foreground">{subtitle}</p> : null}
      </div>
    </header>
  );
}

export function RiskMeter({ score, label }: { score: number; label: string }) {
  const level = score >= 67 ? "danger" : score >= 34 ? "caution" : "safe";
  const color =
    level === "danger"
      ? "var(--danger)"
      : level === "caution"
        ? "var(--caution)"
        : "var(--safe)";
  const angle = -90 + (score / 100) * 180;

  return (
    <div className="flex flex-col items-center">
      <div className="relative h-28 w-52">
        <svg viewBox="0 0 200 110" className="h-full w-full">
          <defs>
            <linearGradient id="rk-risk" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="var(--safe)" />
              <stop offset="50%" stopColor="var(--caution)" />
              <stop offset="100%" stopColor="var(--danger)" />
            </linearGradient>
          </defs>
          <path
            d="M15 100 A85 85 0 0 1 185 100"
            fill="none"
            stroke="url(#rk-risk)"
            strokeWidth="16"
            strokeLinecap="round"
            opacity="0.9"
          />
        </svg>
        <div
          className="absolute bottom-2 left-1/2 h-20 w-1 origin-bottom rounded-full transition-transform duration-1000 ease-out"
          style={{ backgroundColor: color, transform: `translateX(-50%) rotate(${angle}deg)` }}
        />
        <div
          className="absolute bottom-0 left-1/2 size-5 -translate-x-1/2 rounded-full"
          style={{ backgroundColor: color, boxShadow: `0 0 22px ${color}` }}
        />
      </div>
      <p className="mt-1 text-3xl font-bold" style={{ color }}>
        {score}
      </p>
      <p className="text-base font-semibold" style={{ color }}>
        {label}
      </p>
    </div>
  );
}

export function ShieldPulse({ tone = "safe" }: { tone?: "safe" | "caution" | "danger" }) {
  const color = `var(--${tone})`;
  return (
    <div className="relative grid place-items-center">
      <span
        className="absolute size-24 animate-ping rounded-full opacity-25"
        style={{ backgroundColor: color }}
      />
      <svg viewBox="0 0 24 24" className="relative size-16" style={{ color }} fill="currentColor">
        <path d="M12 2 4 5v6c0 5 3.4 9.4 8 11 4.6-1.6 8-6 8-11V5l-8-3Z" opacity="0.28" />
        <path
          d="M12 2 4 5v6c0 5 3.4 9.4 8 11 4.6-1.6 8-6 8-11V5l-8-3Zm0 2.2 6 2.2v4.6c0 4-2.5 7.5-6 8.9-3.5-1.4-6-4.9-6-8.9V6.4l6-2.2Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
}
