import type * as THREE from "three";

/**
 * Lateral shift (px) of the projection centre so the body is framed in the part of the
 * screen not covered by panels. Shared by the camera rig and GPU picking.
 */
export const viewShift = {
  x: 0,
  y: 0,
  applied: "",
  apply(camera: THREE.PerspectiveCamera, width: number, height: number, force = false) {
    const key = `${this.x.toFixed(2)},${this.y.toFixed(2)},${width},${height}`;
    if (!force && key === this.applied) return;
    this.applied = key;
    if (Math.abs(this.x) < 0.01 && Math.abs(this.y) < 0.01) camera.clearViewOffset();
    else camera.setViewOffset(width, height, -this.x, -this.y, width, height);
  },
  /** Render only the device pixel under (x, y) CSS px, honouring the shift. */
  pickOffset(camera: THREE.PerspectiveCamera, x: number, y: number, width: number, height: number, dpr: number) {
    camera.setViewOffset(width * dpr, height * dpr, (x - this.x) * dpr, (y - this.y) * dpr, 1, 1);
  },
};
