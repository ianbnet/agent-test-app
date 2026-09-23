import type { LoadedModel } from "@/data/model";
import { useExplorer } from "./store";

/**
 * Select a structure and make sure it can actually be seen: switch its system back on,
 * unhide it, and peel the body down to its layer if it is currently covered or removed.
 */
export function reveal(model: LoadedModel, id: string, opts: { focus?: boolean } = { focus: true }) {
  const s = model.byId.get(id);
  if (!s) return;
  const st = useExplorer.getState();
  const patch: Partial<ReturnType<typeof useExplorer.getState>> = {};
  if (!st.systems[s.system]) patch.systems = { ...st.systems, [s.system]: true };
  if (st.hidden[id]) {
    const hidden = { ...st.hidden };
    delete hidden[id];
    patch.hidden = hidden;
  }
  if (st.isolated && !st.isolated.includes(id)) patch.isolated = null;
  // Covered (layer deeper than the current depth) or peeled away (shallower): go to its layer.
  const f = Math.floor(st.peel);
  if (s.layer !== f || st.peel - f > 0.5) patch.peel = s.layer;
  useExplorer.setState(patch);
  st.select(id, opts);
}
