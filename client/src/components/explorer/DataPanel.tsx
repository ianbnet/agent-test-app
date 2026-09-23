import { useMemo } from "react";
import { Activity, Atom, Brain, Droplet, Flame, HeartPulse, Layers3, Network, Sprout, X } from "lucide-react";
import { OVERLAYS, OVERLAY_BY_ID, NO_DATA, type Legend as LegendT, type OverlayId } from "@/data/overlays";
import { useKnowledge } from "@/data/knowledge";
import { useModel } from "@/data/modelContext";
import { useExplorer } from "@/state/store";
import { cn } from "@/lib/utils";
import { Row, Section, Toggle } from "./primitives";

const ICONS: Record<OverlayId, typeof Activity> = {
  systems: Layers3,
  tissue: Atom,
  oxygen: Droplet,
  bloodflow: HeartPulse,
  perfusion: Activity,
  metabolic: Flame,
  arterial: Network,
  innervation: Brain,
  germ: Sprout,
};

export function useOverlayLegend(): { id: OverlayId; legend: LegendT } | null {
  const model = useModel();
  const kb = useKnowledge();
  const overlay = useExplorer((s) => s.overlay);
  return useMemo(() => {
    if (!overlay || !model) return null;
    const def = OVERLAY_BY_ID[overlay];
    if (def.needsKnowledge && !kb) return null;
    return { id: overlay, legend: def.compute(model, kb).legend };
  }, [overlay, model, kb]);
}

export function LegendView({ legend, compact }: { legend: LegendT; compact?: boolean }) {
  if (legend.kind === "categorical") {
    return (
      <ul className={cn("grid gap-x-3 gap-y-1", compact ? "grid-cols-1" : "grid-cols-1")}>
        {legend.items.map((i) => (
          <li key={i.label} className="flex items-center gap-2 text-[12px] leading-tight text-foreground/85">
            <span className="h-2.5 w-2.5 shrink-0 rounded-sm" style={{ background: i.color, boxShadow: `0 0 8px ${i.color}66` }} />
            {i.label}
          </li>
        ))}
        <li className="flex items-center gap-2 text-[11.5px] text-muted-foreground">
          <span className="h-2.5 w-2.5 shrink-0 rounded-sm" style={{ background: NO_DATA }} />
          Not applicable
        </li>
      </ul>
    );
  }
  const pos = (v: number) =>
    legend.log
      ? (Math.log(v) - Math.log(legend.min)) / (Math.log(legend.max) - Math.log(legend.min))
      : (v - legend.min) / (legend.max - legend.min);
  return (
    <div>
      <div className="h-2.5 rounded-full" style={{ background: `linear-gradient(to right, ${legend.stops.join(",")})` }} />
      <div className="relative mt-1 h-4 text-[10.5px] tabular-nums text-muted-foreground">
        {legend.ticks.map((t) => (
          <span key={t} className="absolute -translate-x-1/2" style={{ left: `${pos(t) * 100}%` }}>
            {t}
          </span>
        ))}
      </div>
      <div className="mt-0.5 flex items-center justify-between text-[11px] text-muted-foreground">
        <span>{legend.unit}{legend.log ? " (log scale)" : ""}</span>
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-sm" style={{ background: NO_DATA }} /> {legend.missing}
        </span>
      </div>
    </div>
  );
}

export function DataPanel() {
  const overlay = useExplorer((s) => s.overlay);
  const animate = useExplorer((s) => s.animate);
  const set = useExplorer((s) => s.set);
  const legend = useOverlayLegend();
  return (
    <div className="space-y-5">
      <Section
        title="Data layers"
        action={
          overlay && (
            <button type="button" className="inline-flex items-center gap-1 text-[11.5px] font-semibold text-primary" onClick={() => set("overlay", null)}>
              <X className="h-3.5 w-3.5" /> Clear
            </button>
          )
        }
      >
        <p className="text-[12px] leading-relaxed text-muted-foreground">
          Recolour the body by physiology, blood supply, innervation or development. Tap any structure for its value.
        </p>
        <div className="space-y-1.5">
          {OVERLAYS.map((o) => {
            const Icon = ICONS[o.id];
            const active = overlay === o.id;
            return (
              <button
                key={o.id}
                type="button"
                onClick={() => set("overlay", active ? null : o.id)}
                className={cn(
                  "w-full rounded-xl border px-3 py-2.5 text-left transition-colors",
                  active ? "border-primary/40 bg-primary/[0.08]" : "border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.05]",
                )}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={cn("h-4 w-4 shrink-0", active ? "text-primary" : "text-muted-foreground")} />
                  <span className="text-[13px] font-semibold">{o.label}</span>
                  {o.animated && <span className="ml-auto rounded-full bg-white/[0.06] px-1.5 py-0.5 text-[9.5px] font-semibold uppercase tracking-wider text-muted-foreground">Live</span>}
                </div>
                {active && (
                  <div className="mt-2 space-y-3 animate-fade-up">
                    <p className="text-[12px] leading-relaxed text-foreground/75">{o.description}</p>
                    {legend && <LegendView legend={legend.legend} />}
                    <p className="text-[10.5px] leading-snug text-muted-foreground">Source: {o.source}</p>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </Section>
      {overlay && OVERLAY_BY_ID[overlay].animated && (
        <Row label="Animate flow" hint="Pulses travel along vessels and nerves">
          <Toggle checked={animate} onChange={(v) => set("animate", v)} label="Animate flow" />
        </Row>
      )}
    </div>
  );
}

/** Floating legend on the stage while an overlay is active. */
export function FloatingLegend({ className }: { className?: string }) {
  const overlay = useExplorer((s) => s.overlay);
  const set = useExplorer((s) => s.set);
  const legend = useOverlayLegend();
  if (!overlay || !legend) return null;
  const def = OVERLAY_BY_ID[overlay];
  return (
    <div className={cn("glass w-[260px] rounded-2xl p-3.5 animate-fade-up", className)}>
      <div className="mb-2.5 flex items-center justify-between">
        <div>
          <div className="eyebrow !text-primary">Data layer</div>
          <div className="text-[14px] font-semibold">{def.label}</div>
        </div>
        <button type="button" className="icon-btn h-7 w-7" onClick={() => set("overlay", null)} aria-label="Close data layer">
          <X className="h-4 w-4" />
        </button>
      </div>
      <div className="scroll-thin max-h-[40vh] overflow-y-auto pr-1">
        <LegendView legend={legend.legend} compact />
      </div>
    </div>
  );
}
