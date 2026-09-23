/** Static 3D kd-tree over a flat Float32Array of points (x,y,z,...). */
export class KdTree {
  private readonly pts: Float32Array;
  private readonly idx: Uint32Array;
  private readonly nodes: Int32Array; // per node: [start, end, axis(-1 leaf), left, right]
  private nodeCount = 0;

  constructor(points: Float32Array, private readonly leafSize = 12) {
    this.pts = points;
    const n = points.length / 3;
    this.idx = new Uint32Array(n);
    for (let i = 0; i < n; i++) this.idx[i] = i;
    this.nodes = new Int32Array(Math.max(8, Math.ceil((4 * n) / leafSize) + 8) * 5);
    if (n > 0) this.build(0, n);
  }

  get size() {
    return this.idx.length;
  }

  private build(start: number, end: number): number {
    const id = this.nodeCount++;
    const o = id * 5;
    this.nodes[o] = start;
    this.nodes[o + 1] = end;
    if (end - start <= this.leafSize) {
      this.nodes[o + 2] = -1;
      return id;
    }
    // choose axis with largest spread
    let min0 = Infinity, min1 = Infinity, min2 = Infinity;
    let max0 = -Infinity, max1 = -Infinity, max2 = -Infinity;
    for (let i = start; i < end; i++) {
      const p = this.idx[i] * 3;
      const x = this.pts[p], y = this.pts[p + 1], z = this.pts[p + 2];
      if (x < min0) min0 = x;
      if (x > max0) max0 = x;
      if (y < min1) min1 = y;
      if (y > max1) max1 = y;
      if (z < min2) min2 = z;
      if (z > max2) max2 = z;
    }
    const sx = max0 - min0, sy = max1 - min1, sz = max2 - min2;
    const axis = sx >= sy && sx >= sz ? 0 : sy >= sz ? 1 : 2;
    const mid = (start + end) >> 1;
    this.select(start, end - 1, mid, axis);
    this.nodes[o + 2] = axis;
    this.nodes[o + 3] = this.build(start, mid);
    this.nodes[o + 4] = this.build(mid, end);
    return id;
  }

  // quickselect on idx by coordinate
  private select(lo: number, hi: number, k: number, axis: number) {
    const idx = this.idx;
    const pts = this.pts;
    while (hi > lo) {
      const pivot = pts[idx[(lo + hi) >> 1] * 3 + axis];
      let i = lo;
      let j = hi;
      while (i <= j) {
        while (pts[idx[i] * 3 + axis] < pivot) i++;
        while (pts[idx[j] * 3 + axis] > pivot) j--;
        if (i <= j) {
          const t = idx[i];
          idx[i] = idx[j];
          idx[j] = t;
          i++;
          j--;
        }
      }
      if (k <= j) hi = j;
      else if (k >= i) lo = i;
      else return;
    }
  }

  /** Index of nearest point, and squared distance via out[0]. */
  nearest(x: number, y: number, z: number, out?: { d2: number }): number {
    let best = -1;
    let bestD = Infinity;
    const stack: number[] = [0];
    const nodes = this.nodes;
    const pts = this.pts;
    const idx = this.idx;
    // store split distances lazily: simple recursive-order traversal with pruning
    const visit = (node: number) => {
      const o = node * 5;
      const axis = nodes[o + 2];
      if (axis === -1) {
        for (let i = nodes[o]; i < nodes[o + 1]; i++) {
          const p = idx[i] * 3;
          const dx = pts[p] - x, dy = pts[p + 1] - y, dz = pts[p + 2] - z;
          const d = dx * dx + dy * dy + dz * dz;
          if (d < bestD) {
            bestD = d;
            best = idx[i];
          }
        }
        return;
      }
      const mid = (nodes[o] + nodes[o + 1]) >> 1;
      const split = pts[idx[mid] * 3 + axis];
      const q = axis === 0 ? x : axis === 1 ? y : z;
      const diff = q - split;
      const first = diff < 0 ? nodes[o + 3] : nodes[o + 4];
      const second = diff < 0 ? nodes[o + 4] : nodes[o + 3];
      visit(first);
      if (diff * diff < bestD) visit(second);
    };
    void stack;
    if (this.idx.length > 0) visit(0);
    if (out) out.d2 = bestD;
    return best;
  }

  /** All point indices within radius r. */
  radius(x: number, y: number, z: number, r: number, result: number[] = []): number[] {
    const r2 = r * r;
    const nodes = this.nodes;
    const pts = this.pts;
    const idx = this.idx;
    const visit = (node: number) => {
      const o = node * 5;
      const axis = nodes[o + 2];
      if (axis === -1) {
        for (let i = nodes[o]; i < nodes[o + 1]; i++) {
          const p = idx[i] * 3;
          const dx = pts[p] - x, dy = pts[p + 1] - y, dz = pts[p + 2] - z;
          if (dx * dx + dy * dy + dz * dz <= r2) result.push(idx[i]);
        }
        return;
      }
      const mid = (nodes[o] + nodes[o + 1]) >> 1;
      const split = pts[idx[mid] * 3 + axis];
      const q = axis === 0 ? x : axis === 1 ? y : z;
      if (q - r <= split) visit(nodes[o + 3]);
      if (q + r >= split) visit(nodes[o + 4]);
    };
    if (this.idx.length > 0) visit(0);
    return result;
  }
}
