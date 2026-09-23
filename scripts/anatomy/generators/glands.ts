/**
 * Thyroid gland (absent from BodyParts3D): two lobes hugging the trachea below the thyroid
 * cartilage, joined by an isthmus over the 2nd-4th tracheal rings. Built as an implicit union
 * of ellipsoids so the result is a single organic surface.
 */
import { bounds, taubinSmooth, type Vec3 } from "../lib/mesh";
import { Grid, maskToMeshSdf } from "../lib/voxel";
import { centerline } from "../lib/tube";
import { generatedStructure, queryMesh } from "./context";
import type { BuiltStructure } from "../export";

export function generateThyroid(): BuiltStructure {
  const cricoid = bounds(queryMesh(/^cricoid cartilage$/i));
  const trachea = queryMesh(/^trachea$/i);
  const tl = centerline(trachea, 16, [0, 2, 0.1]);
  const tb = bounds(trachea);
  const trR = (tb.max[0] - tb.min[0]) / 2;
  // point on the tracheal axis at a given height
  const at = (y: number): Vec3 => {
    let best = tl[0];
    for (const p of tl) if (Math.abs(p[1] - y) < Math.abs(best[1] - y)) best = p;
    return [best[0], y, best[2]];
  };
  const isthmusY = cricoid.min[1] - 0.012;
  const blobs: { c: Vec3; r: Vec3 }[] = [];
  for (const s of [1, -1]) {
    // each lobe: upper pole beside the thyroid cartilage, lower pole at ~6th ring
    for (let i = 0; i <= 6; i++) {
      const f = i / 6;
      const y = cricoid.max[1] + 0.012 - f * 0.05;
      const axis = at(y);
      const bulk = Math.sin(Math.PI * (0.15 + 0.75 * f)); // fuller in the lower half
      blobs.push({
        c: [axis[0] + s * (trR + 0.006 + 0.004 * bulk), y, axis[2] + 0.002 - 0.004 * (1 - f)],
        r: [0.0055 + 0.004 * bulk, 0.009, 0.006 + 0.004 * bulk],
      });
    }
  }
  // isthmus across the front of the trachea
  for (let i = -3; i <= 3; i++) {
    const a = (i / 3) * 1.05;
    const axis = at(isthmusY);
    blobs.push({ c: [axis[0] + Math.sin(a) * (trR + 0.003), isthmusY, axis[2] + Math.cos(a) * (trR + 0.003)], r: [0.006, 0.006, 0.0035] });
  }
  const min: Vec3 = [Infinity, Infinity, Infinity];
  const max: Vec3 = [-Infinity, -Infinity, -Infinity];
  for (const b of blobs)
    for (let k = 0; k < 3; k++) {
      min[k] = Math.min(min[k], b.c[k] - b.r[k]);
      max[k] = Math.max(max[k], b.c[k] + b.r[k]);
    }
  const grid = Grid.fromBounds(min, max, 0.0008, 3);
  const mask = new Uint8Array(grid.size);
  const tracheaAxisClear = (x: number, y: number, z: number) => {
    const a = at(y);
    return Math.hypot(x - a[0], z - a[2]) > trR + 0.001;
  };
  for (let k = 0; k < grid.nz; k++)
    for (let j = 0; j < grid.ny; j++)
      for (let i = 0; i < grid.nx; i++) {
        const [x, y, z] = grid.pos(i, j, k);
        if (!tracheaAxisClear(x, y, z)) continue;
        for (const b of blobs) {
          const d = ((x - b.c[0]) / b.r[0]) ** 2 + ((y - b.c[1]) / b.r[1]) ** 2 + ((z - b.c[2]) / b.r[2]) ** 2;
          if (d <= 1) {
            mask[grid.index(i, j, k)] = 1;
            break;
          }
        }
      }
  let mesh = maskToMeshSdf(grid, mask, 2, 2);
  mesh = taubinSmooth(mesh, 10);
  return generatedStructure("thyroid gland", mesh, { system: "endocrine", group: "gland", layer: 3, generator: "thyroid" });
}
