/**
 * On-demand GPU visibility sampling: renders the picking pass at low resolution and counts
 * how many pixels each structure covers from the current camera. Registered by the scene.
 */
export const visibility: { sample: null | (() => Map<number, number>) } = { sample: null };
