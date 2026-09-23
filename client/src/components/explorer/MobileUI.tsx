import { useEffect, useRef, useState, type ReactNode } from "react";
import { Activity, ChevronUp, Crosshair, Info, Layers, SlidersHorizontal, X } from "lucide-react";
import { LAYER_INFO, SYSTEM_BY_ID } from "@/data/systems";
import { useModel } from "@/data/modelContext";
import { useExplorer, type SheetTab } from "@/state/store";
import { cn } from "@/lib/utils";

type Snap = "half" | "full";

/** Draggable bottom sheet with half / full snap points. */
export function BottomSheet({ open, onClose, title, children }: { open: boolean; onClose: () => void; title?: ReactNode; children: ReactNode }) {
  const [snap, setSnap] = useState<Snap>("half");
  const [drag, setDrag] = useState<number | null>(null);
  const start = useRef<{ y: number; h: number } | null>(null);
  const sheet = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (open) setSnap("half");
  }, [open]);

  const heights = () => {
    const vh = window.innerHeight;
    return { half: Math.round(vh * 0.46), full: Math.round(vh * 0.88) };
  };
  const h = heights();
  const height = drag ?? (open ? h[snap] : 0);

  return (
    <div
      ref={sheet}
      className={cn(
        "glass fixed inset-x-0 bottom-0 z-40 flex flex-col rounded-t-[22px] !bg-[#0c1016]/[0.92]",
        drag === null && "transition-[height] duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)]",
      )}
      style={{ height, visibility: height === 0 ? "hidden" : "visible", paddingBottom: "var(--safe-bottom)" }}
      aria-hidden={!open}
    >
      <div
        className="flex shrink-0 cursor-grab touch-none flex-col items-center px-4 pb-2 pt-2.5"
        onPointerDown={(e) => {
          (e.target as HTMLElement).setPointerCapture(e.pointerId);
          start.current = { y: e.clientY, h: height };
        }}
        onPointerMove={(e) => {
          if (!start.current) return;
          const next = Math.max(60, Math.min(h.full, start.current.h + (start.current.y - e.clientY)));
          setDrag(next);
        }}
        onPointerUp={(e) => {
          const s = start.current;
          start.current = null;
          if (!s) return;
          const moved = s.y - e.clientY;
          const cur = drag ?? height;
          setDrag(null);
          if (Math.abs(moved) < 6) {
            setSnap(snap === "half" ? "full" : "half");
            return;
          }
          if (cur < h.half * 0.6) onClose();
          else setSnap(cur > (h.half + h.full) / 2 ? "full" : "half");
        }}
      >
        <div className="h-1 w-10 rounded-full bg-white/25" />
        {title && <div className="mt-2 flex w-full items-center justify-between">{title}</div>}
      </div>
      <div className="scroll-thin min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 pb-6">{children}</div>
    </div>
  );
}

const TABS: { id: SheetTab; label: string; icon: typeof Layers }[] = [
  { id: "dissect", label: "Dissect", icon: Layers },
  { id: "data", label: "Data", icon: Activity },
  { id: "tools", label: "Tools", icon: SlidersHorizontal },
];

export function MobileNav() {
  const sheet = useExplorer((s) => s.sheet);
  const selected = useExplorer((s) => s.selected);
  const set = useExplorer((s) => s.set);
  const model = useModel();
  const s = selected ? model?.byId.get(selected) : undefined;
  const tabs = s ? [...TABS, { id: "info" as SheetTab, label: "Info", icon: Info }] : TABS;
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-30 px-3 pb-[max(10px,var(--safe-bottom))]">
      {s && sheet !== "info" && (
        <div className="glass pointer-events-auto mb-2 flex items-center gap-2 rounded-2xl py-2 pl-3.5 pr-1.5 animate-fade-up">
          <button type="button" className="min-w-0 flex-1 text-left" onClick={() => set("sheet", "info")}>
            <div className="flex items-center gap-1.5 text-[10.5px] font-semibold uppercase tracking-wider text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: SYSTEM_BY_ID[s.system].color }} />
              {SYSTEM_BY_ID[s.system].label} · {LAYER_INFO[s.layer].short}
            </div>
            <div className="display truncate text-[20px] leading-tight text-white">{s.name}</div>
          </button>
          <button type="button" className="icon-btn" onClick={() => useExplorer.getState().focus([s.id])} aria-label="Focus">
            <Crosshair className="h-[18px] w-[18px]" />
          </button>
          <button type="button" className="icon-btn" onClick={() => set("sheet", "info")} aria-label="More">
            <ChevronUp className="h-[18px] w-[18px]" />
          </button>
          <button type="button" className="icon-btn" onClick={() => useExplorer.getState().select(null)} aria-label="Deselect">
            <X className="h-[18px] w-[18px]" />
          </button>
        </div>
      )}
      <nav className="glass pointer-events-auto flex items-center justify-around rounded-2xl p-1">
        {tabs.map((t) => {
          const active = sheet === t.id;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => set("sheet", active ? null : t.id)}
              className={cn(
                "flex flex-1 flex-col items-center gap-0.5 rounded-xl py-1.5 text-[10.5px] font-semibold transition-colors",
                active ? "bg-primary/[0.12] text-primary" : "text-muted-foreground",
              )}
            >
              <t.icon className="h-5 w-5" />
              {t.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
}

/** Thumb-reachable vertical depth slider on the right edge (phones). */
export function DepthRail() {
  const peel = useExplorer((s) => s.peel);
  const setPeel = useExplorer((s) => s.setPeel);
  const [active, setActive] = useState(false);
  const rail = useRef<HTMLDivElement>(null);
  const H = 200;
  const from = (y: number) => {
    const r = rail.current!.getBoundingClientRect();
    const t = ((y - r.top) / r.height) * 4;
    const snapped = Math.abs(t - Math.round(t)) < 0.15 ? Math.round(t) : t;
    setPeel(Math.max(0, Math.min(4, snapped)));
  };
  const layer = LAYER_INFO[Math.min(4, Math.round(peel))];
  return (
    <div className="pointer-events-none fixed right-2 top-1/2 z-20 -translate-y-[60%]">
      <div
        className="glass pointer-events-auto relative flex w-11 flex-col items-center rounded-full py-4 touch-none"
        onPointerDown={(e) => {
          (e.target as HTMLElement).setPointerCapture(e.pointerId);
          setActive(true);
          from(e.clientY);
        }}
        onPointerMove={(e) => active && from(e.clientY)}
        onPointerUp={() => setActive(false)}
        onPointerCancel={() => setActive(false)}
      >
        <div ref={rail} className="relative w-[3px] rounded-full bg-white/15" style={{ height: H }}>
          <div className="absolute inset-x-0 top-0 rounded-full bg-primary" style={{ height: `${(peel / 4) * 100}%` }} />
          {LAYER_INFO.map((l) => (
            <div key={l.index} className="absolute left-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/40" style={{ top: `${(l.index / 4) * 100}%` }} />
          ))}
          <div
            className="absolute left-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-primary shadow-[0_0_0_5px_rgba(62,230,200,0.22)]"
            style={{ top: `${(peel / 4) * 100}%` }}
          />
        </div>
        <div className="mt-3 text-[8.5px] font-bold uppercase tracking-wider text-muted-foreground">Depth</div>
        {active && (
          <div
            className="glass absolute right-14 whitespace-nowrap rounded-xl px-3 py-1.5 text-[12.5px] font-semibold"
            style={{ top: `calc(16px + ${(peel / 4) * H}px - 16px)` }}
          >
            {layer.label}
          </div>
        )}
      </div>
    </div>
  );
}
