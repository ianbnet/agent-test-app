import { create } from "zustand";
import type { Sex, SystemId } from "@shared/anatomy";
import type { OverlayId } from "@/data/overlays";
import { SYSTEMS } from "@/data/systems";

export type SectionAxis = "sagittal" | "coronal" | "transverse";
export type ViewPreset = "front" | "back" | "left" | "right" | "top" | "reset";
export type Quality = "high" | "balanced";
export type SheetTab = "dissect" | "data" | "tools" | "info" | "quiz";

export interface CameraRequest {
  nonce: number;
  kind: "focus" | "view";
  ids?: string[];
  view?: ViewPreset;
}

export interface QuizFeedback {
  /** Structure the user picked (or answered with). */
  picked?: string;
  correct: boolean;
}

export interface QuizState {
  mode: "find" | "name";
  target: string | null;
  options: string[];
  feedback: QuizFeedback | null;
  score: number;
  streak: number;
  asked: number;
}

interface ExplorerState {
  sex: Sex;
  /** Dissection depth: 0 = intact skin … 4 = skeleton only; fractional values fade a layer out. */
  peel: number;
  systems: Record<SystemId, boolean>;
  hidden: Record<string, true>;
  isolated: string[] | null;
  ghost: boolean;
  selected: string | null;
  hovered: string | null;
  overlay: OverlayId | null;
  animate: boolean;
  section: { enabled: boolean; axis: SectionAxis; offset: number; flip: boolean };
  explode: number;
  showConnections: boolean;
  labels: boolean;
  quality: Quality;
  sheet: SheetTab | null;
  camera: CameraRequest | null;
  quiz: QuizState | null;
  loading: { sex: Sex; progress: number } | null;
  error: string | null;
  /** Screen area (px) covered by panels; the camera frames the body in the rest. */
  insets: { left: number; right: number; top: number; bottom: number };
}

interface ExplorerActions {
  setSex(sex: Sex): void;
  setPeel(peel: number): void;
  toggleSystem(id: SystemId): void;
  soloSystem(id: SystemId): void;
  showAllSystems(): void;
  select(id: string | null, opts?: { focus?: boolean }): void;
  hover(id: string | null): void;
  hide(id: string): void;
  unhideAll(): void;
  isolate(ids: string[] | null): void;
  set<K extends keyof ExplorerState>(key: K, value: ExplorerState[K]): void;
  setSection(patch: Partial<ExplorerState["section"]>): void;
  focus(ids: string[]): void;
  view(view: ViewPreset): void;
  reset(): void;
}

const allSystems = () => Object.fromEntries(SYSTEMS.map((s) => [s.id, true])) as Record<SystemId, boolean>;

const PREFS_KEY = "anatomica.prefs.v1";
function loadPrefs(): Partial<Pick<ExplorerState, "sex" | "quality" | "labels">> {
  try {
    return JSON.parse(localStorage.getItem(PREFS_KEY) ?? "{}");
  } catch {
    return {};
  }
}

const prefs = loadPrefs();
let nonce = 1;

const initial: ExplorerState = {
  sex: prefs.sex ?? "female",
  peel: 0,
  systems: allSystems(),
  hidden: {},
  isolated: null,
  ghost: true,
  selected: null,
  hovered: null,
  overlay: null,
  animate: true,
  section: { enabled: false, axis: "sagittal", offset: 0, flip: false },
  explode: 0,
  showConnections: true,
  labels: prefs.labels ?? true,
  quality: prefs.quality ?? (isLikelyLowEnd() ? "balanced" : "high"),
  sheet: null,
  camera: null,
  quiz: null,
  loading: null,
  error: null,
  insets: { left: 0, right: 0, top: 0, bottom: 0 },
};

function isLikelyLowEnd() {
  if (typeof navigator === "undefined") return false;
  const mem = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
  return (mem !== undefined && mem <= 3) || (navigator.hardwareConcurrency ?? 8) <= 4;
}

export const useExplorer = create<ExplorerState & ExplorerActions>()((set, get) => ({
  ...initial,
  setSex: (sex) => set({ sex, hovered: null }),
  setPeel: (peel) => set({ peel: Math.min(4, Math.max(0, peel)) }),
  toggleSystem: (id) => set((s) => ({ systems: { ...s.systems, [id]: !s.systems[id] } })),
  soloSystem: (id) =>
    set(() => {
      const systems = Object.fromEntries(SYSTEMS.map((s) => [s.id, s.id === id])) as Record<SystemId, boolean>;
      return { systems };
    }),
  showAllSystems: () => set({ systems: allSystems() }),
  select: (id, opts) => {
    // On phones a selection shows a compact card; the full info sheet opens on request.
    set((s) => ({ selected: id, sheet: s.sheet === "info" ? (id ? "info" : null) : id ? null : s.sheet }));
    if (id && opts?.focus) get().focus([id]);
  },
  hover: (id) => {
    if (get().hovered !== id) set({ hovered: id });
  },
  hide: (id) => set((s) => ({ hidden: { ...s.hidden, [id]: true }, selected: s.selected === id ? null : s.selected })),
  unhideAll: () => set({ hidden: {}, isolated: null }),
  isolate: (ids) => set({ isolated: ids && ids.length ? ids : null }),
  set: (key, value) => set({ [key]: value } as Partial<ExplorerState>),
  setSection: (patch) => set((s) => ({ section: { ...s.section, ...patch } })),
  focus: (ids) => set({ camera: { nonce: nonce++, kind: "focus", ids } }),
  view: (view) => set({ camera: { nonce: nonce++, kind: "view", view } }),
  reset: () =>
    set({
      peel: 0,
      systems: allSystems(),
      hidden: {},
      isolated: null,
      selected: null,
      overlay: null,
      section: { enabled: false, axis: "sagittal", offset: 0, flip: false },
      explode: 0,
      camera: { nonce: nonce++, kind: "view", view: "reset" },
    }),
}));

useExplorer.subscribe((s, prev) => {
  if (s.sex === prev.sex && s.quality === prev.quality && s.labels === prev.labels) return;
  try {
    localStorage.setItem(PREFS_KEY, JSON.stringify({ sex: s.sex, quality: s.quality, labels: s.labels }));
  } catch {
    /* private mode */
  }
});
