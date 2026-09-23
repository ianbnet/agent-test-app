import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { calloutBus, type Callout } from "@/three/callouts";
import { useModel } from "@/data/modelContext";
import { reveal } from "@/state/actions";

export interface Insets {
  left: number;
  right: number;
  top: number;
  bottom: number;
}

const GAP = 35;
const GAP_PRIMARY = 40;

/**
 * Atlas-style labels: callouts are stacked in columns either side of the body and joined to
 * their structures with leader lines, so many labels stay legible at once.
 */
export function CalloutLayer({ insets }: { insets: Insets }) {
  const [callouts, setCallouts] = useState<Callout[]>(calloutBus.callouts);
  const model = useModel();
  const root = useRef<HTMLDivElement>(null);
  const labelEls = useRef<(HTMLButtonElement | null)[]>([]);
  const pathEls = useRef<(SVGPathElement | null)[]>([]);
  const dotEls = useRef<(SVGCircleElement | null)[]>([]);
  const widths = useRef<number[]>([]);
  const insetsRef = useRef(insets);
  insetsRef.current = insets;

  useEffect(() => calloutBus.onSet(() => setCallouts(calloutBus.callouts)), []);

  useLayoutEffect(() => {
    widths.current = labelEls.current.map((el) => (el ? el.offsetWidth : 120));
  }, [callouts]);

  useEffect(() => {
    const layout = () => {
      const host = root.current;
      if (!host) return;
      const W = host.clientWidth;
      const H = host.clientHeight;
      const ins = insetsRef.current;
      const list = calloutBus.callouts;
      const scr = calloutBus.screen;
      const body = calloutBus.body;
      const cx = Number.isFinite(body.left) ? (body.left + body.right) / 2 : W / 2;
      type Item = { i: number; x: number; y: number; w: number; primary: boolean; side: -1 | 1; ly: number };
      const items: Item[] = [];
      list.forEach((c, i) => {
        const p = scr[i];
        const hidden = !p || !p.visible || p.x < -50 || p.x > W + 50 || p.y < -50 || p.y > H + 50;
        const el = labelEls.current[i];
        if (el) el.style.opacity = hidden ? "0" : "1";
        const path = pathEls.current[i];
        if (path) path.style.opacity = hidden ? "0" : "1";
        const dot = dotEls.current[i];
        if (dot) dot.style.opacity = hidden ? "0" : "1";
        if (hidden) return;
        items.push({ i, x: p.x, y: p.y, w: widths.current[i] ?? 120, primary: !!c.primary, side: p.x < cx ? -1 : 1, ly: p.y });
      });
      // balance the two columns
      const left = items.filter((it) => it.side < 0);
      const right = items.filter((it) => it.side > 0);
      const move = (from: Item[], to: Item[], dir: -1 | 1) => {
        from.sort((a, b) => Math.abs(a.x - cx) - Math.abs(b.x - cx));
        while (from.length > to.length + 2) {
          const it = from.shift()!;
          it.side = dir;
          to.push(it);
        }
      };
      move(left, right, 1);
      move(right, left, -1);

      const top = ins.top + 12;
      const bottom = H - ins.bottom - 12;
      const place = (col: Item[], side: -1 | 1) => {
        if (!col.length) return;
        const maxW = Math.max(...col.map((c) => c.w));
        let edge: number;
        if (side < 0) {
          edge = Math.min(body.left - 28, cx - 60);
          edge = Math.max(edge, ins.left + maxW + 10);
        } else {
          edge = Math.max(body.right + 28, cx + 60);
          edge = Math.min(edge, W - ins.right - maxW - 10);
        }
        col.sort((a, b) => a.y - b.y);
        for (const c of col) c.ly = Math.min(Math.max(c.y, top), bottom);
        for (let k = 1; k < col.length; k++) {
          const g = col[k].primary || col[k - 1].primary ? GAP_PRIMARY : GAP;
          col[k].ly = Math.max(col[k].ly, col[k - 1].ly + g);
        }
        const last = col[col.length - 1];
        if (last.ly > bottom) {
          last.ly = bottom;
          for (let k = col.length - 2; k >= 0; k--) {
            const g = col[k].primary || col[k + 1].primary ? GAP_PRIMARY : GAP;
            col[k].ly = Math.min(col[k].ly, col[k + 1].ly - g);
          }
        }
        for (const c of col) {
          const el = labelEls.current[c.i];
          const lx = side < 0 ? edge - c.w : edge;
          if (el) el.style.transform = `translate3d(${lx}px, ${c.ly}px, 0) translateY(-50%)`;
          const path = pathEls.current[c.i];
          const x0 = side < 0 ? edge + 3 : edge - 3;
          const x1 = x0 + side * 14;
          if (path) path.setAttribute("d", `M${x0},${c.ly} L${x1},${c.ly} L${c.x},${c.y}`);
          const dot = dotEls.current[c.i];
          if (dot) {
            dot.setAttribute("cx", String(c.x));
            dot.setAttribute("cy", String(c.y));
          }
        }
      };
      place(items.filter((it) => it.side < 0), -1);
      place(items.filter((it) => it.side > 0), 1);
    };
    return calloutBus.onFrame(layout);
  }, []);

  if (!callouts.length) return null;
  return (
    <div ref={root} className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
      <svg className="absolute inset-0 h-full w-full">
        {callouts.map((c, i) => (
          <g key={c.key}>
            <path
              ref={(el) => (pathEls.current[i] = el)}
              fill="none"
              stroke={c.color}
              strokeOpacity={c.primary ? 0.9 : 0.55}
              strokeWidth={c.primary ? 1.4 : 1}
            />
            <circle ref={(el) => (dotEls.current[i] = el)} r={c.primary ? 3.5 : 2.5} fill={c.color} stroke="#0b0f14" strokeWidth={1} />
          </g>
        ))}
      </svg>
      {callouts.map((c, i) => (
        <button
          key={c.key}
          ref={(el) => (labelEls.current[i] = el)}
          type="button"
          onClick={() => !c.primary && model && reveal(model, c.id, { focus: false })}
          className={
            "pointer-events-auto absolute left-0 top-0 flex max-w-[210px] flex-col rounded-lg border px-2 py-1 text-left leading-tight transition-opacity duration-200 " +
            (c.primary
              ? "border-primary/50 bg-[#0b1714]/85 shadow-[0_0_24px_-6px_rgba(62,230,200,0.6)]"
              : "border-white/10 bg-[#0b0e13]/80 hover:border-white/25")
          }
          style={{ opacity: 0, backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)" }}
        >
          <span className={"truncate font-medium " + (c.primary ? "text-[13px] text-white" : "text-[11.5px] text-white/90")}>{c.label}</span>
          {c.sub && (
            <span className="truncate text-[9.5px] font-semibold uppercase tracking-wider" style={{ color: c.color }}>
              {c.sub}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
