import { useMemo } from "react";
import { Crosshair, EyeOff, GitBranch, ScanSearch, Stethoscope, X } from "lucide-react";
import type { StructureMeta } from "@shared/anatomy";
import { RELATION_INFO, useKnowledge, type ConceptInfo, type Relation } from "@/data/knowledge";
import { useModel } from "@/data/modelContext";
import { OVERLAY_BY_ID } from "@/data/overlays";
import { GROUP_LOOK, LAYER_INFO, SYSTEM_BY_ID } from "@/data/systems";
import { reveal } from "@/state/actions";
import { useExplorer } from "@/state/store";
import { cn } from "@/lib/utils";

const SOURCE: Record<StructureMeta["source"], string> = {
  bodyparts3d: "BodyParts3D, © DBCLS (CC BY 4.0)",
  hra: "Human Reference Atlas, HuBMAP (CC BY 4.0)",
  generated: "Modelled by Anatomica from surrounding anatomy",
};

function Block({ title, children, className }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <section className={cn("space-y-2", className)}>
      <h4 className="eyebrow">{title}</h4>
      {children}
    </section>
  );
}

function ConnectionGroups({ info, current }: { info: ConceptInfo; current: StructureMeta }) {
  const model = useModel();
  const groups = useMemo(() => {
    const m = new Map<Relation, NonNullable<ConceptInfo["connections"]>>();
    for (const c of info.connections ?? []) {
      const list = m.get(c.relation) ?? [];
      list.push(c);
      m.set(c.relation, list);
    }
    return [...m.entries()].sort((a, b) => RELATION_INFO[a[0]].order - RELATION_INFO[b[0]].order);
  }, [info]);
  if (!model || !groups.length) return null;
  return (
    <div className="space-y-3">
      {groups.map(([rel, list]) => (
        <div key={rel}>
          <div className="mb-1.5 flex items-center gap-1.5 text-[11.5px] font-semibold" style={{ color: RELATION_INFO[rel].color }}>
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: RELATION_INFO[rel].color }} />
            {RELATION_INFO[rel].label}
          </div>
          <div className="flex flex-wrap gap-1.5">
            {list.map((c) => {
              const targets = model.byConcept.get(c.concept);
              const target = targets?.find((t) => t.side === current.side) ?? targets?.[0];
              const name = target?.conceptName ?? c.concept.replace(/-/g, " ");
              return (
                <button
                  key={c.concept + (c.note ?? "")}
                  type="button"
                  disabled={!target}
                  onClick={() => target && reveal(model, target.id)}
                  className="chip max-w-full text-left disabled:cursor-default disabled:opacity-50"
                  title={c.note ? `${name} — ${c.note}` : name}
                >
                  <span className="truncate">{name}</span>
                  {c.note && <span className="truncate text-[10.5px] font-normal text-muted-foreground">· {c.note}</span>}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

function Skeleton() {
  return (
    <div className="space-y-2">
      {[92, 100, 76].map((w, i) => (
        <div
          key={i}
          className="h-3 rounded bg-white/[0.06]"
          style={{
            width: `${w}%`,
            backgroundImage: "linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)",
            backgroundSize: "200% 100%",
            animation: "shimmer 1.4s infinite",
          }}
        />
      ))}
    </div>
  );
}

export function StructureInfo({ onClose, compactHeader }: { onClose?: () => void; compactHeader?: boolean }) {
  const model = useModel();
  const kb = useKnowledge();
  const selected = useExplorer((s) => s.selected);
  const overlay = useExplorer((s) => s.overlay);
  const showConnections = useExplorer((s) => s.showConnections);
  const isolated = useExplorer((s) => s.isolated);
  const st = useExplorer.getState;
  const s = selected ? model?.byId.get(selected) : undefined;
  const info = s && kb ? kb[s.concept] : undefined;
  const overlayValue = useMemo(() => {
    if (!overlay || !model || !s) return null;
    const def = OVERLAY_BY_ID[overlay];
    if (def.needsKnowledge && !kb) return null;
    return { label: def.label, value: def.compute(model, kb).value(s) };
  }, [overlay, model, kb, s]);
  if (!s || !model) return null;
  const sys = SYSTEM_BY_ID[s.system];
  const twins = model.byConcept.get(s.concept)?.length ?? 1;
  const isIsolated = isolated?.length === 1 && isolated[0] === s.id;

  return (
    <article className="space-y-5 animate-fade-up" key={s.id}>
      <header className="space-y-2">
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
            <span className="chip !py-0.5 text-[11px]" style={{ borderColor: `${sys.color}55` }}>
              <span className="h-2 w-2 rounded-full" style={{ background: sys.color }} />
              {sys.label}
            </span>
            <span className="chip !py-0.5 text-[11px] text-muted-foreground">{GROUP_LOOK[s.group].label}</span>
            <span className="chip !py-0.5 text-[11px] text-muted-foreground">Layer {s.layer + 1} · {LAYER_INFO[s.layer].short}</span>
          </div>
          {onClose && (
            <button type="button" className="icon-btn -mr-1 -mt-1 h-8 w-8 shrink-0" onClick={onClose} aria-label="Close">
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        <h2 className={cn("display leading-[1.05] text-white", compactHeader ? "text-[26px]" : "text-[32px]")}>{s.name}</h2>
        {info?.latin && <div className="text-[13px] italic text-muted-foreground">{info.latin}</div>}
        <div className="flex flex-wrap gap-1.5 pt-1">
          <button type="button" className="chip" onClick={() => st().focus([s.id])}>
            <Crosshair className="h-3.5 w-3.5" /> Focus
          </button>
          <button type="button" className="chip" data-active={isIsolated} onClick={() => st().isolate(isIsolated ? null : [s.id])}>
            <ScanSearch className="h-3.5 w-3.5" /> {isIsolated ? "Show all" : "Isolate"}
          </button>
          {twins > 1 && (
            <button type="button" className="chip" onClick={() => st().isolate(model.byConcept.get(s.concept)!.map((t) => t.id))}>
              <ScanSearch className="h-3.5 w-3.5" /> Both sides
            </button>
          )}
          <button type="button" className="chip" onClick={() => st().hide(s.id)}>
            <EyeOff className="h-3.5 w-3.5" /> Hide
          </button>
          <button
            type="button"
            className={cn("chip", showConnections && "!border-primary/40 !text-primary")}
            onClick={() => st().set("showConnections", !showConnections)}
          >
            <GitBranch className="h-3.5 w-3.5" /> Connections
          </button>
        </div>
      </header>

      {overlayValue?.value && (
        <div className="rounded-xl border border-primary/25 bg-primary/[0.07] px-3 py-2.5">
          <div className="eyebrow !text-primary">{overlayValue.label}</div>
          <div className="mt-0.5 text-[13.5px] font-medium">{overlayValue.value}</div>
        </div>
      )}

      {!kb ? (
        <Skeleton />
      ) : !info ? (
        <p className="text-[13px] text-muted-foreground">No description available yet.</p>
      ) : (
        <>
          <p className="selectable text-[14px] leading-relaxed text-foreground/90">{info.summary}</p>

          {(info.origin || info.insertion || info.action || info.innervation || info.bloodSupply) && (
            <dl className="selectable grid grid-cols-[88px_1fr] gap-x-3 gap-y-2 rounded-xl border border-white/[0.06] bg-white/[0.025] p-3 text-[12.5px]">
              {(
                [
                  ["Origin", info.origin],
                  ["Insertion", info.insertion],
                  ["Action", info.action],
                  ["Nerve", info.innervation],
                  ["Blood supply", info.bloodSupply],
                ] as const
              )
                .filter(([, v]) => v)
                .map(([k, v]) => (
                  <div key={k} className="contents">
                    <dt className="font-semibold text-muted-foreground">{k}</dt>
                    <dd className="leading-snug text-foreground/85">{v}</dd>
                  </div>
                ))}
            </dl>
          )}

          {info.functions && info.functions.length > 0 && (
            <Block title="Functions">
              <ul className="selectable space-y-1.5">
                {info.functions.map((f) => (
                  <li key={f} className="flex gap-2 text-[13px] leading-snug text-foreground/85">
                    <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-primary" />
                    {f}
                  </li>
                ))}
              </ul>
            </Block>
          )}

          {info.facts && info.facts.length > 0 && (
            <Block title="Key facts">
              <dl className="selectable divide-y divide-white/[0.05] overflow-hidden rounded-xl border border-white/[0.06]">
                {info.facts.map((f) => (
                  <div key={f.label} className="grid grid-cols-[minmax(0,0.9fr)_minmax(0,1.3fr)] gap-3 bg-white/[0.02] px-3 py-2 text-[12.5px]">
                    <dt className="text-muted-foreground">{f.label}</dt>
                    <dd className="font-medium leading-snug text-foreground/90">{f.value}</dd>
                  </div>
                ))}
              </dl>
            </Block>
          )}

          {info.connections && info.connections.length > 0 && (
            <Block title="How it connects">
              <ConnectionGroups info={info} current={s} />
            </Block>
          )}

          {info.clinical && (
            <div className="selectable rounded-xl border border-[#ff8a7a]/20 bg-[#ff8a7a]/[0.06] p-3">
              <div className="mb-1 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#ffab9e]">
                <Stethoscope className="h-3.5 w-3.5" /> Clinical relevance
              </div>
              <p className="text-[12.5px] leading-relaxed text-foreground/85">{info.clinical}</p>
            </div>
          )}

          {info.sexDifferences && (
            <div className="selectable rounded-xl border border-[#c79bff]/20 bg-[#c79bff]/[0.06] p-3">
              <div className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-[#d4b3ff]">♀ ♂ Sex differences</div>
              <p className="text-[12.5px] leading-relaxed text-foreground/85">{info.sexDifferences}</p>
            </div>
          )}
        </>
      )}

      <footer className="border-t border-white/[0.06] pt-3 text-[10.5px] leading-relaxed text-muted-foreground">
        Geometry: {SOURCE[s.source]} · {s.triangles.toLocaleString()} triangles
      </footer>
    </article>
  );
}
