import { useCallback, useEffect, useMemo, useState } from "react";
import { Activity, Hand, Layers, Loader2, RotateCcw, Scissors, SlidersHorizontal, X } from "lucide-react";
import { loadModel, type LoadedModel } from "@/data/model";
import { loadKnowledge } from "@/data/knowledge";
import { ModelContext, useModel } from "@/data/modelContext";
import { OVERLAY_BY_ID } from "@/data/overlays";
import { useKnowledge } from "@/data/knowledge";
import { SYSTEM_BY_ID } from "@/data/systems";
import { useCompactLayout } from "@/hooks/use-compact-layout";
import { useExplorer } from "@/state/store";
import { Scene } from "@/three/Scene";
import { cn } from "@/lib/utils";
import { CalloutLayer, type Insets } from "@/components/explorer/CalloutLayer";
import { CreditsDialog, LoadingScreen, TopBar } from "@/components/explorer/Chrome";
import { DataPanel, FloatingLegend } from "@/components/explorer/DataPanel";
import { DissectPanel } from "@/components/explorer/DissectPanel";
import { BottomSheet, DepthRail, MobileNav } from "@/components/explorer/MobileUI";
import { QuizCard } from "@/components/explorer/QuizCard";
import { SearchDialog } from "@/components/explorer/SearchDialog";
import { StructureInfo } from "@/components/explorer/StructureInfo";
import { ToolsPanel, VIEWS } from "@/components/explorer/ToolsPanel";

type PanelTab = "dissect" | "data" | "tools";

function SidePanel() {
  const [tab, setTab] = useState<PanelTab>("dissect");
  const tabs: { id: PanelTab; label: string; icon: typeof Layers }[] = [
    { id: "dissect", label: "Dissect", icon: Layers },
    { id: "data", label: "Data", icon: Activity },
    { id: "tools", label: "Tools", icon: SlidersHorizontal },
  ];
  return (
    <aside className="glass pointer-events-auto absolute bottom-5 left-5 top-[84px] z-20 flex w-[320px] flex-col overflow-hidden rounded-[20px]">
      <div className="flex shrink-0 gap-1 border-b border-white/[0.06] p-1.5">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={cn(
              "flex flex-1 items-center justify-center gap-1.5 rounded-xl py-2 text-[12.5px] font-semibold transition-colors",
              tab === t.id ? "bg-white/[0.08] text-foreground" : "text-muted-foreground hover:text-foreground",
            )}
          >
            <t.icon className="h-4 w-4" /> {t.label}
          </button>
        ))}
      </div>
      <div className="scroll-thin min-h-0 flex-1 overflow-y-auto px-4 py-4">
        {tab === "dissect" && <DissectPanel />}
        {tab === "data" && <DataPanel />}
        {tab === "tools" && <ToolsPanel />}
      </div>
    </aside>
  );
}

function ViewDock() {
  const view = useExplorer((s) => s.view);
  const section = useExplorer((s) => s.section);
  const setSection = useExplorer((s) => s.setSection);
  return (
    <div className="glass pointer-events-auto flex items-center gap-0.5 rounded-2xl p-1">
      {VIEWS.map((v) => (
        <button key={v.value} type="button" className="icon-btn w-auto px-2.5 text-[12px] font-semibold" onClick={() => view(v.value)} title={`${v.label} view`}>
          {v.short}
        </button>
      ))}
      <div className="mx-1 h-5 w-px bg-white/10" />
      <button
        type="button"
        className="icon-btn"
        data-active={section.enabled}
        title="Cross-section"
        onClick={() => {
          setSection({ enabled: !section.enabled });
          if (!section.enabled) view(section.axis === "sagittal" ? "left" : "front");
        }}
      >
        <Scissors className="h-4 w-4" />
      </button>
      <button type="button" className="icon-btn" title="Reset camera" onClick={() => view("reset")}>
        <RotateCcw className="h-4 w-4" />
      </button>
    </div>
  );
}

