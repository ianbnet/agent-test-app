import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Toggle({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label?: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={cn(
        "relative inline-flex h-[22px] w-[38px] shrink-0 items-center rounded-full transition-colors",
        checked ? "bg-primary" : "bg-white/15",
      )}
    >
      <span
        className={cn(
          "inline-block h-[18px] w-[18px] rounded-full bg-white shadow transition-transform",
          checked ? "translate-x-[18px]" : "translate-x-[2px]",
        )}
      />
    </button>
  );
}

export function Range({
  value,
  min,
  max,
  step = 0.001,
  onChange,
  label,
  className,
}: {
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (v: number) => void;
  label?: string;
  className?: string;
}) {
  const fill = ((value - min) / (max - min)) * 100;
  return (
    <input
      type="range"
      aria-label={label}
      className={cn("range", className)}
      min={min}
      max={max}
      step={step}
      value={value}
      style={{ ["--fill" as string]: `${fill}%` }}
      onChange={(e) => onChange(parseFloat(e.target.value))}
    />
  );
}

export function Section({ title, action, children, className }: { title: string; action?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <section className={cn("space-y-2.5", className)}>
      <div className="flex items-center justify-between">
        <h3 className="eyebrow">{title}</h3>
        {action}
      </div>
      {children}
    </section>
  );
}

export function Row({ label, hint, children }: { label: ReactNode; hint?: ReactNode; children: ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3 py-1">
      <div className="min-w-0">
        <div className="text-[13px] font-medium text-foreground/90">{label}</div>
        {hint && <div className="text-[11.5px] leading-snug text-muted-foreground">{hint}</div>}
      </div>
      {children}
    </div>
  );
}

export function Seg<T extends string>({
  value,
  options,
  onChange,
  className,
}: {
  value: T;
  options: { value: T; label: ReactNode; title?: string }[];
  onChange: (v: T) => void;
  className?: string;
}) {
  return (
    <div className={cn("seg", className)} role="radiogroup">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          role="radio"
          aria-checked={value === o.value}
          data-active={value === o.value}
          title={o.title}
          onClick={() => onChange(o.value)}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

export function Kbd({ children }: { children: ReactNode }) {
  return (
    <kbd className="rounded-md border border-white/10 bg-white/5 px-1.5 py-0.5 font-sans text-[10.5px] font-medium text-muted-foreground">
      {children}
    </kbd>
  );
}

/** Stylised mark: a vertebra-like glyph in the accent colour. */
export function Logo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <defs>
        <linearGradient id="lg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#5ff2d6" />
          <stop offset="1" stopColor="#2aa3d8" />
        </linearGradient>
      </defs>
      <circle cx="16" cy="16" r="15" fill="none" stroke="url(#lg)" strokeWidth="1.5" opacity="0.5" />
      <path
        d="M16 5c2.4 0 4 1.6 4 3.6 0 1.3-.7 2.2-1.6 2.8.9.6 1.6 1.5 1.6 2.8 0 1.3-.7 2.2-1.6 2.8.9.6 1.6 1.5 1.6 2.8 0 1.3-.7 2.2-1.6 2.8.9.6 1.6 1.5 1.6 2.8M16 5c-2.4 0-4 1.6-4 3.6 0 1.3.7 2.2 1.6 2.8-.9.6-1.6 1.5-1.6 2.8 0 1.3.7 2.2 1.6 2.8-.9.6-1.6 1.5-1.6 2.8 0 1.3.7 2.2 1.6 2.8-.9.6-1.6 1.5-1.6 2.8"
        fill="none"
        stroke="url(#lg)"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path d="M9 11.5h3.5M19.5 11.5H23M9 17h3.5M19.5 17H23M9 22.5h3.5M19.5 22.5H23" stroke="url(#lg)" strokeWidth="1.4" strokeLinecap="round" opacity="0.7" />
    </svg>
  );
}
