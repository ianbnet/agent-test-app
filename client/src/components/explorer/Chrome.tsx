import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { GraduationCap, Info, RotateCcw, Search, X } from "lucide-react";
import type { Sex } from "@shared/anatomy";
import { useModel } from "@/data/modelContext";
import { useExplorer } from "@/state/store";
import { cn } from "@/lib/utils";
import { Kbd, Logo, Seg } from "./primitives";
import { startQuiz } from "./QuizCard";

export function SexSwitch({ compact }: { compact?: boolean }) {
  const sex = useExplorer((s) => s.sex);
  const setSex = useExplorer((s) => s.setSex);
  const loading = useExplorer((s) => s.loading);
  return (
    <Seg<Sex>
      value={loading?.sex ?? sex}
      onChange={setSex}
      options={[
        { value: "female", label: compact ? "♀" : <span>♀<span className="hidden xl:inline"> Female</span></span>, title: "Adult female archetype" },
        { value: "male", label: compact ? "♂" : <span>♂<span className="hidden xl:inline"> Male</span></span>, title: "Adult male archetype" },
      ]}
    />
  );
}

export function Brand({ small }: { small?: boolean }) {
  return (
    <div className="flex items-center gap-2.5">
      <Logo className={small ? "h-7 w-7" : "h-9 w-9"} />
      <div className="leading-none">
        <div className={cn("display text-white", small ? "text-[21px]" : "text-[26px]")}>Anatomica</div>
        {!small && <div className="mt-0.5 text-[10.5px] font-medium uppercase tracking-[0.16em] text-muted-foreground">Human anatomy explorer</div>}
      </div>
    </div>
  );
}

export function TopBar({ onSearch, onCredits, mobile }: { onSearch: () => void; onCredits: () => void; mobile: boolean }) {
  const model = useModel();
  const quiz = useExplorer((s) => s.quiz);
  const reset = useExplorer((s) => s.reset);
  const n = model?.manifest.structures.length;
  if (mobile) {
    return (
      <header className="pointer-events-none absolute inset-x-0 top-0 z-30 flex items-center justify-between gap-2 px-3 pt-[max(10px,var(--safe-top))]">
        <div className="pointer-events-auto">
          <Brand small />
        </div>
        <div className="glass pointer-events-auto flex items-center gap-0.5 rounded-2xl p-1">
          <SexSwitch compact />
          <button type="button" className="icon-btn" onClick={onSearch} aria-label="Search">
            <Search className="h-[18px] w-[18px]" />
          </button>
          <button
            type="button"
            className="icon-btn"
            data-active={!!quiz}
            onClick={() => (quiz ? useExplorer.setState({ quiz: null }) : model && startQuiz(model))}
            aria-label="Quiz"
          >
            <GraduationCap className="h-[18px] w-[18px]" />
          </button>
          <button type="button" className="icon-btn" onClick={onCredits} aria-label="About">
            <Info className="h-[18px] w-[18px]" />
          </button>
        </div>
      </header>
    );
  }
  return (
    <header className="pointer-events-none absolute inset-x-0 top-0 z-30 flex items-start justify-between gap-4 px-5 pt-4">
      <div className="pointer-events-auto w-[300px]">
        <Brand />
      </div>
      <button
        type="button"
        onClick={onSearch}
        className="glass pointer-events-auto flex h-11 w-[min(440px,40vw)] items-center gap-3 rounded-2xl px-4 text-left text-[13.5px] text-muted-foreground transition-colors hover:text-foreground"
      >
        <Search className="h-4 w-4" />
        <span className="flex-1 truncate">Search {n ? `${n.toLocaleString()} structures` : "structures"}…</span>
        <Kbd>⌘K</Kbd>
      </button>
      <div className="glass pointer-events-auto flex items-center gap-1 rounded-2xl p-1">
        <SexSwitch />
        <div className="mx-1 h-5 w-px bg-white/10" />
        <button
          type="button"
          className="icon-btn w-auto gap-1.5 px-2.5 text-[12.5px] font-semibold"
          data-active={!!quiz}
          onClick={() => (quiz ? useExplorer.setState({ quiz: null }) : model && startQuiz(model))}
          title="Test yourself"
        >
          <GraduationCap className="h-4 w-4" /> <span className="hidden xl:inline">Quiz</span>
        </button>
        <button type="button" className="icon-btn" onClick={reset} title="Reset everything">
          <RotateCcw className="h-4 w-4" />
        </button>
        <button type="button" className="icon-btn" onClick={onCredits} title="About & credits">
          <Info className="h-4 w-4" />
        </button>
      </div>
    </header>
  );
}

const TIPS = [
  "Drag the depth handle to dissect from skin down to the skeleton.",
  "Tap any structure to see what it does and how it connects.",
  "Use a cross-section to slice through the body like an MRI plane.",
  "Data layers recolour the body by blood flow, metabolism or innervation.",
  "Double-tap a structure to fly the camera to it.",
];