function HoverTip({ hover }: { hover: { id: string; x: number; y: number } | null }) {
  const model = useModel();
  const overlay = useExplorer((s) => s.overlay);
  const kb = useKnowledge();
  const s = hover ? model?.byId.get(hover.id) : undefined;
  const value = useMemo(() => {
    if (!s || !overlay || !model) return null;
    const def = OVERLAY_BY_ID[overlay];
    if (def.needsKnowledge && !kb) return null;
    return def.compute(model, kb).value(s);
  }, [s, overlay, model, kb]);
  if (!hover || !s) return null;
  return (
    <div
      className="pointer-events-none fixed z-40 max-w-[280px] rounded-xl border border-white/10 bg-[#0b0e13]/90 px-3 py-2 shadow-xl backdrop-blur-md"
      style={{ left: hover.x + 16, top: hover.y + 14 }}
    >
      <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
        <span className="h-1.5 w-1.5 rounded-full" style={{ background: SYSTEM_BY_ID[s.system].color }} />
        {SYSTEM_BY_ID[s.system].label}
      </div>
      <div className="text-[13.5px] font-medium text-white">{s.name}</div>
      {value && <div className="mt-0.5 text-[11.5px] leading-snug text-primary">{value}</div>}
    </div>
  );
}

export default function Explorer() {
  const sex = useExplorer((s) => s.sex);
  const selected = useExplorer((s) => s.selected);
  const quiz = useExplorer((s) => s.quiz);
  const sheet = useExplorer((s) => s.sheet);
  const set = useExplorer((s) => s.set);
  const loading = useExplorer((s) => s.loading);
  const mobile = useCompactLayout();
  const [model, setModel] = useState<LoadedModel | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [creditsOpen, setCreditsOpen] = useState(false);
  const [hover, setHover] = useState<{ id: string; x: number; y: number } | null>(null);

  useEffect(() => {
    let alive = true;
    useExplorer.setState({ loading: { sex, progress: 0 }, error: null });
    loadModel(sex, (p) => alive && useExplorer.setState({ loading: { sex, progress: p } }))
      .then((m) => {
        if (!alive) return;
        setModel(m);
        const st = useExplorer.getState();
        const keep = st.selected && m.byId.has(st.selected) ? st.selected : null;
        useExplorer.setState({
          loading: null,
          selected: keep,
          hovered: null,
          quiz: null,
          isolated: st.isolated?.filter((id) => m.byId.has(id)) ?? null,
        });
        loadKnowledge();
      })
      .catch((err: Error) => alive && useExplorer.setState({ error: err.message, loading: null }));
    return () => {
      alive = false;
    };
  }, [sex]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const typing = (e.target as HTMLElement)?.closest?.("input, textarea, [contenteditable]");
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen((v) => !v);
        return;
      }
      if (typing || searchOpen) return;
      const st = useExplorer.getState();
      if (e.key === "/") {
        e.preventDefault();
        setSearchOpen(true);
      } else if (e.key === "Escape") {
        if (st.quiz) st.set("quiz", null);
        else st.select(null);
      } else if (st.selected && e.key.toLowerCase() === "f") st.focus([st.selected]);
      else if (st.selected && e.key.toLowerCase() === "h") st.hide(st.selected);
      else if (st.selected && e.key.toLowerCase() === "i") st.isolate(st.isolated ? null : [st.selected]);
      else if (/^[1-5]$/.test(e.key)) st.setPeel(parseInt(e.key, 10) - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [searchOpen]);

  // Dev/test hook: lets automated checks drive the explorer.
  useEffect(() => {
    const w = window as unknown as { __explorer?: typeof useExplorer; __ready?: boolean };
    w.__explorer = useExplorer;
    w.__ready = !!model && !loading;
  }, [model, loading]);

  const onHover = useCallback((h: { id: string; x: number; y: number } | null) => setHover(h), []);

  const infoOpen = !!selected && !quiz;
  const insets: Insets = mobile
    ? { left: 8, right: 58, top: 64, bottom: selected ? 150 : 90 }
    : { left: 360, right: infoOpen ? 420 : 24, top: 84, bottom: 84 };
  // What the camera should keep clear (callouts may overlap the edges a little more).
  const camInsets = mobile
    ? { left: 0, right: 48, top: 56, bottom: (selected ? 140 : 76) + (sheet ? window.innerHeight * 0.46 - 70 : 0) }
    : { left: 340, right: infoOpen ? 400 : 0, top: 70, bottom: 64 };
  const camKey = JSON.stringify(camInsets);
  useEffect(() => {
    useExplorer.setState({ insets: JSON.parse(camKey) });
  }, [camKey]);

  return (
    <ModelContext.Provider value={model}>
      <div className="stage fixed inset-0 overflow-hidden">
        <div className="absolute inset-0">
          <Scene model={model} onHover={mobile ? undefined : onHover} />
        </div>
        <CalloutLayer insets={insets} />

        <TopBar mobile={mobile} onSearch={() => setSearchOpen(true)} onCredits={() => setCreditsOpen(true)} />

        {loading && model && (
          <div className="glass pointer-events-none absolute left-1/2 top-[76px] z-30 flex -translate-x-1/2 items-center gap-2 rounded-full px-3.5 py-1.5 text-[12px] font-medium">
            <Loader2 className="h-3.5 w-3.5 animate-spin text-primary" />
            Loading {loading.sex} model · {Math.round(loading.progress * 100)}%
          </div>
        )}

        {quiz && (
          <div className={cn("absolute left-1/2 z-30 -translate-x-1/2", mobile ? "top-[calc(max(10px,var(--safe-top))+54px)]" : "top-[84px]")}>
            <QuizCard />
          </div>
        )}

        {!mobile ? (
          <>
            <SidePanel />
            {infoOpen && (
              <aside className="glass scroll-thin pointer-events-auto absolute right-5 top-[84px] z-20 max-h-[calc(100%-104px)] w-[380px] overflow-y-auto rounded-[20px] p-5">
                <StructureInfo onClose={() => useExplorer.getState().select(null)} />
              </aside>
            )}
            {!infoOpen && (
              <div className="pointer-events-none absolute bottom-5 right-5 z-20 [&>*]:pointer-events-auto">
                <FloatingLegend />
              </div>
            )}
            <div className="pointer-events-none absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2">
              {!selected && !quiz && model && (
                <div className="flex items-center gap-2 text-[12px] text-muted-foreground">
                  <Hand className="h-3.5 w-3.5" /> Click a structure to learn about it · drag to rotate · scroll to zoom
                </div>
              )}
              <ViewDock />
            </div>
            <HoverTip hover={hover} />
          </>
        ) : (
          <>
            <DepthRail />
            {!quiz && (
              <div className="pointer-events-none absolute left-3 top-[calc(max(10px,var(--safe-top))+54px)] z-20 max-w-[calc(100vw-80px)]">
                <MobileLegend />
              </div>
            )}
            <MobileNav />
            <BottomSheet
              open={!!sheet}
              onClose={() => set("sheet", null)}
              title={
                sheet && (
                  <>
                    <span className="eyebrow">{sheet === "info" ? "Structure" : sheet === "dissect" ? "Dissect" : sheet === "data" ? "Data layers" : "Tools"}</span>
                    <button type="button" className="icon-btn h-8 w-8" onClick={() => set("sheet", null)} aria-label="Close">
                      <X className="h-4 w-4" />
                    </button>
                  </>
                )
              }
            >
              {sheet === "dissect" && <DissectPanel />}
              {sheet === "data" && <DataPanel />}
              {sheet === "tools" && <ToolsPanel />}
              {sheet === "info" && <StructureInfo compactHeader />}
            </BottomSheet>
          </>
        )}

        <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
        <CreditsDialog open={creditsOpen} onOpenChange={setCreditsOpen} />
        <LoadingScreen />
      </div>
    </ModelContext.Provider>
  );
}

function MobileLegend() {
  const [open, setOpen] = useState(false);
  const overlay = useExplorer((s) => s.overlay);
  if (!overlay) return null;
  return open ? (
    <div className="pointer-events-auto" onClick={() => setOpen(false)}>
      <FloatingLegend className="!w-[min(260px,calc(100vw-80px))]" />
    </div>
  ) : (
    <button type="button" className="glass pointer-events-auto chip !rounded-xl !py-1.5" onClick={() => setOpen(true)}>
      <Activity className="h-3.5 w-3.5 text-primary" /> {OVERLAY_BY_ID[overlay].short} · legend
    </button>
  );
}
