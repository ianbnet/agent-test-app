import { useEffect, useMemo, useRef, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { CornerDownLeft, Search } from "lucide-react";
import type { StructureMeta } from "@shared/anatomy";
import { useKnowledge } from "@/data/knowledge";
import { useModel } from "@/data/modelContext";
import { LAYER_INFO, SYSTEM_BY_ID } from "@/data/systems";
import { reveal } from "@/state/actions";
import { cn } from "@/lib/utils";
import { Kbd } from "./primitives";

const SUGGESTED = [
  "heart", "cerebellum", "femur", "biceps-brachii", "kidney", "sciatic-nerve", "diaphragm", "stomach",
  "hippocampus", "gluteus-maximus", "brachial-plexus", "abdominal-aorta", "trachea", "skull",
];

function norm(s: string) {
  return s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9 ]+/g, " ").trim();
}

interface Entry {
  s: StructureMeta;
  hay: string;
  name: string;
  latin?: string;
}

function score(e: Entry, q: string, words: string[]) {
  const n = e.name;
  if (n === q) return 1000;
  let sc = 0;
  if (n.startsWith(q)) sc += 400;
  else if (n.includes(` ${q}`)) sc += 250;
  else if (n.includes(q)) sc += 150;
  for (const w of words) {
    if (!e.hay.includes(w)) return 0;
    sc += e.hay.includes(` ${w}`) || e.hay.startsWith(w) ? 20 : 8;
  }
  return sc - n.length * 0.5;
}

export function SearchDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const model = useModel();
  const kb = useKnowledge();
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const list = useRef<HTMLDivElement>(null);

  const entries = useMemo<Entry[]>(() => {
    if (!model) return [];
    return model.manifest.structures.map((s) => {
      const info = kb?.[s.concept];
      const name = norm(s.name);
      const latin = info?.latin;
      return {
        s,
        name,
        latin,
        hay: [name, norm(s.conceptName), latin ? norm(latin) : "", SYSTEM_BY_ID[s.system].label.toLowerCase(), s.group].join(" "),
      };
    });
  }, [model, kb]);

  const results = useMemo(() => {
    const query = norm(q);
    if (!query) {
      const seen = new Set<string>();
      const out: Entry[] = [];
      for (const c of SUGGESTED) {
        const e = entries.find((x) => x.s.concept === c || x.s.concept.startsWith(c)) ?? entries.find((x) => x.s.concept.includes(c));
        if (e && !seen.has(e.s.concept)) {
          seen.add(e.s.concept);
          out.push(e);
        }
      }
      return out;
    }
    const words = query.split(/\s+/);
    return entries
      .map((e) => ({ e, sc: score(e, query, words) }))
      .filter((x) => x.sc > 0)
      .sort((a, b) => b.sc - a.sc)
      .slice(0, 60)
      .map((x) => x.e);
  }, [q, entries]);

  useEffect(() => setActive(0), [q]);
  useEffect(() => {
    if (open) setQ("");
  }, [open]);
  useEffect(() => {
    list.current?.querySelector<HTMLElement>(`[data-idx="${active}"]`)?.scrollIntoView({ block: "nearest" });
  }, [active]);

  const choose = (e: Entry) => {
    if (!model) return;
    onOpenChange(false);
    reveal(model, e.s.id);
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50 backdrop-blur-[2px] data-[state=open]:animate-in data-[state=open]:fade-in-0" />
        <Dialog.Content
          className="glass fixed left-1/2 top-[max(12px,calc(var(--safe-top)+10px))] z-50 flex max-h-[min(640px,calc(100dvh-24px))] w-[min(620px,calc(100vw-20px))] -translate-x-1/2 flex-col overflow-hidden rounded-2xl !bg-[#0c1016]/95 sm:top-[12vh]"
          aria-describedby={undefined}
          onKeyDown={(ev) => {
            if (ev.key === "ArrowDown") {
              ev.preventDefault();
              setActive((a) => Math.min(results.length - 1, a + 1));
            } else if (ev.key === "ArrowUp") {
              ev.preventDefault();
              setActive((a) => Math.max(0, a - 1));
            } else if (ev.key === "Enter" && results[active]) {
              ev.preventDefault();
              choose(results[active]);
            }
          }}
        >
          <Dialog.Title className="sr-only">Search structures</Dialog.Title>
          <div className="flex items-center gap-3 border-b border-white/[0.07] px-4">
            <Search className="h-5 w-5 shrink-0 text-muted-foreground" />
            <input
              autoFocus
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={`Search ${model?.manifest.structures.length ?? ""} structures — e.g. "radial nerve", "femur"`}
              className="h-14 w-full bg-transparent text-[15px] outline-none placeholder:text-muted-foreground/70"
              autoComplete="off"
              autoCorrect="off"
              spellCheck={false}
            />
            <Kbd>Esc</Kbd>
          </div>
          <div ref={list} className="scroll-thin flex-1 overflow-y-auto p-2">
            {!q && <div className="eyebrow px-2 pb-1.5 pt-1">Suggestions</div>}
            {results.length === 0 && <div className="px-3 py-10 text-center text-[13px] text-muted-foreground">No structures match “{q}”.</div>}
            {results.map((e, i) => {
              const sys = SYSTEM_BY_ID[e.s.system];
              return (
                <button
                  key={e.s.id}
                  type="button"
                  data-idx={i}
                  onMouseMove={() => setActive(i)}
                  onClick={() => choose(e)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors",
                    i === active ? "bg-white/[0.07]" : "hover:bg-white/[0.04]",
                  )}
                >
                  <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: sys.color }} />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[14px] font-medium">{e.s.name}</span>
                    <span className="block truncate text-[11.5px] text-muted-foreground">
                      {sys.label} · {LAYER_INFO[e.s.layer].short}
                      {e.latin ? ` · ${e.latin}` : ""}
                    </span>
                  </span>
                  {i === active && <CornerDownLeft className="h-4 w-4 shrink-0 text-muted-foreground" />}
                </button>
              );
            })}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
