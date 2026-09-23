import { ArrowLeftRight, Box, FlipHorizontal2 } from "lucide-react";
import { useExplorer, type SectionAxis, type ViewPreset } from "@/state/store";
import { cn } from "@/lib/utils";
import { Range, Row, Section, Seg, Toggle } from "./primitives";

const AXES: { value: SectionAxis; label: string; hint: string }[] = [
  { value: "sagittal", label: "Sagittal", hint: "Divides left from right" },
  { value: "coronal", label: "Coronal", hint: "Divides front from back" },
  { value: "transverse", label: "Transverse", hint: "Divides upper from lower (axial)" },
];

export const VIEWS: { value: ViewPreset; label: string; short: string }[] = [
  { value: "front", label: "Anterior", short: "Front" },
  { value: "back", label: "Posterior", short: "Back" },
  { value: "left", label: "Left lateral", short: "Left" },
  { value: "right", label: "Right lateral", short: "Right" },
  { value: "top", label: "Superior", short: "Top" },
];

export function SectionControls() {
  const section = useExplorer((s) => s.section);
  const setSection = useExplorer((s) => s.setSection);
  const view = useExplorer((s) => s.view);
  const axis = AXES.find((a) => a.value === section.axis)!;
  return (
    <div className="space-y-3">
      <Row label="Cross-section" hint="Slice through the body like a CT or MRI plane">
        <Toggle
          checked={section.enabled}
          onChange={(v) => {
            setSection({ enabled: v });
            if (v) view(section.axis === "sagittal" ? (section.flip ? "right" : "left") : section.axis === "coronal" ? (section.flip ? "back" : "front") : "front");
          }}
          label="Cross-section"
        />
      </Row>
      <div className={cn("space-y-3 transition-opacity", !section.enabled && "pointer-events-none opacity-40")}>
        <Seg
          className="w-full [&>button]:flex-1"
          value={section.axis}
          options={AXES.map((a) => ({ value: a.value, label: a.label, title: a.hint }))}
          onChange={(v) => {
            setSection({ axis: v, offset: 0 });
            view(v === "sagittal" ? (section.flip ? "right" : "left") : v === "coronal" ? (section.flip ? "back" : "front") : "front");
          }}
        />
        <div className="text-[11.5px] text-muted-foreground">{axis.hint}</div>
        <div className="flex items-center gap-2">
          <Range value={section.offset} min={-1} max={1} onChange={(v) => setSection({ offset: v })} label="Section position" />
          <button type="button" className="icon-btn shrink-0" title="Flip the side that is removed" onClick={() => setSection({ flip: !section.flip })}>
            <FlipHorizontal2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export function ToolsPanel() {
  const explode = useExplorer((s) => s.explode);
  const showConnections = useExplorer((s) => s.showConnections);
  const labels = useExplorer((s) => s.labels);
  const quality = useExplorer((s) => s.quality);
  const set = useExplorer((s) => s.set);
  const view = useExplorer((s) => s.view);
  return (
    <div className="space-y-6">
      <Section title="Section plane">
        <SectionControls />
      </Section>
      <Section title="Exploded view">
        <div className="flex items-center gap-3">
          <Box className="h-4 w-4 shrink-0 text-muted-foreground" />
          <Range value={explode} min={0} max={0.6} onChange={(v) => set("explode", v)} label="Explode" />
          <ArrowLeftRight className="h-4 w-4 shrink-0 text-muted-foreground" />
        </div>
        <p className="text-[11.5px] text-muted-foreground">Pull structures apart to see how they fit together.</p>
      </Section>
      <Section title="Camera">
        <div className="grid grid-cols-5 gap-1.5">
          {VIEWS.map((v) => (
            <button
              key={v.value}
              type="button"
              className="rounded-lg border border-white/[0.07] bg-white/[0.03] px-1 py-2 text-[11.5px] font-semibold text-foreground/85 hover:bg-white/[0.07]"
              onClick={() => view(v.value)}
              title={v.label}
            >
              {v.short}
            </button>
          ))}
        </div>
      </Section>
      <Section title="Display">
        <Row label="Connections" hint="Arcs to the vessels, nerves and bones a structure connects with">
          <Toggle checked={showConnections} onChange={(v) => set("showConnections", v)} label="Connections" />
        </Row>
        <Row label="Labels" hint="Callouts for the selection and its connections">
          <Toggle checked={labels} onChange={(v) => set("labels", v)} label="Labels" />
        </Row>
        <Row label="Graphics quality" hint={quality === "high" ? "Full resolution, clear-coat and sheen" : "Lighter shading for older devices"}>
          <Seg
            value={quality}
            options={[
              { value: "balanced", label: "Balanced" },
              { value: "high", label: "High" },
            ]}
            onChange={(v) => set("quality", v)}
          />
        </Row>
      </Section>
    </div>
  );
}
