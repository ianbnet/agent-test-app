import { useMemo, useRef } from "react";
import { Eye, EyeOff, Focus, RotateCcw } from "lucide-react";
import type { SystemId } from "@shared/anatomy";
import { LAYER_INFO, SYSTEMS } from "@/data/systems";
import { useModel } from "@/data/modelContext";
import { useExplorer } from "@/state/store";
import { cn } from "@/lib/utils";
import { Row, Section, Toggle } from "./primitives";

const LAYER_SWATCH = ["#e3b69a", "#d0463f", "#9d2f2d", "#e0724f", "#efe6d2"];
const ROW_H = 46;

/** Vertical depth control: drag the handle (or tap a layer) to dissect from skin to skeleton. */
export function DepthStack() {
  const peel = useExplorer((s) => s.peel);
  const setPeel = useExplorer((s) => s.setPeel);
  const track = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const fromPointer = (clientY: number) => {
    const el = track.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const t = (clientY - r.top - ROW_H / 2) / ROW_H;
    // snap gently to whole layers
    const snapped = Math.abs(t - Math.round(t)) < 0.12 ? Math.round(t) : t;
    setPeel(Math.max(0, Math.min(4, snapped)));
  };

  return (
    <div
      ref={track}
      className="relative select-none"
      style={{ height: ROW_H * 5, touchAction: "none" }}
      onPointerDown={(e) => {
        dragging.current = true;
        e.currentTarget.setPointerCapture?.(e.pointerId);
        fromPointer(e.clientY);
      }}
      onPointerMove={(e) => dragging.current && fromPointer(e.clientY)}
      onPointerUp={() => (dragging.current = false)}
      onPointerCancel={() => (dragging.current = false)}
    >
      {/* rail */}
      <div className="absolute bottom-[23px] left-[15px] top-[23px] w-[2px] rounded bg-white/10" />
      <div className="absolute left-[15px] top-[23px] w-[2px] rounded bg-primary transition-[height] duration-75" style={{ height: peel * ROW_H }} />
      {LAYER_INFO.map((l) => {
        const removed = l.index < Math.floor(peel);
        const fading = l.index === Math.floor(peel) && peel % 1 > 0.001;
        const active = Math.abs(peel - l.index) < 0.5;
        return (
          <div
            key={l.index}
            className="absolute left-0 right-0 flex cursor-pointer items-center gap-3 pl-9 pr-1"
            style={{ top: l.index * ROW_H, height: ROW_H }}
          >
            <span
              className={cn("absolute left-[10px] h-3 w-3 rounded-full border-2 transition-colors", removed ? "border-primary bg-primary" : "border-white/30 bg-[#0d1117]")}
            />
            <span
              className="h-7 w-1.5 shrink-0 rounded-full"
              style={{ background: LAYER_SWATCH[l.index], opacity: removed ? 0.25 : fading ? 0.6 : 1 }}
            />
            <div className="min-w-0 flex-1">
              <div className={cn("text-[13px] font-medium transition-colors", removed ? "text-muted-foreground line-through decoration-white/20" : active ? "text-foreground" : "text-foreground/80")}>
                {l.label}
              </div>
              <div className="truncate text-[11px] text-muted-foreground">{l.blurb}</div>
            </div>
          </div>
        );
      })}
      {/* handle */}
      <div
        className="pointer-events-none absolute left-[6px] h-5 w-5 rounded-full border-2 border-white bg-primary shadow-[0_0_0_5px_rgba(62,230,200,0.2),0_4px_12px_rgba(0,0,0,0.5)] transition-[top] duration-75"
        style={{ top: peel * ROW_H + ROW_H / 2 - 10 }}
      />
    </div>
  );
}

export function SystemList() {
  const model = useModel();
  const systems = useExplorer((s) => s.systems);
  const toggle = useExplorer((s) => s.toggleSystem);
  const solo = useExplorer((s) => s.soloSystem);
  const counts = useMemo(() => {
    const c: Partial<Record<SystemId, number>> = {};
    model?.manifest.structures.forEach((s) => (c[s.system] = (c[s.system] ?? 0) + 1));
    return c;
  }, [model]);
  return (
    <div className="-mx-1 space-y-0.5">
      {SYSTEMS.filter((s) => counts[s.id]).map((s) => {
        const on = systems[s.id];
        return (
          <div key={s.id} className="group flex items-center gap-2 rounded-lg px-1 py-0.5 hover:bg-white/[0.04]">
            <button type="button" className="flex min-w-0 flex-1 items-center gap-2.5 py-1 text-left" onClick={() => toggle(s.id)} title={s.blurb}>
              <span
                className="h-2.5 w-2.5 shrink-0 rounded-full transition-opacity"
                style={{ background: s.color, boxShadow: on ? `0 0 10px ${s.color}88` : undefined, opacity: on ? 1 : 0.3 }}
              />
              <span className={cn("truncate text-[13px] font-medium", on ? "text-foreground/90" : "text-muted-foreground line-through decoration-white/20")}>
                {s.label}
              </span>
              <span className="text-[11px] tabular-nums text-muted-foreground/70">{counts[s.id]}</span>
            </button>
            <button
              type="button"
              className="icon-btn h-7 w-7 opacity-60 group-hover:opacity-100"
              title={`Show only ${s.label.toLowerCase()}`}
              onClick={() => solo(s.id)}
            >
              <Focus className="h-3.5 w-3.5" />
            </button>
            <button type="button" className="icon-btn h-7 w-7" onClick={() => toggle(s.id)} title={on ? "Hide" : "Show"}>
              {on ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5 opacity-50" />}
            </button>
          </div>
        );
      })}
    </div>
  );
}

export function DissectPanel() {
  const ghost = useExplorer((s) => s.ghost);
  const set = useExplorer((s) => s.set);
  const hidden = useExplorer((s) => s.hidden);
  const isolated = useExplorer((s) => s.isolated);
  const systems = useExplorer((s) => s.systems);
  const showAll = useExplorer((s) => s.showAllSystems);
  const unhideAll = useExplorer((s) => s.unhideAll);
  const nHidden = Object.keys(hidden).length;
  const allOn = Object.values(systems).every(Boolean);
  return (
    <div className="space-y-6">
      <Section title="Dissection depth">
        <DepthStack />
        <Row label="Body outline" hint="Keep a translucent skin silhouette for orientation">
          <Toggle checked={ghost} onChange={(v) => set("ghost", v)} label="Body outline" />
        </Row>
      </Section>
      <Section
        title="Body systems"
        action={
          !allOn && (
            <button type="button" className="text-[11.5px] font-semibold text-primary hover:underline" onClick={showAll}>
              Show all
            </button>
          )
        }
      >
        <SystemList />
      </Section>
      {(nHidden > 0 || isolated) && (
        <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5 text-[12.5px]">
          <span className="text-muted-foreground">
            {isolated ? `Isolating ${isolated.length} structure${isolated.length > 1 ? "s" : ""}` : `${nHidden} hidden`}
          </span>
          <button type="button" className="inline-flex items-center gap-1.5 font-semibold text-primary" onClick={unhideAll}>
            <RotateCcw className="h-3.5 w-3.5" /> Restore
          </button>
        </div>
      )}
    </div>
  );
}
