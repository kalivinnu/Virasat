import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

export function Lotus({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 48" className={className} fill="none" aria-hidden="true">
      <g stroke="currentColor" strokeWidth="1.1" opacity="0.9">
        <path d="M32 4c4 7 5.5 13 0 20-5.5-7-4-13 0-20Z" />
        <path d="M32 24c-6-4-11-4-15 2 6 4 11 3 15-2Z" />
        <path d="M32 24c6-4 11-4 15 2-6 4-11 3-15-2Z" />
        <path d="M32 24c-8-1-14 1-17 8 8 2 14-1 17-8Z" />
        <path d="M32 24c8-1 14 1 17 8-8 2-14-1-17-8Z" />
      </g>
    </svg>
  );
}

export function Ornament({ label }: { label?: string }) {
  return (
    <div className="flex items-center justify-center gap-4 text-primary/70">
      <span className="h-px w-16 bg-gold-gradient opacity-60 sm:w-28" />
      <Lotus className="h-5 w-7" />
      {label ? (
        <span className="font-sans text-[0.62rem] tracking-monument uppercase text-primary/80">
          {label}
        </span>
      ) : null}
      <Lotus className="h-5 w-7" />
      <span className="h-px w-16 bg-gold-gradient opacity-60 sm:w-28" />
    </div>
  );
}

export function SectionHeading({
  kicker,
  title,
  subtitle,
}: {
  kicker: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <motion.header
      className="mx-auto max-w-3xl text-center"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
    >
      <p className="font-sans text-[0.65rem] tracking-monument uppercase text-primary/80">
        {kicker}
      </p>
      <h2 className="mt-4 text-4xl leading-tight sm:text-5xl md:text-6xl">
        <span className="text-gold-gradient">{title}</span>
      </h2>
      {subtitle ? (
        <p className="mt-5 text-sm leading-relaxed text-muted-foreground sm:text-base">{subtitle}</p>
      ) : null}
      <div className="mt-7 flex justify-center">
        <Ornament />
      </div>
    </motion.header>
  );
}

export function Reveal({
  children,
  delay = 0,
  y = 32,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

const DUST = Array.from({ length: 26 }, (_, i) => ({
  left: (i * 37) % 100,
  bottom: (i * 17) % 60,
  size: 1 + ((i * 7) % 3),
  duration: 14 + ((i * 5) % 16),
  delay: (i * 1.3) % 12,
  opacity: 0.15 + ((i % 5) * 0.09),
}));

export function DustField({ className = "" }: { className?: string }) {
  const reduced = useReducedMotion();
  if (reduced) return null;
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      {DUST.map((d, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-primary"
          style={{
            left: `${d.left}%`,
            bottom: `${d.bottom}%`,
            width: d.size,
            height: d.size,
            opacity: d.opacity,
            animation: `dust-drift ${d.duration}s linear ${d.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