export function LoadingScreen() {
  const loading = useExplorer((s) => s.loading);
  const error = useExplorer((s) => s.error);
  const model = useModel();
  const [tip, setTip] = useState(0);
  const [gone, setGone] = useState(false);
  const visible = !model || (!!loading && !model);
  useEffect(() => {
    const t = setInterval(() => setTip((i) => (i + 1) % TIPS.length), 3200);
    return () => clearInterval(t);
  }, []);
  useEffect(() => {
    if (!visible) {
      const t = setTimeout(() => setGone(true), 700);
      return () => clearTimeout(t);
    }
    setGone(false);
  }, [visible]);
  if (gone) return null;
  const pct = Math.round((loading?.progress ?? 0) * 100);
  return (
    <div className={cn("stage fixed inset-0 z-[60] flex flex-col items-center justify-center transition-opacity duration-700", visible ? "opacity-100" : "pointer-events-none opacity-0")}>
      <div className="flex flex-col items-center gap-6 px-8 text-center">
        <Logo className="h-16 w-16 animate-pulse" />
        <div>
          <div className="display text-[44px] leading-none text-white">Anatomica</div>
          <div className="mt-2 text-[12px] font-medium uppercase tracking-[0.2em] text-muted-foreground">Interactive 3D human anatomy</div>
        </div>
        {error ? (
          <div className="max-w-sm text-[13px] text-[#ff8a8a]">{error}</div>
        ) : (
          <div className="w-64">
            <div className="h-1 overflow-hidden rounded-full bg-white/10">
              <div className="h-full rounded-full bg-primary transition-[width] duration-300" style={{ width: `${Math.max(4, pct)}%` }} />
            </div>
            <div className="mt-2 text-[11.5px] tabular-nums text-muted-foreground">
              Loading {loading?.sex ?? "model"} · {pct}%
            </div>
          </div>
        )}
        <p key={tip} className="h-10 max-w-xs text-[13px] leading-relaxed text-foreground/70 animate-fade-up">
          {TIPS[tip]}
        </p>
      </div>
    </div>
  );
}

export function CreditsDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/55 backdrop-blur-[2px]" />
        <Dialog.Content
          aria-describedby={undefined}
          className="glass scroll-thin fixed left-1/2 top-1/2 z-50 max-h-[calc(100dvh-32px)] w-[min(560px,calc(100vw-24px))] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-2xl !bg-[#0c1016]/95 p-6"
        >
          <div className="flex items-start justify-between">
            <Brand />
            <Dialog.Close className="icon-btn" aria-label="Close">
              <X className="h-4 w-4" />
            </Dialog.Close>
          </div>
          <Dialog.Title className="sr-only">About Anatomica</Dialog.Title>
          <div className="mt-5 space-y-5 text-[13px] leading-relaxed text-foreground/85">
            <p>
              Anatomica is an interactive atlas of an archetypal adult female and male body, built for university biology and anatomy
              courses. Dissect layer by layer, slice sections, and follow how every structure is supplied, drained, innervated and attached.
            </p>
            <div>
              <h3 className="eyebrow mb-2">How to explore</h3>
              <ul className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
                {[
                  ["Rotate", "drag with one finger / left mouse"],
                  ["Zoom", "pinch / scroll wheel"],
                  ["Pan", "two-finger drag / right mouse"],
                  ["Select", "tap a structure"],
                  ["Fly to", "double-tap a structure"],
                  ["Search", "⌘K / Ctrl-K"],
                ].map(([k, v]) => (
                  <li key={k} className="rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2">
                    <span className="font-semibold text-foreground">{k}</span> <span className="text-muted-foreground">— {v}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="eyebrow mb-2">Data sources</h3>
              <ul className="space-y-2">
                <li>
                  <span className="font-semibold text-foreground">BodyParts3D</span>, © The Database Center for Life Science (DBCLS),
                  licensed under{" "}
                  <a className="text-primary underline-offset-2 hover:underline" href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noreferrer">
                    CC BY 4.0
                  </a>
                  . Most bones, muscles, vessels, nerves and organs derive from it; geometry was simplified, merged and re-fitted.
                </li>
                <li>
                  <span className="font-semibold text-foreground">Human Reference Atlas 3D reference organs</span>, NIH Human BioMolecular
                  Atlas Program (HuBMAP),{" "}
                  <a className="text-primary underline-offset-2 hover:underline" href="https://humanatlas.io" target="_blank" rel="noreferrer">
                    humanatlas.io
                  </a>
                  , CC BY 4.0 — the female body surface, pelvis, knee, sternum, discs and female reproductive organs (Visible Human female).
                </li>
                <li>
                  Lungs, spinal cord and peripheral nerves, thyroid, the muscles of facial expression, latissimus dorsi, the internal
                  oblique and transversus abdominis, temporalis, masseter, vagina and female urethra were modelled procedurally from the surrounding anatomy. Female anatomy was produced by non-rigid registration and is an
                  archetype, not a scan of one person.
                </li>
                <li>
                  Descriptions and physiological data were written for this app from standard references (Gray's Anatomy, Moore's
                  Clinically Oriented Anatomy, Netter, Guyton &amp; Hall, Langman's Embryology). Values are typical adult figures.
                </li>
              </ul>
            </div>
            <p className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 text-[12px] text-muted-foreground">
              For education only. Anatomical variation between people is normal and large; this app is not a diagnostic or clinical tool.
            </p>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
